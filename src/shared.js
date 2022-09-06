buildings = {
  greenhouse: {
    label: 'Greenhouse',
    icon: '🌳',
    out: ['oxygen', '🫁'],
    cost: [5, 'water'],
    days: 2,
  },
  minery: {
    label: 'Refinery',
    icon: '🏭',
    out: ['minerals', '🪨'],
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
    out: ['energy', '🔋🔋🔋'],
    days: 8
  },
  house: {
    label: 'Housing',
    icon: '🏢',
    out: ['waste', '💩'],
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
  // hydrogen: {
  //   label: 'Hydrogen Refinery',
  //   icon: '⛲️',
  //   out: ['water', '🔘'],
  //   polar: true,
  // }
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
    out: [],
    cost: [1, 'minerals'],
    days: 0.1,
  }
}

stats = {
	population: 0,
  workforce: 0,
  consumption: 0,
  heating: 0,
	minerals: 5,
	oxygen: 5,
  energy: 5,
	heat: 5,
	water: 5,
}

solDuration = 60 * 1000 // 60 seconds
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