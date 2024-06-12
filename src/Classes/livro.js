// criação da cena do livro
export default class Livro extends Phaser.Scene {
    constructor() {
        super({ key: 'HudLivro' });
    }


    init(data) {
        this.previousScene = data.previousScene;// define qual era a cena qual o player estava antes
        this.pedacos = data.pedacosColetados // puxa da fase quantos papeis coletados o player tinha

    }

    preload() {
        this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);// adiciona a tecla P
    }

    create() {

        if (this.abriuLink1) {
            this.add.image(44, 195, 'insigna1').setDepth(2)
        }
        if (this.abriuLink2 ) {
            this.add.image(45, 340, 'insigna2').setDepth(2)
        }
        if (this.abriuLink3) {
            this.add.image(45, 492, 'insigna3').setDepth(2)
        }

        this.add.image(600, 300, 'hudLivro').setDepth(0); // add a imagem da hud do livro

        this.add.image(600, 300, 'folhaLivro').setDepth(0); // add a imagem da pagina vazia

        this.botaoSair = this.add.image(45, 44, 'xHudLivro').setDepth(0).setInteractive(); // add a imagem do botão de sair e torna-o interativo

        this.aumentarBotao() // chamo o método para aumentarbotão

        this.hubDePaginas() // chamo o método de configuração do hubDePaginas

        this.qualDificuldadeEstou() // chamo o método para identificar qualDificuldadeEstou

        // cadeia de if para identificar se o player ja atingiu a meta de cada fase para acionar a página de cada fase
        if (this.papelFase01 == this.pedacos) { this.primeiraPagina() }
        if (this.papelFase02 == this.pedacos) { this.segundaPagina() }
        if (this.papelFase03 == this.pedacos) { this.terceiraPagina() }

        //função para fechar o livro
        this.botaoSair.on('pointerup', () => {
            if (this.previousScene) {
                this.scene.resume(this.previousScene); // volta para a cena qual o player estava
                this.scene.stop('HudLivro'); // pausa essa cena
            }
        });
    }

    // método para identificar qualDificuldadeEstou
    qualDificuldadeEstou() {
        //if's para configurar o numero de papeis que o player precisa coletar em cada fase de acordo com sua dificuldade
        if (this.scene.get('telaInicial').facil) {
            this.papelFase01 = 10
            this.papelFase02 = 20
            this.papelFase03 = 30
        } else {
            this.papelFase01 = 20
            this.papelFase02 = 40
            this.papelFase03 = 60
        }
    }

    update() {
        //define a ação da tecla P 
        if (this.keyP.isDown) {
            if (this.previousScene) {
                this.scene.resume(this.previousScene); // volta para a cena qual o player estava
                this.scene.stop('HudLivro'); // pausa essa cena
            }

        }
    }
    // metodo para acessar o link da imagem
    openExternalLink() {
        // qual lik carregar em cada fase
        if (this.toNaPag1) {
            const url = `https://www.unilever.com.br/`; // link da página qual queremos redirecionar o player
            const s = window.open(url, '_blank');
            this.abriuLink1 = true
            this.add.image(44, 195, 'insigna1').setDepth(2)

        }

        if (this.toNaPag2) {
            const url = `https://www.unilever.com/planet-and-society/protect-and-regenerate-nature/regenerating-nature/`; // link da página qual queremos redirecionar o player
            this.add.image(45, 340, 'insigna2').setDepth(2)
            const s = window.open(url, '_blank');
            this.abriuLink2 = true
        }

        if (this.toNaPag3) {
            const url = `https://www.unilever.com.br/our-company/`; // link da página qual queremos redirecionar o player
            this.add.image(45, 492, 'insigna3').setDepth(2)
            const s = window.open(url, '_blank');
            this.abriuLink3 = true
        }

    }

    aumentarBotao() {
        //aumentar botão de fechar
        this.botaoSair.on('pointerover', () => {
            this.input.setDefaultCursor("pointer");
            this.botaoSair.setScale(1.2) // aumenta o botao de sair
        })
        this.botaoSair.on('pointerout', () => {
            this.input.setDefaultCursor("default");
            this.botaoSair.setScale(1) //voltar o botao de sair ao seu tamanho normal
        })

        if (this.pedacos >= this.papelFase01) {

            this.botaoPag1 = this.add.image(1100, 100, 'botaoHudLivro1').setDepth(0).setInteractive(); // add a imagem do botão da pagina 1 e torna-o interativo

            //aumentar o botao da pagina 1
            this.botaoPag1.on('pointerover', () => {
                this.input.setDefaultCursor("pointer");
                this.botaoPag1.setScale(1.2) // aumenta o botao da Pagina 1
            })
            this.botaoPag1.on('pointerout', () => {
                this.input.setDefaultCursor("default");
                this.botaoPag1.setScale(1) //voltar o botao da pgina 1 ao seu tamanho normal
            })
        }
        if (this.pedacos >= this.papelFase02) {

            this.botaoPag2 = this.add.image(1100, 300, 'botaoHudLivro2').setDepth(0).setInteractive(); // add a imagem do botão de pagina 2 e torna-o interativo

            //aumentar o botao da pagina 2
            this.botaoPag2.on('pointerover', () => {
                this.input.setDefaultCursor("pointer");
                this.botaoPag2.setScale(1.2) // aumenta o botao da Pagina 2
            })
            this.botaoPag2.on('pointerout', () => {
                this.input.setDefaultCursor("default");
                this.botaoPag2.setScale(1)//voltar o botao da pgina 2 ao seu tamanho normal
            })
        }
        if (this.pedacos >= this.papelFase03) {

            this.botaoPag3 = this.add.image(1100, 500, 'botaoHudLivro3').setDepth(0).setInteractive(); // add a imagem do botão de pagina 3 e torna-o interativo

            //aumentar o botao da pagina 3
            this.botaoPag3.on('pointerover', () => {
                this.input.setDefaultCursor("pointer");
                this.botaoPag3.setScale(1.2) // aumenta o botao da Pagina 2
            })
            this.botaoPag3.on('pointerout', () => {
                this.input.setDefaultCursor("default");
                this.botaoPag3.setScale(1)//voltar o botao da pgina 3 ao seu tamanho normal
            })
        }
    }

    // método de configuração da página 1
    primeiraPagina() {
        //váriaveis para identificar qual página o player está
        this.toNaPag1 = true
        this.toNaPag2 = false
        this.toNaPag3 = false

        // add os texto da página 1
        this.texto1 = this.add.text(620, 195, 'A Unilever, desde sua fundação em 1930, tem sido guiada por valores sólidos como integridade, respeito e responsabilidade social corporativa. Esses valores moldam sua cultura organizacional, enfatizando a importância da inovação e do compromisso com a sustentabilidade em todas as operações.Ela também é reconhecida por seu vasto portfólio de marcas em diversas categorias, incluindo alimentos, cuidados pessoais, produtos para o lar, sorvetes e nutrição. Marcas icônicas como Dove, OMO, Knorr e Rexona são apenas algumas das muitas marcas sob o guarda-chuva da Unilever. Com uma presença global significativa, a empresa opera em uma ampla gama de setores, oferecendo uma visão abrangente e oportunidades de aprendizado para novos funcionários.', {
            fontFamily: 'Calibri',
            fontSize: 20,
            color: '#000000',
            align: 'justify',
            wordWrap: { width: 430 }
        }).setOrigin(0.5).setDepth(2)

        this.textoAviso = this.add.text(620, 550, '(Leia atentamente! As informações serão necessárias para o seu conhecimento e para concluir a missão)', {
            fontFamily: 'Calibri',
            fontSize: 15,
            color: '#000000',
            align: 'justify',
            wordWrap: { width: 430 }
        }).setOrigin(0.5).setDepth(2)

        this.link = this.add.text(620, 450, 'Clique Aqui', {
            fontFamily: 'Calibri',
            fontSize: 40,
            color: '#000000',
            align: 'justify',
            wordWrap: { width: 300 }
        }).setOrigin(0.5).setInteractive().setDepth(2)

        this.aumentarLink() // método para aumentar o link

        this.link.on('pointerup', this.openExternalLink, this);// define qual ação deve ser realizada ao clicar na imagem com o link

    }

    // método de configuração da página 2
    segundaPagina() {
        //váriaveis para identificar qual página o player está
        this.toNaPag2 = true
        this.toNaPag3 = false
        this.toNaPag1 = false

        // add os texto da página 2
        this.texto2 = this.add.text(620, 215, 'A Unilever está comprometida em proteger e regenerar o meio ambiente, reconhecendo que a saúde do planeta é crucial para o bem-estar humano e a sustentabilidade dos negócios. A empresa busca transformar a forma como a terra é utilizada em todo o mundo, adotando uma abordagem de agricultura regenerativa. Esta abordagem visa melhorar a saúde do solo, a qualidade da água e a biodiversidade, enquanto reduz as emissões de gases de efeito estufa e promove a resiliência climática. A Unilever lançou o Fundo para o Clima e a Natureza, investindo em projetos significativos para impulsionar a transição para uma produção mais sustentável. Além disso, desenvolveu os Princípios de Agricultura Regenerativa, que orientam suas práticas agrícolas para alcançar resultados positivos para o meio ambiente e as comunidades locais.', {
            fontFamily: 'Calibri',
            fontSize: 20,
            color: '#000000',
            align: 'justify',
            wordWrap: { width: 430 }
        }).setOrigin(0.5).setDepth(2)

        this.textoAviso = this.add.text(620, 550, '(Leia atentamente! As informações serão necessárias para o seu conhecimento e para concluir a missão)', {
            fontFamily: 'Calibri',
            fontSize: 15,
            color: '#000000',
            align: 'justify',
            wordWrap: { width: 430 }
        }).setOrigin(0.5).setDepth(2)

        this.link = this.add.text(620, 450, 'Clique Aqui', {
            fontFamily: 'Calibri',
            fontSize: 40,
            color: '#000000',
            align: 'justify',
            wordWrap: { width: 300 }
        }).setOrigin(0.5).setInteractive().setDepth(2)

        this.aumentarLink() // método para aumentar o link

        this.link.on('pointerup', this.openExternalLink, this);// define qual ação deve ser realizada ao clicar na imagem com o link

    }

    // método de configuração da página 3
    terceiraPagina() {
        //váriaveis para identificar qual página o player está
        this.toNaPag3 = true
        this.toNaPag2 = false
        this.toNaPag1 = false

        // add os texto da página 3
        this.texto3 = this.add.text(620, 195, 'A Unilever Brasil é uma empresa com 94 anos de presença no mercado brasileiro, oferecendo mais de 40 marcas que têm impacto significativo na vida dos brasileiros. A empresa está comprometida em aumentar seus negócios de forma sustentável, desassociando o crescimento da pegada ambiental e aumentando o impacto social positivo. Além disso, a Unilever Brasil tem uma visão clara de tornar a vida sustentável parte do dia a dia de todos, buscando melhorar a saúde, a higiene e o meio de vida nas comunidades.', {
            fontFamily: 'Calibri',
            fontSize: 20,
            color: '#000000',
            align: 'justify',
            wordWrap: { width: 430 }
        }).setOrigin(0.5).setDepth(2)

        this.textoAviso = this.add.text(620, 550, '(Leia atentamente! As informações serão necessárias para o seu conhecimento e para concluir a missão)', {
            fontFamily: 'Calibri',
            fontSize: 15,
            color: '#000000',
            align: 'justify',
            wordWrap: { width: 430 }
        }).setOrigin(0.5).setDepth(2)

        this.link = this.add.text(620, 400, 'Clique Aqui', {
            fontFamily: 'Calibri',
            fontSize: 40,
            color: '#000000',
            align: 'justify',
            wordWrap: { width: 300 }
        }).setOrigin(0.5).setInteractive().setDepth(2)

        this.aumentarLink() // método para aumentar o link

        this.link.on('pointerup', this.openExternalLink, this);// define qual ação deve ser realizada ao clicar na imagem com o link

    }

    //método para aumentar o link
    aumentarLink() {
        this.link.on('pointerover', () => {
            this.input.setDefaultCursor("pointer");//alterar o cursor
            this.link.setColor('#0085FF')//alterar a cor para azul do link
            this.link.setScale(1.4) // aumenta o link
        })
        this.link.on('pointerout', () => {
            this.input.setDefaultCursor("default");//alterar o cursor
            this.link.setColor('#000000')//alterar a cor para preto do link
            this.link.setScale(1) // voltar o tamanho normal do link
        })
    }

    //método para configurar o hub de paginas
    hubDePaginas() {
        //if's para identificar se a pessoa ja atingiu a meta para liberar cada página se sim mostrar aquela página
        if (this.pedacos >= this.papelFase01) {
            this.botaoPag1.on('pointerup', () => {
                this.limparPaginas()//chama o método limpar páginas
                this.primeiraPagina() // chama o método para add a primeira página
            })
        }

        if (this.pedacos >= this.papelFase02) {
            this.botaoPag2.on('pointerup', () => {
                this.limparPaginas()//chama o método limpar páginas
                this.segundaPagina()// chama o método para add a segunda página
            })
        }

        if (this.pedacos >= this.papelFase03) {
            this.botaoPag3.on('pointerup', () => {
                this.limparPaginas()//chama o método limpar páginas
                this.terceiraPagina()// chama o método para add a terceira página
            })
        }
    }

    //método para limpar a página qual o player está
    limparPaginas() {
        if (this.toNaPag1) {
            this.texto1.destroy()//tira da tela o texto da página 1
            this.link.destroy()//tira da tela o link 
            this.textoAviso.destroy()//tira da tela o texto de aviso
        }
        if (this.toNaPag2) {
            this.texto2.destroy()//tira da tela o texto da página 2
            this.link.destroy()//tira da tela o link 
            this.textoAviso.destroy()//tira da tela o texto de aviso
        }
        if (this.toNaPag3) {
            this.texto3.destroy()//tira da tela o texto da página 3
            this.link.destroy()//tira da tela o link 
            this.textoAviso.destroy()//tira da tela o texto de aviso
        }
    }
}   
