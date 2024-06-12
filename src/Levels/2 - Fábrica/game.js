// Importações necessárias
import BaseFase from '../../Classes/BaseFase.js';
import TiledMapGame from './TiledMapGame.js';
import Npc from '../../Classes/npc.js';
export default class Game extends BaseFase {
    constructor() {
        // Defina as propriedades específicas para a cena 'Game'
        // A chave da cena, as coordenadas iniciais do jogador, as coordenadas de respawn, e a próxima cena
        super('Game', 100, 490, 409, 400);
    }

    create() {
       this.scene.get('cutScene').somCutScene.stop()

        // Utilize TiledMapGame como a classe do mapa nesta cena específica
        super.create(TiledMapGame);

        // Adiciona lógicas específicas para a cena 'Game', como NPCs
        this.addNpcs();

        // inicia o som de fundo novamente
        this.scene.get('tutorial').somDeFundo.play()

        this.physics.add.overlap(this.player, this.game.mudaCenaCollider, () => {
            if(this.scene.get('telaInicial').facil){
                this.scene.start('Fase01F')
            }else{
                this.scene.start('Fase01')
            }
        })
    }

    addNpcs() {
        // Exemplo de adição de um NPC à cena
        this.npc1 = new Npc(this.player, this, 637, 490, 'npc1', this.game.colliders, 'falando', 0, 5, [
            "Olha você de novo por aqui",
            "Unilson por favor ajude a gente!",
            "O Sr.Poluição invadiu a fábrica da Unilever",
            "Ele roubou o livro de segredos e o rasgou em vários pedaços",
            "Você achou a capa do livro mas ainda faltam as páginas",
            "Procure e junte todos os pedaços de páginas que estão espalhados pelo nosso mundo.",
            "Contamos com você!"  
        ]).setScale(0.75);
    }

    update() {
        super.update(); // Chama o update da BaseFase, se houver lógica de update comum lá
        // Adicione aqui qualquer lógica de update específica para a cena 'Game'
    }
}
