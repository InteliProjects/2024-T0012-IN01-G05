// PauseScene.js
export default class menuPause extends Phaser.Scene {
  constructor() {
    super({ key: 'menuPause' });
  }

  init(data) {
    // Recebe os dados necessários da cena que chama
    this.previousScene = data.previousScene;
  }

  preload() {
    this.keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodesESC);// adiciona a tecla P
  }

  create() {
    // Define o centro da tela
    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY;

    // Adiciona o fundo da HUD de pausa
    this.HUDpausado = this.add.image(centerX, centerY, 'HUDpause').setScrollFactor(0).setInteractive();

    // Adiciona botões
    this.createButton(centerX - 170, centerY - 40, 'resume', this.resumeGame);
    this.createButton(centerX + 60, centerY + 80, 'volume', this.toggleVolume);
    this.createButton(centerX + 350, centerY - 80, 'menuInicial', this.gotoMainMenu);


    // Adiciona o botão mute se necessário, você deve definir 'mute' como uma imagem de botão de som desligado no seu jogo
    this.mute = this.add.image(centerX, centerY, 'mute').setVisible(false).setScrollFactor(0);
    if(this.taMutado){
      this.mute.setVisible(true)
    }

    // Adiciona a tecla Q para sair da pausa
    this.keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

    // Pause a física e o som
    this.game.sound.pauseAll();
    this.physics.pause();
  }

  createButton(x, y, image, callback) {
    const button = this.add.image(x, y, image).setScrollFactor(0).setInteractive();
    button.on('pointerover', () => {
      this.input.setDefaultCursor("pointer");
      button.setScale(1.2)
    })
   button.on('pointerout', () => {
      this.input.setDefaultCursor("default");
      button.setScale(1)
    })

    button.on('pointerdown', callback.bind(this));
  }

  resumeGame() {
    // Retoma o jogo
    this.game.sound.resumeAll();
    this.physics.resume();
    this.scene.stop();
    this.scene.resume(this.previousScene);
  }

  toggleVolume() {
    // Lógica para alternar o som
    if (this.game.sound.mute) {
      this.game.sound.setMute(false);
      this.mute.setVisible(false);
      this.taMutado = false
    } else {
      this.game.sound.setMute(true);
      this.mute.setVisible(true);
      this.taMutado = true
    }
  }

  gotoMainMenu() {
    // Vai para o menu principal
    this.game.sound.stopAll();
    this.scene.stop(this.previousScene);
    this.scene.start('telaInicial'); // Certifique-se de que 'telaInicial' seja o nome correto da cena inicial
  }

  update() {
    // Define a ação da tecla Q 
    if (this.keyESC.isDown) {
      this.resumeGame(); // Usa a função resumeGame que já lida com resumir o jogo e parar esta cena
    }
  }
}
