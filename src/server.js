"use strict"

/**
 * User sessions
 * @param {Array} users
 */
const users = []
const tiles = []

/**
 * Remove user session
 * @param {User} user
 */
function removeUser(user) {
	users.splice(users.indexOf(user), 1)
}

/**
 * Game class
 */
class Game {

	/**
	 */
	constructor() {
	}

}

/**
 * User session class
 */
class User {

	/**
	 * @param {Socket} socket
	 */
	constructor(socket) {
		this.socket = socket
		this.game = null
	}

}

/**
 * Socket.IO on connect event
 * @param {Socket} socket
 */
module.exports = {

	io: (socket) => {
		const user = new User(socket)
		users.push(user)

		socket.on("disconnect", () => {
			console.log("Disconnected: " + socket.id)
			removeUser(user)
		})

		console.log("Connected: " + socket.id)
		users.forEach(user => {
			user.socket.emit('users', users.length)
		})
	},

	stat: (req, res) => {
		storage.get('games', 0).then(games => {
			res.send(`WIP`)
		})
	}

}
