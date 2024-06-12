// Classe Balao responsável por criar balões de conversa para NPCs
class Balao {
    // Construtor da classe
    constructor(scene, quote) {
        this.scene = scene; // Referência à cena do jogo
        this.x = 600; // Posição X do balão
        this.y = 250; // Posição Y do balão
        this.width = 550; // Largura do balão
        this.height = 200; // Altura do balão
        this.quote = quote; // Array de strings com as frases do balão
        this.contador = 0; // Contador para acompanhar a frase atual
        this.bubble = null; // Elemento gráfico do balão
        this.content = null; // Texto do balão
        this.visible = false; // Visibilidade inicial do balão
    }
    
    // Método para mudar a frase do balão
mudarFrase() {
    // Verifica se o balão está visível
    if (!this.visible) {
        // Torna o balão visível
        this.bubble.setVisible(true);
        this.buttonEnter.setVisible(true); // Torna o botão "Enter" visível
        this.visible = true;
    }

    this.contador++; // Incrementa o contador

    // Se o contador exceder o número de frases, reinicia
    if (this.contador >= this.quote.length + 1) {
        this.bubble.setVisible(false);
        this.buttonEnter.setVisible(false); // Torna o botão "Enter" invisível
        this.visible = false;
    }

    return this.quote[this.contador - 1]; // Retorna a próxima frase
}
    // Método para criar o balão de conversa
createSpeechBubble() {
    // Criação do elemento gráfico para o balão
    this.bubble = this.scene.add.graphics({ x: this.x, y: this.y });

    // Desenho do balão de conversa
    this.bubble = this.scene.add.image(this.x, this.y,'balao').setScrollFactor(0); // 'balao' é o nome da sua imagem
    this.bubble.setScale(2.2).setDepth(2);

    // Torna o balão invisível inicialmente
    this.bubble.setVisible(false);
    this.visible = false;

    // Adiciona a imagem do botão "Enter"
    this.buttonEnter = this.scene.add.image(this.x + this.width/1.2, this.y + this.height / 2, 'botao-enter').setScrollFactor(0);
    this.buttonEnter.setScale(0.4).setDepth(3); // Ajuste a escala e a profundidade conforme necessário
    this.buttonEnter.setVisible(false);

    // Criação do texto do balão
    this.content = this.scene.add.text(this.x + (this.width / 2), this.y + (this.height / 2), "", {
        fontFamily: 'Calibri',
        fontSize: 30,
        color: '#000000',
        align: 'justify',
        wordWrap: { width: this.width - 20 }
    }).setOrigin(0.5).setScrollFactor(0).setDepth(2);

    // Centraliza o texto dentro do balão
    this.content.setPosition(720, 225);
}

    // Método para atualizar o texto do balão
    updateSpeechBubbleText(newText) {
        this.content.setText(newText);
    }
}

// Exporta a classe Balao para ser utilizada em outros arquivos
export default Balao;