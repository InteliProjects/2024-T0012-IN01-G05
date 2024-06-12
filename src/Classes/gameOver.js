export default class GameOver extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOver' });
  }
  init(data) {
    this.previousScene = data.previousScene;// define qual era a cena qual o player estava antes

  }
  create() {

    this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'telaFim').setOrigin(0.5);// add background
    // add botao de jogar novamente
    this.tryAgainButton = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY + 230, 'botaoDNV').setInteractive().setScale(0.8);
    //configuração da função do botão para reiniciar o jogo
    this.tryAgainButton.on('pointerdown', () => {
      this.scene.stop();
      // Decide qual cena iniciar baseando-se na cena anterior
      if (this.previousScene === 'tutorial') {
        this.scene.start('tutorial');
      } else if (this.scene.get('telaInicial').facil) {
        this.scene.start('Fase01F');
      } else {
        this.scene.start('Fase01');
      }
    });

    //configuração para aumentar o botão quando o mouse passar nele
    this.tryAgainButton.on('pointerover', () => {
      this.input.setDefaultCursor("pointer");
      this.tryAgainButton.setScale(1) // aumenta o botao de reiniciar o jogo
    })
    this.tryAgainButton.on('pointerout', () => {
      this.input.setDefaultCursor("default");
      this.tryAgainButton.setScale(0.8) //voltar o botao de reiniciar o jogo ao seu tamanho normal
    })
  }
}
