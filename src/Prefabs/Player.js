class PlayerGun extends Phaser.GameObjects.Sprite {
    constructor(scene, parent, x, y) {
        super(scene, x, y, "cowboy", 5)

        this.parent = parent
        this.parentScene = scene
        this.parentScene.add.existing(this)

        this.setOrigin(0.37,0.25)

        this.scale = 2.5
    }

}

class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "cowboy", 0)
        
        this.parentScene = scene
        this.parentScene.add.existing(this)
        this.parentScene.physics.add.existing(this)

        this.body.setCollideWorldBounds()

        this.playerGun = new PlayerGun(this.scene, this, this.x, this.y)

        this.body.allowGravity = true

        this.scale = 2.5
    }
}