// Importações necessárias
import BaseFase from '../../Classes/BaseFase.js';
import TiledMapFase03F from './TiledMapFase03F.js'
import Npc from '../../Classes/npc.js';
import Monstro from '../../Classes/monstro.js';

export default class Fase03F extends BaseFase {
    constructor() {
        // A chave da cena, as coordenadas iniciais do jogador, as coordenadas de respawn, e a próxima cena
        super('Fase03F', 50, 446, 50, 446, 'Fase04'); // Substitua 'NomeDaProximaCena' pela sua próxima cena real
    }

    create() {
        // Utiliza TiledMapFase03 como a classe do mapa nesta cena específica
        super.create(TiledMapFase03F);

        this.setupcheckPoint();

        // Configurações específicas de Fase03, como NPCs e monstros
        this.setupNpcs();

        this.setupMonstros();
    }

    setupNpcs() {
        // Configuração do NPC específico para Fase03
        

        this.npc1 = new Npc(this.player, this, 2379, 491, 'npc1', this.game.colliders, 'falando', 0, 5, [
            'Unilson você pegou a terceira e última página, parabéns!',
            'Não se esqueça de ler essa última página atentamente!'
        ]).setScale(0.75);
    }

    setupMonstros() {
        // Configuração dos monstros específicos para Fase03
        this.monstro2 = new Monstro(this, 1420, 421, 'monstro', this.game.colliders, 'andando', 0, 1, 1123, 1421, this.player);
    }

    update() {
        super.update(); // Chama o update da BaseFase, se houver lógica de update comum lá
        // Adicione aqui qualquer lógica de update específica para a cena 'Fase03'

        //Atualiza a posição do personagem a cada quadro e exibe no console
        const x = this.player.x;
        const y = this.player.y;
        console.log(`Posição do personagem: x=${x}, y=${y}`);
    }
}
