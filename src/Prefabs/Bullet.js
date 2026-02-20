class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, targetX, targetY, x, y, angle) {
        super(scene, x, y, 'bullet')
        //add to scene
        this.parentScene = scene
        this.parentScene.add.existing(this)
        this.parentScene.physics.add.existing(this)

        //physics tweaking
        this.body.collideWorldBounds = true
        this.scene.physics.world.on('worldbounds', (body) => {
            this.destroy()
        })
        this.parentScene.bulletColliderGroup.add(this)
        this.rotation = angle
        this.body.allowGravity = false

        //calculating projectile aim
        this.aimVector = new Phaser.Math.Vector2(targetX- x, targetY - y)
        this.aimVector.setLength(1000)
        this.body.velocity = this.aimVector
    }

}