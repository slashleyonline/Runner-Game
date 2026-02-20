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
    }
}


class RunningState extends State {
    enter(scene, player) {
        player.body.setVelocity(0)
        player.play('run', true)
        player.playerGun.play('bounceArm', true)
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
        player.playerGun.play('bounceArm', true)

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
        player.playerGun.play('bounceArm', true)
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
        player.body.setVelocityY(-1000);
    }
    
    execute(scene, player){
        if (player.body.touching.down) {

            const {left, right, up, down, space, shift} = scene.keys


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