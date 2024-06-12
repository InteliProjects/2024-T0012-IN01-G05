export default class cutScene extends Phaser.Scene {
    constructor() {
        super({ key: 'cutScene' });
    }

    preload() {
        this.load.video('cutTeste', './assets/cutscenes/cutTeste.mp4'); // carrega o video da cutscene da historia
    }

    create() {
        this.sound.stopAll(); // para a música de fundo do jogo 

        // Inicia o video da Cutscene
        this.videoTeste = this.add.video(600, 300, 'cutTeste')
        this.videoTeste.play()

        // add o som da cutscene
        this.somCutScene = this.sound.add('somCutScene', { volume: 0.1 });

        //delay para iniciar o som da cutscene
        this.time.delayedCall(5000, () => {
            this.somCutScene.play();
        });

        //função para identificar que o video acabou e iniciar a proxima cena
        this.videoTeste.on('complete', () => {
            this.scene.stop()
            this.scene.start('Game')
        });

        // add botão que pula a CutScene
        this.skip = this.add.text(1000, 500, 'Pular?')
        this.skip.setInteractive()
        this.skip.on('pointerdown', () => {
            this.scene.stop()
            this.scene.start('Game')
        })
    }
}
