import { updatePlanetSize } from "./draw-planet"

export let context
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
}

export const getCanvasCenter = () => {
  return {
    x: canvas.width / 2,
    y: canvas.height / 2,
  }
}

