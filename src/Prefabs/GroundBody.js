class GroundBody extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'groundBody')
        
        this.setOrigin(0.5)

        this.parentScene = scene
        this.parentScene.add.existing(this)
        this.parentScene.physics.add.existing(this)
        
        this.body.setImmovable(true)
        this.body.allowGravity = false
    }
    explode() {
        console.log('boom!')
    }
}