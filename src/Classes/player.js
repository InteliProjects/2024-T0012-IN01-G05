export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.movingPlatforms = null;
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Configurações do jogador
        this.setScale(0.15);
        this.setBounce(0);
        this.setCollideWorldBounds(true);
        this.setSize(150, 330, true);
        this.body.setOffset(180, 170);

        // Criação das animações
        this.createAnimations(scene, texture);

        // Configuração dos controles
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.spaceKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.moveSpeed = 200;

        this.pulo = scene.sound.add('pulo', { volume: 0.05 }); // add o som de pulo no player
        this.correr = scene.sound.add('correr', { loop: true, volume: 0.2 })
        this.correrPlaying = false; // Flag para controlar se o som de passos está sendo reproduzido

    }

    createAnimations(scene, texture) {
        // Criação das animações do jogador
        // animação andando para a esquerda
        scene.anims.create({
            key: 'left',
            frames: scene.anims.generateFrameNumbers(texture, { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        });
        // animação parado
        scene.anims.create({
            key: 'idle',
            frames: scene.anims.generateFrameNumbers(texture, { start: 4, end: 5 }),
            frameRate: 1.5,
            repeat: -1
        });
        // animação andando para a direita
        scene.anims.create({
            key: 'right',
            frames: scene.anims.generateFrameNumbers(texture, { start: 6, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        // animação pulando
        scene.anims.create({
            key: 'up',
            frames: scene.anims.generateFrameNumbers('jmp', { start: 0, end: 1 }),
            frameRate: 5,
            repeat: 1
        });
        // animação pulando para a direita
        scene.anims.create({
            key: 'up.right',
            frames: scene.anims.generateFrameNumbers(texture, { start: 10, end: 15 }),
            frameRate: 6,
            repeat: 0
        });
        // animação pulando para a esquerda
        scene.anims.create({
            key: 'up.left',
            frames: scene.anims.generateFrameNumbers(texture, { start: 23, end: 18 }),
            frameRate: 6,
            repeat: 0
        });
    }

    // Método para verificar se o jogador está sobre uma plataforma móvel.
    isOnMovingPlatform(movingPlatforms) {
        let isOnPlatform = false;
        movingPlatforms.children.iterate((plat) => {
            if (this.x < plat.x + plat.body.width &&
                this.x + this.body.width > plat.x &&
                this.y < plat.y + plat.body.height &&
                this.height + this.y > plat.y) {
                isOnPlatform = true;
            }
        });
        return isOnPlatform;
    }

    // configuração para ativar as plataformas moveis
    setMovingPlatforms(movingPlatforms) {
        this.movingPlatforms = movingPlatforms;
    }
    // método para verificar se o player está sobre uma plataforma movel
    isOnMovingPlatform() {
        if (!this.movingPlatforms) return false;
        let isOnPlatform = false;
        this.movingPlatforms.children.iterate((plat) => {
            if (this.body.bottom <= plat.body.top &&
                this.body.bottom >= plat.body.top - 5 && // Um pequeno threshold para "sensibilidade"
                this.body.x < plat.body.right &&
                this.body.right > plat.body.x) {
                isOnPlatform = true;
            }
        });
        return isOnPlatform;
    }

    update() {

        //criação de variaveis do teclado
        const isMovingLeft = this.cursors.left.isDown;
        const isMovingRight = this.cursors.right.isDown;


        // configuracação de movimentação de acordo com qual teclad o player está clicando
        if (isMovingLeft) {
            this.setVelocityX(-this.moveSpeed);
        } else if (isMovingRight) {
            this.setVelocityX(this.moveSpeed);
        } else {
            this.setVelocityX(0);
        }
        const isOnMovingPlatform = this.isOnMovingPlatform();
        const isJumping = !this.body.touching.down && !isOnMovingPlatform;
        if (isJumping) {
            if (isMovingRight) {
                this.anims.play('up.right', true);
            } else if (isMovingLeft) {
                this.anims.play('up.left', true);
            } else {
                this.anims.play('up', true);
            }

        } else if (isMovingLeft) {
            this.anims.play('left', true);
        } else if (isMovingRight) {
            this.anims.play('right', true);
        } else {
            this.anims.play('idle', true);
        }

        if (((isMovingLeft || isMovingRight) && !this.correrPlaying) && this.body.touching.down && !isJumping) {
            this.correr.play();
            this.correrPlaying = true; // Atualiza para indicar que o som está sendo reproduzido
        } else if ((!isMovingLeft && !isMovingRight && this.correrPlaying) || isJumping) {
            this.correr.stop();
            this.correrPlaying = false; // Atualiza para indicar que o som não está mais sendo reproduzido
        }

        // Verificar se a tecla de espaço foi pressionada
        if ((this.spaceKey.isDown || this.cursors.up.isDown) && this.body.touching.down) {
            this.setVelocityY(-350);
            this.pulo.play();
        }
    }
}
