import { RED, TILT } from "./data"
import { planetSize, updatePlanetSize } from "./draw-planet"


export let context, gradient
export const initContext = () => {
  context = canvas.getContext('2d')
  canvas.width = innerWidth
  canvas.height = innerHeight
  // mobile = window.matchMedia('(max-width: 810px)').matches

  updatePlanetSize()
  createGradient()

  window.addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight
    // mobile = window.matchMedia('(max-width: 810px)').matches
    updatePlanetSize()
    createGradient()
  })

}

const createGradient = () => {
  const zero = { x: canvas.width / 2, y: canvas.height / 2}
  const gradientRadius = planetSize * 2

  const iceSize = 0.14
  const fade = 0.03

  gradient = context.createRadialGradient(
    zero.x + gradientRadius * Math.sin(TILT), // x0
    zero.y - gradientRadius * Math.cos(TILT), // y0
    0,
    zero.x - gradientRadius * Math.sin(TILT), // x1
    zero.y + gradientRadius * Math.cos(TILT), // y1
    gradientRadius * 2,
  )

  // Add three color stops
  gradient.addColorStop(iceSize, 'white')
  gradient.addColorStop(iceSize + fade, RED)
  gradient.addColorStop(1 - iceSize - fade, RED)
  gradient.addColorStop(1 - iceSize, 'white')
}

export const getCanvasCenter = () => {
  return {
    x: canvas.width / 2,
    y: canvas.height / 2,
  }
}

export const toggleEffects = () => {
  document.body.classList.toggle('fast')
  _fast.classList.toggle('off')
}

export const toggleColorBlindness = () => {
  document.body.classList.toggle('a11y')
  _a11y.classList.toggle('off')
}