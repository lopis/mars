buildings = {
  greenhouse: {
    label: 'Greenhouse',
    icon: '🌳',
    out: ['food', '🥔🥔', 2],
    use: ['waste', '💩'],
    cost: [5, 'water'],
    days: 2,
  },
  minery: {
    label: 'Minery',
    icon: '🏭',
    out: ['minerals', '🪨'],
    use: ['energy', '🔋'],
    cost: [5, 'energy'],
    days: 3,
  },
  solar: {
    label: 'Solar Plant',
    icon: '🔲',
    out: ['energy', '🔋'],
    cost: [5, 'minerals'],
    days: 4,
  },
  nuclear: {
    label: 'Nuclear Plant',
    icon: '⚛️',
    cost: [20, 'water'],
    out: ['energy', '🔋🔋🔋', 3],
    use: ['minerals', '🪨'],
    days: 8
  },
  house: {
    label: 'Housing',
    icon: '🏢',
    out: ['waste', '💩'],
    use: ['food', '🥔'],
    cost: [5, 'water'],
    days: 1,
    count: ['residents', '👩‍👩‍👦‍👦'],
    cap: 72000,
  },
  water: {
    label: 'Water Plant',
    icon: '⛲️',
    out: ['water', '💧'],
    cost: [5, 'minerals'],
    polar: true,
    days: 3,
  },
  wip: {
    icon: '🏗',
  },
  center: {
    label: 'Space Center',
    icon: '📡'
  },
  mount: {
    icon: '⛰⛰'
  },
  camp: {
    label: 'Earth Refugee Camp',
    icon: '⛺️',
    count: ['refugees', '👩‍👩‍👦‍👦'],
    cap: 25000,
  },
  road: {
    label: 'Path',
    icon: '✖️',
    cost: [1, 'minerals'],
    days: 0.1,
  }
}
// initial stats
stats = {
	population: 0,
  workforce: 0,
	minerals: 15,
	food: 15,
  energy: 15,
	heat: 15,
	water: 15,
  waste: 15,
	minerals_use: 0,
	food_use: 0,
  energy_use: 0,
	heat_use: 0,
	water_use: 0,
  waste_use: 0,
}

SOL_DURATION = 0.2 * 60 * 1000 // 60 seconds
initialPhase = 0.0

getNeighbours = function (row, col) {
  return [
    [row, col + 1],
    [row, col - 1],
    [row - 1, col],
    [row + 1, col],
    [row - 1, col + (row == 7 ? -1 : row >= 6 ? 1 : -1)],
    [row + 1, col + (row == 5 ? -1 : row > 6 ? -1 : 1)],
  ]
}