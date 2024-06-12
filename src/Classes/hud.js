export default class Hud extends Phaser.GameObjects.Container {
    constructor(scene, x, y, papelzinhosColetados, vidasImages) {
        super(scene, x, y);
        
        // Adiciona a imagem do papelzinho
        this.papelSprite = scene.add.image(80, 25, 'hudcoracao').setScrollFactor(0);
        this.add(this.papelSprite);
        
        // Adiciona o texto do score
        this.score = scene.add.text(45, 76, papelzinhosColetados, { fontFamily: 'adventure', fontSize: '25px', fill: '416acf', resolution: 1 }).setScrollFactor(0);
        this.score.setOrigin(0.5, 0.5);
        this.add(this.score);
        
        // Adiciona as imagens dos corações
        for (let i = 0; i < 5; i++) {
            const coracaoSprite = scene.add.image(0 + i * 40, 0, 'coracao').setScale(1).setScrollFactor(0);
            this.add(coracaoSprite);
            vidasImages.push(coracaoSprite);
        }

        scene.add.existing(this);
    }

    // Método para atualizar a HUD
    update(papelzinhosColetados, vidasImages) {
        this.score.setText(':' + papelzinhosColetados);
    }

    // Método para atualizar o score
    updateScore(newScore) {
        this.score.setText(':' + newScore);
    }
}
