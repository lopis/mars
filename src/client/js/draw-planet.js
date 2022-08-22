import { updateSol } from './game'
import { context } from './graphics'

export let planetSize = planetScale * canvas.clientHeight

export const updatePlanetSize = () => {
  planetSize = planetScale * Math.min(canvas.width, canvas.height)
}

const drawCircle = (x, y, radius) => {
  context.beginPath()
  context.arc(x, y, radius, 0,Math.PI * 2, true)
}

const drawBase = (color) => {
  context.fillStyle = color
  drawCircle(
    canvas.width / 2,
    canvas.height / 2,
    planetSize
  )
  context.fill()
}

const drawRim = () => {
  context.strokeStyle = BLACK
  drawCircle(
    canvas.width / 2,
    canvas.height / 2,
    planetSize
  )
  context.stroke()
}

const halfCircle = (radius, start, end) => {
  context.beginPath()
  context.ellipse(
    canvas.width / 2, // x
    canvas.height / 2, // y
    planetSize, // radius x
    planetSize * radius, // radiux y
    Math.PI / 2 + tilt, // rotation
    Math.PI * end, // start angle
    Math.PI * start // end angle
  );
  context.fill()
}

const drawShadow = (phase) => {
  context.beginPath()
  if (phase < 0.25) {
    drawBase(RED)
    context.fillStyle = BLACK
    halfCircle(1.0, 0, 1)
    context.fillStyle = RED
    halfCircle(1.0, 1, 0)
    halfCircle((0.25 - phase) * 4, 0, 1) // right red shrinks
  } else if (phase < 0.5) {
    drawBase(BLACK)
    context.fillStyle = RED
    halfCircle(1.0, 1, 0)
    context.fillStyle = BLACK
    halfCircle(1.0, 0, 1)
    halfCircle((phase - 0.25) * 4, 1, 0) // left black grows
  } else if (phase < 0.75) {
    drawBase(BLACK)
    context.fillStyle = RED
    halfCircle(1.0, 0, 1)
    context.fillStyle = BLACK
    halfCircle(1.0, 1, 0)
    halfCircle((0.75 - phase) * 4, 0, 1) // right black shrinks
  } else {
    drawBase(RED)
    context.fillStyle = BLACK
    halfCircle(1.0, 1, 0)
    context.fillStyle = RED
    halfCircle(1.0, 0, 1)
    halfCircle((phase - 0.75) * 4, 1, 0) // left red grows
    context.stroke()
  }
  context.fill()
}

const drawSun = (phase) => {
  context.fillStyle = "white"
  const angle = phase * 4 - 1.5
  if (angle < 1 && angle > 0) {
    drawCircle(
      canvas.width * angle,
      canvas.height * (0.3 + 0.2 * ((angle - 0.5) ** 2)),
      canvas.height * 0.01,
    )
    context.fill()
  }
}

export const tick = (dt) => {
  phase += dt / solDuration
  while (phase > 1) {
    phase -= 1
    updateSol()
  }
}

export const renderPlanet = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawSun(phase)
  drawShadow(phase)
  drawRim()
}
