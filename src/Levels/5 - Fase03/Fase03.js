// Importações necessárias
import BaseFase from '../../Classes/BaseFase.js';
import TiledMapFase03 from './TiledMapFase03.js';
import Npc from '../../Classes/npc.js';
import Monstro from '../../Classes/monstro.js';

export default class Fase03 extends BaseFase {
    constructor() {
        // A chave da cena, as coordenadas iniciais do jogador, as coordenadas de respawn, e a próxima cena
        super('Fase03', 50, 446, 573, 446, 'Fase04'); // Substitua 'NomeDaProximaCena' pela sua próxima cena real
    }

    create() {
        // Utiliza TiledMapFase03 como a classe do mapa nesta cena específica
        super.create(TiledMapFase03);

        // Configurações específicas de Fase03, como NPCs e monstros
        this.setupNpcs();
        this.setupMonstros();
        this.setupcheckPoint();


       // Plataformas móveis
     this.plataformaMovelY = this.physics.add.group({
        allowGravity: false,
        immovable: true
     }).setDepth(0);


         var plataformaMovelY = this.plataformaMovelY.create(100, 1800, 'plataforma2').setScale(0.2, 0.2);
        plataformaMovelY.speed = 0.6; // Velocidade de movimento no eixo Y
        plataformaMovelY.minY = 1800; // Limite mínimo no eixo Y
        plataformaMovelY.maxY = 2200; // Limite máximo no eixo Y
        plataformaMovelY.body.setSize(550, 180);

        var plataformaMovelY = this.plataformaMovelY.create(3550, 850, 'plataforma2').setScale(0.2, 0.2);
        plataformaMovelY.speed = 0.6; // Velocidade de movimento no eixo Y
        plataformaMovelY.minY = 850; // Limite mínimo no eixo Y
        plataformaMovelY.maxY = 1200; // Limite máximo no eixo Y
        plataformaMovelY.body.setSize(550, 180);

        var plataformaMovelY = this.plataformaMovelY.create(3540, 140, 'plataforma2').setScale(0.2, 0.2);
        plataformaMovelY.speed = 0.6; // Velocidade de movimento no eixo Y
        plataformaMovelY.minY = 140;//.Limite mínimo no eixo Y
        plataformaMovelY.maxY = 600; // Limite máximo no eixo Y
        plataformaMovelY.body.setSize(550, 180);

        this.physics.add.collider(this.plataformaMovelY, this.player, this.platformMovingThings.bind(this));
        //fiM
        this.player.setMovingPlatforms(this.plataformaMovelY);
       }
   
       movePlataformY(p) {
        if (p.y < p.minY || p.y > p.maxY) {
            p.speed *= -1; // Inverte a direção quando atinge os limites
        }
        p.y += p.speed; // Atualiza a posição no eixo Y
    };
   
    platformMovingThings(sprite, platY){
        // Detecta se a plataforma é do grupo que se move no eixo Y
        if (this.plataformaMovelY.contains(platY)) {
            sprite.y += platY.speed;
            // Idealmente, você não ajustaria a posição Y do personagem automaticamente
            // para evitar que o personagem "flutue" quando a plataforma descer.
        }
    }
   

    setupNpcs() {
        // Configuração do NPC específico para Fase03
        this.npc1 = new Npc(this.player, this, 436, 446, 'npc1', this.game.colliders, 'falando', 0, 5, [
            'Unilson você está se saindo muito bem!',
            'Esse é o último lugar onde o Sr.Poluição espalhou as páginas',
            'Procure bem Unilson, boa sorte!'
        ]).setScale(0.75);
    }

    setupMonstros() {
        // Configuração dos monstros específicos para Fase03
        this.monstro2 = new Monstro(this, 930, 470, 'monstro', this.game.colliders, 'andando', 0, 1, 600, 950, this.player);
        this.monstro3 = new Monstro(this, 3050, 150, 'monstro', this.game.colliders, 'andando', 0, 1, 3000, 3300, this.player);
        this.monstro4 = new Monstro(this, 2800, 150, 'monstro', this.game.colliders, 'andando', 0, 1, 2600, 2900, this.player);
        this.monstro5 = new Monstro(this, 2308, 2150, 'monstro', this.game.colliders, 'andando', 0, 1, 2048, 2708, this.player);
        this.monstro6 = new Monstro(this, 660, 2150, 'monstro', this.game.colliders, 'andando', 0, 1, 250, 680, this.player);
        this.monstro7 = new Monstro(this, 1070, 2150, 'monstro', this.game.colliders, 'andando', 0, 1, 700, 1080, this.player);
        this.monstro8 = new Monstro(this, 3350, 550, 'monstro', this.game.colliders, 'andando', 0, 1, 3050, 3400, this.player);
        this.monstro9 = new Monstro(this, 3250, 870, 'monstro', this.game.colliders, 'andando', 0, 1, 2900, 3300, this.player);
        this.monstro10 = new Monstro(this, 2490, 1465, 'monstro', this.game.colliders, 'andando', 0, 1, 2320, 2550, this.player);
        this.monstro10 = new Monstro(this, 2020, 1465, 'monstro', this.game.colliders, 'andando', 0, 1, 1700, 2070, this.player);
        this.monstro10 = new Monstro(this, 600, 1705, 'monstro', this.game.colliders, 'andando', 0, 1, 460, 610, this.player);
        // Adicione mais monstros conforme necessário
    }

    update() {
        super.update(); // Chama o update da BaseFase, se houver lógica de update comum lá
        // Adicione aqui qualquer lógica de update específica para a cena 'Fase03'

        //Atualiza a posição do personagem a cada quadro e exibe no console
        const x = this.player.x;
        const y = this.player.y;
        console.log(`Posição do personagem: x=${x}, y=${y}`);


        this.plataformaMovelY.children.iterate((platY) => {
            this.movePlataformY(platY); // Move cada plataforma no eixo Y
        });
    }
    
}

