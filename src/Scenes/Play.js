class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    init() {
        //setting gravity
        this.physics.world.gravity.y = 2600
    }

    create() {

        //collision groups
        this.bulletColliderGroup = this.physics.add.group()
        this.crowColliderGroup = this.physics.add.group()

        //keyboard input setup
        this.keys = this.input.keyboard.createCursorKeys()
        this.add.image(game.config.width / 2, game.config.height / 2, 'sky')

        //instantiating game objects
        this.player = new Player(this, game.config.width / 4, 390)
        this.anims.resumeAll()
        this.playerGun = this.player.playerGun

        this.ground1 = new Ground(this, 0, game.config.height * 9/10, -500)
        this.ground2 = new Ground(this, game.config.width, game.config.height * 9/10, -500)

        this.crow1 = new Crow(this, game.config.width  * (1/5), game.config.height * 1/3)

        //setting up static ground
        this.groundBody = new GroundBody(this, game.config.width / 2, game.config.height, 'groundBody')
        this.physics.add.collider(this.player, this.groundBody)

        //moving player sprites to front layer
        this.player.body.gameObject.setToTop()
        this.playerGun.setToTop()    
    }
    
    update() {
        //step FSMs
        this.gameFSM.step()
        this.gunFSM.step()
        this.movementFSM.step()
        this.crowFSM.step()

        //Move Ground sprites
        console.log(this.gameFSM.state)
        if (this.gameFSM.state != 'gameOver'){
            if (this.ground1.x < -319) {
                this.ground1.x = game.config.width + 319
            }
            if (this.ground2.x < -319) {
                this.ground2.x = game.config.width + 319
            }
        }
        else {
            this.ground1.setVelocityX(0)
            this.ground2.setVelocityX(0)
        }
    }

}