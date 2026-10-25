const battleBackgroundImage = new Image()
battleBackgroundImage.src = './Images/battleBackground.png'
const battleBackground = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    image: battleBackgroundImage
})

let draggle
let emby
let renderedSprites
let battleAnimationId
let queue

function initBattle() {
    document.querySelector('#userInterface').computedStyleMap.display = 'block'
    document.querySelector('#userInterface').computedStyleMap.display = 'block'
    document.querySelector('#userInterface').computedStyleMap.display = 'block'
    document.querySelector('#userInterface').computedStyleMap.display = 'block'
    document.querySelector('#userInterface').computedStyleMap.display = 'block'
}

draggle = new Monster(monsters.Draggle)