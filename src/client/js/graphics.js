import { updatePlanetSize } from "./draw-planet"

export let context
export const initContext = () => {
  context = canvas.getContext('2d')
  canvas.width = innerWidth,
  canvas.height = innerHeight

  updatePlanetSize()

  window.addEventListener('resize', () => {
    updatePlanetSize()
  })
}

export const getCanvasCenter = () => {
  return {
    x: canvas.width / 2,
    y: canvas.height / 2,
  }
}

