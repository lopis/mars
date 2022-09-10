'use strict'

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
const users = []
/**
 * @type Tile[]
 */
let tiles
let events
let solCount,
	lastTime,
	timeStarted,
	gameRunning,
	eventCount,
	totalPopulation,
	deaths

const startTime = () => {
	solCount = 0,
	lastTime = Date.now(),
	timeStarted = 0,
	gameRunning = false,
	eventCount = 0,
	totalPopulation = 0,
	deaths = 0
}

const getSol = () => {
	if (!gameRunning) return solCount

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
	interval = solDuration

	constructor(row, col, id) {
		Object.assign(this, { row, col, id, stock: 0 })
	}

	broadcast() {
		broadcast('tile', this)
	}

	produce (build) {
		safeTimeout(() => {
			// Check if there are enough resources to operate
			const {out, use} = build
			if (!use || stats[use[0]] >= 1) {
				// The increment is defined by the number of emoji in the label.
				this.stock += 1
				if (use) {
					stats[use[0]] -= 1
					broadcastStats()
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
		if (cost > stats[material]) return

		// Update resource stats
		stats[material] -= cost
		broadcastStats()

		this.build = 'wip'
		this.willBe = buildID
		this.broadcast()
		getNeighbourTiles(this)
		.forEach(tile => {
			tile.free = true
			tile.broadcast()
		})
		safeTimeout(() => {
			this.build = buildID
			this.willBe = null
			if (build.cap) this.ppl = 0
			this.broadcast()
			if (build.use) {
				// Initiate deduction
				console.log('update use', build);
				stats[build.use[0] + '_use'] += 1 // Use is always 1
				console.log(stats);
			}
			if (build.out) {
				// Initiate production
				this.produce(build)
			}
		}, build.days * solDuration)
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

const safeTimeout = (fn, timeout) => {
	if (!gameRunning) {
		setTimeout(() => safeTimeout(fn, timeout), 1000)
		return
	}

	setTimeout(fn, timeout)
}

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
		if (!gameRunning) return

		events.forEach(
			/**
			 * @param {Event} event
			 */
			(event) => {
				const { alertTime, wait, old, fn } = event
				const solCount = getSol()
				if (!old && solCount > alertTime) {
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

// Refugee convoy event manager
const initConvoySchedule = () => {
	// Function that runs when the event happens
	const fn = count => () => {
		tiles[CAMP].ppl += count
		tiles[CAMP].broadcast()
		stats.population += count

		// TODO: add to workforce only after they move to houses?
		stats.workforce += Math.round(count * 0.4)
		totalPopulation += count
		eventCount++
		broadcastStats()
	}

	// First event happens on game start
	const solCount = getSol()
	Event.create('convoy1', 'ℹ️', solCount, 1)
	Event.create('convoy2', 'ℹ️', solCount + solDuration, 0, 9000, fn(9000))

	// Scheduler runs a loop on a variable timeout
	const scheduleNext = () => {
		// From 5 to 15 sols
		const nextConvoy = Math.round(Math.random() * 5 + 10)
		const count = Math.round(Math.random() * 5000 + 1000) * 10
		safeTimeout(() => {
			const solCount = getSol()
			Event.create('convoy1', 'ℹ️', solCount, 4)
			Event.create('convoy2', 'ℹ️', solCount + 4 * solDuration, 0, count, fn(count))

			safeTimeout(scheduleNext, 4 * solDuration)
		}, (nextConvoy - 4) * solDuration)
	}

	scheduleNext()
}

const initRiotSchedule = () => {
	safeTimeout(() => {
		Object.values(tiles)
			// Only houses and the camp have ppl
			.filter(tile => typeof tile.ppl !== 'undefined')
			.forEach(house => {
				const chanceOfRiot = (house.ppl / buildings[house.build].cap) - 0.99
				if (chanceOfRiot > Math.random()) {
					const casualities = Math.ceil(house.ppl * 0.01)
					Event.create(
						'riot',
						'⚠️',
						solCount,
						0,
						casualities,
						null,
						house.id
					)
					house.ppl -= casualities
					house.riot = true
					house.broadcast()
					stats.population -= casualities
					stats.workforce -= Math.round(casualities * 0.4)
					broadcastStats()
					deaths += casualities
				} else if(house.riot && chanceOfRiot <= 0) {
					house.riot = false
					house.broadcast()
				}
			})

		initRiotSchedule()
	}, 5000)
}

const getNeighbourTiles = (tile) => {
	return getNeighbours(tile.row, tile.col).map(([row, col]) => {
		return Object.values(tiles).find(t => t.row == row && t.col == col)
	}).filter(n => n)
}

const CHANCE_OF_NEW_STORM = 0.01
const initStormSchedule = () => {
	safeTimeout(() => {
		const r = Math.random()
		// Chance of new storm
		if (r < CHANCE_OF_NEW_STORM) {
			const idx = Math.floor(Object.values(tiles).length * r / CHANCE_OF_NEW_STORM)
			const tile = Object.values(tiles)[idx]
			tile.dust = true
			tile.broadcast()
			const neighbours = getNeighbourTiles(tile)
			neighbours.forEach(neighbour => {
				neighbour.dust = true
				neighbour.broadcast()
			})

			const stormDuration = Math.random() * 5
			Event.create('dust1', '⚠️', getSol(), stormDuration, 0, null, tile.id)
			Event.create('dust2', 'ℹ️', getSol() + solDuration, 0, stormDuration, () => {
				tile.dust = false
				tile.broadcast()
				neighbours.forEach(tile => {
					tile.dust = false
					tile.broadcast()
				})
			}, tile.id)
			tile.broadcast()
		}

		initStormSchedule()
	}, 1000)
}

class Event {

	constructor(name, type, alertTime, wait, count, fn, tileId) {
		Object.assign(this, { name, type, alertTime, wait, count, fn, tileId })
		this.sol = Math.ceil(alertTime / solDuration + wait)
	}

	broadcast() {
		broadcast('event', this)
	}
	static init() {
		console.log('🤖 Initializing events');
		events = []
		initScheduler()
		initConvoySchedule()
		initRiotSchedule()
		initStormSchedule()
	}

	/**
	 * 
	 * @param {string} name event name
	 * @param {string} type emoji representing it's type e.g. 'ℹ️'
	 * @param {number} alertTime solCount time (in milis)
	 * @param {number} wait how far in the future the event happens (in days)
	 * @param {number} count amount associated with event
	 * @param {number} fn Optional callback function when it triggers
	 */
	static create(name, type, alertTime, wait, count, fn, tileId) {
		events.push(new Event(...arguments))
	}
}


// Generate all tiles
// including tiles that don't exist, for simplicity;
// Creates 12 x 12 tiles
const MOUNT_COUNT = 6
const CENTER = 'G1'
const CAMP = 'G2'
const rows = 13
const generateTiles = () => {
	console.log('🤖 Generating tiles');
	tiles = {}
	let cols = Math.floor(rows / 2)
	for (let row = 0; row < rows; row++) {
		const colNum = (row === 0 || row === rows - 1 || cols === 13 - 1) ? cols - 2 : cols
		for (let col = 0; col < colNum; col++) {
			const id = `${String.fromCharCode(65 + row)}${col}`
			tiles[id] = new Tile(row, col, id)
		}
		if (row >= Math.floor(rows / 2)) {
			cols--
		} else {
			cols++
		}
	}

	// Set the location of the space center
	tiles[CENTER].build = 'center'
	// Set the location of the refugee camp
	tiles[CAMP].build = 'camp'
	tiles[CAMP].ppl = 0
	getNeighbourTiles(tiles[CENTER])
	.concat(getNeighbourTiles(tiles[CAMP]))
	.forEach(tile => tile.free = true)

	// Place mountains in random locations
	let mountTiles = []
	while (mountTiles.length < MOUNT_COUNT) {
		const index = Math.floor(Math.random() * (Object.values(tiles).length - 1))
		const tile = Object.values(tiles)[index]
		if (!mountTiles.includes(tile.id)) {
			tile.build = 'mount'
			getNeighbourTiles(tile).forEach(tile => {
				tile.mine = true
			})
			mountTiles.push(tile.id)
		}
	}
	console.log('🤖 Generated mines');
}

const broadcast = (event, data) => {
	users.forEach(user => {
		user.socket.emit(event, data)
	})
}

const broadcastStats = () => {
	users.forEach(user => {
		user.socket.emit('sol', {
			sol: getSol(),
			start: timeStarted,
			events: eventCount,
			deaths: deaths,
			saved: totalPopulation,
		})
	})
	broadcast('stats', stats)
}

generateTiles()
startTime()
Event.init()

/**
 * Socket.IO on connect event
 * @param {Socket} socket
 */
module.exports = {

	io: (socket) => {
		if (!timeStarted) {
			timeStarted = Date.now()
		}

		gameRunning = true
		const user = new User(socket)
		if (users.length === 0) {
			lastTime = Date.now()
		}
		users.push(user)

		socket.on('disconnect', () => {
			console.info('Disconnected: ' + user.name)
			removeElement(users, user)
			if (users.length === 0) {
				gameRunning = false
				solCount += Date.now() - lastTime
				lastTime = Date.now()
			}
		})

		socket.on('msg', (msg) => {
			const safeString = msg.replace(/[&/\\#,+()$~%.^'":*<>{}]/g, " ").substr(0, 22)
			console.info(`# ${user.name}: ${safeString}`)
			broadcast('msg', { user: user.name, msg: safeString })
		})

		socket.on('build', ({ id, choice }) => {
			if (tiles[id] && !tiles[id].build && buildings[choice]) {
				tiles[id].setBuild(choice, buildings[choice])
			} else {
				user.socket.emit('build-fail')
			}
		})

		socket.on('collect', ({ id, count }) => {
			if (tiles[id] && tiles[id].stock > 0) {
				const name = buildings[tiles[id].build].out[0]
				const delta = count || tiles[id].stock
				stats[name] += delta
				tiles[id].stock -= delta
				tiles[id].broadcast()
				broadcastStats()
			} else {
				user.socket.emit('collect-fail')
			}
		})

  	// socket.emit('move', { id: $selectedTile.dataset.n, action, count })
		socket.on('move', ({id, action, count}) => {
			if (count < 100 || count > 1e5 || tiles[id].build != 'house') return

			const n = Math.min(count, action == 'movein' ? tiles[CAMP].ppl : tiles[id].ppl)
			tiles[id].ppl += n * (action == 'movein' ? +1 : -1)
			tiles[CAMP].ppl += n * (action == 'movein' ? -1 : +1)
			tiles[id].broadcast()
			tiles[CAMP].broadcast()
		})

		console.info('Connected: ' + socket.id)
		users.forEach(user => {
			user.socket.emit('users', {
				id: user.id,
				users: users.map(u => ({ id: u.id, name: u.name }))
			})
		})

		broadcastStats()
		user.socket.emit('world', { tiles, stats })
		user.socket.emit('events', events.filter(e => e.old))
	},

	stat: (req, res) => {
		storage.get('games', 0).then(games => {
			res.send(
				[
					`${users.length} Player(s): ${users.map(user => user.name).join(', ')}`,
					`Sol: ${Math.ceil(getSol() / (solDuration))} (${getSol()} ms)`,
					`stats: ${JSON.stringify(stats)}`,
					`events: ${JSON.stringify(events, null, ' ')}`,
					`camp: ${JSON.stringify(tiles[CAMP])}`,
				].join('<br>')
			)
		})
	},

	reset: (req, res) => {
		const html = `<form method="POST"><input name="pwd" type=text/><button type="submit">Reset Game</button>`
		if (req.method === 'POST') {
			const correct = hashCode(req.body.pwd) === hash
			broadcast('restart')
			res.send(correct + html)
			generateTiles()
			startTime()
			Event.init()
		} else {
			res.send(html)
		}
	}
}

console.log('🤖 Ready');