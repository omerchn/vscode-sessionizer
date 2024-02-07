import { workspace } from 'vscode'

const isString = (some: unknown): some is string => typeof some === 'string'

type Config =
  | {
      valid: true
      values: {
        sessionRoots: Array<string>
      }
    }
  | {
      valid: false
      error: string
    }

export const getConfig = (): Config => {
  const config = workspace.getConfiguration('sessionizer')
  const sessionRoots = config.get('sessionRoots')
  if (
    !sessionRoots ||
    !Array.isArray(sessionRoots) ||
    !sessionRoots.every(isString)
  ) {
    return {
      valid: false,
      error: 'sessionizer.sessionRoots must be an array of strings.',
    }
  }
  return {
    valid: true,
    values: { sessionRoots },
  }
}
