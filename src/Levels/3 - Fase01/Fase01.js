// Importação dos módulos necessários para a cena.
import BaseFase from '../../Classes/BaseFase.js';
import TiledMapFase01 from './TiledMapFase01.js'
import Monstro from '../../Classes/monstro.js'; // Ajuste conforme sua estrutura de pastas
import Npc from '../../Classes/npc.js'; // Ajuste conforme sua estrutura de pastas

export default class Fase01 extends BaseFase {
  constructor() {
    super('Fase01', 50, 816, 50, 816, 'Fase02'); // chave da cena, posição inicial X do jogador, posição inicial Y do jogador
    this.checkpointPositions = [
      { x: 964, y: 274 },
      { x: 12, y: 21 },
      { x: 1212, y: 121 },
      // ... adicione tantos checkpoints quanto necessário
    ];
  }

  create() {

    super.create(TiledMapFase01);

    this.setupcheckPoint();

    // Criação dos monstros específicos desta fase
    this.criarMonstros();

    // Integração do NPC específico desta fase
    this.criarNpcs();

    // Se necessário, adicione aqui outras customizações específicas desta fase
  }

  criarMonstros() {
    this.monstro1 = new Monstro(this, 591, 359.09, 'monstro', this.game.colliders, 'andando', 0, 1, 215, 592, this.player).setDepth(-1);
    this.monstro2 = new Monstro(this, 1548, 249, 'monstro', this.game.colliders, 'andando', 0, 1, 1032, 1549, this.player);
    this.monstro3 = new Monstro(this, 3025, 182, 'monstro', this.game.colliders, 'andando', 0, 1, 3025, 3398, this.player);
    // Adicione aqui outros monstros conforme necessário
  }

  criarNpcs() {
    this.npc1 = new Npc(this.player, this, 3795, 675, 'npc1', this.game.colliders, 'falando', 0, 5, [
      'Unilson parabéns você juntou a primeira página do livro!',
      'Aperte a tecla "P" para que você possa ler a nova página',
      'Leia tudo atentamente, esses conhecimentos serão necessários mais a frente!'
    ]).setScale(0.75);
    // Adicione aqui outros NPCs conforme necessário
  }

  // Sobrescreva update se necessário, ou adicione métodos específicos para esta fase
  update() {
    super.update(); // Chamada ao update da classe base, se necessário

    this.setupcheckPoint(this.checkpointPositions[this.checkPointIndex].x, this.checkpointPositions[this.checkPointIndex].y)
    //define qual ação será realizada quando a tecla P for apertada
    const keyPJustDown = Phaser.Input.Keyboard.JustDown(this.keyP)
    if(keyPJustDown) {
        this.scene.pause('Fase03');
        this.scene.launch('HudLivro', { previousScene: this.scene.key, pedacosColetados: this.papelzinhosColetados }); // inicia a cena do livro
    }
    // Aqui você pode adicionar lógica específica de update para esta fase

    //Atualiza a posição do personagem a cada quadro e exibe no console
    const x = this.player.x;
    const y = this.player.y;
    console.log(`Posição do personagem: x=${x}, y=${y}`);
  }
}
