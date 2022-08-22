import { userList, commsList } from './game'

let selectedTile

const buildingEmoji = [
  ['greenhouse', 'Greenhouse', '🍀'],
  ['minery', 'Minery', '🏭'],
  ['solar', 'Solar Plant', '🪟'],
  ['nuclear', 'Nuclear Plant', '☢️'],
  ['housing', 'Housing', '🏢'],
]

function choiceListener ({target}) {
  let choice
  if (choice = buildingEmoji.find(c => c[0] === target.id)) {
    document.body.removeEventListener('click', choiceListener)
    selectedTile.dataset.icon = choice[2]
    _dialog.classList.remove('show')
    selectedTile.classList.remove('selected')
    selectedTile = null
  }
}

export const dismissDialog = () => {
  document.body.removeEventListener('click', choiceListener)
  _dialog.classList.remove('show')
  selectedTile?.classList.remove('selected')
  selectedTile = null
  _choices.innerHTML = ''
}

export const showBuildDialog = (target) => {
  if (selectedTile) dismissDialog()

  _prompt.innerText = 'Choose build'
  _choices.innerHTML = `<ul>${
    buildingEmoji.map(type => {
    return `<li class="button" id="${type[0]}">${type[1]}</li>`
  }).join('')
  }</ul>`
  _dialog.classList.add('show')
  selectedTile = target
  target.classList.add('selected')
  _dialog.addEventListener('click', choiceListener)
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
  ul.innerHTML = commsList.map(({user, msg}) => {
    return `<li><b>${user}:</b> ${msg}</li>`
  }).join('')
  _choices.innerHTML += `<input maxlength="22" id="_input" />`
  _dialog.classList.add('show')
  _input.focus()
  chatlist.scrollTo(0, chatlist.clientHeight)
}