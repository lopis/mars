import {} from './graphics'
import {
  renderPlanet,
  tick,
} from './draw-planet'


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

  const time = Date.now()
  requestAnimationFrame(() => update(Date.now - time))
}

export const initLoop = () => {
  setInterval(e=>{
    canvas.width=innerWidth, canvas.height=innerHeight
    render()
  },16) // 60FPS

  requestAnimationFrame(() => {
    update(0)
  })
}