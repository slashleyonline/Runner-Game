class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "snowboarder",2)

        this.parentScene = scene

        this.parentScene.add.existing(this)
        this.parentScene.physics.add.existing(this)
        this.scale = 2.5

        //this.setVelocity(2, 2)

        this.scene.physics.world.on('worldbounds', (body) => {
            this.body.gameObject.setToTop()
        })

    }
}