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
        this.cameras.main.setZoom(1)

        //generate terrain from top to bottom, left to

        const BOX_SIZE = 96
        let offset = true
        for (let j = 26; j < (game.config.height - 52); j += 26) {
            for (let i = BOX_SIZE; i <  (game.config.width - BOX_SIZE); i += BOX_SIZE) {
                var terrainBox = new TerrainBox(this, i + (offset * (BOX_SIZE / 2)), j, BOX_SIZE, 16)
            }
            offset = !offset
            
            //this.physics.add.existing(isoBox)
            //isoBox.setVelocityX(.1)
            //isoBox.setImmovable
        }
        
        this.player = new Player(this, game.config.width / 2, game.config.height / 2)
    }
}