class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    init() {
        //setting gravity
        this.physics.world.gravity.y = 2600
    }

    preload() {
        //loading sprites/images

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
        this.load.spritesheet('playSign', 'playSign.png', {
            frameWidth: 128,
            frameHeight: 64
        })
        this.load.spritesheet('creditsSign', 'CreditsSign.png', {
            frameWidth: 128,
            frameHeight: 64
        })
        this.load.spritesheet('creditsInfo', 'CreditsInfoSign.png', {
            frameWidth: 480,
            frameHeight: 360
        })
        this.load.spritesheet('howToPlaySign', 'HowToPlaySign.png', {
            frameWidth: 128,
            frameHeight: 64
        })
        this.load.spritesheet('howToSign', 'HowToSign.png', {
            frameWidth: 480,
            frameHeight: 360
        })
        this.load.spritesheet('playSignFragments', 'playSignFragments.png', {
            frameWidth: 64,
            frameHeight: 64,
        })
        this.load.spritesheet('replayButton', 'replayButton.png', {
            frameWidth: 16
        })
        this.load.spritesheet('quitButton', 'quitButton.png', {
            frameWidth: 16
        })
        this.load.spritesheet('cactus', 'cactus.png', {
            frameWidth: 30,
            frameHeight: 20
        })

        this.load.image('scoreboard', 'scoreboard.png')
        this.load.image('gravestone', 'gravestone.png')
        this.load.image('sky', 'sky.png')
        this.load.image('bullet', 'bullet.png')

        this.load.audio('bgmusic', 'audio/music/olele44-hoedown-heartbeat.mp3')
        this.load.audio('gunfire1', 'audio/sounds/gunfire1.wav')
        this.load.audio('gunfire2', 'audio/sounds/gunfire2.wav')
        this.load.audio('gunfire3', 'audio/sounds/gunfire3.wav')
        this.load.audio('punch', 'audio/sounds/punch.wav')
        this.load.audio('crow1', 'audio/sounds/crow1.wav')
        this.load.audio('crow2', 'audio/sounds/crow2.wav')
        this.load.audio('crow3', 'audio/sounds/crow3.wav')



        this.load.bitmapFont('Edmunds', 'font/Edmunds.png', 'font/Edmunds.xml')
    }

    create() {
        // Create Anims
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
            repeat: 0,
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
        this.anims.resumeAll()

        //REMOVE THIS
        this.keys = this.input.keyboard.createCursorKeys()

        //physics groups
        this.bulletColliderGroup = this.physics.add.group()
        this.crowColliderGroup = this.physics.add.group()
        this.signColliderGroup = this.physics.add.group()

        //background
        this.add.image(game.config.width / 2, game.config.height / 2, 'sky')
        this.ground1 = new Ground(this, 0, game.config.height * 9/10, 0)
        this.ground2 = new Ground(this, game.config.width, game.config.height * 9/10, 0)

        //instantiating game objects
        this.player = new Player(this, game.config.width / 4, 390)
        this.playerGun = this.player.playerGun
        
        //setting up static ground
        this.groundBody = new GroundBody(this, game.config.width / 2, game.config.height, 'groundBody')
        this.physics.add.collider(this.player, this.groundBody)

        //add menuSigns
        this.playSign = new MenuSign(this, game.config.width * 0.8, game.config.height * 0.7, 'playSign')
        this.howToSign = new MenuSign(this, game.config.width * 0.5, game.config.height * 0.4, 'howToPlaySign')
        this.creditsSign = new MenuSign(this, game.config.width * 0.15, game.config.height * 0.1, 'creditsSign')


    }

    update() {
        //step FSMs
        this.gameFSM.step()
        this.gunFSM.step()

        this.playerGun.x = this.player.x - 20
        this.playerGun.y = this.player.y -20
    }

}