import { notification, playSound, warning } from './audio';
import { updateUsers, updateChat, updateSol, updateStats } from './game'
import { showComms, updateTile } from './ui';

let socket //Socket.IO client

/**
   * Binds Socket.IO and button events
   */
function bind() {
  window.emit = socket.emit

  Object.entries({
    'users': ({id, users}) => {
      updateUsers(id, users)
      localStorage.setItem('u', id)
      _users.dataset.count = users.length
    },
    'msg': ({user, msg}) => {
      updateChat(user, msg)
      if (typeof _input !== 'undefined') {
        showComms()
      } else {
        _comms.dataset.new = true
      }
    },
    'sol': (solCount) => {
      phase = (solCount % solDuration) / solDuration
      updateSol(solCount)
    },
    'world': ({tiles, stats}) => {
      Object.entries(tiles).forEach(([id, tile]) => {
        updateTile(tile)
      })
      document.querySelectorAll('.hidden').forEach(e => e.classList.add('show'))
      updateStats(stats)
    },
    'tile': updateTile,
    'build': updateTile,
    'stats': updateStats,
    'events': (events) => {
      if (events.length === 0) return
      setTimeout(() => {
        console.log(events);
        let hasWarning
        events.forEach(event => {
          const $p = document.createElement('p')
          $p.setAttribute('i', event.type)
          hasWarning = hasWarning || event.type === '⚠️'
          $p.innerHTML = [
            '<span>',
              msg[event.name],
              `</br><small>Arriving in sol ${event.sol}</small>`,
            '</span>',
          ]. join('')
          _notices.prepend($p)
        })
        if (hasWarning) {
          playSound(warning)
        } else {
          playSound(notification)
        }
      }, 500)
    }
  }).forEach(([key, fn]) => socket.on(key, fn))
}

export const bindIo = () => {
  if (io) {
    socket = io?.({ upgrade: false, transports: ['websocket'] });
    bind();
  }
}

export const sendMessage = msg => {
  socket.emit('msg', msg)
}

export const buildAction = (id, choice) => {
  socket.emit('build', { id, choice })
}

export const collect = (count) => () => {
  const id = $selectedTile.dataset.n
  socket.emit('collect', { 
    id,
    count,
   })
}