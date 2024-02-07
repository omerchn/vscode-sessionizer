import { window } from 'vscode'
import * as cp from 'child_process'
import { getConfig } from './config'

const camelCaseToWords = (s: string) => {
  const result = s.replace(/([A-Z])/g, ' $1')
  return result.charAt(0).toUpperCase() + result.slice(1)
}

const isDefined = <T>(some: T | undefined): some is T => !!some

type Action = 'open' | 'openInPlace' | 'openInNewWindow'

const actionArgs: Record<Action, string> = {
  open: '',
  openInPlace: '-r',
  openInNewWindow: '-n',
}

type Args = {
  action: Action
}

export async function showSessionPicker(args: Args) {
  const config = getConfig()
  if (!config.valid) {
    window.showQuickPick([], {
      placeHolder: config.error,
    })
    return
  }
  const sessionRoots = config.values.sessionRoots
  if (sessionRoots.length === 0) {
    const error =
      'No session roots. Please specify using the sessionizer.sessionRoots setting.'
    window.showQuickPick([], {
      placeHolder: error,
    })
    return
  }
  cp.exec(
    `find ${sessionRoots.join(' ')} -mindepth 1 -maxdepth 1 -type d`,
    async (err, stdout, stderr) => {
      const sessions = stdout
        .split(/\r?\n/)
        .map((sessionPath) => {
          const pathArr = sessionPath.split('/')
          const session = pathArr.at(-1)
          const parent = pathArr.at(-2)
          if (!session) return
          return {
            path: sessionPath,
            label: `${parent ? `${parent}/` : ''}${session}`,
            // detail: sessionPath,
          }
        })
        .filter(isDefined)
      if (err || stderr) {
        window.showErrorMessage('error: ' + err || stderr)
        return
      }
      const actionTitle = camelCaseToWords(args.action)
      const result = await window.showQuickPick(sessions, {
        placeHolder: `Select a project to ${actionTitle}`,
        // title: `VS Code Sessionizer - ${actionTitle}`,
      })
      if (result) {
        cp.exec(
          `code ${result.path} ${actionArgs[args.action]}`,
          (err, _, stderr) => {
            if (err || stderr) {
              window.showErrorMessage('error: ' + err || stderr)
            }
          }
        )
      }
    }
  )
}
