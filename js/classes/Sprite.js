// Parent: stores code that's shared across the child classes (eliminates some code duplications)
class Sprite {
  constructor({ 
    position = { x: 0, y: 0 }, 
    imageSrc, 
    frames = { max: 1 },
    offset = { x: 0, y: 0 },
    hold = 9
  }) {
    this.position = position
    this.image = new Image()
    this.image.src = imageSrc
    this.frames = {     // --Sprite Management--
      max: frames.max,  // number of frames in sprite sheet
      current: 0,       // current sprite sheet frame
      elapsed: 0,       // infinite counter (needed for 'hold')
      hold: hold        // image hold count (controls animation speed)
    }
    // Used to adjust images canvas location when image height spans 2 tiles
    this.offset = offset
  }

  draw() {
    const cropWidth = this.image.width / this.frames.max
    const crop = {
      position: {
        x: cropWidth * this.frames.current,
        y: 0,
      },
      width: cropWidth,
      height: this.image.height
    }
    // Code for a single-image sprite
    // c.drawImage(this.image, this.position.x, this.position.y)

    // Code for a multi-image sprite (cycling thru a multi-image sprite will create an animated look/feel)
    c.drawImage(
      this.image,
      // Multi-image sprite location
      crop.position.x, 
      crop.position.y, 
      crop.width, 
      crop.height, 
      // Canvas location
      this.position.x + this.offset.x, 
      this.position.y + this.offset.y, 
      crop.width,
      crop.height
    )
  }

  // --Sprite Animation Management--
  update() {
    // Add 1 to the elapsed counter
    this.frames.elapsed++
    // If elapsed counter has reached the action point...
    if (this.frames.elapsed % this.frames.hold === 0) {
      // ...shift current frame to the next frame in sprite sheet
      this.frames.current++
      // If the new current frame is beyond the last frame...
      if (this.frames.current >= this.frames.max) {
        // ...reset the current frame back to the first frame
        this.frames.current = 0
      }
    }
  }
}