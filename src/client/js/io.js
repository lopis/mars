import { updateUsers, updateChat, updateSol } from './game'
import { showComms, setTile, bumpTile } from './ui';

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
    Object.entries(tiles).forEach(([id, {build}]) => {
      if (build) {
        setTile(null, id, build)
      }
    })
    document.body.classList.remove('hidden')
  })

  socket.on('bump', (id) => bumpTile(id))

  socket.on('build', ({user, id, building}) => setTile(user, id, building))
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