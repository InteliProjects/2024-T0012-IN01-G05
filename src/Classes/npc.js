import Balao from './balao.js';

export default class Npc extends Phaser.Physics.Arcade.Sprite {
    constructor(player, scene, x, y, imagem, colliders, animName, startFrame, endFrame, frases) {
        super(scene, x, y, imagem);
        this.player = player;
        this.scene = scene;
        this.frases = frases;
        this.enterImage = null;

        this.createNpc(colliders);
        this.createAnim(animName, startFrame, endFrame);
        this.adicionarBalao();
    }

    createNpc(colliders) {
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        this.scene.physics.add.collider(this, colliders);
    }

    createAnim(animName, startFrame, endFrame) {
        this.scene.anims.create({
            key: animName,
            frames: this.scene.anims.generateFrameNumbers(this.texture.key, { start: startFrame, end: endFrame }),
            frameRate: 3,
            repeat: -1
        });
        this.anims.play(animName, true);
    }

    adicionarBalao() {
        this.scene.physics.add.overlap(this.player, this, () => {
            if (!this.enterImage) {
                this.enterImage = this.scene.add.image(this.x + 10, this.y - 40, 'botao-enter').setScale(0.15);
            }
        });

        const balao1 = new Balao(this.scene, this.frases);
        balao1.createSpeechBubble();

        const teclaInteracao = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        teclaInteracao.on("down", () => {
            if (this.enterImage) {
                const novaFrase = balao1.mudarFrase();
                balao1.updateSpeechBubbleText(novaFrase);
                this.enterImage.destroy();
            }
        });
    }
}