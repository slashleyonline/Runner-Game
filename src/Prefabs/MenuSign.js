class MenuSign extends Phaser.Physics.Arcade.Sprite { 
    constructor(scene, x, y, key) {
        super(scene, x, y, key)

        this.parentScene = scene
        this.parentScene.add.existing(this)
        this.parentScene.physics.add.existing(this)

        this.scale = 1.5

        this.parentScene.signColliderGroup.add(this)
        
        this.body.setImmovable(true)
        this.body.allowGravity = false


        scene.physics.add.collider(this, scene.bulletColliderGroup, (body1,body2) =>{
            body2.destroy()
            this.explode()
            if (key == 'playSign') {
                this.parentScene.scene.start('playScene')
            }
        })
    }
    explode(){
        this.destroy()

        const emitter = this.add.particles(400, 250, 'flares', {
            frame: [ 'red', 'yellow', 'green' ],
            lifespan: 4000,
            speed: { min: 150, max: 250 },
            scale: { start: 0.8, end: 0 },
            gravityY: 150,
            blendMode: 'ADD',
            emitting: false
        });
        }
    }
}