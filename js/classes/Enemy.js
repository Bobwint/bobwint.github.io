class Enemy extends Sprite {
  constructor({position = {x: 0, y: 0} }) {
    super({ 
      position, 
      imageSrc: 'img/orc.png', 
      frames: { max: 7 },
      hold: enemySpeed
    })
    this.position = position
    this.width = 100
    this.height = 100
    this.radius = 50
    this.waypointIndex = 0
    this.center = {
      x: this.position.x + this.radius,
      y: this.position.y + this.radius
    }
    // %age of life remaining for enemy
    this.health = 100
    // Enemy speed
    this.velocity = {
      x: 0,
      y: 0
    }
  }

  // 'draw()' method still needed in order to support Health Bar
  draw() {
    // Call parent 'draw()' method (i.e. Sprite)
    super.draw()
    // Following is no longer needed - now run from parent class
    // --Draw Enemy--
    // c.fillStyle = 'red'
    // c.beginPath()
    // c.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2)
    // c.fill()

    // --Draw Health Bar--
    c.fillStyle = 'red'
    c.fillRect(this.position.x, this.position.y - 15, this.width, 10)
    c.fillStyle = 'green'
    c.fillRect(this.position.x, this.position.y - 15, this.width * this.health / 100, 10)
  }

  update() {
    this.draw()
    // Run parent class sprite animation
    super.update()

    // --Way Point Management--
    // Move an object along a path using waypoints (versus collision blocks)
    const waypoint = waypoints[this.waypointIndex]
    const yDistance = waypoint.y - this.center.y
    const xDistance = waypoint.x - this.center.x
    const angle = Math.atan2(yDistance, xDistance)

    const speed = 2

    this.velocity.x = Math.cos(angle) * speed
    this.velocity.y = Math.sin(angle) * speed

    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    this.center = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2
    }
 
    // If current way point has been navigated to...
    if (
      Math.abs(Math.round(this.center.x) - Math.round(waypoint.x)) < Math.abs(this.velocity.x) && 
      Math.abs(Math.round(this.center.y) - Math.round(waypoint.y)) < Math.abs(this.velocity.y) && 
      this.waypointIndex < waypoints.length - 1
    ) {
      // ...activate next way point
      this.waypointIndex++
    }
  }
}