const rows = 13

const nightThreshold = -0.1
const dayThreshold = 0.1
export const updateTiles = () => {
  Object.values(tiles).forEach((tile) => {
    if (!tile.build || tile.build === 'mount') return

    if (phase * 2 - nightThreshold > 1 - ((tile.col))) {
      tile.$tile.classList.add('night')
    }
    if ((phase - 0.5) * 2 + dayThreshold >= 1 - ((tile.col))) {
      tile.$tile.classList.remove('night')
    }
  })
}

export const renderTiles = () => {
  let cols = Math.floor(rows / 2)
  for(let row=0; row < rows; row++) {
    const $group = document.createElement('div')
    $group.className = 'row'
    // $group.dataset.n = String.fromCharCode(65 + row)
    const colNum = (row === 0 || row === rows -1 || cols === 13 - 1) ? cols - 2 : cols
    for(let col=0; col < colNum; col++) {
      const $tile = document.createElement('div')
      $tile.className = 'hex'
      const id = `${String.fromCharCode(65 + row)}${col}`
      $tile.dataset.n = id
      $group.appendChild($tile)
      tiles[id] = {
        $tile,
        id,
        row,
        // A little math to adjust the day/night cycle of the tiles
        col: (col + 2/colNum) / colNum, // + Math.random() * 0.1,
        stock: 0,
      }
    }
    tileset.appendChild($group)
    if (row >= Math.floor(rows / 2)) {
      cols--
    } else {
      cols++
    }
  }
}