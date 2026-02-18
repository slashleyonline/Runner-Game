class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload() {
        this.load.path = "./assets/"
        this.load.spritesheet("snowboarder", "snowboarder_sheet.png", {
            frameWidth: 16,
            frameHeight: 16
        })
    }

    create() {
        //generate terrain from top to bottom, left to
        let offset = true
        for (let j = 0; j < game.config.height + 16; j += 13) {
            for (let i = 0; i <=  game.config.width + 48; i += 48) {
                var isoBox = this.add.isobox(i + (offset * 24), j, 48, 16)
                isoBox.fillTop = "0xFFFFFF"
                isoBox.fillLeft = "0x999999"
                isoBox.fillRight = "0x999999"
            }
            offset = !offset
        }

        this.player = new Player(this, game.config.width / 2, game.config.height / 2)

    }

    update() {
        
    }
}