import { toggleMusic, toggleSoundEffects } from './audio'
import { playGlobal, playOffline } from './game'
import { toggleColorBlindness, toggleEffects } from './graphics'
import { collect, relocateAction, sendMessage } from './io'
import { showUsers, showComms, showTileDialog, dismissDialog, updateMap, clearSelectedTile, showSolStats } from './ui'

let houseDirection, houseNumber

const updateHouseNumber = (ratio) => () => {
  houseNumber = Math.round(Math.max(10, Math.min(1e5, houseNumber*ratio)))
  _val.innerText = houseNumber > 1e3
  ? (Math.round(houseNumber / 1e2) / 10) + 'k'
  : houseNumber
}

const updateDirection = (target) => {
  movein.classList.remove('checked')
  moveout.classList.remove('checked')
  houseDirection = target.id
  target.classList.add('checked')
}

const submitAction = () => {
  if (!houseDirection) return

  relocateAction(houseDirection, houseNumber)
  // dismissDialog()
  // clearSelectedTile()
}

export default () => {
  addEventListener('keyup', ({target, key}) => {
    if (key === 'Escape') {
      dismissDialog()
      clearSelectedTile()
    }
    if (key === 'Enter' && target === _input) {
      if (target.value?.length > 0) {
        sendMessage(target.value)
        target.value = ''
      }
    }
  })

  addEventListener('click', ({target, ctrlKey}) => {
    if(target?.dataset?.n) {
      if (ctrlKey) {
        $selectedTile = target
        collect()
        clearSelectedTile()
      } else {
        showTileDialog(target)
        houseDirection = null
        houseNumber = 120
      }
      return
    }

    // House buttons
    const houseDialogListener = ({
      movein: updateDirection,
      moveout:  updateDirection,
      div: updateHouseNumber(0.2),
      mul: updateHouseNumber(5),
      ok: submitAction
    })[target.id]
    if (houseDialogListener) {
      houseDialogListener(target)
      return
    }

    // These will clear the tile after clicking
    const listener = ({
      offline: playOffline,
      global: playGlobal,
      _users: showUsers,
      _comms: showComms,
      _sol: showSolStats,
      dismiss: dismissDialog,
    })[target.id]
    if (listener) {
      listener()
      clearSelectedTile()
    }

    // These won't clear the tile after clicking
    ({
      _sound: toggleSoundEffects,
      _music: toggleMusic,
      _fast: toggleEffects,
      _a11y: toggleColorBlindness,
      getall: collect,
    })[target.id]?.()

  })
}