// Importação dos módulos necessários para a cena.
import BaseFase from '../../Classes/BaseFase.js';
import TiledMapFase01F from './TiledMapFase01F.js'
import Npc from '../../Classes/npc.js'; // Ajuste conforme sua estrutura de pastas

export default class Fase01F extends BaseFase {
  constructor() {
    super('Fase01F', 50, 400, 50, 400, 'Fase02F'); // chave da cena, posição inicial X do jogador, posição inicial Y do jogador
    this.checkpointPositions = [
      { x: 0, y: 0 },
      // ... adicione tantos checkpoints quanto necessário
    ];
  }
//   x=311.33333333333246, y=491.50000000000006

  create() {
    super.create(TiledMapFase01F);

    this.setupcheckPoint();

    // Criação dos monstros específicos desta fase

    // Integração do NPC específico desta fase
    this.criarNpcs();

    // Se necessário, adicione aqui outras customizações específicas desta fase
  }

  criarNpcs() {
    this.npc1 = new Npc(this.player, this, 1996, 491, 'npc1', this.game.colliders, 'falando', 0, 5, [
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
