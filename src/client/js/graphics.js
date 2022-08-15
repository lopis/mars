import {
  Text,
  init,
} from 'kontra';

export let context, status
export const initContext = () => {
  const opts = init(canvas);
  canvas = opts.canvas
  context = opts.context

  canvas.height = canvasHeight
  canvas.width = canvasWidth

  window.addEventListener('resize', () => {
    canvas.height = canvas.clientHeight
    canvas.width = canvas.clientWidth
  })

  status = Text({
    text: '60 FPS',
    font: '12px Arial',
    color: '#3c5f49',
    x: 10,
    y: 10,
    textAlign: 'left'
  });
}

let statusTimer = statusRefreshDelay
let fpsTimer = 0
export const renderStatus = () => {
  statusTimer--
  if (statusTimer <= 0) {
    statusTimer = statusRefreshDelay
    status.text = `${Math.round(1000 / (Date.now() - fpsTimer))} FPS`
  }
  fpsTimer = Date.now()
  status.render()
}

export const getCanvasCenter = () => {
  return {
    x: canvas.width / 2,
    y: canvas.height / 2,
  }
}

