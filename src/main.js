// Name: Ashley Seward
// Title: InfiniBoarder

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

    scene: [Play, Menu],
}

let game = new Phaser.Game(config)
