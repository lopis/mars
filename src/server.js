'use strict'

/**
 * User sessions
 * @param {Array} users
 */
const users = []
const tiles = {}
const events = []
let solCount = 0
let lastTime = Date.now()

const getSol = () => {
	solCount += Date.now() - lastTime
	lastTime = Date.now()

	return solCount
}

/**
 * Remove element from array
 * @param {Array} array
 * @param {any} element
 */
function removeElement(array, element) {
	array.splice(array.indexOf(element), 1)
}

class Tile {
	interval = 5000 //5 * solDuration

	constructor(row, col, id) {
		Object.assign(this, {row, col, id, stock: 0})
	}

	broadcast() {
		broadcast('tile', this)
	}

	setBuild(buildID, build) {
		this.build = 'wip'
		// this.willBe = buildID
		this.broadcast()
		// this.ready = false
		setTimeout(() => {
			this.build = buildID
			this.broadcast()
			// this.willBe = null
			// this.ready = true
			this.broadcast()
		}, build.days * solDuration)

		// Initiate production
		if (build.out) {
			setInterval(() => {
				if (!this.ready) return
				this.stock++
				this.broadcast()
			}, this.interval)
		}
	}
}

/**
 * Game class
 */
// class Game {

// 	/**
// 	 */
// 	constructor() {
// 	}
// }

/**
 * User session class
 */
class User {
	/**
	 * @param {Socket} socket
	 */
	constructor(socket) {
		const num = (from, to) => from + Math.round(Math.random() * (to - 1)),
		char = () => String.fromCharCode(num(65, 26)),
		a = char(), b = char(), c = num(1, 10)

		this.socket = socket
		this.name = `${a}${b}${c}`
		this.id = socket.id.substr(0, 6)
	}
}

const initScheduler = () => {
	setInterval(() => {
		events.forEach(
			/**
			 * @param {Event} event
			 */
			(event) => {
				const {alertTime, wait, old, fn} = event
				const solCount = getSol()
				if (!old && solCount > alertTime) {
					console.log(event, 'sol:', solCount);
					event.broadcast()
					event.old = true
					if (fn) fn()
				}
				if (solCount > alertTime + wait * solDuration) {
					removeElement(events, event)
				}
			}
		)
	}, 1000)
}

const initConvoySchedule = () => {
	const fn = count => () => {
		tiles[CAMP].stock = count
		tiles[CAMP].broadcast()
	}

	const solCount = getSol()
	events.push(new Event('convoy1', 'ℹ️', solCount, 1))
	events.push(new Event('convoy2', 'ℹ️', solCount + solDuration*0.1, 0, 9000, fn(9000)))

	const scheduleNext = () => {
		// From 5 to 10 sols
		const nextConvoy = 5 //Math.round(Math.random() * 5 + 5)
		const count = Math.round(Math.random() * 5000 + 1000) * 10
		setTimeout(() => {
			const solCount = getSol()
			events.push(new Event('convoy1', 'ℹ️', solCount, 4))
			events.push(new Event('convoy2', 'ℹ️', solCount + 4*solDuration, 0, count, fn(count)))

			scheduleNext()
		}, (nextConvoy - 4) * solDuration)
	}

	scheduleNext()
}

class Event {
	constructor(name, type, alertTime, wait, count, fn) { 
		Object.assign(this, {name, type, alertTime, wait, count, fn})
		// { "name": "convoy1", "type": "ℹ️", "alertTime": 1, "wait": 1, "sol": 2 }
		this.sol = Math.ceil(alertTime / solDuration + wait)
	}

	broadcast() {
		broadcast('event', this)
	}

	static init() {
		initScheduler()
		initConvoySchedule()
	}
}


// Generate all tiles
// including tiles that don't exist, for simplicity;
// Creates 12 x 12 tiles
let mountCount = 0
const MOUNT_COUNT = 20
const CENTER = 'G1'
const CAMP = 'G2'
for (let row = 0; row < 13; row++) {
	for (let col = 0; col < 13; col++) {
		const id = `${String.fromCharCode(65 + row)}${col}`
		tiles[id] = new Tile(row, col, id)
		if (id === CENTER) {
			// Set the location of the space center
			tiles[id].build = 'center'
		} else if (id === CAMP) {
			// Set the location of the refugee camp
			tiles[id].build = 'camp'
		} else if (row > 1 & Math.random() < 0.1 && mountCount < MOUNT_COUNT) {
			// Place mountains in random locations
			tiles[id].build = 'mount'
			mountCount++
		}

	}	
}

const broadcast = (event, data) => {
	users.forEach(user => {
		user.socket.emit(event, data)
	})
}

Event.init()

/**
 * Socket.IO on connect event
 * @param {Socket} socket
 */
module.exports = {

	io: (socket) => {
		const user = new User(socket)
		if (users.length === 0) {
			lastTime = Date.now()
		}
		users.push(user)

		socket.on('disconnect', () => {
			console.info('Disconnected: ' + user.name)
			removeElement(users, user)
			if (users.length === 0) {
				solCount += Date.now() - lastTime
				lastTime = Date.now()
			}
		})

		socket.on('msg', (msg) => {
			const safeString = msg.replace(/[&/\\#,+()$~%.^'":*<>{}]/g, " ").substr(0, 22)
			console.info(`# ${user.name}: ${safeString}`)
			broadcast('msg', {user: user.name, msg: safeString})
		})

		socket.on('build', ({id, choice}) => {
			if (tiles[id] && !tiles[id].build && buildings[choice]) {
				tiles[id].setBuild(choice, buildings[choice])
			} else {
				user.socket.emit('build-fail')	
			}
		})

		socket.on('collect', ({id, count}) => {
			if (tiles[id] && tiles[id].stock > 0) {
				const name = buildings[tiles[id].build].out[0]
				const delta = count || tiles[id].stock
				stats[name] += delta
				tiles[id].stock -= delta
				tiles[id].broadcast()
				broadcast('stats', stats)
			} else {
				user.socket.emit('collect-fail')
			}
		})

		console.info('Connected: ' + socket.id)
		users.forEach(user => {
			user.socket.emit('users', {
				id: user.id,
				users: users.map(u => ({id: u.id, name: u.name}))
			})
		})

		user.socket.emit('sol', getSol())
		user.socket.emit('world', {tiles, stats})
		user.socket.emit('events', events.filter(e => e.old))
	},

	stat: (req, res) => {
		storage.get('games', 0).then(games => {
			res.send(
				`${users.length} Player(s): ${users.map(user => user.name).join(', ')}
				<br>
				Sol: ${Math.ceil(getSol()/(solDuration))} (${getSol()} ms)
				<br>
				stats: ${JSON.stringify(stats)}
				<br>
				events: ${JSON.stringify(events, null, ' ')}
				<br>
				camp: ${JSON.stringify(tiles[CAMP])}
				`
			)
		})
	}
}
