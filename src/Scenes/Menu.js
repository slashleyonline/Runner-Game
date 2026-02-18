class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload() {

    }

    create() {
        //generate terrain from top to bottom, left to
        let height = 1
        let offset = true
        for (let j = 0; j < game.config.height + 16; j += 15) {
            for (let i = 0; i <=  game.config.width + 48; i += 48) {
                var isoBox = this.add.isobox(i + (offset * 24), (j + height), 48, 16)
                isoBox.fillTop = "0xFFFFFF"
                isoBox.fillLeft = "0x888888"
                isoBox.fillRight = "0x888888"
            }
            height += 1
            offset = !offset
        }

    }

    update() {
        
    }
}