import { notification, playSound, warning } from './audio';

export const updateEvents = (events) => {
  console.log(events);
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
    .replace('%t', event.tile)
    .replace('%s', event.sol)
  $p.innerHTML = [
    '<span>',
      label,
      `</br><small>${event.wait ? 'arriving on' : 'date'}: sol ${event.sol}</small>`,
    '</span>',
  ]. join('')
  _notices.prepend($p)

  if (withSound) {
    playSound(event.type === '⚠️' ? warning : notification)
  }
}