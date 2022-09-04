RED = "#881f1a"
BLACK = "#0f0b0b"
tilt = 0.43 // rads
planetScale = 0.4

statusRefreshDelay = 10
mobile = false

phase = null
tiles = {}
stats = {}

$selectedTile = null

MAX_ZOOM = 6
SCROLL_SPEED = 0.5

msg = {
  convoy1: 'Refugee convoy departed from Earth.',
  convoy2: 'Convoy arrived with %r refugees.',
  asteroid: 'Danger: asteroid heading to Mars.',
  conjunction: 'Solar conjunction for the next 7 sols; Earth link down.',
  dust: 'Dust storm in $t until sol $s affecting radio.'
}