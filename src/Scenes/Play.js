class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    init() {
        this.physics.world.gravity.y = 2600
    }

    preload() {
        this.load.path = "./assets/"
        this.load.spritesheet("cowboy", "cowboy_sheet.png", {
            frameWidth: 48,
            frameHeight: 48
        })
        this.load.spritesheet('ground', 'ground.png', {
            frameWidth: 650,
            frameHeight: 120
        })
        this.load.spritesheet('groundBody', 'ground_body.png', {
            frameWidth: 650,
            frameHeight: 120
        })

        this.load.image('sky', 'sky.png')
    }

    create() {
        this.add.image(game.config.width / 2, game.config.height / 2, 'sky')

        this.player = new Player(this, game.config.width / 2, game.config.height / 2)
        this.playerGun = this.player.playerGun

        this.ground1 = new Ground(this, 0, game.config.height * 9/10)
        this.ground2 = new Ground(this, game.config.width, game.config.height * 9/10)

        this.groundBody = this.physics.add.sprite(game.config.width / 2, game.config.height, 'groundBody')
        this.groundBody.setImmovable(true)
        this.groundBody.body.allowGravity = false
        this.physics.add.collider(this.player, this.groundBody)

        this.player.body.gameObject.setToTop()
        // player animation
        this.anims.create({
            key: 'run',
            frameRate: 10,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('cowboy', {
                start: 0,
                end: 4,
            })
        })
        this.anims.create({
            key: 'bounceArm',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('cowboy',{
                start: 5,
                end: 6,
            })
        })

        this.player.play('run')
        this.playerGun.play('bounceArm')
        this.playerGun.setToTop()

        console.log(game.config.width)
    
    }
    update() {
        this.playerGun.x = this.player.body.x + 40
        this.playerGun.y = this.player.body.y + 40
        
        const { worldX, worldY } = this.input.activePointer;

        const angleToPointer = (
            Math.atan2(worldY - this.playerGun.y,  worldX - this.playerGun.x)
        );

        this.player.playerGun.rotation = angleToPointer

        if (this.ground1.x < -319) {
            this.ground1.x = game.config.width + 319
        }
        if (this.ground2.x < -319) {
            this.ground2.x = game.config.width + 319
        }
    }
}