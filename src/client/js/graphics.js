import { planetSize, updatePlanetSize } from "./draw-planet"

export let context, gradient
export const initContext = () => {
  context = canvas.getContext('2d')
  canvas.width = innerWidth
  canvas.height = innerHeight
  mobile = window.matchMedia('(max-width: 810px)').matches

  updatePlanetSize()

  window.addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight
    mobile = window.matchMedia('(max-width: 810px)').matches
    updatePlanetSize()
  })

  const zero = { x: innerWidth / 2, y: innerHeight / 2}
  const gradientRadius = planetSize * 2

  // gradient = context.createLinearGradient(
  //   zero.x + planetSize * Math.sin(tilt), // x0
  //   zero.y - planetSize * Math.cos(tilt), // y0
  //   zero.x - planetSize * Math.sin(tilt), // x1
  //   zero.y + planetSize * Math.cos(tilt), // y1
  // )
  // console.log(
  //   zero.x, // x0
  //   zero.y - planetSize, // y0
  //   zero.x, // x1
  //   zero.y  + planetSize, // y1
  // );

  const iceSize = 0.14
  const fade = 0.03
  // gradient.addColorStop(iceSize, 'white')
  // gradient.addColorStop(iceSize + fade, RED)
  // gradient.addColorStop(1 - iceSize - fade, RED)
  // gradient.addColorStop(1 - iceSize, 'white')

  gradient = context.createRadialGradient(
    zero.x + gradientRadius * Math.sin(tilt), // x0
    zero.y - gradientRadius * Math.cos(tilt), // y0
    0,
    zero.x - gradientRadius * Math.sin(tilt), // x1
    zero.y + gradientRadius * Math.cos(tilt), // y1
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

