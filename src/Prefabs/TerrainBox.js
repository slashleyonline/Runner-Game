class TerrainBox extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, size, height, offset) {
        super(scene, x, y)
        this.xPos = x
        this.yPos = y
        this.size = size
        this.height = height
        this.offset = offset

        this.SPEED = -150

        this.isoBox = this.scene.add.isobox(this.xPos,this.yPos,this.size,this.height)
        this.isoBox.fillTop = "0xFFFFFF"
        this.isoBox.fillLeft = "0x999999"
        this.isoBox.fillRight = "0x999999"

        this.parentScene = scene
        this.parentScene.add.existing(this.isoBox)
        this.parentScene.physics.add.existing(this.isoBox)

        this.isoBox.body.setVelocityY(this.SPEED)

        console.log("building terrainbox!")

        this.isoBox.body.setCollideWorldBounds(true)
        this.isoBox.body.onWorldBounds = true


        this.X_RATIO = this.size * (4/3)
        this.Y_RATIO = this.size * (4/5)
        this.SIZE_RATIO = this.size * (1/8)

        this.scene.physics.world.on('worldbounds', (body) => {
            //Math.ceil((Math.random() * 5)) == 1
            if (body.x < this.SIZE_RATIO) {
                body.x = game.config.width - (this.size * 3.025)
                console.log('X')
            }
            if (body.y < this.SIZE_RATIO) {
                body.y = game.config.height + (10 * this.offset)
                body.gameObject.setToTop()
                console.log('y', " - ", this.offset)
            }

            this.offset = !this.offset

            //body.setVelocityX(this.SPEED)
            body.setVelocityY(this.SPEED)

        })
        
    }

}