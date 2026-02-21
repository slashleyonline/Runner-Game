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

        this.key = key

        scene.physics.add.collider(this, scene.bulletColliderGroup, (body1,body2) =>{
            body2.destroy()
            if (this.key == 'playSign') {
                this.explode()
            }
            else if (this.key == 'howToPlaySign') {
                this.howToDump = new InfoDump(scene, game.config.width / 2, game.config.height/2, 'howToSign')
            }
            else {
                this.creditsDump = new InfoDump(scene, game.config.width / 2, game.config.height/2, 'creditsSign')
            }
        })
    }
    explode(){
        const emitter = this.parentScene.add.particles(this.x, this.y, this.key + 'Fragments', {
            lifespan: 4000,
            frame: { 
                frames: [0, 1, 2],
                cycle: true
            },
            speed: { min: 300, max: 300 },
            scale: { start: 1.5},
            gravityY: 5000,
            emitting: false
        })

        emitter.explode(3)

        this.parentScene.time.addEvent({
            delay: 250,
            callback: () => {
                this.moveScene()
            }
        })
        this.destroy()
    }
    moveScene() {
        if (this.key == 'playSign') {
            this.parentScene.scene.start('playScene')
         }
    }
}