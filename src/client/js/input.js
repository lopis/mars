import { playGlobal, playOffline } from './game'
import { sendMessage } from './io'
import { showUsers, showComms, showBuildDialog, dismissDialog } from './ui'

export default () => {
  document.addEventListener('keyup', ({target, key}) => {
    if (key === 'Escape') {
      dismissDialog()
    }
    if (key === 'Enter' && target === _input) {
      if (target.value?.length > 0) {
        sendMessage(target.value)
        target.value = ''
      }
    }
  })

  document.addEventListener('click', ({target}) => {
    if(target?.dataset?.n) {
      showBuildDialog(target)
      return
    }

    const listener = ({
      offline: playOffline,
      global: playGlobal,
      users: showUsers,
      comms: showComms,
      dismiss: ()=>{},
    })[target.id]
    if (listener) {
      dismissDialog()
      listener()
    }

  })
}