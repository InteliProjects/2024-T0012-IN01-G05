export default class Monstro extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, imagem, colliders, animName, startFrame, endFrame, leftLimit, rightLimit, player) {
        super(scene, x, y, imagem);

        this.speed = 0.6;
        this.leftLimit = leftLimit;
        this.rightLimit = rightLimit;
        this.direction = 1;
        this.player = player;

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        this.body.setAllowGravity(false); // Ajuste conforme necessário

        // Certifique-se de criar e configurar colisores no método adequado e não no construtor
        if (colliders) {
            this.scene.physics.add.collider(this, colliders);
        }

        // Cria a animação do monstro
        this.createAnim(animName, startFrame, endFrame);

        // Escuta o evento 'update' de forma segura
        this.scene.events.on('update', this.movimento, this);
        // Assegure-se de remover o ouvinte quando o monstro não for mais necessário
        this.on('destroy', () => {
            this.scene.events.off('update', this.movimento, this);
        });
    }

    createAnim(animName, startFrame, endFrame) {
        this.scene.anims.create({
            key: animName,
            frames: this.scene.anims.generateFrameNumbers(this.texture.key, { start: startFrame, end: endFrame }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.play(animName, true);
    }

    movimento() {
        this.x += this.speed * this.direction;
        if (this.x >= this.rightLimit || this.x <= this.leftLimit) {
            this.direction *= -1;
            this.toggleFlipX();
        }
    
        // Verifique se a colisão está acontecendo
        if (this.scene.physics.overlap(this, this.player)) {
            // Aqui você pode chamar o método para tratar a colisão
            // Por exemplo:
            this.scene.handlePlayerCollision(this.player, this);
        }
    }

    toggleFlipX() {
        this.setFlipX(this.direction === 1);
    }
}
