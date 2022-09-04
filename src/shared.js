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
    cost: [5, 'mineral'],
    days: 4,
  },
  nuclear: {
    label: 'Nuclear Plant',
    icon: '⚛️',
    cost: [20, 'water'],
    out: ['energy', '🔋🔋'],
    days: 8
  },
  housing: {
    label: 'Housing',
    icon: '🏢',
    out: ['waste', '💩'],
    cost: [5, 'water'],
    days: 1,
  },
  water: {
    label: 'Water Plant',
    icon: '⛲️',
    out: ['water', '💧'],
    cost: [5, 'mineral'],
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
    count: ['refugees', '👩‍👩‍👦‍👦']
  },
  road: {
    label: 'Path',
    icon: '✖️',
    out: [],
    cost: [1, 'mineral'],
    days: 0.1,
  }
}

stats = {
	population: 0,
  workforce: 0,
  consumption: 0,
  heating: 0,
	minerals: 0,
	oxygen: 0,
  energy: 0,
	heat: 0,
	water: 0,
}

solDuration = 60 * 1000 // 60 seconds
initialPhase = 0.0
