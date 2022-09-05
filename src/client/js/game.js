import {} from './graphics'
import {
  renderPlanet,
  tick,
} from './draw-planet'
import { renderTiles, updateTiles } from './draw-tiles'
import { bindIo } from './io'
import { initAudio } from './audio'

export let userList = []
export let commsList = []
export let solCount = 0
export let data = {}

const render = () => {
  try {
    renderPlanet()
  } catch (error) {
    console.error(error)
    emit('halt')
  }
}

const update = (dt) => {
  tick(dt)
  updateTiles()

  const time = Date.now()
  requestAnimationFrame(() => update(Date.now() - time))
}

export const updateUsers = (userId, users) => {
  userList = users.map(({id, name}) => id === userId ? `${name} (you)` : name)
}

export const updateChat = (user, msg) => {
  commsList.push({user, msg})
}

export const updateSol = (gameData) => {
  if (gameData) {
    data = gameData
    solCount = data.sol
  }
  else solCount += solDuration
  _sol.dataset.count = Math.ceil(solCount / solDuration)
}

export const updateStats = (newStats) => {
  stats = newStats
  Object.entries(newStats).forEach(([key, value]) => {
    value = value > 1e4 ? Math.round(value / 1e4) + 'K' : value
    document.getElementById(key).dataset.count = value
  })
}

export const playOffline = () => {
  intro.classList.add('gone')
  bindIo()
  renderTiles()
}

export const playGlobal = () => {
  initAudio()
  intro.classList.add('gone')
  bindIo()
  renderTiles()
}

export const initLoop = () => {
  if (phase === null) null
  

  setInterval(e=>{
    render()
  }, 16) // 60FPS

  requestAnimationFrame(() => {
    update(0)
  })
}