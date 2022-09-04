import { haow, playSound, woah } from './audio'
import { userList, commsList } from './game'
import { buildAction } from './io'

let dismissOnArrival
let isZoomed
export const updateTile = ({id, build, stock}) => {
  if (!tiles[id]) return

  if (build === 'road') {
    tiles[id].$tile.innerHTML = ''
    tiles[id].$tile.classList.add('road')
  } else if (build && build != tiles[id].build) {
    const $icon = document.createElement('span')
    $icon.style.animationDelay = -700 * Math.random() + 'ms'
    // $icon.classList.add(build)
    $icon.classList.add(build)
    if (['center', 'camp', 'mount'].includes(build)) {
      $icon.classList.add('still')
    }
    if (build === 'mount') {
      tiles[id].$tile.classList.add('deco')
    }
    if (build === 'wip') {
      $icon.style.animationDuration = 200
    }
    tiles[id].$tile.replaceChildren($icon)
    $icon.innerText = buildings[build].icon
    tiles[id].build = build
  }
  if (stock && stock > tiles[id].stock) {
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
  playSound(woah)
}

export const renderDialog = (tile, prompt, choicesHTML) => {
  _prompt.innerHTML = (tile ? `<b>Sector ${tile.id}</b><br>` : '') + prompt
  _choices.innerHTML = choicesHTML
  playSound(haow)
  _dialog.classList.add('show')
}

export const showTileDialog = (target) => {
  clearSelectedTile()

  $selectedTile = target
  const tile = tiles[target.dataset.n]
  
  if (tile.build) {
    const building = buildings[tile.build]
    if (building.out) {
      // RESOURCE DIALOG
      const resource = building.out.join(' ')
      renderDialog(
        tile,
        building.label,
        `<p>Stock: ${tile.stock} ${resource}</p><ul>${[
          [`Collect 1`, 'getone'],
          [`Collect all`, 'getall'],
        ].map(([label, id]) => `<li class="button" id="${id}">${label}</li>`).join('')}</ul>`
      )
    } else {
      // STATS DIALOG
      renderDialog(
        tile,
        building.label,
        `<p>${
          building.count
          ? `${tile.stock} ${building.count.join(' ')}`
          : `Waiting for new convoy arrival`
        }</p>`
      )
    }

  } else {
    // BUILD DIALOG
    const renderChoice = ([id, {out, label, icon, cost, days}]) => {
      const details = [
        out.length
          ? `outputs ${out.join(' ')} per sol`
          : 'connects sectors',
        `costs ${cost[0]} ${cost[1]}`,
        `builds in ${days} sols`
      ].join('<br>')
      return `<li i="${icon}" class="button" id="${id}">${label}<br><small>${details}</small></li>`
    }
    renderDialog(
      tile,
      'Choose build',
      `<ul>${
        Object.entries(buildings).filter(
          type => type[1].out && (tile.id[0] == 'A' ? type[1].polar : !type[1].polar)
        ).map(renderChoice).join('')
      }</ul>`
    )
    _dialog.addEventListener('click', onBuildChoice)
  }

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
  renderDialog(
    null,
    'Player List',
    userList.map(user => {
      return `<li>${user}</li>`
    }).join('')
  )
}

export const showComms = () => {
  const chatList = commsList.length > 0 ? commsList.map(({user, msg}) => {
    return `<li><b>${user}:</b> ${msg}</li>`
  }).join('') : '<b>No messages</b>'
  renderDialog(
    null,
    'Comms Panel',
    `<ul id="chatlist" />${chatList}</ul><input maxlength="22" id="_input" />`
  )
  _input.focus()
  chatlist.scrollTo(0, chatlist.clientHeight)
}

export const showSolStats = () => {
  _choices.innerHTML = ''
  const ul = _choices.appendChild(document.createElement('ul'))
  _dialog.classList.add('show')
}