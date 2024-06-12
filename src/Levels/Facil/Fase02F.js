// Importações necessárias
import BaseFase from '../../Classes/BaseFase.js';
import TiledMapFase02F from './TiledMapFase02F.js'
import Npc from '../../Classes/npc.js';

export default class Fase02F extends BaseFase {
    constructor() {
        // A chave da cena, as coordenadas iniciais do jogador, as coordenadas de respawn, e a próxima cena
        //200 e 1723
        super('Fase02F', 97, 491, 97, 491, 'Fase03F'); // Substitua 'Fase03' pela sua próxima cena real
    }

    create() {
        // Utiliza TiledMapFase02 como a classe do mapa nesta cena específica
        super.create(TiledMapFase02F);

        this.setupcheckPoint();

        // Configurações específicas de Fase02, como NPCs e monstros
        this.setupNpcs();
   
    }

    setupNpcs() {
        // Configuração do NPC específico para Fase02
        this.npc1 = new Npc(this.player, this, 2050, 491, 'npc1', this.game.colliders, 'falando', 0, 5, [
            'Unilson você pegou a segunda página, parabéns!',
            'Não se esqueça de ler a segunda página atentamente!'
        ]).setScale(0.75);
    }

    

    update() {
        super.update(); // Chama o update da BaseFase, se houver lógica de update comum lá
        // Adicione aqui qualquer lógica de update específica para a cena 'Fase02'

        //Atualiza a posição do personagem a cada quadro e exibe no console
        const x = this.player.x;
        const y = this.player.y;
        console.log(`Posição do personagem: x=${x}, y=${y}`);
        
    }
    
}
