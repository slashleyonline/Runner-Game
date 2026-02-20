class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, angle) {
        super(scene, x, y, 'bullet')
        
        this.parentScene = scene
        this.parentScene.add.existing(this)
        this.parentScene.physics.add.existing(this)
    }
}