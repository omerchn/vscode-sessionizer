import { commands, ExtensionContext } from 'vscode'
import { showSessionPicker } from './sessionizer'

export function activate(context: ExtensionContext) {
  context.subscriptions.push(
    commands.registerCommand('sessionizer.open', async () => {
      showSessionPicker({ action: 'open' })
    })
  )
  context.subscriptions.push(
    commands.registerCommand('sessionizer.openInPlace', async () => {
      showSessionPicker({ action: 'openInPlace' })
    })
  )
  // context.subscriptions.push(
  //   commands.registerCommand('sessionizer.openNewWindow', async () => {
  //     showSessionPicker({ action: 'openInNewWindow' })
  //   })
  // )
}
