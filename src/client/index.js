import './constants'
import { initContext } from './js/graphics'
import { initLoop } from './js/game'
import { renderTiles } from './js/draw-tiles'

export const initGame = () => {
  initContext()
  renderTiles()
  initLoop()
}