import { userList, commsList } from './game'
import { buildAction } from './io'

const buildingEmoji = {
  greenhouse: {
    label: 'Greenhouse',
    icon: '🍀',
    out: 'oxygen 🫁',
  },
  minery: {
    label: 'Minery',
    icon: '🏭',
    out: 'minerals 🪨'
  },
  solar: {
    label: 'Solar Plant',
    icon: '🔲',
    out: 'energy 🔋'
  },
  nuclear: {
    label: 'Nuclear Plant',
    icon: '⚛️',
    out: 'energy 🔋',
  },
  housing: {
    label: 'Housing',
    icon: '🏢',
    out: 'waste 💩'
  },
}

export const updateTile = ({id, build, stock}) => {
  if (!tiles[id]) return
  if (build != tiles[id].build) {
    const $icon = document.createElement('span')
    $icon.style.animationDelay = -700 * Math.random() + 'ms'
    tiles[id].$tile.appendChild($icon)
    $icon.innerText = buildingEmoji[build].icon
    tiles[id].build = build
  }
  if (stock > tiles[id].stock) {
    tiles[id].$tile.classList.add('new')
  } else {
    tiles[id].$tile.classList.remove('new')
  }
  tiles[id].stock = stock
  _dialog.classList.remove('show')
  $selectedTile?.classList.remove('selected')
  $selectedTile = null
}

function onBuildChoice ({target}) {
  if (buildingEmoji[target.id]) {
    document.body.removeEventListener('click', onBuildChoice)
    buildAction($selectedTile.dataset.n, target.id)
  }
}

export const dismissDialog = () => {
  document.body.removeEventListener('click', onBuildChoice)
  _dialog.classList.remove('show')
  $selectedTile?.classList.remove('selected')
  $selectedTile = null
  _choices.innerHTML = ''
}

export const showTileDialog = (target) => {
  if ($selectedTile) dismissDialog()

  $selectedTile = target
  const tile = tiles[target.dataset.n]

  if (tile.build) {
    // RESOURCE DIALOG

    _prompt.innerHTML = `<b>${tile.id}</b><br>${buildingEmoji[tile.build].label}`
    const resource = buildingEmoji[tile.build].out
    _choices.innerHTML = `<p>Stock: ${tile.stock} ${resource}</p><ul>${[
      [`Collect 1`, 'getone'],
      [`Collect all`, 'getall'],
    ].map(([label, id]) => `<li class="button" id="${id}">${label}</li>`).join('')}</ul>`

  } else {
    // BUILD DIALOG

    _prompt.innerHTML = `<b>${tile.id}</b><br>Choose build`
    _choices.innerHTML = `<ul>${
      Object.entries(buildingEmoji).map(type => {
      return `<li class="button" id="${type[0]}">${type[1].label}</li>`
    }).join('')
    }</ul>`
    _dialog.addEventListener('click', onBuildChoice)
  }

  _dialog.classList.add('show')
  target.classList.add('selected')
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
  _dialog.classList.add('show')
  _input.focus()
  chatlist.scrollTo(0, chatlist.clientHeight)
}