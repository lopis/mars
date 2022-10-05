buildings = {
  greenhouse: {
    label: 'Greenhouse',
    icon: '🌳',
    out: ['food', '🥔🥔', 2],
    use: ['waste', '💩'],
    cost: [3, 'water'],
    days: 0.2,
  },
  minery: {
    label: 'Minery',
    icon: '🏭',
    out: ['minerals', '🌑'],
    use: ['energy', '🔋'],
    cost: [5, 'energy'],
    days: 0.3,
  },
  solar: {
    label: 'Solar Plant',
    icon: '🔲',
    out: ['energy', '🔋🔋'],
    cost: [5, 'minerals'],
    days: 0.2,
  },
  nuclear: {
    label: 'Nuclear Plant',
    icon: '⚛️',
    cost: [20, 'water'],
    out: ['energy', '🔋x4', 4],
    use: ['minerals', '🌑'],
    days: 0.8
  },
  house: {
    label: 'Housing',
    icon: '🏢',
    out: ['waste', '💩', 25000],
    use: ['food', '🥔', 25000],
    cost: [5, 'water'],
    days: 0.1,
    count: ['residents', '👩‍👩‍👦‍👦'],
    cap: 75000,
  },
  water: {
    label: 'Water Plant',
    icon: '⛲️',
    out: ['water', '💧'],
    cost: [2, 'minerals'],
    use: ['energy', '🔋'],
    polar: true,
    days: 0.3,
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
	minerals: 130,
	food: 130,
  energy: 130,
	heat: 130,
	water: 130,
  waste: 130,
	minerals_use: 0,
	food_use: 0,
  energy_use: 0,
	heat_use: 0,
	water_use: 0,
  waste_use: 0,
}

SOL_DURATION = 0.1 * 60 * 1000 // 60 seconds
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