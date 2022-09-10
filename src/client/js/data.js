export const TILT = 0.43 // rads
export const PLATNET_SCALE = 0.4
export const BLACK = "#0f0b0b"
export const RED = "#881f1a"

// mobile = false

phase = null
tiles = {}
stats = {}

$selectedTile = null

msg = {
  convoy1: 'Refugee convoy departed from Earth and will arrive on sol %s.',
  convoy2: 'Convoy arrived with %c refugees.',
  riot: 'Riots in sector %t have caused %c deaths.',
  asteroid: 'Danger: asteroid heading to Mars.',
  conjunction: 'Solar conjunction for the next 7 sols; Earth link down.',
  dust1: 'Dust storm around %t forecasted until sol %s affecting radio.',
  dust2: 'Dust storm around %t ended.'
}