class Obstacle extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key, ground) {
        super(scene, x, y, key)

        this.parent = parent
        this.parentScene = scene
        this.parentScene.add.existing(this)
        this.parentScene.physics.add.existing(this)
        this.parentScene.physics.add.collider(this, ground)

        this.parentScene.obstacleColliderGroup.add(this)

        //this.body.setImmovable(true)

        this.scale = 1.5
        this.body.setVelocity(-400)
    }
}