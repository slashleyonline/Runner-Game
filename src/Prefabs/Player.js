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
        }, [scene, this])

        this.parentScene.gunFSM = new StateMachine('aiming', {
            aiming: new AimingState(),
            shooting: new ShootingState(),
            reloading: new ReloadingState(),
        }, [scene, this.playerGun])
    }
}

class PlayingState extends State {
    execute(scene, player) {
        //Make playerGun follow player
        player.playerGun.x = player.body.x + 40
        player.playerGun.y = player.body.y + 40
    }
}

class GameOverState extends State {
    enter() {
        //code here should bring game to an end
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
        player.body.setVelocityY(-1000);
    }
    
    execute(scene, player){
        if (player.body.touching.down) {
            const {left, right, up, down, space, shift} = scene.keys
            player.play('run', true)

            if(Phaser.Input.Keyboard.JustDown(left)) {
                this.stateMachine.transition('moveLeft')
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
}


class AimingState extends State {
    //default
    enter(scene, playerGun) {
        if (scene.scene.key != 'menuScene'){
            playerGun.play('bounceArm', true)
        }

        scene.input.once('pointerdown', () => {
            this.stateMachine.transition('shooting')
            return
        })
    }
    execute(scene, playerGun) {
        
        const { worldX, worldY } = scene.input.activePointer;
        const angleToPointer = (
            Math.atan2(worldY - playerGun.y,  worldX - playerGun.x)
        );

        playerGun.rotation = angleToPointer
    }
}
class ShootingState extends State {
    //default
    enter(scene, playerGun) {
        playerGun.play('fire')

        const { worldX, worldY } = scene.input.activePointer;

        this.bullet = new Bullet(scene, worldX, worldY, playerGun.x, playerGun.y, playerGun.rotation)

        scene.time.addEvent({
            delay: 300, // in ms
            callback: () => {
                this.stateMachine.transition('aiming')
                return

            },
        })
    }
}
class ReloadingState extends State {
    //may get axed depending on how much time is left
    enter(scene, playerGun) {

    }
    execute(scene, playerGun) {

    }
}