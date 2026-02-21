class ReplayButton extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'replayButton')

        this.parentScene = scene
        this.parentScene.add.existing(this)
        this.parentScene.physics.add.existing(this)

        this.body.setImmovable()
        this.body.allowGravity = false
        this.setInteractive()

        this.on('pointerdown', () => {
            this.parentScene.bgMusic.destroy()
            this.parentScene.scene.start('menuScene')
        })

        this.scale = 3
    }
}