import {
  bindKeys,
  initKeys,
  initPointer,
  on,
  emit,
  unbindKeys,
} from 'kontra';
import './constants'
import {
  initContext,
} from './js/graphics'
import { initLoop, loop } from './js/game'

initContext();
initLoop();
initKeys();
initPointer();

on('halt', () => {
  loop.stop()
})

on('ready', () => {
  console.log('ready')
  loop.start();
})

emit('ready')