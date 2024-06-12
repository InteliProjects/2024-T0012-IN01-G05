import BaseFase from '../../Classes/BaseFase.js';
import TiledMapTutorial from './TiledMapTutorial.js';
import Monstro from '../../Classes/monstro.js';
import Npc from '../../Classes/npc.js';

export default class Tutorial extends BaseFase {
    constructor() {
        super('tutorial', 50, 480, 409, 400, 'cutScene'); // Inicialize a cena com as coordenadas desejadas
    }

    preload() {
        this.input.setDefaultCursor("default");
        super.preload(); // Chamada do preload da classe BaseFase, se necessário
        // Carregue aqui quaisquer recursos específicos do Tutorial
    }

    create() {
        this.sound.stopAll();

        this.somDeFundo = this.sound.add('somFundo', { loop: true, volume: 0.3 });
        this.somDeFundo.play();
        super.create(TiledMapTutorial); // Passa a classe TiledMapTutorial para a função create da BaseFase
        // Configuração específica de Tutorial
        this.monstro0= new Monstro(this, 1253, 517, 'monstro', this.game.colliders, 'andando', 0, 1, 1240, 1620, this.player);

        this.npc1 = new Npc(this.player, this, 490, 496, 'npc1', this.game.colliders, 'falando', 0, 5, [
            'Oi Unilson!',
            'Tudo certo? Pronto para aprender sobre a Unilever?',
            "Nessa parte você entenderá as mecânicas básicas de movimentação",
            'Observação: Para pular você pode usar a seta para cima ou a barra de espaço, use qual você preferir',
            'Cuidados com os monstros, eles são do mal!',
            'E por último, lembre-se, Unilson, você não sabe nadar, mas pode usar troncos e folhas como apoio na água',
            'Lets Bora aprender!'
        ]).setScale(0.75);
    }

    update() {
        super.update(); // Chamada do update da classe BaseFase para processamento comum como entrada do jogador
        // Aqui você pode adicionar qualquer lógica específica de atualização para Tutorial

        //Atualiza a posição do personagem a cada quadro e exibe no console
        // const x = this.player.x;
        // const y = this.player.y;
        // console.log(`Posição do personagem: x=${x}, y=${y}`);
    }
}
