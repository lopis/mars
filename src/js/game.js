import {
  GameLoop,
  emit,
} from 'kontra'
import {
  renderStatus,
} from './graphics'
import {
  renderPlanet,
  tick,
} from './draw-planet'

export let loop
export const initLoop = () => {
  loop = GameLoop({  // create the main game loop
    update: function (dt) { // update the game state
      try {
        tick()
      } catch (error) {
        console.error(error)
        emit('halt')
      }
    },
    render: function () { // render the game state
      try {
        console.log('render')
        renderPlanet()
        renderStatus()
      } catch (error) {
        console.error(error)
        emit('halt')
      }
    }
  })
}