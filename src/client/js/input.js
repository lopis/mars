import { toggleMusic, toggleSoundEffects } from './audio'
import { playGlobal, playOffline } from './game'
import { collect, relocateAction, sendMessage } from './io'
import { showUsers, showComms, showTileDialog, dismissDialog, updateMap, clearSelectedTile, showSolStats } from './ui'

let houseDirection, houseNumber

const updateHouseNumber = (ratio) => () => {
  houseNumber = Math.round(Math.max(100, Math.min(1e5, houseNumber*ratio)))
  _val.innerText = houseNumber > 1e3
  ? Math.round(houseNumber / 1e3) + 'k'
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

  // let zoom = 1
  // let translate = [0, 0]
  // let isMoving = false // Avoid computations inside the scroll event handler

  // addEventListener('wheel', ({ wheelDelta }) => {
  //   zoom = Math.min(MAX_ZOOM, Math.max(1, zoom + (SCROLL_SPEED * Math.sign(wheelDelta))))
  //   if (!isMoving) {
  //     window.requestAnimationFrame(() => {
  //       updateMap(translate, zoom)
  //       isMoving = false
  //     })
  
  //     isMoving = true
  //   }
  // })
  
  // let isDragging, dragPos = [0,0], initialPos
  // wrapper.addEventListener('mousedown', ({ pageX, pageY }) => {
  //   dragPos = [pageX, pageY]
  //   initialPos = [...translate]
  //   isDragging = true
  // });
  // document.addEventListener('mouseup', (e) => {
  //   isDragging = false
  // });
  // document.addEventListener('mousemove', ({ pageX, pageY }) => {
  //   if (isDragging) {
  //     console.log(initialPos[0] - (dragPos[0] - pageX) / 5);
  //     if (Math.abs(dragPos[0] - pageX) > 10) {
  //       translate[0] = initialPos[0] - (dragPos[0] - pageX)
  //       translate[1] = initialPos[1] - (dragPos[1] - pageY)
  //       window.requestAnimationFrame(() => {
  //         updateMap()
  //         isMoving = false
  //       });
  //       isMoving = true
  //     }
  //   }
  // });

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
      div10: updateHouseNumber(0.1),
      mul10: updateHouseNumber(10),
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
    })[target.id]?.()

  })
}