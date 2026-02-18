class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        console.log("adding player!")
        super(scene, x, y, "snowboarder",1)

        this.parentScene = scene

        this.parentScene.add.existing(this)
        this.parentScene.physics.add.existing(this)
        this.scale = 2.5

        this.setVelocity(-2, 2
            
        )

    }
    create() {
        
    }
}