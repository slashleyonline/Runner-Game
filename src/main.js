// Name: Ashley Seward
// Title: Rancher-Run

//CITATIONS:
// StateMachine.js from mkelly.me/blog/phaser-finite-state-machine, Thanks Nathan Altice
// Edmunds Font by Typodermic Fonts: https://www.dafont.com/edmunds.font?l[]=10
// Hoedown Heartbeat by Olele44: https://pixabay.com/music/acoustic-group-hoedown-heartbeat-385392/
// Winchester 1873 Single Shots by Grant Evans, https://soundbible.com/2071-Winchester-1873-Single-Shots.html
// Hooded Crow: Cawing by Mish7913 -- https://freesound.org/s/741366/ -- License: Creative Commons 0
// Major Punch by janbezouska https://freesound.org/people/janbezouska/sounds/399183/

// CREATIVE JUSTIFICATION

/*
Does your game do something technically interesting? 
Are you particularly proud of a programming technique you implemented? 
Did you look beyond the class examples and learn how to do something new? 

        Yes! My favorite piece of code I worked on for this project was for the crows.
    After beginning to instantiate many crows at once, I realized that the finite state machine
    wasn't working as intended, and I needed to find a way to make all machines step on update.
    So, I chose instead to add the crow's fsm to an array inside of the play scene, then having a 
    function built into the play scene that ran through the array and ran the step method. I also 
    really enjoyed making the gun component for the player. Seeing it rotate towards the cursor felt great. 

Does your game have a great visual style? 
Does it use music or art that you're particularly proud of? 
Are you trying something new or clever with the endless runner form?

        Once again I must say, I'm proud of the work I put into this project. I did all of the 
    sprites/animations for the project and I tried to follow a consistent theme, as well as 
    deliberate use of color to point out what's important to the player. As far as the game itself,
    I think runner/bullet hell is a sort of unseen genre. While that was the vision I had going in, I'm
    glad I chose something a bit more moderate.


*/

let config = {
    type: Phaser.AUTO,

    width: 640,
    height: 480,

    render: {
        pixelArt: true
    },

    physics: {
        default: "arcade",
        arcade: {
            //debug: true
        }
    },

    autoCenter: Phaser.Scale.CENTER_BOTH,
    zoom: 1,

    scene: [Menu, Play],
}

let game = new Phaser.Game(config)
