//cria uma classe
export default class telaInicial extends Phaser.Scene {
    //denominar as características de uma classe
    constructor() {
        //define o nome de uma key
        super({ key: 'telaInicial' });
    }

    //faz o preload dos assets escolhidos dentro do computador antes de passar para ultilizador ver
    preload() {
        this.load.image('inicioSemJogar', './assets/inicialSemJogar.png')
        this.load.image('play', './assets/play.png') //add imagem do  botão play
        this.load.video('teste', './assets/videos/teste.mp4', true); // add o video da cutscene
        this.load.image('dificil', './assets/dificil.png') //add imagem do  botão play
        this.load.image('facil', './assets/facil.png') //add imagem do  botão play
    }
    // adiciona no jogo. Cria para os jogaadores verem
    create() {
        // inicio o video da cutScene
        const intro = this.add.video(600, 300, 'teste');
        intro.play();

        //add o butão e o deixo invisivel e interativo 
        this.botaoPlay = this.add.image(600, 463, 'play').setInteractive().setVisible(false);
        this.inicialSemJogar = this.add.image(600,300,'inicioSemJogar').setVisible(false)
        this.botaoFacil = this.add.image(600, 400, 'facil').setVisible(false).setInteractive()
        this.botaoDificil = this.add.image(600, 530, 'dificil').setVisible(false).setInteractive()

        //deixa o botão de play visivel para todos, após o vídeo terminar
        intro.on('complete', () => {
            this.botaoPlay.setVisible(true);

        });
        this.botaoPlay.on('pointerover', () => {
            this.input.setDefaultCursor("pointer");
            this.botaoPlay.setScale(1.2)
        })
        this.botaoPlay.on('pointerout', () => {
            this.input.setDefaultCursor("default");
            this.botaoPlay.setScale(1)
        })

        this.botaoFacil.on('pointerover', () => {
            this.input.setDefaultCursor("pointer");
            this.botaoFacil.setScale(1.2)
        })
        this.botaoFacil.on('pointerout', () => {
            this.input.setDefaultCursor("default");
            this.botaoFacil.setScale(1)
        })

        this.botaoDificil.on('pointerover', () => {
            this.input.setDefaultCursor("pointer");
            this.botaoDificil.setScale(1.2)
        })
        this.botaoDificil.on('pointerout', () => {
            this.input.setDefaultCursor("default");
            this.botaoDificil.setScale(1)
        })
        // define a ação que irá acontecer quando o botão for clicado
        this.botaoPlay.on('pointerdown', () => {
            this.botaoPlay.destroy()
            this.inicialSemJogar.setVisible(true)
            this.botaoFacil.setVisible(true);
            this.botaoDificil.setVisible(true);
        });

        this.botaoFacil.on('pointerdown', () => {
            this.scene.stop()
            this.scene.start('preload')
            this.facil = true
        });

        this.botaoDificil.on('pointerdown', () => {
            this.scene.stop()
            this.scene.start('preload')
            this.facil = false
        });



    };
}