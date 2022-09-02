import { userList, commsList } from './game'
import { buildAction } from './io'

let dismissOnArrival
let isZoomed
export const updateTile = ({id, build, stock}) => {
  if (!tiles[id]) return
  if (build && build != tiles[id].build) {
    const $icon = document.createElement('span')
    $icon.style.animationDelay = -700 * Math.random() + 'ms'
    $icon.classList.add(build)
    if (build === 'wip') {
      $icon.style.animationDuration = 200
    }
    tiles[id].$tile.replaceChildren($icon)
    $icon.innerText = buildings[build].icon
    tiles[id].build = build
  }
  if (stock > tiles[id].stock) {
    tiles[id].$tile.classList.add('new')
  } else {
    tiles[id].$tile.classList.remove('new')
  }
  tiles[id].stock = stock
  if (dismissOnArrival) {
    dismissDialog()
    dismissOnArrival = false
  }
}

function onBuildChoice ({target}) {
  if (buildings[target.id]) {
    document.body.removeEventListener('click', onBuildChoice)
    buildAction($selectedTile.dataset.n, target.id)
    clearSelectedTile()
    dismissOnArrival = true
  }
}

export const clearSelectedTile = () => {
  $selectedTile?.classList.remove('selected')
  $selectedTile = null
}

export const dismissDialog = () => {
  document.body.removeEventListener('click', onBuildChoice)
  _dialog.classList.remove('show')
  _choices.innerHTML = ''
  updateMap([0,0], 1)
  isZoomed = false
}

export const showTileDialog = (target) => {
  clearSelectedTile()

  $selectedTile = target
  const tile = tiles[target.dataset.n]

  if (tile.build) {
    if (tile.out) {
      // RESOURCE DIALOG
      _prompt.innerHTML = `<b>Sector ${tile.id}</b><br>${buildings[tile.build].label}`
      const resource = buildings[tile.build].out.join(' ')
      _choices.innerHTML = `<p>Stock: ${tile.stock} ${resource}</p><ul>${[
        [`Collect 1`, 'getone'],
        [`Collect all`, 'getall'],
      ].map(([label, id]) => `<li class="button" id="${id}">${label}</li>`).join('')}</ul>`
    } else {
      // STATS DIALOG
      _prompt.innerHTML = `<b>Sector ${tile.id}</b><br>${buildings[tile.build].label}`
      if (buildings[tile.build].count) {
        const resource = buildings[tile.build].count.join(' ')
        _choices.innerHTML = `<p>${tile.stock} ${resource}</p>`
      } else {
        _choices.innerHTML = `<p>Waiting for new convoy arrival<p>`
      }
    }

  } else {
    // BUILD DIALOG

    _prompt.innerHTML = `<b>Sector ${tile.id}</b><br>Choose build`
    _choices.innerHTML = `<ul>${
      Object.entries(buildings).filter(
        type => type[1].out && (tile.id[0] == 'A' ? type[1].polar : !type[1].polar)
      ).map(type => {
        const output = type[1].out.length
          ? `output: ${type[1].out.join(' ')} per day`
          : 'Connects sectors'
        const label = `${type[1].label}<br><small>${output}</small>`
      return `<li i="${type[1].icon}" class="button" id="${type[0]}">${label}</li>`
    }).join('')
    }</ul>`
    _dialog.addEventListener('click', onBuildChoice)
  }

  _dialog.classList.add('show')
  target.classList.add('selected')
  moveMapTo(target)
}

export const updateMap = (translate, scale) => {
  if (mobile) {
    wrapper.style.transform = `translateY(-${ scale > 1 ? 20 : 10}vh) scale(${scale}) translate(${translate[0]}px, ${translate[1]}px)` 
  } else {
    wrapper.style.transform = `scale(${scale}) translate(${translate[0]}px, ${translate[1]}px)` 
  }
}

const moveMapTo = (target) => {
  if (!isZoomed) {
    isZoomed = true
    let {left, top} = target.getBoundingClientRect()
    if (mobile) {
      top += innerHeight * 0.1
    }
    updateMap([
      -(left - (innerWidth / 2)),
      -(top - (innerHeight / 2)),
    ], 3)
  }
}

export const showUsers = () => {
  _prompt.innerText = 'Player List'
  _choices.innerHTML = userList.map(user => {
    return `<li>${user}</li>`
  }).join('')
  _dialog.classList.add('show')
}

export const showComms = () => {
  _choices.innerHTML = ''
  const ul = _choices.appendChild(document.createElement('ul'))
  ul.id = 'chatlist'
  ul.innerHTML = commsList.length > 0 ? commsList.map(({user, msg}) => {
    return `<li><b>${user}:</b> ${msg}</li>`
  }).join('') : '<b>No messages</b>'
  _choices.innerHTML += `<input maxlength="22" id="_input" />`
  _prompt.innerHTML = 'Comms Panel'
  _dialog.classList.add('show')
  _input.focus()
  chatlist.scrollTo(0, chatlist.clientHeight)
}

export const showSolStats = () => {
  _choices.innerHTML = ''
  const ul = _choices.appendChild(document.createElement('ul'))
  _dialog.classList.add('show')
}