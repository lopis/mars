import { phase } from './draw-planet'

const tiles = []
const rows = 13

setInterval(() => {
  console.log('phase', parseInt(phase * 100) / 100);
}, 500)

export const updateTiles = () => {
  tiles.forEach((tile) => {
    if (phase * 2 > 1 - ((tile.col + 3) / rows)) {
      tile.$tile.classList.add('night')
    }
    if ((phase - 0.5) * 2 >= 1 - ((tile.col + 2) / rows)) {
      tile.$tile.classList.remove('night')
    }
  })
}

export const renderTiles = () => {
  document.body.addEventListener('click', ({target}) => {
    console.log(target.dataset.n)
  })

  let cols = Math.floor(rows / 2)
  for(let row=0; row < rows; row++) {
    const $group = document.createElement('div')
    $group.className = 'row'
    $group.dataset.n = String.fromCharCode(65 + row)
    const colNum = (row === 0 || row === rows -1 || cols === 13 - 1) ? cols - 2 : cols
    for(let col=0; col < colNum; col++) {
      const $tile = document.createElement('div')
      $tile.className = 'hex'
      const id = `${String.fromCharCode(65 + row)}${col}`
      $tile.dataset.n = id
      $group.appendChild($tile)
      tiles.push({
        $tile,
        id,
        col: col + Math.random(),
      })
    }
    tileset.appendChild($group)
    if (row >= Math.floor(rows / 2)) {
      cols--
    } else {
      cols++
    }
  }
}