// Adding 'extends Sprite' creates a parent/child relationship
class Projectile extends Sprite {
  constructor({ position = { x: 0, y: 0 }, enemy }) {
    // Calls the parents class constructor (Sprite needs 'position' and 'imageSrc')
    super({ 
      position, 
      imageSrc: 'img/projectile.png' 
    })
    // Following is no longer needed - now inherited from parent class
    // this.position = position
    this.velocity = {
      x: 0,
      y: 0
    }
    this.enemy = enemy
    this.radius = 10

    // Following is no longer needed - now inherited from parent class
    // // Projectile Image Graphic
    // this.image = new Image()
    // this.image.src = 'img/projectile.png'
  }

  // Following is no longer needed - now inherited from parent class
  // draw() {

    // Code for a preliminary image (small circle)
    // c.beginPath()
    // c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
    // c.fillStyle = 'orange'
    // c.fill()

    // Code for the final image ('projectile.png' graphic)
    // c.drawImage(this.image, this.position.x, this.position.y)
  // }

  // Still works as draw() is being inherited from parent class
  update() {
    // Draw projectiles new position
    this.draw() 
    // Calculate 'angle' needed to move projectile to its next position (that is closer to the enemy)
    const angle = Math.atan2(
      this.enemy.center.y - this.position.y, 
      this.enemy.center.x - this.position.x 
    )
    // Use 'angle' and 'speed' to get the next x/y adjustment
    const speedFactor = projectileSpeed
    this.velocity.x = Math.cos(angle) * speedFactor
    this.velocity.y = Math.sin(angle) * speedFactor
    // Add the x/y adjustment to the projectiles current x/y position (this will be its new position on the next draw)
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }
}