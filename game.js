var config = {
    type: Phaser.AUTO,
    width: 600,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    title: 'petitspig3ons',
    pixelArt: false,
    backgroundColor: 'ffffff'
};

// create game
var game = new Phaser.Game(config);

function preload() {

    // loader
    let pre = this.add.text(395, 10, "").setDepth(10).setFont('18px Arial').setAlign('center').setColor('#FFFFFF');
    this.load.on('progress', function (value) {
        pre.setText(Math.round(value * 100) + "%");
    });

    // background photo
    //this.load.image('jardin', 'assets/images/jardin.jpg');
    //this.load.image('rebord', 'assets/images/rebord-c.png');

    // chick
    this.load.atlas('pigeonAtlas', 'assets/images/spritesheet.png', 'assets/images/sprites.json');
    //this.load.image('ombre', 'assets/images/ombre.png');
    //console.log(this.textures.get('chickAtlas').frames);

    // cheese
    //this.load.image('fromage', 'assets/images/fromage.png');

    // audio
    //this.load.audio('song', 'assets/audio/Sunny Day-SoundBible-com-2064222612.mp3');

    // remove on load
    this.load.on('complete', function () {
        pre.destroy();
    });

}
/**
 * 
 * global vars
 * 
 */


// state control var
var etat = 0;

// random function
var rnd = function () { return Math.random() }

// tracking pause times
var inst = 0;
// how long to pause, which etat est le prochain
function pausNxt(t, e) {
    // var dedie du temps
    inst++;
    if (inst > t) {
        // bird lands
        etat = e;
        // reset
        inst = 0;
    }
}

/**
 * 
 * 
 */


function create() {

    /**
    * Depths - jardin = 1
    *          rebord = 5
    *          cheese = 7
    *          chick = 3, 6
    */

    // background photo
    //this.jardin = this.add.image(0, 0, 'jardin').setDepth(1).setOrigin(0, 0);
    //this.rebord = this.add.image(0, 0, 'rebord').setDepth(5).setOrigin(0, 0).setInteractive();

    // audio - must be here in Scene create()
    //this.song = this.sound.add('song', { loop: true });
    //this.song.play();

    // instructions
    //let text = "Appuyez sur le rebord pour nourrir l'oiseau";
    //this.instr = this.add.text(125, 430, text).setDepth(10).setFont('18px Arial').setAlign('center').setColor('#000000');


    /**
     * 
     * chick - created, no seen; origin is bottom center, depth of 3
     * remade sprite P
     * 
     */
    this.pigeon = this.add.sprite(250, 250, 'pigeonAtlas').setDepth(3).setOrigin(0.5, 1);

    // to control which face to use from atlas
    /* this.pigeon.skin = function (n) {
        this.setTexture('chickAtlas', 'chick' + n);
    } */
    this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNames('pigeonAtlas', {
            prefix: 'pgn',
            start: 1,
            end: 10,
            zeroPad: 2
        }),
        repeat: 0
    }, this);

    // flying in and ou
    

    // peck - pick up cheese
   
    
    // accepts private A of two skins while hopping
   
    this.cursors = this.input.keyboard.createCursorKeys();
    
}

// about 100 times per second
function update() {
    //console.log(etat);
    /**
     * game etat
     * 0 - waiting for cheese
     * 1 - waiting for chick ~ 2 secs
     * 2 - chick lands
     * 3 - gests
     * 4 - confirm available cheese, choose one, calc distance
     * 5 - calc moveX, Y for one hop
     * 6 - hop closer to cheese
     * 
     */

    // wait for cheese
    if (etat == 0) {
        // 
        if (this.cursors.right.isDown) {
            this.pigeon.play('walk', true);
            this.pigeon.scaleX = -1;
            this.pigeon.x += 1;
    
        } else if (this.cursors.left.isDown){
            this.pigeon.play('walk', true);
            this.pigeon.scaleX = 1;
            this.pigeon.x -= 1;
        }
    
    }

}




