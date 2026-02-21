class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    init() {
        //setting gravity
        this.physics.world.gravity.y = 2600
    }

    create() {

        this.crowFSMs = []

        //collision groups
        this.bulletColliderGroup = this.physics.add.group()
        this.crowColliderGroup = this.physics.add.group()
        this.obstacleColliderGroup = this.physics.add.group()

        //keyboard input setup
        this.keys = this.input.keyboard.createCursorKeys()
        this.add.image(game.config.width / 2, game.config.height / 2, 'sky')

        //instantiating game objects
        this.player = new Player(this, game.config.width / 4, 390)
        this.playerGun = this.player.playerGun

        this.ground1 = new Ground(this, 0, game.config.height * 9/10, -500)
        this.ground2 = new Ground(this, game.config.width, game.config.height * 9/10, -500)

        //setting up static ground
        this.groundBody = new GroundBody(this, game.config.width / 2, game.config.height, 'groundBody')
        this.physics.add.collider(this.player, this.groundBody)

        //moving player sprites to front layer
        this.player.body.gameObject.setToTop()
        this.playerGun.setToTop()

        //text
        this.scoreboard= this.add.image(game.config.width / 9, game.config.height - 16, 'scoreboard')
        this.scoreText = this.add.bitmapText(game.config.width / 80, game.config.height - 32, 'Edmunds', "Score: 0")
        this.score = 0
        
        setInterval(() => {
            if (this.gameFSM.state != 'gameOver'){
                if (Math.random() < 0.3) {
                    new Obstacle(this, 720, 440, 'cactus', this.groundBody)
                }

                let crowSpawn = this.lessOfTwo((this.score / 50), 10)
                for (let i = 0; i < (crowSpawn); i++){
                    new Crow(this, game.config.width + 200 + (500 * Math.random()), game.config.height * 1/3 -(500 * Math.random()))
                    console.log('crow spawning!')
                }
    
            }
        }, 5000)

        this.timer = this.time.addEvent({
            delay: Infinity,
            loop: false,
            startAt: 0,
            paused: false,
        })

        //music
        this.bgMusic = this.sound.add('bgmusic')
        this.bgMusic.volume = 0.25
        this.bgMusic.loop = true
        this.bgMusic.play()
    }
    
    update(delta) {

        console.log(this.score)

        this.scoreText.setText(String("Score: " + this.score))

        //step FSMs
        this.gameFSM.step()
        this.gunFSM.step()
        this.movementFSM.step()
        this.stepCrowFSMs()
        //Move Ground sprites
        if (this.gameFSM.state != 'gameOver'){
            this.score= Math.floor( this.timer.getElapsed() / 100)
            console.log(this.timer.getElapsed())
            if (this.ground1.x < -319) {
                this.ground1.x = game.config.width + 319
            }
            if (this.ground2.x < -319) {
                this.ground2.x = game.config.width + 319
            }
        }
        else {
            this.timer.remove()
            this.ground1.setVelocityX(0)
            this.ground2.setVelocityX(0)
            this.obstacleColliderGroup.enable = false
            this.bulletColliderGroup.enable = false
            this.obstacleColliderGroup.setVelocityX(0)
            this.bulletColliderGroup.setVelocityX(0)
            
        }
    }

    lessOfTwo(num1, num2) {
        if (num1 < num2) {
            return num1
        }
        else {
            return num2
        }
    }

    stepCrowFSMs() {
        for (let i = 0; i < this.crowFSMs.length; i++) {
            console.log('step')
            this.crowFSMs[i].step()
        }
    }

    spawnObstacles() {
        //based on a random ratio, spawn obstacles every few seconds
        new Obstacle(this, 720, 440, 'cactus', this.groundBody)
        

    }
}