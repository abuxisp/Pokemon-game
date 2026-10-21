const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const collisionsMap = []
for (let i = 0; i < collisions.length; i += 70) {
    collisionsMap.push(collisions.slice(i, 70 + i))
}

class Boundary {
    static width = 48
    static height = 48
    constructor({position}) {
        this.position = position
        this.width = 48
        this.height = 48
    }

    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const boundaries = []
const offset = {
    x: -740,
    y: -620
}

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025)
        boundaries.push(
            new Boundary({
                position: {
                x: j * Boundary.width + offset.x,
                y: i * Boundary.height + offset.y
             }
            })
        )
    })
})

const image = new Image()
image.src = './Images/Pellet Town.png'

const playerImage = new Image()
playerImage.src = './Images/playerDown.png'

class Sprite {
    constructor({ position, velocity, image, frames = { max: 1 } }) {
        this.position = position
        this.image = image
        this.frames = frames
    }

    draw() {
        c.drawImage(
            this.image,
            0, 
            0, 
            this.image.width / this.frames.max, 
            this.image.height, 
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max, 
            this.image.height
    )
    }
}

//canvas.width / 2 - this.image.width / 4 / 2, 
            //canvas.height / 2 - this.image.height / 2,

const player = new Sprite({
        position : {
        x: canvas.width / 2 - 192 / 4 / 2,
        y: canvas.height / 2 - 68 / 2
    },
    image: playerImage
})

const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: image
})

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

const testBoundary = new Boundary({
   position: {
    x: 400,
    y:400
   } 
})



let lastKey = '';

const movables = [background, testBoundary]
function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)
    
    background.draw()
    //boundaries.forEach(boundary => {
        //boundary.draw()
    //})
    testBoundary.draw()
    player.draw()

    //if (player.posiition.x + player.width)

    if (keys.w.pressed && lastKey === 'w') {
        movables.forEach ((movable) => {
            movable.position.y += 3
        })
    }
    else if (keys.a.pressed && lastKey === 'a') {
        movables.forEach ((movable) => {
            movable.position.x += 3
        })
    }
    else if (keys.s.pressed && lastKey === 's') {
        movables.forEach ((movable) => {
            movable .position.y -= 3
        })
    }
    else if (keys.d.pressed && lastKey === 'd') {
        movables.forEach ((movable) => {
            movable.position.x -= 3
        })
    }
}

animate()

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = true
            lastKey = 'w'
            break
        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
            break
        case 's':
            keys.s.pressed = true
            lastKey = 's'
            break
        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
            break         
    }
})

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break         
    }
})