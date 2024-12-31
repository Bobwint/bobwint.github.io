// -------------------
// --Event Listeners--
// -------------------
const mouse = {
  x: undefined,
  y: undefined
}

canvas.addEventListener('click', (event) => {
  if (activeTile && !activeTile.isOccupied && coins - 50 >= 0) {
    coins -= 50
    document.querySelector('#coinCounter').innerHTML = coins
    buildings.push(
      new Building({
        position: {
          x: activeTile.position.x,
          y: activeTile.position.y
        }
      })
    )
    activeTile.isOccupied = true
    // Sort the buildings array top-down to avoid building image perspective issues (i.e. A building added behind an existing building (i.e. added 1 tile higher) will actually display in front of the building below, which is not what is desired, sort the array top-down to avoid this)
    buildings.sort((a, b) => {
      return a.position.y - b.position.y
    })
  }
})

window.addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY

  activeTile = null
  for (let i = 0; i < placementTiles.length; i++) {
    const tile = placementTiles[i]
    if (
      mouse.x > tile.position.x &&
      mouse.x < tile.position.x + tile.size &&
      mouse.y > tile.position.y &&
      mouse.y < tile.position.y + tile.size
    ) {
      activeTile = tile
      break
    }
  }
})