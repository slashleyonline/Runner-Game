class ReplayButton extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key) {
        super(scene, x, y, key)

        this.parentScene = scene
        this.parentScene.add.existing(this)
        this.parentScene.physics.add.existing(this)

        this.body.setImmovable()
        this.body.allowGravity = false
        this.setInteractive()

        this.on('pointerdown', () => {
            console.log(this.parentScene)
            if (this.parentScene.scene.key == "playScene"){
                this.parentScene.bgMusic.destroy()
            }
            this.parentScene.scene.start('menuScene')
        })

        this.scale = 3
    }
}