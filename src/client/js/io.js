import { updateUsers, updateChat, updateSol, updateStats } from './game'
import { showComms, updateTile } from './ui';

let socket //Socket.IO client

/**
   * Binds Socket.IO and button events
   */
function bind() {
  // socket.on('start', () => {
  // });

  // socket.on('disconnect', () => {
  // });

  // socket.on('error', () => {
  // });

  socket.on('users', ({id, users}) => {
    updateUsers(id, users)
    localStorage.setItem('u', id)
    _users.dataset.count = users.length
  });

  socket.on('msg', ({user, msg}) => {
    updateChat(user, msg)
    if (typeof _input !== 'undefined') {
      showComms()
    } else {
      _comms.dataset.new = true
    }
  });

  socket.on('sol', (solCount) => {
    phase = (solCount % solDuration) / solDuration
    updateSol(solCount)
  });

  socket.on('world', ({tiles, stats}) => {
    Object.entries(tiles).forEach(([id, tile]) => {
      updateTile(tile)
    })
    document.querySelectorAll('.hidden').forEach(e => e.classList.add('show'))
    updateStats(stats)
  })

  socket.on('tile', updateTile)

  socket.on('build', updateTile)
  
  socket.on('stats', updateStats)
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