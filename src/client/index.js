import {
  bindKeys,
  initKeys,
  initPointer,
  on,
  emit,
  unbindKeys,
} from 'kontra'
import './constants'
import {
  initContext,
} from './js/graphics'
import { initLoop, loop } from './js/game'

on('halt', () => {
  loop.stop()
})

on('ready', () => {
  loop.start()
})

export const initGame = () => {
  initContext()
  initLoop()
  initKeys()
  initPointer()
  emit('ready')
}