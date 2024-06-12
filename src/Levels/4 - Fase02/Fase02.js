// Importações necessárias
import BaseFase from '../../Classes/BaseFase.js';
import TiledMapFase02 from './TiledMapFase02.js';
import Npc from '../../Classes/npc.js';
import Monstro from '../../Classes/monstro.js';

export default class Fase02 extends BaseFase {
    constructor() {
        // A chave da cena, as coordenadas iniciais do jogador, as coordenadas de respawn, e a próxima cena
        //200 e 1723
        super('Fase02', 200, 1723, 200, 1723, 'Fase03'); // Substitua 'Fase03' pela sua próxima cena real
    }

    create() {
        // Utiliza TiledMapFase02 como a classe do mapa nesta cena específica
        super.create(TiledMapFase02);

        // Configurações específicas de Fase02, como NPCs e monstros
        this.setupNpcs();
        this.setupMonstros()
        this.setupcheckPoint();
    
    
        // Plataformas móveis
     this.plataformaMovel = this.physics.add.group({
        allowGravity: false,
        immovable: true
     }).setDepth(0);

     this.plataformaMovelY = this.physics.add.group({
        allowGravity: false,
        immovable: true
     }).setDepth(0);

         var plataformaMovel = this.plataformaMovel.create(2200,1090, 'plataforma1').setScale(0.2,0.2)
         plataformaMovel.speed = 0.8
         plataformaMovel.minX = 2000
         plataformaMovel.maxX = 2400
         plataformaMovel.body.setSize(550, 180);
         
         var plataformaMovel = this.plataformaMovel.create(1070,480, 'plataforma1').setScale(0.2,0.2)
         plataformaMovel.speed = 0.8
         plataformaMovel.minX = 1070
         plataformaMovel.maxX = 1550
         plataformaMovel.body.setSize(550, 180);

         var plataformaMovelY = this.plataformaMovelY.create(3070, 1500, 'plataforma2').setScale(0.2, 0.2);
        plataformaMovelY.speed = 0.6; // Velocidade de movimento no eixo Y
        plataformaMovelY.minY = 1060; // Limite mínimo no eixo Y
        plataformaMovelY.maxY = 1500; // Limite máximo no eixo Y
        plataformaMovelY.body.setSize(550, 180);

        var plataformaMovelY = this.plataformaMovelY.create(100, 420, 'plataforma2').setScale(0.2, 0.2);
        plataformaMovelY.speed = 0.6; // Velocidade de movimento no eixo Y
        plataformaMovelY.minY = 420; // Limite mínimo no eixo Y
        plataformaMovelY.maxY = 920; // Limite máximo no eixo Y
        plataformaMovelY.body.setSize(550, 180);

        var plataformaMovelY = this.plataformaMovelY.create(3450, 460, 'plataforma2').setScale(0.2, 0.2);
        plataformaMovelY.speed = 0.6; // Velocidade de movimento no eixo Y
        plataformaMovelY.minY = 460; // Limite mínimo no eixo Y
        plataformaMovelY.maxY = 820; // Limite máximo no eixo Y
        plataformaMovelY.body.setSize(550, 180);

        this.physics.add.collider(this.plataformaMovel, this.player, this.platformMovingThings.bind(this));
        this.physics.add.collider(this.plataformaMovelY, this.player, this.platformMovingThings.bind(this));
        //fiM
        this.player.setMovingPlatforms(this.plataformaMovelY);
       }
   
       movePlataform(p){
           if(p.x < p.minX || p.x > p.maxX){
               p.speed *= -1
           }
           p.x +=p.speed
           
       };

       movePlataformY(p) {
        if (p.y < p.minY || p.y > p.maxY) {
            p.speed *= -1; // Inverte a direção quando atinge os limites
        }
        p.y += p.speed; // Atualiza a posição no eixo Y
        console.log("funciona")
    };
   
    platformMovingThings(sprite, plat, platY){
        // Detecta se a plataforma é do grupo que se move no eixo X
        if (this.plataformaMovel.contains(plat)) {
            // Ajusta apenas a posição X do personagem com a velocidade da plataforma
            sprite.x += 1.9*plat.speed; 
        }
        
        // Detecta se a plataforma é do grupo que se move no eixo Y
        if (this.plataformaMovelY.contains(platY)) {
            sprite.y += 10*platY.speed;
            // Idealmente, você não ajustaria a posição Y do personagem automaticamente
            // para evitar que o personagem "flutue" quando a plataforma descer.
        }
    }
   

    setupNpcs() {
        // Configuração do NPC específico para Fase02
        this.npc1 = new Npc(this.player, this, 3650, 500, 'npc1', this.game.colliders, 'falando', 0, 5, [
            'Unilson você pegou a segunda página, parabéns!',
            'Não se esqueça de ler a segunda página atentamente!'
        ]).setScale(0.75);
    }

    setupMonstros() {
        // Configuração dos monstros específicos para Fase02
        this.monstro2 = new Monstro(this, 1070, 1750, 'monstro', this.game.colliders, 'andando', 0, 1, 870, 1260, this.player, 100, 100);
        this.monstro3 = new Monstro(this, 3025, 437, 'monstro', this.game.colliders, 'andando', 0, 1, 2863, 3260, this.player);
        this.monstro4 = new Monstro(this, 2415, 437, 'monstro', this.game.colliders, 'andando', 0, 1, 2363, 2760, this.player);
        this.monstro5 = new Monstro(this, 1605, 1750, 'monstro', this.game.colliders, 'andando', 0, 1, 1605, 2025, this.player);
        this.monstro4 = new Monstro(this, 2800, 1045, 'monstro', this.game.colliders, 'andando', 0, 1, 2515, 2850, this.player);
        // Adicione mais monstros conforme necessário
    }

    update() {
        super.update(); // Chama o update da BaseFase, se houver lógica de update comum lá
        // Adicione aqui qualquer lógica de update específica para a cena 'Fase02'

        //Atualiza a posição do personagem a cada quadro e exibe no console
        const x = this.player.x;
        const y = this.player.y;
        console.log(`Posição do personagem: x=${x}, y=${y}`);
        
        
        this.plataformaMovel.children.iterate((plat) => {
            this.movePlataform(plat)
        })

        this.plataformaMovelY.children.iterate((platY) => {
            this.movePlataformY(platY); // Move cada plataforma no eixo Y
        });
    }
    
}
