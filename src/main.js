let config = {
    type: Phaser.AUTO,

    width: 640,
    height: 480,

    physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
    },

    autoCenter: Phaser.Scale.CENTER_BOTH,
    zoom: 1.8,

    scene: [Menu, Play],
}

let game = new Phaser.Game(config)
