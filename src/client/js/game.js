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
let solCount = 0

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

export const updateSol = (currentSol) => {
  if (currentSol) solCount = currentSol
  else solCount += solDuration
  _sol.dataset.count = Math.ceil(solCount / solDuration)
}

export const updateStats = (newStats) => {
  stats = newStats
  Object.keys(newStats).forEach(key => {
    document.getElementById(key).dataset.count = newStats[key]
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