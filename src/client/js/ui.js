import { userList, commsList } from './game'
import { buildAction } from './io'

let selectedTile

const buildingEmoji = {
  greenhouse: {
    label: 'Greenhouse',
    icon: '🍀',
  },
  minery: {
    label: 'Minery',
    icon: '🏭',
  },
  solar: {
    label: 'Solar Plant',
    icon: '🪟',
  },
  nuclear: {
    label: 'Nuclear Plant',
    icon: '☢️',
  },
  housing: {
    label: 'Housing',
    icon: '🏢',
  },
}

export const setTile = (user, tileId, building) => {
  const $icon = document.createElement('span')
  $icon.innerText = buildingEmoji[building].icon
  tiles[tileId].$tile.appendChild($icon)
  _dialog.classList.remove('show')
  selectedTile?.classList.remove('selected')
  selectedTile = null
}

function onBuildChoice ({target}) {
  if (buildingEmoji[target.id]) {
    document.body.removeEventListener('click', onBuildChoice)
    buildAction(selectedTile.dataset.n, target.id)
  }
}

export const dismissDialog = () => {
  document.body.removeEventListener('click', onBuildChoice)
  _dialog.classList.remove('show')
  selectedTile?.classList.remove('selected')
  selectedTile = null
  _choices.innerHTML = ''
}

export const showBuildDialog = (target) => {
  if (selectedTile) dismissDialog()

  _prompt.innerText = 'Choose build'
  _choices.innerHTML = `<ul>${
    Object.entries(buildingEmoji).map(type => {
    return `<li class="button" id="${type[0]}">${type[1].label}</li>`
  }).join('')
  }</ul>`
  _dialog.classList.add('show')
  selectedTile = target
  target.classList.add('selected')
  _dialog.addEventListener('click', onBuildChoice)
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