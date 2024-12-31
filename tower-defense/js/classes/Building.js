class Building extends Sprite {
  constructor({ position = { x: 0, y: 0 } }) {
    super({
      position,
      imageSrc: './img/tower.png',
      frames: {
        max: 19
      },
      offset: {
        x: 0,
        y: -80
      },
      hold: buildingLaunchSpeed,
    })
    this.position = position
    this.width = 64 * 2
    this.height = 64
    this.center = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2
    }
    this.projectiles = []
    this.attackRadius = 250
    // Index of the current emeny being targeted by the building
    this.target
    // Shoot projectiles continuously (setup) 
    this.elapsedSpawnTime = 0
  }

  // 'draw()' method still needed in order to support Attack Radius
  draw() {
    // Call parent 'draw()' method (i.e. Sprite)
    super.draw()
    // Following is no longer needed - now run from parent class
    // --Draw Building--
    // c.fillStyle = 'blue'
    // c.fillRect(this.position.x, this.position.y, this.width, this.height)

    // --Draw Attack Radius--
    // c.beginPath()
    // c.arc(this.center.x, this.center.y, this.attackRadius, 0, Math.PI * 2)
    // c.fillStyle = 'rgba(0,0,255,0.2'
    // c.fill()
  }

  update() {
    this.draw()
    if (this.target || !this.target && this.frames.current !== 0) super.update()

    // Following is no longer needed - projectiles will now be launched via 'shoot()'
    // this.launch()
    
    // Shoot projectile each time sprite sheet ('tower.png') reaches 7th image (ndx = 6) but only if 'target' exists (i.e is in buildings range -> not 'null')
    if (
      this.target &&
      this.frames.current === 6 && 
      this.frames.elapsed % this.frames.hold === 0
    ) {
      this.shoot()
    }
  }
  
  // Launch projectile every 100 frames but only if 'target' exists (i.e is in buildings range -> not 'null')
  // launch() {
  //   if (this.elapsedSpawnTime % 100 === 0 && this.target) {
  //     this.projectiles.push(
  //       new Projectile({
  //         position: {
  //           x: this.center.x,
  //           y: this.center.y
  //         },
  //         enemy: this.target
  //       })
  //     )
  //   }
  //   this.elapsedSpawnTime++
  // }
  
  shoot() {
    this.projectiles.push(
      new Projectile({
        // Position projectile to initially appear top-middle of building image
        position: {                 
          x: this.center.x - 20,    // '-20' moves projectile to middle
          y: this.center.y - 110    // '-110' moves projectile to top
        },
        enemy: this.target
      })
    )
  }
}