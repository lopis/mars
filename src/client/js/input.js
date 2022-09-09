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
  dismissDialog()
  clearSelectedTile()
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

  addEventListener('click', ({target}) => {
    if(target?.dataset?.n) {
      showTileDialog(target)
      houseDirection = null
      houseNumber = 100
      return
    }

    // House buttons
    const houseDialogListern = ({
      movein: updateDirection,
      moveout:  updateDirection,
      div: updateHouseNumber(0.2),
      mul: updateHouseNumber(5),
      ok: submitAction
    })[target.id]
    if (houseDialogListern) {
      houseDialogListern(target)
      return
    }

    const listener = ({
      offline: playOffline,
      global: playGlobal,
      _users: showUsers,
      _comms: showComms,
      _sol: showSolStats,
      getone: collect(1),
      getall: collect(),
      dismiss: dismissDialog,
    })[target.id]
    if (listener) {
      listener()
      clearSelectedTile()
    }

    ({
      _sound: toggleSoundEffects,
      _music: toggleMusic,
      _fast: toggleEffects,
      _a11y: toggleColorBlindness,
    })[target.id]?.()

  })
}