import { updateUsers, updateChat, updateSol } from './game'
import { showComms } from './ui';

let socket //Socket.IO client

/**
   * Binds Socket.IO and button events
   */
function bind() {
  socket.on("start", () => {
  });

  socket.on("disconnect", () => {
  });

  socket.on("error", () => {
  });


  socket.on("users", (userList) => {
    updateUsers(userList)
    users.dataset.count = userList.length
  });

  socket.on("msg", ({user, msg}) => {
    updateChat(user, msg)
    if (typeof _input !== 'undefined') {
      showComms()
    } else {
      comms.dataset.new = true
    }
  });

  socket.on("sol", (solCount) => {
    console.log(solCount, (solCount % solDuration) / solDuration);
    phase = (solCount % solDuration) / solDuration
    updateSol(solCount)
  });
}

export const bindIo = () => {
  if (io) {
    socket = io?.({ upgrade: false, transports: ["websocket"] });
    bind();
  }
}

export const sendMessage = msg => {
  socket.emit('msg', msg)
}

export const buildAction = (id, choice) => {
  return new Promise((resolve, reject) => {
    socket.emit('build', { id, choice }, (response) => {
      if (response.status = 'ok') {
        resolve()
      } else {
        reject()
      }
    })
  })
}