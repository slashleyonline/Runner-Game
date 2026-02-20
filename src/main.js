// Name: Ashley Seward
// Title: Rancher-Run

//CITATIONS:
// StateMachine.js from mkelly.me/blog/phaser-finite-state-machine, Thanks Nathan Altice
// Edmunds Font by Typodermic Fonts: https://www.dafont.com/edmunds.font?l[]=10


// CREATIVE JUSTIFICATION AND CITATIONS NEEDED
let config = {
    type: Phaser.AUTO,

    width: 640,
    height: 480,

    render: {
        pixelArt: true
    },

    physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
    },

    autoCenter: Phaser.Scale.CENTER_BOTH,
    zoom: 1,

    scene: [Menu, Play],
}

let game = new Phaser.Game(config)
