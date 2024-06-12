// Importações necessárias
import BaseFase from '../../Classes/BaseFase.js';
import TiledMapFase04 from './TiledMapFase04.js';
import Npc from '../../Classes/npc.js';

export default class Fase04 extends BaseFase {
    constructor() {
        // Defina as propriedades específicas para a cena 'Game'
        // A chave da cena, as coordenadas iniciais do jogador, as coordenadas de respawn, e a próxima cena
        super('Fase04', 100, 490, 409, 400, 'quizFinal');
    }

    create() {
        this.sound.stopAll();

        this.somDeTrovao = this.sound.add('trovao', { loop: true, volume: 0.8 });
        this.somDeTrovao.play();

        this.somDeChuva = this.sound.add('somDeChuva', { loop: true, volume: 1.3 });
        this.somDeChuva.play();

        // Utilize TiledMapGame como a classe do mapa nesta cena específica
        super.create(TiledMapFase04);

        // Adiciona lógicas específicas para a cena 'Game', como NPCs
        this.addNpcs();
        let srPoluicao = this.add.sprite(800, 165, 'srPoluicaoFase04').setScale(0.3)

        let chuva = this.add.sprite(600, 300, 'chuvaF04').setScale(1)

        this.anims.create({
            key: 'chuva04',
            frames: this.anims.generateFrameNumbers('chuvaF04', { start: 0, end: 7 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'srPoluicaoNoPredio',
            frames: this.anims.generateFrameNumbers('srPoluicaoFase04', { start: 0, end: 22 }),
            frameRate: 5,
            repeat: -1
        });

        srPoluicao.anims.play('srPoluicaoNoPredio');

        chuva.anims.play('chuva04');

    }

    addNpcs() {
        // Exemplo de adição de um NPC à cena
        this.npc1 = new Npc(this.player, this, 386, 490, 'npc1', this.game.colliders, 'falando', 0, 5, [
            "Olá Unilson",
            "Você conseguiu juntar todas as páginas, parabéns!",
            "O Sr.Poluição está dentro do UniOps, use os conhecimentos adquiridos no livro para derrotá-lo! ",
            "Tome cuidado e boa sorte Unilson! Contamos com você!"
        ]).setScale(0.75);
    }

    update() {
        super.update(); // Chama o update da BaseFase, se houver lógica de update comum lá
        // Adicione aqui qualquer lógica de update específica para a cena 'Game'

        //Atualiza a posição do personagem a cada quadro e exibe no console
        const x = this.player.x;
        const y = this.player.y;
        console.log(`Posição do personagem: x=${x}, y=${y}`);
    }
}
