import { notification, playSound, warning } from './audio';

export const updateEvents = (events) => {
  if (events.length === 0) return
  setTimeout(() => {
    let hasWarning
    events.forEach(event => {
      hasWarning = hasWarning || event.type === '⚠️'
      updateEvent(event, false)
    })
    if (hasWarning) {
      playSound(warning)
    } else {
      playSound(notification)
    }
  }, 500)
}

export const updateEvent = (event, withSound = true) => {
  const $p = document.createElement('p')
  $p.setAttribute('i', event.type)
  const label = msg[event.name]
    .replace('%c', event.count)
    .replace('%t', event.tileId)
    .replace('%s', event.sol)
  $p.innerHTML = [
    '<span>',
      label,
      !event.wait ? `</br><small>date: sol ${event.sol}</small>` : '',
    '</span>',
  ]. join('')
  _notices.prepend($p)

  if (withSound) {
    playSound(event.type === '⚠️' ? warning : notification)
  }
  
  eventFunctions[event.name]?.(event)
}

const eventFunctions = {
  convoy1 () {
    rocket.classList.add('go')
    setTimeout(() => {
      rocket.classList.remove('go')
    }, 6000)
  },
  convoy2 () {
    rocket2.classList.add('go')
    setTimeout(() => {
      rocket2.classList.remove('go')
    }, 6000)
  },
  // riot ({tileId}) {
  //   tiles[tileId].$tile.classList.add('bad')
  // },
  asteroid () {
    
  },
  conjunction () {
    
  },
  dust () {
    
  },
}