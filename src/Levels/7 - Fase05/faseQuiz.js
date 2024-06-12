import PerguntaQuiz from "./quiz.js";

export default class quizFinal extends Phaser.Scene {
    constructor() {
        super({ key: 'quizFinal' });
    }

    preload() {
        // Pré-carregamento dos ativos, se necessário
    }

    create() {

        this.sound.stopAll();

        this.time.delayedCall(2000, () => {
            this.musicaQuiz = this.sound.add('musicaQuiz', { loop: true, volume: 0.05 }); // add o som de pulo no player
            this.musicaQuiz.play()
        });

        this.cameras.main.fadeIn(4000, 0, 0, 0); // 500 ms para o fade-in, começando de preto
        // Adicionando o vídeo de introdução (se necessário)
        const batalhaIDLE = this.add.video(600, 300, 'batalhaIDLE').setDepth(0);
        batalhaIDLE.play(true)

        // Adicionando a imagem do HUD do quiz
        this.add.image(600, 300, 'hudQuiz').setDepth(3)

        // Array de perguntas do quiz

        this.perguntas = [
            new PerguntaQuiz(this, 'Quais são os valores sólidos que guiam a Unilever desde sua fundação?', 'Inovação e compromisso com a sustentabilidade', 'Integridade, respeito e responsabilidade social corporativa', 'Lucro e crescimento rápido', 'Competição e excelência', 'B', () => this.mostrarProximaPergunta()),
            new PerguntaQuiz(this, 'Qual é a característica marcante do portfólio de marcas da Unilever?', 'Diversidade de categorias', 'Concentração exclusiva em alimentos', 'Foco apenas em produtos para o lar', 'Redução de marcas para focar em segmentos específicos', 'A', () => this.mostrarProximaPergunta()),
            new PerguntaQuiz(this, 'Qual dos seguintes aspectos NÃO é verdadeiro sobre a Unilever?', 'Foi fundada em 1930', 'Valores de integridade, respeito e responsabilidade social', 'Poucas marcas sob o guarda-chuva da Unilever', 'Presença global significativa', 'C', () => this.mostrarProximaPergunta()),
            new PerguntaQuiz(this, 'O que a presença global significativa da Unilever proporciona aos novos funcionários?', 'Oportunidades de aprendizado limitadas', 'Experiência em um único setor', 'Visão abrangente e oportunidades de aprendizado', 'Restrição geográfica nas operações', 'C', () => this.mostrarProximaPergunta()),
            new PerguntaQuiz(this, 'Qual é o link entre a cultura organizacional da Unilever e suas operações?', 'Inovação e compromisso com a sustentabilidade', 'Competição e excelência', 'Foco exclusivo no lucro', 'Ignorar responsabilidades sociais', 'A', () => this.mostrarProximaPergunta()),
            new PerguntaQuiz(this, 'Qual é um dos objetivos principais da Unilever em relação à sustentabilidade?', 'Expandir para novos mercados emergentes até 2030', 'Reduzir a pegada de carbono em 50% até 2030', 'Aumentar a receita em 20% até 2025', 'Lançar 100 novos produtos sustentáveis até 2023', 'B', () => this.mostrarProximaPergunta()),
            new PerguntaQuiz(this, 'Por que a Unilever considera a agricultura regenerativa fundamental para seus negócios?', 'Porque reduz a eficiência da cadeia de abastecimento', 'Porque não tem impacto nas emissões de gases de efeito estufa', 'Porque visa melhorar a saúde do solo e a qualidade da água', 'Porque não está alinhada com as ODS', 'C', () => this.mostrarProximaPergunta()),
            new PerguntaQuiz(this, 'Como a Unilever está contribuindo para a proteção e restauração da natureza?', 'Através de práticas agrícolas que promovem a degradação do solo', 'Investindo em projetos de agricultura regenerativa', 'Ignorando os impactos ambientais de suas operações', 'Aplicando tecnologias emissoras de gases de efeito estufa', 'B', () => this.mostrarProximaPergunta()),
            new PerguntaQuiz(this, 'Qual é o objetivo principal da Unilever Brasil em relação ao crescimento de negócios?', 'Aumentar a pegada ambiental', 'Diminuir a pegada ambiental e ampliar o impacto social positivo.', 'Reduzir o impacto social positivo', 'Expandir negócios sem considerar questões ambientais e sociais.', 'B', () => this.mostrarProximaPergunta()),
            new PerguntaQuiz(this, 'Qual é a porcentagem de mulheres na liderança da Unilever Brasil?', '43%', '57%', '50%', '70%', 'B', () => this.mostrarProximaPergunta()),
            //new PerguntaQuiz(this, 'Pergunta', 'Essa é A', 'Essa é B', 'Essa é C', 'Essa é D', 'Correta', () => this.mostrarProximaPergunta()),

            // Adicione mais perguntas aqui conforme necessário
        ]
        // Índice da pergunta atual
        this.indicePerguntaAtual = 0;

        // Mostra a primeira pergunta
        this.mostrarPerguntaAtual();


    }

    mostrarPerguntaAtual() {
        const totalContadores = this.perguntas.reduce((total, pergunta) => total + pergunta.contador, 0);
        // Verifica se ainda há perguntas para mostrar
        if (this.indicePerguntaAtual < this.perguntas.length) {
            // Mostra a pergunta atual
            this.perguntas[this.indicePerguntaAtual].mostrar();

        } else {
            // Não há mais perguntas, o jogo acabou e inicia a tela final passando o total de pontos para ela
            console.log('Fim do quiz');

            this.time.delayedCall(500, () => {
                this.scene.start('telaFinal', { totalContadores: totalContadores })
            });
        }
    }


    mostrarProximaPergunta() {
        // Incrementa o índice da pergunta atual
        this.indicePerguntaAtual++;

        // Mostra a próxima pergunta
        this.mostrarPerguntaAtual();
    }
}
