class Player {
    constructor(x, y, w, h) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
    }
}

class Spaceship extends Player {
    constructor(canvasWidth, canvasHeight) {
    const w = 100
    const h = 100
    const x = canvasWidth/2 - w/2
    const y = canvasHeight - h
    super(x, y, w, h)    
    }

    draw() {
        image(shipImg, this.x, this.y, this.w, this.h)
    }

    move() {      
      if (keyIsDown(LEFT_ARROW) && this.x >= 10) {
        this.x -= 10
      } else if (keyIsDown(RIGHT_ARROW) && this.x <= width - (this.w + 10)) {
        this.x += 10
      }
    }
    
    collidesWithObstacles() {
     // console.log(obstacles, spaceship)
      
      return !!obstacles.array.find(obstacle => collision(obstacle, this))
      
    }
} 

class SingleObstacle extends Player {
  constructor() {
    const w = 100
    const h = 100
    const x = random(0, windowWidth)
    const y = 0 
    super(x, y ,w, h)    
  }

  draw() {    
    image(missileImg, this.x, this.y, this.w, this.h)
  }  
  
}
class AllOfObstacles {
  constructor() {
    this.score = 0
    this.array = []      
  }

  draw() {       
    this.array.map(element => element.draw())
  }

  addObstacle() {
    this.array.push(new SingleObstacle())
  }

  update() {
    
    const every45Frames = frameCount % (45 * 1) === 0
    
    
    if(this.array.length < 18 && every45Frames) {
      this.addObstacle()
    }

    this.array.forEach((obstacle, index) => {
      obstacle.y += 4
      if(obstacle.y >= height) {
        this.score += 100
        scoreElem.innerText = this.score
        this.array.splice(index, 1)
        this.addObstacle()
      }
      obstacle.draw()
    })
    textSize(30)
    text(`Score: ${this.score}`, canvasWidth / 2, canvasHeight / 2)
  }

  cheating() {
    this.array.splice(0)
  }
}

class Singlelaser {
  constructor() {
    console.log(spaceship)
    this.w = 2
    this.h = 300
    this.x = spaceship.x + spaceship.w / 2 - this.w / 2
    this.y = spaceship.y - this.h
    this.speed = 20    
  }

  draw() {
    let colorOfLaser = color(240, 24, 5)
    fill(colorOfLaser)
    rect(this.x, this.y, this.w, this.h) 
 }

  move() {         
      this.y -= this.speed
    }  
}

class AllOfLasers {
  constructor() {
    this.array = [] 
  }

  draw() {
    this.array.forEach(laser => laser.draw())     
    
 }

 move() {
   this.array.forEach(laser => laser.move())
 }

 spawnLaser() {  
      this.array.push(new Singlelaser())  
 }

  crashesAsteroid() {
     for(let i = 0; i < obstacles.array.length; i++) {      
       for(let j = 0; j < this.array.length; j++) {         
         if(!!collision(obstacles.array[i], this.array[j])) {          
           obstacles.score += 200
           scoreElem.innerText = obstacles.score
           obstacles.array.splice(i, 1)
           this.array.splice(j, 1)
         }
       }
     }
  }
}