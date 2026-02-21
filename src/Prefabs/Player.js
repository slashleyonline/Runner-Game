class PlayerGun extends Phaser.GameObjects.Sprite {
    constructor(scene, parent, x, y) {
        super(scene, x, y, "cowboy", 5)

        this.parent = parent
        this.parentScene = scene
        this.parentScene.add.existing(this)

        this.setOrigin(0.35,0.28)

        this.scale = 2.5
    }

}

class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "cowboy", 0)
        
        //instantiate to scene
        this.parentScene = scene
        this.parentScene.add.existing(this)
        this.parentScene.physics.add.existing(this)

        //physics/scale tweaking
        this.body.setCollideWorldBounds()
        this.body.allowGravity = true
        this.scale = 2.5
        this.body.setSize(14, 41)

        //adding gun
        this.playerGun = new PlayerGun(this.scene, this, this.body.x + 40, this.body.y + 40)

        //FSMs
        this.parentScene.gameFSM = new StateMachine('playing', {
            playing: new PlayingState(),
            gameOver: new GameOverState() 
        }, [scene, this])

        this.parentScene.movementFSM = new StateMachine('running', {
            running: new RunningState(),
            moveLeft: new MoveLeftState(),
            moveRight: new MoveRightState(),
            jumping: new JumpingState(),
            dead: new DeadPlayerState(),
        }, [scene, this])

        this.parentScene.gunFSM = new StateMachine('aiming', {
            aiming: new AimingState(),
            shooting: new ShootingState(),
            deadGun: new DeadGunState(),
        }, [scene, this.playerGun])

        scene.physics.add.collider(this, scene.obstacleColliderGroup, () =>{
            scene.gameFSM.transition('gameOver')
        })
    }
}

class PlayingState extends State {
    execute(scene, player) {
        //Make playerGun follow player
        player.playerGun.x = player.body.x - 3
        player.playerGun.y = player.body.y + 30
    }
}

class GameOverState extends State {
    enter(scene, player) {
        //code here should bring game to an end
        scene.anims.pauseAll()
        player.body.setImmovable()
        player.body.enable = false

        scene.gunFSM.transition('deadGun')
        scene.movementFSM.transition('dead')

        scene.add.image( game.config.width / 2, game.config.height / 2, 'gravestone')
        scene.replayButton = new ReplayButton(scene, game.config.width / 2, game.config.height * 4/ 5, 'replayButton')
    }
    execute(scene, player) {
        player.playerGun.x = player.body.x -3
        player.playerGun.y = player.body.y + 30
    }
}

class RunningState extends State {
    //default
    enter(scene, player) {
        player.body.setVelocity(0)
        player.play('run', true)
    }
    execute(scene, player){
        const {left, right, up, down, space, shift} = scene.keys

        if(Phaser.Input.Keyboard.JustDown(up)) {
            this.stateMachine.transition('jumping')
            return
        }

        if(Phaser.Input.Keyboard.JustDown(left)) {
            this.stateMachine.transition('moveLeft')
            return
        }
        if(Phaser.Input.Keyboard.JustDown(right)) {
            this.stateMachine.transition('moveRight')
            return
        }

    }
}
class MoveLeftState extends State {
    enter(scene, player){
        player.body.setVelocityX(-100)
        player.play('run', true)

    }
    
    execute(scene, player){
        const {left, right, up, down, space, shift} = scene.keys

        if(Phaser.Input.Keyboard.JustDown(up)) {
            this.stateMachine.transition('jumping')
            return
        }

        if(Phaser.Input.Keyboard.JustDown(right)) {
            this.stateMachine.transition('moveRight')
            return
        }

        if(!left.isDown && !right.isDown) {
            this.stateMachine.transition('running')
            return
        }
    }
}

class MoveRightState extends State {
    enter(scene, player){
        player.body.setVelocityX(100)
        player.play('run', true)
    }
    
    execute(scene, player){
        const {left, right, up, down, space, shift} = scene.keys

        if(Phaser.Input.Keyboard.JustDown(up)) {
            this.stateMachine.transition('jumping')
            return
        }

        if(Phaser.Input.Keyboard.JustDown(left)) {
            this.stateMachine.transition('moveLeft')
            return
        }

        if(!left.isDown && !right.isDown) {
            this.stateMachine.transition('running')
            return
        }
    }
}

class JumpingState extends State {
    enter(scene, player) {
        player.play('jump')
        player.body.setVelocityY(-750);
    }
    
    execute(scene, player){
        if (player.body.touching.down) {
            const {left, right, up, down, space, shift} = scene.keys
            player.play('run', true)

            if(left.isDown) {
                this.stateMachine.transition('moveLeft')
                return
            }

            if(right.isDown) {
                this.stateMachine.transition('moveRight')
                return
            }

            if(!left.isDown && !right.isDown) {
                this.stateMachine.transition('running')
                return
            }
        }
    }
}


class AimingState extends State {
    //default
    enter(scene, playerGun) {
        if (scene.gameFSM.state != 'gameOver'){
            if (scene.scene.key != 'menuScene'){
                playerGun.play('bounceArm', true)
            }

            scene.input.once('pointerdown', () => {
                if (scene.gameFSM.state != 'gameOver'){
                    this.stateMachine.transition('shooting')
                    return
                }
            })
        }
    }
    execute(scene, playerGun) {
        if (scene.gameFSM.state != 'gameOver'){
            const { worldX, worldY } = scene.input.activePointer;
            const angleToPointer = (
                Math.atan2(worldY - playerGun.y,  worldX - playerGun.x)
            );

            playerGun.rotation = angleToPointer
        }
    }
}
class ShootingState extends State {
    //default
    enter(scene, playerGun) {
        playerGun.play('fire')

        const { worldX, worldY } = scene.input.activePointer;

        this.bullet = new Bullet(scene, worldX, worldY, playerGun.x, playerGun.y, playerGun.rotation)

        const sounds= ['gunfire1', 'gunfire2', 'gunfire3']
        const fireSound = Math.floor(Math.random() * 3)
        scene.sound.volume= 0.15
        scene.sound.play(sounds[fireSound])

        scene.time.addEvent({
            delay: 150, // in ms
            callback: () => {
                this.stateMachine.transition('aiming')
                return

            },
        })
    }
}


class DeadPlayerState extends State {
    //empty state, no more control over gun
}

class DeadGunState extends State {
    //empty state, no more control over gun
}