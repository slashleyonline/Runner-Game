class GroundBody extends Phaser.Physics.Arcade.StaticBody {
    constructor(scene, x, y) {
        super(world, gameObject)
        
        this.setOrigin(0.5)

        this.parentScene = scene
        this.parentScene.add.existing(this)
        this.parentScene.physics.add.existing(this)

        this.body.setImmovable(true)
        this.body.allowGravity = false

        this.setVelocityX(-500)
    }
}