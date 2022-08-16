export let context
export const initContext = () => {
  context = canvas.getContext('2d')

  canvas.height = canvasHeight
  canvas.width = canvasWidth

  window.addEventListener('resize', () => {
    canvas.height = canvas.clientHeight
    canvas.width = canvas.clientWidth
  })
}

export const getCanvasCenter = () => {
  return {
    x: canvas.width / 2,
    y: canvas.height / 2,
  }
}

