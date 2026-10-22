const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const collisionsMap = []
for (let i = 0; i < collisions.length; i += 70) {
    collisionsMap.push(collisions.slice(i, 70 + i))
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





let lastKey = '';

const movables = [background, ...boundaries]

function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x && 
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    )
}

function animate() {
    window.requestAnimationFrame(animate)
    background.draw()
    boundaries.forEach((boundary) => {
        boundary.draw()

    })
    player.draw()


    let moving = true
    if (keys.w.pressed && lastKey === 'w') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
        rectangularCollision({
            rectangle1: player,
            rectangle2: {...boundary, position : {
                x: boundary.position.x,
                y:boundary.position.y + 3
            }}
        })
    ) {
         console.log('collision')
        moving = false
         break
    }
        }

        if (moving)
        movables.forEach ((movable) => {
            movable.position.y += 3
        })
    }
    else if (keys.a.pressed && lastKey === 'a') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
        rectangularCollision({
            rectangle1: player,
            rectangle2: {...boundary, position : {
                x: boundary.position.x + 3,
                y:boundary.position.y
            }}
        })
    ) {
         console.log('collision')
        moving = false
         break
    }
        }

        if (moving)
        movables.forEach ((movable) => {
            movable.position.x += 3
        })
    }
    else if (keys.s.pressed && lastKey === 's') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
        rectangularCollision({
            rectangle1: player,
            rectangle2: {...boundary, position : {
                x: boundary.position.x,
                y:boundary.position.y - 3
            }}
        })
    ) {
         console.log('collision')
        moving = false
         break
    }
        }

        if (moving)
        movables.forEach ((movable) => {
            movable .position.y -= 3
        })
    }
    else if (keys.d.pressed && lastKey === 'd') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
        rectangularCollision({
            rectangle1: player,
            rectangle2: {...boundary, position : {
                x: boundary.position.x - 3,
                y:boundary.position.y
            }}
        })
    ) {
         console.log('collision')
        moving = false
         break
    }
        }

        if (moving)
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