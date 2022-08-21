let selectedTile

const buildingEmoji = {
  greenhouse: '🍀',
  minery: '🏭',
  solar: '🪟',
  nuclear: '☢️',
  housing: '🏢',
}

function choiceListener ({target: choice}) {
  console.log(choice.id);
  if (choice.id === 'close') {
    document.body.removeEventListener('click', choiceListener)
    dialog.classList.remove('show')
    selectedTile.classList.remove('selected')
    selectedTile = null
  }
  if (buildingEmoji[choice.id]) {
    document.body.removeEventListener('click', choiceListener)
    selectedTile.dataset.icon = buildingEmoji[choice.id]
    dialog.classList.remove('show')
    selectedTile.classList.remove('selected')
    selectedTile = null
  }
}

export default () => {
  document.addEventListener('click', ({target: tile}) => {
    if(!selectedTile && tile?.dataset?.n) {
      dialog.classList.add('show')
      selectedTile = tile
      tile.classList.add('selected')
      dialog.addEventListener('click', choiceListener)
    }
  })
}