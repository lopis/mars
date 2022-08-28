'use strict'

/**
 * User sessions
 * @param {Array} users
 */
const users = []
const tiles = {}
let solCount = 0
let lastTime = Date.now()

const getSol = () => {
	solCount += Date.now() - lastTime
	lastTime = Date.now()

	return solCount
}

/**
 * Remove user session
 * @param {User} user
 */
function removeUser(user) {
	users.splice(users.indexOf(user), 1)
}

class Tile {
	constructor(row, col, id) {
		this.row = row
		this.col = col
		this.id = id
		this.stock = 0
	}

	broadcast() {
		broadcast('tile', this)
	}

	setBuild(build) {
		this.build = build
		setInterval(() => {
			this.stock++
			this.broadcast()
		}, 5 * 60 * 1000)
	}
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

for (let row = 0; row < 13; row++) {
	for (let col = 0; col < 13; col++) {
		const id = `${String.fromCharCode(65 + row)}${col}`
		tiles[id] = new Tile(row, col, id)
	}	
}

const broadcast = (event, data) => {
	users.forEach(user => {
		user.socket.emit(event, data)
	})
}

/**
 * Socket.IO on connect event
 * @param {Socket} socket
 */
module.exports = {

	io: (socket) => {
		const user = new User(socket, names.pop())
		if (users.length === 0) {
			lastTime = Date.now()
		}
		users.push(user)

		socket.on('disconnect', () => {
			console.info('Disconnected: ' + user.name)
			names.unshift(user.name)
			removeUser(user)
			if (users.length === 0) {
				solCount += Date.now() - lastTime
				lastTime = Date.now()
			}
		})

		socket.on('msg', (msg) => {
			const safeString = msg.replace(/[&/\\#,+()$~%.^'":*<>{}]/g, " ").substr(0, 22)
			console.info(`# ${user.name}: ${safeString}`)
			broadcast('msg', {user: user.name, msg: 'poop'})
		})

		socket.on('build', ({id, choice}) => {
			if (tiles[id] && !tiles[id].build) {
				tiles[id].setBuild(choice)
				broadcast('build', tiles[id])
			} else {
				user.socket.emit('build-fail')	
			}
		})

		socket.on('collect', ({id, count}) => {
			if (tiles[id] && tiles[id].stock > 0) {
				tiles[id].stock -= count || tiles[id].stock
				tiles[id].broadcast()
			} else {
				user.socket.emit('collect-fail')
			}
		})

		console.info('Connected: ' + socket.id)
		users.forEach(user => {
			user.socket.emit('users', users.map(user => user.name))
		})

		user.socket.emit('sol', getSol())
		user.socket.emit('world', tiles)
	},

	stat: (req, res) => {
		storage.get('games', 0).then(games => {
			res.send(
				`${users.length} Player(s): ${users.map(user => user.name).join(', ')}
				<br>
				Sol: ${getSol()}
				<br>
				${Object.keys(tiles)}`
			)
		})
	}
}
