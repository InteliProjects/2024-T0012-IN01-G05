import { papelzinhosColetados } from "../Classes/BaseFase.js"

//cria classe
export default class telaFinal extends Phaser.Scene {
    //Cria/constrói as características de uma classe
    constructor() {
        super({ key: 'telaFinal' });
    }

    init(data) {
        this.totalContadores = data.totalContadores
    }


    create() {
        this.sound.stopAll(); // pausa todas as musicas
        //add os efeitos sonoros possiveis das cenas
        this.somVitoria = this.sound.add('somVitoria', { volume: 0.6 });
        this.somDerrota = this.sound.add('somDerrota', { volume: 0.6 });

        if (this.totalContadores >= 8) {

            this.add.image(600, 300, 'vitoriaUnilson') //add imagem de vitória
            this.somVitoria.play() // play som de vitoria

            //delay para mostrar a tela final com os resultados
            this.time.delayedCall(5000, () => {
                this.add.image(600, 300, 'final')
                //add a logo do inteli
                this.add.image(1100, 560, 'inteli').setScale(1)

                //add o valor de questões que o player acertou
                this.add.text(600, 150, this.totalContadores, {
                    fontFamily: 'adventure',
                    fontSize: 60,
                    color: '#000000',
                    align: 'justify',
                    wordWrap: { width: 300 }
                }).setOrigin(0.5).setDepth(2)

                //add o botão de reiniciar
                const botao = this.add.image(600, 500, 'botaoDNV').setScale(0.7)
                botao.setInteractive()
                botao.on('pointerdown', () => {
                    this.papelzinhosColetados = 0
                    this.scene.stop();
                    this.scene.start('telaInicial');
                })
            });


        } else if (this.totalContadores >= 5 && this.totalContadores < 8) {

            this.add.image(600, 300, 'derrotaUnilson')//add imagem de derrota
            this.somDerrota.play()// play som de derrota

            //delay para mostrar a tela final com os resultados
            this.time.delayedCall(5000, () => {
                // add o background 
                this.add.image(600, 300, 'tela80')

                // add o botão de reiniciar
                const botao = this.add.image(600, 500, 'botaoDNV').setScale(0.7)
                botao.setInteractive()
                botao.on('pointerdown', () => {
                    this.scene.stop();
                    this.scene.start('Fase04');
                })
            });

        } else if (this.totalContadores < 5) {

            this.add.image(600, 300, 'derrotaUnilson')//add imagem de derrota
            this.somDerrota.play()// play som de derrota

            //delay para mostrar a tela final com os resultados
            this.time.delayedCall(5000, () => {
                // add o background 
                this.add.image(600, 300, 'tela50')

                // add o botão de reiniciar
                const botao = this.add.image(600, 500, 'botaoDNV').setScale(0.7)
                botao.setInteractive()
                botao.on('pointerdown', () => {
                    this.papelzinhosColetados = 0
                    this.scene.stop();
                    this.scene.start('tutorial');
                })
            });

        }


    };
}