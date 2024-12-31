const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1280
canvas.height = 768

c.fillStyle = 'white'
c.fillRect(0, 0, canvas.width, canvas.height)

// --Building Placement Tiles--
// Define 2D array
const placementTilesData2D = []
// Convert original array to 2D array
for (let i = 0; i < placementTilesData.length; i += 20) {
  placementTilesData2D.push(placementTilesData.slice(i, i + 20))
}
// Process thru the 2D array and calculate x/y position for each building tile (i.e. where element = '14')
const placementTiles = []
placementTilesData2D.forEach((row, yNdx) => {
  row.forEach((symbol, xNdx) => {
    if (symbol === 14) {
      // Add building placement tile here
      placementTiles.push(
        new PlacementTile({
          position: {
            x: xNdx * 64,
            y: yNdx * 64
          }
        }))
    }
  })
})

// --Draw Game Map--
const image = new Image()
image.onload = () => {
  animate()
}
image.src = 'img/gameMap.png'

// --Enemies--
const enemies = []
function spawnEnemies(spawnCount) {
  for (let i = 1; i < spawnCount + 1; i++) {
    const xOffset = i * 150
    enemies.push(
      new Enemy({
        position: { x: waypoints[0].x - xOffset, y: waypoints[0].y }
      })
    )
    console.log(enemies.length)
  }
}

// --Game Variables--
const projectileSpeed = 6
const buildingLaunchSpeed = 6
const enemySpeed = 9
const enemyKillValue = 10
const buildingCost = 40
let hearts = 10
let coins = 100
let enemyCount = 3

const buildings = []
let activeTile = undefined
const explosions = []
spawnEnemies(enemyCount)

// ==================
// --Animation Loop--
// ==================
function animate() {
  const animationId = requestAnimationFrame(animate)

  // --Background Image--
  c.drawImage(image, 0, 0)

  // --Enemies--
  // Loop thru enemies backwards (to avoid slice glitch)
  for (let i = enemies.length - 1; i >= 0; i--) {
    const enemy = enemies[i]
    // Move enemy to its next waypoint position
    enemy.update()
    // If enemy falls off canvas
    if (enemy.position.x > canvas.width) {
      // ...decrease 'hearts' by 1
      hearts -= 1
      document.querySelector('#heartCounter').innerHTML = hearts
      // ...remove enemy from array
      enemies.splice(i, 1)
      // If no more hearts remain...
      if (hearts === 0) {
        // ...terminate further animation loops
        cancelAnimationFrame(animationId)
        // ...reveal the html "Game Over" text
        document.querySelector('#gameOver').style.display = 'flex'
      }
    }
  }

  // --Explosions--
  // Loop thru explosions backwards (to avoid slice glitch)
  for (let i = explosions.length - 1; i >= 0; i--) {
    const explosion = explosions[i]
    explosion.draw()
    explosion.update()
    // If explosion sprite sheet has completed its run...
    if (explosion.frames.current >= explosion.frames.max - 1) {
      // ...remove the explosion object from the array
      explosions.splice(i, 1)
    }
  }

  // --Launch Next Wave--
  // If no more enemies (i.e. all defeated or off the map)
  if (enemies.length === 0) {
    // ...increase enemy count and launch next wave
    enemyCount += 2
    spawnEnemies(enemyCount)
  }

  // --Foundations--
  placementTiles.forEach((tile) => {
    tile.update(mouse)
  })

  // --Buildings--
  buildings.forEach((building) => {
    building.update()
    building.target = null
    // Create array of enemies that are in range of buildings projectiles
    const enemyInRange = enemies.filter(enemy => {
      // Calculate distance from center-of-building to center-of-enemy
      const xDifference = enemy.center.x - building.center.x
      const yDifference = enemy.center.y - building.center.y
      const distance = Math.hypot(xDifference, yDifference)
      // Return 'true' if enemy is in range of building
      return distance < enemy.radius + building.attackRadius
    })
    building.target = enemyInRange[0]

    // --Projectiles--
    // Loop backwards thru projectile array avoid a potential glitching issue
    // - always use a 'for' loop (rather than '.forEach') where ever splicing is needed (in order to avoid this potential screen glitch)
    for (let i = building.projectiles.length - 1; i >= 0; i--) {
      // Update projectiles position
      const projectile = building.projectiles[i]
      projectile.update()
      // Calculate next distance from center-of-projectile to center-of-enemy
      const xDifference = projectile.enemy.center.x - projectile.position.x
      const yDifference = projectile.enemy.center.y - projectile.position.y
      const distance = Math.hypot(xDifference, yDifference)
      // --Projectile Collision Management--
      // If remaining distance < sum of the colliding radiis then collision has occurred 
      if (distance < projectile.enemy.radius + projectile.radius) {
        // Reduce the emenies health bar
        projectile.enemy.health -= 20
        // If enemy has no more health...
        console.log(enemies.length)
        if (projectile.enemy.health <= 0) {
          // ...find enemies index
          const enemyIndex = enemies.findIndex((enemy) => {
            return projectile.enemy === enemy
          })
          // ...remove enemy from array 
          if (enemyIndex > -1) {
            enemies.splice(enemyIndex, 1)
            coins += enemyKillValue
            document.querySelector('#coinCounter').innerHTML = coins
          }
        }
        // Add new explosion to explosions array, create via the parent sprite since no additional parameters/methods are needed
        explosions.push(new Sprite({ 
          position: { 
            x: projectile.position.x, 
            y: projectile.position.y
          }, 
          imageSrc: './img/explosion.png', 
          frames: { max: 4 },
          offset: { x: 0, y: 0 }
        }))

        // Remove projectile from array
        building.projectiles.splice(i, 1)
      }
    }
  })
}