buildings = {
  greenhouse: {
    label: 'Greenhouse',
    icon: '🌳',
    out: ['oxygen', '🫁'],
    days: 2,
  },
  minery: {
    label: 'Refinery',
    icon: '🏭',
    out: ['minerals', '🪨'],
    days: 3,
  },
  solar: {
    label: 'Solar Plant',
    icon: '🔲',
    out: ['energy', '🔋'],
    days: 4,
  },
  nuclear: {
    label: 'Nuclear Plant',
    icon: '⚛️',
    out: ['energy', '🔋🔋'],
    days: 8
  },
  housing: {
    label: 'Housing',
    icon: '🏢',
    out: ['waste', '💩'],
    days: 1,
  },
  water: {
    label: 'Water Plant',
    icon: '⛲️',
    out: ['water', '💧'],
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
    icon: '⛰'
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
