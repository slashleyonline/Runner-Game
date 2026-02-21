// Name: Ashley Seward
// Title: Rancher-Run

//CITATIONS:
// StateMachine.js from mkelly.me/blog/phaser-finite-state-machine, Thanks Nathan Altice
// Edmunds Font by Typodermic Fonts: https://www.dafont.com/edmunds.font?l[]=10
// Hoedown Heartbeat by Olele44: https://pixabay.com/music/acoustic-group-hoedown-heartbeat-385392/
// Winchester 1873 Single Shots by Grant Evans, https://soundbible.com/2071-Winchester-1873-Single-Shots.html
// Hooded Crow: Cawing by Mish7913 -- https://freesound.org/s/741366/ -- License: Creative Commons 0
// Major Punch by janbezouska https://freesound.org/people/janbezouska/sounds/399183/

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
