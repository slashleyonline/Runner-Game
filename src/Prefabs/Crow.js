class Crow extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, player, x, y) {
        super(scene, x, y, 'crow')

        this.parent = parent
        this.parentScene = scene
        this.parentScene.add.existing(this)
        this.parentScene.physics.add.existing(this)
        
        this.anims.play('fly')

        this.body.allowGravity = false

        this.body.setImmovable()

        this.scale = 2
        this.body.setCircle(8)
    }
}