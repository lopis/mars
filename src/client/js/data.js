RED = "#881f1a"
BLACK = "#0f0b0b"
tilt = 0.43 // rads
planetScale = 0.4

mobile = false

phase = null
tiles = {}
stats = {}

$selectedTile = null

MAX_ZOOM = 6
SCROLL_SPEED = 0.5

msg = {
  convoy1: 'Refugee convoy departed from Earth.',
  convoy2: 'Convoy arrived with %c refugees.',
  riot: 'Riots in sector %t have caused %c deaths.',
  asteroid: 'Danger: asteroid heading to Mars.',
  conjunction: 'Solar conjunction for the next 7 sols; Earth link down.',
  dust1: 'Dust storm around %t forecasted until sol %s affecting radio.',
  dust2: 'Dust storm around %t ended.'
}