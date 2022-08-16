import './constants'
import {
  initContext,
} from './js/graphics'
import {
  initLoop,
} from './js/game'

export const initGame = () => {
  initContext()
  initLoop()
}