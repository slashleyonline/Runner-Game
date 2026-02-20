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
        
        this.parentScene = scene
        this.parentScene.add.existing(this)
        this.parentScene.physics.add.existing(this)

        this.body.setCollideWorldBounds()

        this.playerGun = new PlayerGun(this.scene, this, this.x, this.y)

        this.body.allowGravity = true

        this.scale = 2.5

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


class RunningState extends State {
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
        console.log('moving left!')
        //player.play('run')
        //player.playerGun.play('bounceArm')
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
        console.log('moving right!')
        //player.play('run')
        //player.playerGun.play('bounceArm')
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
        console.log('jumping!')
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
    enter(scene, playerGun) {
        playerGun.play('bounceArm', true)
    }
    execute(scene, playerGun) {
        scene.input.on('pointerdown', () => {
            console.log('bam!')
            this.stateMachine.transition('shooting')
            return
        })
    }
}
class ShootingState extends State {
    enter(scene, playerGun) {
        playerGun.play('fire')
        
        scene.time.addEvent({
            delay: 350, // in ms
            callback: () => {
                this.stateMachine.transition('aiming')
                return
            }
        })
    }
}
class ReloadingState extends State {
    enter(scene, playerGun) {

    }
    execute(scene, playerGun) {

    }
}