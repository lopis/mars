buildings = {
  greenhouse: {
    label: 'Greenhouse',
    icon: '🌳',
    out: ['oxygen', '🫁'],
  },
  minery: {
    label: 'Refinery',
    icon: '🏭',
    out: ['minerals', '🪨']
  },
  solar: {
    label: 'Solar Plant',
    icon: '🔲',
    out: ['energy', '🔋'],
  },
  nuclear: {
    label: 'Nuclear Plant',
    icon: '⚛️',
    out: ['energy', '🔋'],
  },
  housing: {
    label: 'Housing',
    icon: '🏢',
    out: ['waste', '💩'],
  },
  water: {
    label: 'Water Plant',
    icon: '⛲️',
    out: ['water', '💧'],
    polar: true,
  },
  // hydrogen: {
  //   label: 'Hydrogen Refinery',
  //   icon: '⛲️',
  //   out: ['water', '🔘'],
  //   polar: true,
  // }
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