export default class PerguntaQuiz {
    constructor(scene, pergunta, a, b, c, d, correta, proximaQuestaoCallback) {
        this.scene = scene;
        this.pergunta = pergunta;
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.correta = correta;
        this.proximaQuestaoCallback = proximaQuestaoCallback;
        this.contador = 0;
        this.srPoluicaoAtaque = this.scene.sound.add('srPoluicaoAtaque', { volume: 0.6 });
        this.unilsonAtaque = this.scene.sound.add('unilsonAtaque', { volume: 0.09 });

    }

    mostrar() {
        //definindo as variaveis dos videos
        this.danoUnilson = this.scene.add.video(600, 300, 'danoUnilson')
        this.danoSrPolu = this.scene.add.video(600, 300, 'danoSrPolu')

        //add o texto da pergunta
        this.textoPergunta = this.scene.add.text(290, 520, this.pergunta, {
            fontFamily: 'Calibri',
            fontSize: 25,
            color: '#000000',
            align: 'center',
            wordWrap: { width: 500 }
        }).setDepth(3).setOrigin(0.5)

        // Add a Resposta A
        this.respotaA = this.scene.add.image(730, 490, 'botaoQuestao').setDepth(3)
        this.textoA = this.scene.add.text(730, 490, this.a, {
            fontFamily: 'Calibri',
            fontSize: 20,
            color: '#000000',
            align: 'center',
            wordWrap: { width: 300 }
        }).setDepth(3).setOrigin(0.5)
        this.respotaA.setInteractive();
        this.respotaA.on('pointerover', () => this.respotaA.setScale(1.1).setDepth(3))
        this.respotaA.on('pointerout', () => this.respotaA.setScale(1).setDepth(3))

        this.respotaA.on('pointerdown', () => this.processarResposta("A"));

        // Add a Resposta B
        this.respotaB = this.scene.add.image(1035, 490, 'botaoQuestao').setDepth(3)
        this.textoB = this.scene.add.text(1035, 490, this.b, {
            fontFamily: 'Calibri',
            fontSize: 20,
            color: '#000000',
            align: 'center',
            wordWrap: { width: 300 }
        }).setDepth(3).setOrigin(0.5)
        this.respotaB.setInteractive();
        this.respotaB.on('pointerover', () => this.respotaB.setScale(1.1).setDepth(3))
        this.respotaB.on('pointerout', () => this.respotaB.setScale(1).setDepth(3))
        this.respotaB.on('pointerdown', () => this.processarResposta("B"));

        // Add a Resposta C
        this.respotaC = this.scene.add.image(730, 552, 'botaoQuestao').setDepth(3)
        this.textoC = this.scene.add.text(730, 552, this.c, {
            fontFamily: 'Calibri',
            fontSize: 20,
            color: '#000000',
            align: 'center',
            wordWrap: { width: 300 }
        }).setDepth(3).setOrigin(0.5)
        this.respotaC.setInteractive();
        this.respotaC.on('pointerover', () => this.respotaC.setScale(1.1).setDepth(3))
        this.respotaC.on('pointerout', () => this.respotaC.setScale(1).setDepth(3))
        this.respotaC.on('pointerdown', () => this.processarResposta("C"));

        // Add a Resposta D
        this.respotaD = this.scene.add.image(1035, 552, 'botaoQuestao').setDepth(3)
        this.textoD = this.scene.add.text(1035, 552, this.d, {
            fontFamily: 'Calibri',
            fontSize: 20,
            color: '#000000',
            align: 'center',
            wordWrap: { width: 300 }
        }).setDepth(3).setOrigin(0.5)
        this.respotaD.setInteractive();
        this.respotaD.on('pointerover', () => this.respotaD.setScale(1.1).setDepth(3))
        this.respotaD.on('pointerout', () => this.respotaD.setScale(1).setDepth(3))
        this.respotaD.on('pointerdown', () => this.processarResposta("D"));


    }

    processarResposta(resposta) {
        console.log(resposta)
        //verifica se a resposta é correta se sim add ponto, inicia o video do unilson atacando e passa para próxima
        if (resposta === this.correta) {
            console.log('Acertou');
            this.contador += 1;
            this.removeQuestion();
            this.unilsonAtack();
            this.acertou = this.scene.add.text(290, 520, 'Acertou!', {
                fontFamily: 'Calibri',
                fontSize: 40,
                color: '#000000',
                align: 'center',
                wordWrap: { width: 500 }
            }).setDepth(3).setOrigin(0.5)
            this.scene.time.delayedCall(5000, () => {
                this.acertou.destroy();
                this.proximaQuestaoCallback(true); // Chama a função de callback passando true para indicar que o jogador acertou
            });

            // se a resposta não for correta ele inicia o video do srpoluição atacando e passa para a próxima questão
        } else {
            console.log('Errou');
            this.removeQuestion();
            this.poluicaoAtack();
            this.errou = this.scene.add.text(290, 520, 'Errou!', {
                fontFamily: 'Calibri',
                fontSize: 40,
                color: '#000000',
                align: 'center',
                wordWrap: { width: 500 }
            }).setDepth(3).setOrigin(0.5)
            this.scene.time.delayedCall(5000, () => {
                this.errou.destroy();
                this.proximaQuestaoCallback(true); // Chama a função de callback passando true para indicar que o jogador acertou
            });
        }
    }

    removeQuestion() {
        // Remove todos os elementos de texto e retângulos
        this.textoPergunta.destroy();
        this.textoA.destroy();
        this.textoB.destroy();
        this.textoC.destroy();
        this.textoD.destroy();
        this.respotaA.destroy();
        this.respotaB.destroy();
        this.respotaC.destroy();
        this.respotaD.destroy();
    }

    unilsonAtack() {
        console.log('unilsonAtack');
        this.danoUnilson.play(false); // Da play no vídeo de ataque do unilson
        this.danoUnilson.setDepth(2)
        this.unilsonAtaque.play()

        this.scene.time.delayedCall(6000, () => {
            this.danoUnilson.setDepth(-1)
        });

    }

    poluicaoAtack() {
        console.log('poluicaoAtack');
        this.danoSrPolu.play(false); // Da play no vídeo de ataque do srpoluição
        this.scene.time.delayedCall(2100, () => {
            this.srPoluicaoAtaque.play()
            this.scene.time.delayedCall(750, () => {
                this.srPoluicaoAtaque.play()
            });
        });

        this.danoSrPolu.setDepth(2)
        this.scene.time.delayedCall(5000, () => {
            this.danoSrPolu.setDepth(-1)
        });
    }
}
