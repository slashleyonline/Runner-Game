class Crow extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'crow')

        this.parent = parent
        this.parentScene = scene
        this.parentScene.add.existing(this)
        this.parentScene.physics.add.existing(this)
        this.parentScene.crowColliderGroup.add(this)

        this.anims.play('fly')

        this.body.allowGravity = false
        this.body.setImmovable()

        this.scale = 2
        this.body.setCircle(8)

        this.parentScene.crowFSMs.push(new StateMachine('flying',{
            flying: new FlyingState(),
            dead: new DeadState()
        }, [scene, this]))
    }
    
}

class FlyingState extends State {
    enter(scene, crow) {
        scene.physics.add.collider(crow, scene.bulletColliderGroup, (body1,body2) =>{
            body2.destroy()
            this.stateMachine.transition('dead')
            return
        })
    }

    execute(scene, crow) {
        if (scene.gameFSM.state != 'gameOver'){
            console.log('flying!')
            console.log(scene.player.body.position)
            scene.physics.moveToObject(crow, scene.player, 250)

            if (Phaser.Math.Distance.Between(scene.player.x, scene.player.y, crow.x, crow.y) < 60) {
                console.log('game over!')
                scene.gameFSM.transition('gameOver')
            }

        }

    }
}
class DeadState extends State {
    enter(scene, crow) {
        crow.destroy()
        return
    }

}