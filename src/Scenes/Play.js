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
        this.load.spritesheet('crow','crow.png', {
            frameWidth: 16,
            frameHeight: 16
        })

        this.load.image('sky', 'sky.png')
        this.load.image('bullet', 'bullet.png')
    }

    create() {

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
        this.anims.create({
            key: 'jump',
            frameRate: 2,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('cowboy',{
                start: 2,
                end: 3,
            })
        })
        this.anims.create({
            key: 'fire',
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('cowboy',{
                start: 7,
                end: 8,
            })
        })
        this.anims.create({
            key: 'fly',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('crow',{
                start:0,
                end: 2
            })
        })

        //keyboard input setup
        this.keys = this.input.keyboard.createCursorKeys()

        this.add.image(game.config.width / 2, game.config.height / 2, 'sky')

        this.player = new Player(this, game.config.width / 2, game.config.height / 2)
        this.playerGun = this.player.playerGun

        this.ground1 = new Ground(this, 0, game.config.height * 9/10)
        this.ground2 = new Ground(this, game.config.width, game.config.height * 9/10)

        this.crow1 = new Crow(this, this.player, game.config.width  * (4/5), game.config.height * 1/3)

        this.groundBody = this.physics.add.sprite(game.config.width / 2, game.config.height, 'groundBody')
        this.groundBody.setImmovable(true)
        this.groundBody.body.allowGravity = false
        this.physics.add.collider(this.player, this.groundBody)

        this.player.body.gameObject.setToTop()

        this.playerGun.setToTop()

        console.log(game.config.width)
    
    }
    
    update() {
        this.gunFSM.step()
        this.movementFSM.step()

        this.playerGun.x = this.player.body.x + 40
        this.playerGun.y = this.player.body.y + 40

        this.physics.moveToObject(this.crow1, this.player)

        console.log(Phaser.Math.Distance.Between(this.player.x, this.player.y, this.crow1.x, this.crow1.y))
        if (Phaser.Math.Distance.Between(this.player.x, this.player.y, this.crow1.x, this.crow1.y) < 60) {
            console.log('game over!')
        }
        
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