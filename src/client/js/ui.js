import { haow, playSound, woah } from './audio'
import { userList, commsList, solCount, data } from './game'
import { buildAction } from './io'

// let dismissOnArrival
let isZoomed
export const updateTile = ({id, build, stock, willBe, ppl, dust, riot, mine, free}) => {
  const tile = tiles[id] 
  if (!tile) return

  tile.$tile.classList.toggle('dust', !!dust)


  if (build === 'road') {
    tile.$tile.innerHTML = ''
    tile.$tile.classList.add('road')
  } else if (build && build != tile.build) {
    const $icon = document.createElement('span')
    $icon.style.animationDelay = -700 * Math.random() + 'ms'
    // $icon.classList.add(build)
    $icon.classList.add(build)
    if (['center', 'camp', 'mount'].includes(build)) {
      $icon.classList.add('still')
    }
    if (build === 'mount') {
      tile.$tile.classList.add('deco')
    }
    tile.$tile.replaceChildren($icon)
    $icon.innerText = buildings[build].icon
    tile.build = build
    if (build === 'center' && typeof rocket2 === 'undefined') {
      const r = rocket.cloneNode(true)
      r.id = 'rocket2'
      tile.$tile.appendChild(r)
    }
  }
  if ((stock && stock > tile.stock) || (ppl && ppl > tile.ppl)) {
    tile.$tile.classList.add('new')
  }

  tile.$tile.classList.toggle('mine', !!mine)
  tile.$tile.classList.toggle('free', !!free)
  tile.$tile.classList.toggle('bad', build === 'camp' && !!riot)
  Object.assign(tile, {stock, willBe, ppl, dust, mine, free})
  
  // if (dismissOnArrival) {
  //   dismissDialog()
  //   dismissOnArrival = false
  // }
}

function onBuildChoice ({target}) {
  if (buildings[target.id]) {
    document.body.removeEventListener('click', onBuildChoice)
    buildAction($selectedTile.dataset.n, target.id)
    clearSelectedTile()
    // dismissOnArrival = true
    dismissDialog()
  }
}

export const clearSelectedTile = () => {
  $selectedTile?.classList.remove('selected')
  $selectedTile = null
}

export const dismissDialog = () => {
  if (_dialog.classList.contains('show')) playSound(woah)

  document.body.removeEventListener('click', onBuildChoice)
  _dialog.classList.remove('show')
  _choices.innerHTML = ''
  updateMap([0,0], 1)
  isZoomed = false
}

export const renderDialog = (tile, prompt, choicesHTML) => {
  const type = tile.mine ? '🔵 Rocky area'
  : tile.row === 0 ? '⚪️ Glaciar'
  : '🟤 Open plains'
  _prompt.innerHTML = (tile ? `<b>Sector ${tile.id} ${type}</b><br>` : '') + prompt
  _choices.innerHTML = choicesHTML
  playSound(haow)
  _dialog.classList.add('show')
}

const renderCap = (tile, building) => {
  const usage = Math.round(100 * tile.ppl / building.cap)
  return [
    `${tile.ppl || 0} ${building.count.join(' ')}`,
    `Capacity: ${building.cap}`,
    `At ${usage}% capacity`,
    usage > 99 ? '<br>🚨 WARNING. This many people<br>cannot be supported!' : 'Operating normally'
  ].join('<br>')
}

const renderActions = () => {
  return `<aside>
<p>Move residents ↕️</p>
<li class="button radio" id="movein">From camp</li>
<li class="button radio" id="moveout">To camp</li>
<li class="button" id="div">÷ 5</li>
<li class="button" id="mul">× 5</li>
<span id="_val">100</span>
<li class="button" id="ok">MOVE&nbsp;➡️</li>
</aside>`
}

export const showTileDialog = (target) => {
  clearSelectedTile()

  $selectedTile = target
  target.classList.remove('new')
  const tile = tiles[target.dataset.n]
  if (tile.dust) {
    return
  }
  
  if (tile.build) {
    const building = buildings[tile.build]
    if (building.out) {
      // RESOURCE DIALOG
      const resource = building.out.join(' ')
      renderDialog(
        tile,
        building.label,
        `<p>Stock: ${tile.stock} ${resource}</p><ul>${[
          [`Collect 1`, 'getone'],
          [`Collect all`, 'getall'],
        ].map(([label, id]) => 
          `<li class="button" id="${id}">${label}</li>`
        ).join('')}</ul>${
          building.count
          ? `${renderCap(tile, building)}<br>${renderActions(tile, building)}`
          : ''
        }`,
      )
    } else {
      // STATS DIALOG
      renderDialog(
        tile,
        buildings[tile.willBe]?.label || building.label,
        `<p>${
          building.count ? renderCap(tile, building)
          : tile.willBe ? '🚧 Under construction'
          : `Waiting for new convoy arrival`
        }</p>`
      )
    }

  } else {
    // BUILD DIALOG
    const renderChoice = tile => ([id, {out, label, icon, cost, days}]) => {
      const costClass = tile.free && stats[cost[1]] >= cost[0] ? '' : 'red'
      const details = [
        out.length
          ? `outputs ${out.join(' ')}`
          : 'connects sectors',
        `<span class="${costClass}">costs ${cost[0]} ${cost[1]}</span>`,
        `<span>uses ${cost[0]} ${cost[1]}</span>`,
        `builds in ${days} sols`
      ].join('<br>')
      return `<li i="${icon}" class="button" id="${costClass ? '' : id}">${label}<br><small>${details}</small></li>`
    }
    const options = ['road'].concat(
      tile.row === 0 ? ['water']
      : tile.mine ? ['minery', 'nuclear']
      : ['house', 'solar', 'greenery']
    )
    const warning = tile.free ? '' : '<p class="red">This area isn\'t connected to your colony yet</p>'
    renderDialog(
      tile,
      'Choose build',
      `${warning}<ul>${
        Object.entries(buildings).filter(
          ([id, type]) => options.includes(id)
        ).map(renderChoice(tile)).join('')
      }</ul>`
    )
    _dialog.addEventListener('click', onBuildChoice)
  }

  target.classList.add('selected')
  moveMapTo(target)
}

export const updateMap = (translate, scale) => {
  if (mobile) {
    wrapper.style.transform = `translateY(-${ scale > 1 ? 20 : 10}vh) scale(${scale}) translate(${translate[0]}px, ${translate[1]}px)` 
  } else {
    wrapper.style.transform = `scale(${scale}) translate(${translate[0]}px, ${translate[1]}px)` 
  }
}

const moveMapTo = (target) => {
  if (!isZoomed) {
    isZoomed = true
    let {left, top} = target.getBoundingClientRect()
    if (mobile) {
      top += innerHeight * 0.1
    }
    updateMap([
      -(left - (innerWidth / 2)),
      -(top - (innerHeight / 2)),
    ], 3)
  }
}

export const showUsers = () => {
  renderDialog(
    null,
    'Player List',
    `<ul id="players">${userList.map(user => {
      return `<li>${user}</li>`
    }).join('')}</ul>`
  )
}

export const showComms = () => {
  const chatList = commsList.length > 0 ? commsList.map(({user, msg}) => {
    return `<li><b>${user}:</b> ${msg}</li>`
  }).join('') : '<b>No messages</b>'
  renderDialog(
    null,
    'Comms Panel',
    `<ul id="chatlist" />${chatList}</ul><input maxlength="22" id="_input" />`
  )
  _input.focus()
  chatlist.scrollTo(0, chatlist.clientHeight)
}

export const showSolStats = () => {
  renderDialog(
    null,
    'Game stats',
    `<p>${[
      `<b>☀️ Sol:</b> ${Math.ceil(solCount / solDuration)}`,
      `<b>🕐 Game start:</b> ${new Date(data.start).toDateString()}`,
      `<b>🎉 Events:</b> ${data.events}`,
      `<b>⚰️ Deaths:</b> ${data.deaths}`,
      `<b>👨‍👨‍👧‍👧 Total refugees:</b> ${data.saved}`,
    ].join('<br>')}</p>`
  )
}