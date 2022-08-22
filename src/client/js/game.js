import {} from './graphics'
import {
  renderPlanet,
  tick,
} from './draw-planet'
import { updateTiles } from './draw-tiles'

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

export const updateUsers = (users) => {
  userList = users
}

export const updateChat = (user, msg) => {
  commsList.push({user, msg})
}

export const updateSol = (currentSol) => {
  if (currentSol) solCount = currentSol
  else solCount += solDuration
  _sol.dataset.count = Math.ceil(solCount / solDuration)
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