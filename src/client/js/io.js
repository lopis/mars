import { updateUsers, updateChat, updateSol } from './game'
import { showComms, updateTile } from './ui';

let socket //Socket.IO client

/**
   * Binds Socket.IO and button events
   */
function bind() {
  socket.on('start', () => {
  });

  socket.on('disconnect', () => {
  });

  socket.on('error', () => {
  });


  socket.on('users', (userList) => {
    updateUsers(userList)
    users.dataset.count = userList.length
  });

  socket.on('msg', ({user, msg}) => {
    updateChat(user, msg)
    if (typeof _input !== 'undefined') {
      showComms()
    } else {
      comms.dataset.new = true
    }
  });

  socket.on('sol', (solCount) => {
    phase = (solCount % solDuration) / solDuration
    updateSol(solCount)
  });

  socket.on('world', (tiles) => {
    console.log('world', tiles);
    Object.entries(tiles).forEach(([id, tile]) => {
      updateTile(tile)
    })
    document.body.classList.remove('hidden')
  })

  socket.on('tile', updateTile)

  socket.on('build', updateTile)
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