import { updateUsers, updateChat, updateSol, updateStats } from './game'
import { dismissDialog, renderDialog, showComms, updateTile } from './ui';
import { updateEvent, updateEvents } from './ui-events';

let socket //Socket.IO client

/**
   * Binds Socket.IO and button events
   */
function bind() {
  window.emit = socket.emit

  Object.entries({
    'disconnect': () => {
      renderDialog(null, '<br>Server Side Error', '<p class="red">Unfortunately, the server<br>has crashed or restarted.<br>Please refresh the page.</p>')
    },
    'users': ({id, users}) => {
      updateUsers(id, users)
      // localStorage.setItem('u', id)
      _users.dataset.count = users.length
    },
    'restart': () => window.location.reload(),
    'msg': ({user, msg}) => {
      updateChat(user, msg)
      if (typeof _input !== 'undefined') {
        showComms()
      } else {
        _comms.dataset.new = true
      }
    },
    'sol': (data) => {
      phase = (data.sol % SOL_DURATION) / SOL_DURATION
      updateSol(data)
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
    'events': updateEvents,
    'event': updateEvent,
  }).forEach(([key, fn]) => socket.on(key, fn))
}

export const bindIo = () => {
  if (io) {
    socket = io?.({ upgrade: false, transports: ['websocket'] });
    bind();
  }
}

export const joinGame = (mode) => {
  socket.emit('join', mode)
}

export const sendMessage = msg => {
  socket.emit('msg', msg)
}

export const buildAction = (id, choice) => {
  socket.emit('build', { id, choice })
}

export const relocateAction = (action, count) => {
  socket.emit('move', { id: $selectedTile.dataset.n, action, count })
}

export const collect = () => {
  const id = $selectedTile.dataset.n
  // dismissDialog()
  socket.emit('collect', id)
}