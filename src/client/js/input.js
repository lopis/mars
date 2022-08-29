import { playGlobal, playOffline } from './game'
import { collect, sendMessage } from './io'
import { showUsers, showComms, showTileDialog, dismissDialog, updateMap, clearSelectedTile, showSolStats } from './ui'

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

  let zoom = 1
  let translate = [0, 0]
  let isMoving = false // Avoid computations inside the scroll event handler

  addEventListener('wheel', ({ wheelDelta }) => {
    zoom = Math.min(MAX_ZOOM, Math.max(1, zoom + (SCROLL_SPEED * Math.sign(wheelDelta))))
    if (!isMoving) {
      window.requestAnimationFrame(() => {
        updateMap(translate, zoom)
        isMoving = false
      })
  
      isMoving = true
    }
  })
  
  let isDragging, dragPos = [0,0], initialPos
  wrapper.addEventListener('mousedown', ({ pageX, pageY }) => {
    dragPos = [pageX, pageY]
    initialPos = [...translate]
    isDragging = true
  });
  document.addEventListener('mouseup', (e) => {
    isDragging = false
  });
  document.addEventListener('mousemove', ({ pageX, pageY }) => {
    if (isDragging) {
      console.log(initialPos[0] - (dragPos[0] - pageX) / 5);
      if (Math.abs(dragPos[0] - pageX) > 10) {
        translate[0] = initialPos[0] - (dragPos[0] - pageX)
        translate[1] = initialPos[1] - (dragPos[1] - pageY)
        window.requestAnimationFrame(() => {
          updateMap()
          isMoving = false
        });
        isMoving = true
      }
    }
  });

  addEventListener('drag', (event) => {});

  addEventListener('click', ({target}) => {
    if(target?.dataset?.n) {
      showTileDialog(target)
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
      dismiss: ()=>{},
    })[target.id]
    if (listener) {
      dismissDialog()
      listener()
      clearSelectedTile()
    }

  })
}