'use strict'

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
	constructor(socket, name) {
		this.socket = socket
		this.name = name
	}

}

const names = [
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
	'Sunday',
]

/**
 * Socket.IO on connect event
 * @param {Socket} socket
 */
module.exports = {

	io: (socket) => {
		const user = new User(socket, names.pop())
		users.push(user)

		socket.on('disconnect', () => {
			console.log('Disconnected: ' + socket.id)
			names.unshift(user.name)
			removeUser(user)
		})

		socket.on('msg', (msg) => {
			const safeString = msg.replace(/[&/\\#,+()$~%.^'":*<>{}]/g, " ").substr(0, 22)
			console.log(`# ${user.name}: ${safeString}`)
			users.forEach(user => {
				user.socket.emit('msg', {user: user.name, msg: safeString})
			})
		})

		console.log('Connected: ' + socket.id)
		users.forEach(user => {
			user.socket.emit('users', users.map(user => user.name))
		})
	},

	stat: (req, res) => {
		storage.get('games', 0).then(games => {
			res.send(`${users.length} Player(s): ${users.map(user => user.name).join(',')}`)
		})
	}
}
