class Ground extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, speed) {
        super(scene, x, y, "ground", 0)
        
        this.setOrigin(0.5)

        this.parentScene = scene
        this.parentScene.add.existing(this)
        this.parentScene.physics.add.existing(this)
        
        this.body.allowGravity = false
        this.body.setImmovable = true

        this.setVelocityX(speed)
    }
}