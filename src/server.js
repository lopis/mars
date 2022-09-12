'use strict'

const MOUNT_COUNT = 6
const CENTER = 'G1'
const CAMP = 'G2'
const ROWS = 13

/**
 * Returns a hash code from a string
 * @param  {String} str The string to hash.
 * @return {Number}    A 32bit integer
 * @see https://stackoverflow.com/questions/6122571/simple-non-secure-hash-function-for-javascript
 */
function hashCode(str) {
  return Array.from(str)
  .reduce((hash, char) => 0 | (31 * hash + char.charCodeAt(0)), 0);
}
const hash = -105377644

/**
 * User sessions
 * @param {Array} users
 */
const allUsers = []

/**
 * Remove element from array
 * @param {Array} array
 * @param {any} element
 */
function removeElement(array, element) {
	array.splice(array.indexOf(element), 1)
}

const getNeighbourTiles = (tile, tiles) => {
	return getNeighbours(tile.row, tile.col).map(([row, col]) => {
		return Object.values(tiles).find(t => t.row == row && t.col == col)
	}).filter(n => n)
}

class Tile {
	// Interval of production
	interval = SOL_DURATION
	#game

	constructor(game, row, col, id) {
		this.#game = game
		Object.assign(this, { row, col, id, stock: 0 })
	}

	broadcast() {
		this.#game.broadcast('tile', this)
	}

	produce (build) {
		this.#game.safeTimeout(() => {
			// Check if there are enough resources to operate
			const {out, use} = build
			if (!use || this.#game.stats[use[0]] >= 1) {
				// The increment is defined by the number of emoji in the label.
				const delta = out[2] > 10 ? Math.ceil(this.ppl / out[2]) : (out[2] || 1)
				this.stock += delta
				if (use) {
					this.#game.stats[use[0]] -= out[2] > 10 ? Math.ceil(this.ppl / out[2]) : 1
					this.#game.broadcastStats()
				}
				this.stop = false
			} else {
				this.stop = true
			}

			this.broadcast()
			this.produce(build)
		}, this.interval)
	}

	setBuild(buildID, build) {
		const [cost, material] = build.cost
		if (cost > this.#game.stats[material]) return

		// Update resource stats
		this.#game.stats[material] -= cost
		this.#game.broadcastStats()

		this.build = 'wip'
		this.willBe = buildID
		this.broadcast()
		getNeighbourTiles(this, this.#game.tiles)
		.forEach(tile => {
			tile.free = true
			tile.broadcast()
		})
		this.#game.safeTimeout(() => {
			this.build = buildID
			this.willBe = null
			if (build.cap) this.ppl = 0
			this.broadcast()
			if (build.use) {
				// Initiate deduction
				this.#game.stats[build.use[0] + '_use'] += 1 // Use is always 1
			}
			if (build.out) {
				// Initiate production
				this.produce(build)
			}
		}, build.days * SOL_DURATION)
	}
}

/**
 * Game class
 */
class Game {
	/**
	 * @type Tile[]
	 */
	tiles = []
	users = []
	events = []

	init = () => {
		this.solCount = 0,
		this.lastTime = Date.now(),
		this.timeStarted = 0,
		this.gameRunning = false,
		this.eventCount = 0,
		this.totalPopulation = 0,
		this.deaths = 0
		this.stats = {...stats}

		this.generateTiles()

		console.log('🤖 Initializing events');
		this.events = []
		this.initScheduler()
		this.initConvoySchedule()
		this.initRiotSchedule()
		this.initStormSchedule()
		// this.initAsteroidSchedule()
	}

	// Generate all tiles
	// including tiles that don't exist, for simplicity;
	// Creates 12 x 12 tiles
	generateTiles = () => {
		console.log('🤖 Generating tiles');
		this.tiles = {}
		let cols = Math.floor(ROWS / 2)
		for (let row = 0; row < ROWS; row++) {
			const colNum = (row === 0 || row === ROWS - 1 || cols === 13 - 1) ? cols - 2 : cols
			for (let col = 0; col < colNum; col++) {
				const id = `${String.fromCharCode(65 + row)}${col}`
				this.tiles[id] = new Tile(this, row, col, id)
			}
			if (row >= Math.floor(ROWS / 2)) {
				cols--
			} else {
				cols++
			}
		}

		// Set the location of the space center
		this.tiles[CENTER].build = 'center'
		// Set the location of the refugee camp
		this.tiles[CAMP].build = 'camp'
		// this.tiles['G3'].build = 'house' //TODO: remove this!
		// this.tiles['G3'].ppl = 0 //TODO: remove this!
		this.tiles[CAMP].ppl = 0
		getNeighbourTiles(this.tiles[CENTER], this.tiles)
		.concat(getNeighbourTiles(this.tiles[CAMP], this.tiles))
		.forEach(tile => tile.free = true)

		// Place mountains in random locations
		let mountTiles = []
		while (mountTiles.length < MOUNT_COUNT) {
			const index = Math.floor(Math.random() * (Object.values(this.tiles).length - 1))
			const tile = Object.values(this.tiles)[index]
			if (!tile.free && !tile.build && !mountTiles.includes(tile.id)) {
				tile.build = 'mount'
				getNeighbourTiles(tile, this.tiles).forEach(tile => {
					tile.mine = true
				})
				mountTiles.push(tile.id)
			}
		}
	}

	getSol = () => {
		if (!this.gameRunning) return this.solCount
	
		this.solCount += Date.now() - this.lastTime
		this.lastTime = Date.now()
	
		return this.solCount
	}

	// A function that sets a timout,
	// but pauses it if the game isn't running.
	safeTimeout = (fn, timeout) => {
		if (!this.gameRunning) {
			setTimeout(() => this.safeTimeout(fn, timeout), 1000)
			return
		}

		setTimeout(fn, timeout)
	}

	createEvent = (name, type, alertTime, wait, count, fn, tileId) => {
		this.events.push(new Event(name, type, alertTime, wait, count, fn, tileId))
	}

	broadcast = (event, data) => {
		this.users.forEach(user => {
			user.socket.emit(event, data)
		})
	}

	broadcastStats = () => {
		this.broadcast('sol', {
			sol: this.getSol(),
			start: this.timeStarted,
			events: this.eventCount,
			deaths: this.deaths,
			saved: this.totalPopulation,
		})
		this.broadcast('stats', this.stats)
	}

	broadcastUsers = () => {
		this.users.forEach(user => {
			this.broadcast('users', {
				id: user.id,
				users: this.users.map(u => ({ id: u.id, name: u.name }))
			})
		})
	}

	initScheduler = () => {
		setInterval(() => {
			if (!this.gameRunning) return
	
			this.events.forEach(
				/**
				 * @param {Event} event
				 */
				(event) => {
					const { alertTime, wait, old, fn } = event
					const solCount = this.getSol()
					if (!old && solCount > alertTime) {
						this.broadcast('event', event)
						event.old = true
						if (fn) fn()
					}
					if (solCount > alertTime + wait * SOL_DURATION) {
						removeElement(this.events, event)
					}
				}
			)
		}, 1000)
	}

	// Refugee convoy event manager
	initConvoySchedule = () => {
		// Function that runs when the event happens
		const fn = count => () => {
			this.tiles[CAMP].ppl += count
			this.tiles[CAMP].broadcast()
			this.stats.population += count

			// TODO: add to workforce only after they move to houses?
			this.stats.workforce += Math.round(count * 0.4)
			this.totalPopulation += count
			this.eventCount++
			this.broadcastStats()
		}

		// First event happens on game start
		const solCount = this.getSol()
		this.createEvent('convoy1', 'ℹ️', solCount, 1)
		// FIrst convoy always brings 9000 people
		this.createEvent('convoy2', 'ℹ️', solCount + SOL_DURATION, 0, 9000, fn(9000))
		this.convoyCount = 0

		// Scheduler runs a loop on a variable timeout
		const scheduleNext = () => {
			// Next from convoyCount to convoyCount + 10
			const nextConvoy = this.convoyCount + Math.random() * 10
			this.convoyCount ++ 
			console.log('next convoy: sol', nextConvoy);
			const count = Math.round(Math.random() * 5000 + 1000) * 10
			this.safeTimeout(() => {
				const solCount = this.getSol()
				this.createEvent('convoy1', 'ℹ️', solCount, 4)
				this.createEvent('convoy2', 'ℹ️', solCount + 4 * SOL_DURATION, 0, count, fn(count))

				this.safeTimeout(scheduleNext, 4 * SOL_DURATION)
			}, (nextConvoy - 4) * SOL_DURATION)
		}

		scheduleNext()
	}

	updateRiot = tile => {
		const chanceOfRiot = tile.ppl == 0 ? 0 : (tile.ppl / buildings[tile.build].cap) + (tile.stop ? -0.5 : -1)
		// console.log(tile.build, tile.ppl, buildings[tile.build].cap, tile.stop, chanceOfRiot);
		if (chanceOfRiot > Math.random()) {
			// Always 2% of people die in a riot
			const casualities = Math.ceil(tile.ppl * 0.02)
			this.createEvent(
				'riot',
				'⚠️',
				this.getSol(),
				0,
				casualities,
				null,
				tile.id
			)
			tile.ppl -= casualities
			tile.riot = true
			tile.broadcast()
			this.stats.population -= casualities
			this.stats.workforce -= Math.round(casualities * 0.4)
			this.broadcastStats()
			this.deaths += casualities
		} else if(tile.riot && chanceOfRiot <= 0) {
			tile.riot = false
			tile.broadcast()
		}
	}

	initRiotSchedule = () => {
		this.safeTimeout(() => {
			Object.values(this.tiles)
				// Only houses and the camp have ppl
				.filter(tile => typeof tile.ppl !== 'undefined')
				.forEach(this.updateRiot)
	
			this.initRiotSchedule()
		}, 10000)
	}

	initStormSchedule = () => {
		const CHANCE_OF_NEW_STORM = 0.01
		this.safeTimeout(() => {
			const r = Math.random()
			// Chance of new storm
			if (r < CHANCE_OF_NEW_STORM) {
				const idx = Math.floor(Object.values(this.tiles).length * r / CHANCE_OF_NEW_STORM)
				const tile = Object.values(this.tiles)[idx]
				tile.dust = true
				tile.broadcast()
				const neighbours = getNeighbourTiles(tile, this.tiles)
				neighbours.forEach(neighbour => {
					neighbour.dust = true
					neighbour.broadcast()
				})

				const stormDuration = Math.random() * 5
				this.createEvent('dust1', '⚠️', this.getSol(), stormDuration, 0, null, tile.id)
				this.createEvent('dust2', 'ℹ️', this.getSol() + SOL_DURATION, 0, stormDuration, () => {
					tile.dust = false
					tile.broadcast()
					neighbours.forEach(tile => {
						tile.dust = false
						tile.broadcast()
					})
				}, tile.id)
				tile.broadcast()
			}

			this.initStormSchedule()
		}, 1000)
	}

	// initAsteroidSchedule = () => {
	// 	const CHANCE_OF_ASTEROID = 0.001
	// 	this.safeTimeout(() => {
	// 		const r = Math.random()
	// 		if (r < CHANCE_OF_ASTEROID) {
	// 			const idx = Math.floor(Object.values(this.tiles).length * r / CHANCE_OF_ASTEROID)
	// 			const tile = Object.values(this.tiles)[idx]
	// 			tile.hit = false
	// 			tile.broadcast()

	// 			// 6000 is the time the animation takes
	// 			this.createEvent('hit', '⚠️', this.getSol() + 6000, 0, stormDuration, () => {
	// 				tile.dust = false
	// 				tile.broadcast()
	// 				neighbours.forEach(tile => {
	// 					tile.dust = false
	// 					tile.broadcast()
	// 				})
	// 			}, tile.id)
	// 			tile.broadcast()
	// 		}
	// 	}, 1000)
	// }

	collect = (id, user) => {
		if (this.tiles[id] && this.tiles[id].stock > 0) {
			const name = buildings[this.tiles[id].build].out[0]
			const delta = this.tiles[id].stock
			this.stats[name] += delta
			this.tiles[id].stock = 0
			this.tiles[id].broadcast()
			this.broadcastStats()
		} else {
			// TODO: this isn't being used
			user.socket.emit('collect-fail')
		}
	}

	build = (id, build, user) => {
		if (this.tiles[id] && !this.tiles[id].build && buildings[build]) {
			this.tiles[id].setBuild(build, buildings[build])
		} else {
			// TODO: this isn't being used
			user.socket.emit('build-fail')
		}
	}

	move = (id, action, count) => {
		if (count < 100 || count > 1e5 || this.tiles[id].build != 'house') return

			const n = Math.min(count, action == 'movein' ? this.tiles[CAMP].ppl : this.tiles[id].ppl)
			this.tiles[id].ppl += n * (action == 'movein' ? +1 : -1)
			this.tiles[CAMP].ppl += n * (action == 'movein' ? -1 : +1)
			this.tiles[id].broadcast()
			this.tiles[CAMP].broadcast()
			this.updateRiot(this.tiles[id])
			this.updateRiot(this.tiles[CAMP])
	}

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
	constructor(socket, game) {
		// Generate random username
		const num = (from, to) => from + Math.round(Math.random() * (to - 1)),
			char = () => String.fromCharCode(num(65, 26)),
			a = char(), b = char(), c = num(1, 10)

		this.socket = socket
		this.name = `${a}${b}${c}`
		this.id = socket.id.substr(0, 6)
		this.game = game
	}

	join = mode => {
		if (mode === 'solo') {
			this.game = new Game()
			this.game.init()
		} else {
			this.game = globalGame
		}

		if (!this.game.timeStarted) {
			this.game.timeStarted = Date.now()
		}

		this.game.gameRunning = true
		if (this.game.users.length === 0) {
			this.game.lastTime = Date.now()
		}
		this.game.users.push(this)

		this.socket.on('msg', (msg) => {
			const safeString = msg.replace(/[&/\\#,+()$~%.^'":*<>{}]/g, " ").substr(0, 22)
			this.game.broadcast('msg', { user: this.name, msg: safeString })
		})

		this.socket.on('build', ({ id, choice }) => {
			this.game.build(id, choice, this)
		})

		this.socket.on('collect', (id) => {
			this.game.collect(id, this)
		})

		this.socket.on('move', ({id, action, count}) => {
			this.game.move(id, action, count)
		})

		this.game.broadcastUsers()
		this.game.broadcastStats()
		this.socket.emit('world', { tiles: this.game.tiles, stats: this.game.stats })
		this.socket.emit('events',  this.game.events.filter(e => e.old))
	}
}

class Event {
	constructor(name, type, alertTime, wait, count, fn, tileId) {
		Object.assign(this, { name, type, alertTime, wait, count, fn, tileId })
		this.sol = Math.ceil(alertTime / SOL_DURATION + wait)
	}
}

// Create global game
let globalGame = new Game()
globalGame.init()


/**
 * Socket.IO on connect event
 * @param {Socket} socket
 */
module.exports = {

	io: (socket) => {
		console.info('Connected: ' + socket.id)
		let user = new User(socket, globalGame)
		allUsers.push(user)

		socket.on('join', mode => {
			console.info('Player: ' + user.name + ' joined.', mode)
			user.join(mode)
		})

		socket.on('disconnect', () => {
			console.info('Disconnected: ' + user.name)
			// removeElement(allUsers, user)
			if (user.game.users.length === 0) {
				user.game.gameRunning = false
				user.game.solCount += Date.now() - user.game.lastTime
				user.game.lastTime = Date.now()
			}
			removeElement(allUsers, user)
			removeElement(user.game.users, user)
			user = null
		})
	},

	// stat: (req, res) => {
	// 	res.send(
	// 		[
	// 			`${allUsers.length} Player(s): ${allUsers.map(user => user.name).join(', ')}`,
	// 			`Sol: ${Math.ceil(getSol() / (SOL_DURATION))} (${getSol()} ms)`,
	// 			`stats: ${JSON.stringify(stats)}`,
	// 			`events: ${JSON.stringify(events, null, ' ')}`,
	// 			`camp: ${JSON.stringify(tiles[CAMP])}`,
	// 		].join('<br>')
	// 	)
	// },

	reset: (req, res) => {
		const html = `<form method="POST"><input name="pwd" type=text/><button type="submit">Reset Game</button>`
		if (req.method === 'POST') {
			const correct = hashCode(req.body.pwd) === hash
			allUsers.forEach(user => user.socket.emit('restart'))
			res.send(correct + html)
			globalGame = new Game()
			globalGame.init()
		} else {
			res.send(html)
		}
	}
}