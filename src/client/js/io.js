import { updateUsers, updateChat } from './game'
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