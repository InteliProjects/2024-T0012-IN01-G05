export default class preload extends Phaser.Scene {
    constructor() {
        super({ key: 'preload' })
    }
    // preload de todo o jogo
    preload() {
        // carrega as imagens do tiled
        //Mapa Fase 4
        this.load.tilemapTiledJSON('mapTutorial', './assets/Mapas/mapTutorial.json')

        this.load.tilemapTiledJSON('map', './assets/Mapas/mapa-0.1.json')
        //Mapa Fase Fábrica
        this.load.tilemapTiledJSON('mapGame', './assets/Mapas/mapGame.json')
        //Mapa Fase 1
        this.load.tilemapTiledJSON('mapFase01', './assets/Mapas/mapFase01.json')
        this.load.tilemapTiledJSON('mapaF01', './assets/Mapas/mapasFaceis/mapaF01.json')
        //Mapa Fase 2
        this.load.tilemapTiledJSON('mapFase02', './assets/Mapas/mapFase02.json')
        this.load.tilemapTiledJSON('mapaF02', './assets/Mapas/mapasFaceis/mapaF02.json')
        //Mapa Fase 3
        this.load.tilemapTiledJSON('mapFase03', './assets/Mapas/mapFase03.json')
        this.load.tilemapTiledJSON('mapaF03', './assets/Mapas/mapasFaceis/mapaF03.json')
        //Mapa Fase 4
        this.load.tilemapTiledJSON('mapFase04', './assets/Mapas/mapFase04.json')

        //assets
        this.load.image('dove-logo-2048x1420', './assets/tiles/dove-logo-2048x1420.png');
        this.load.image('logo_kibon', './assets/tiles/kibon_logo.png');
        this.load.image('logo_omo', './assets/tiles/omo_logo.png');
        this.load.image('tilemap_all', './assets/tiles/tilemap_all.png');
        this.load.image('tileset_all', './assets/tiles/tileset_all.png');
        this.load.image('logoUnilever', './assets/tiles/unilever.png');
        this.load.image('keyboard', './assets/tiles/keyboard.png');
        this.load.image('bandeira', './assets/tiles/bandeira.png')
        this.load.spritesheet('boneco', './assets/bonequinho.png', { frameWidth: 500, frameHeight: 500 });  // add o arquivo do boneco e defini como uma spritsheet
        this.load.spritesheet('npc1', './assets/exclamacao.png', { frameWidth: 70, frameHeight: 70 });//add o npc
        this.load.spritesheet('jmp', './assets/pulo.png', { frameWidth: 500, frameHeight: 500 }); // add arquivo 
        this.load.spritesheet('srPoluicaoFase04', './assets/animsSrPoluicao.png', { frameWidth: 372, frameHeight: 600 }); // add arquivo 
        this.load.spritesheet('chuvaF04', './assets/chuva.png', { frameWidth: 1200, frameHeight: 600 }); // add arquivo

        // carrega as imagens a serem usadas no game
        this.load.image('papelzinho', './assets/papelzinho.png'); //add o papelzinho que o jogador coleta
        this.load.image('plataforma1', './assets/plataforma.png');
        this.load.image('plataforma2', './assets/plataforma2.png');

        //Hud menu pause
        this.load.image('HUDpause', './assets/hudpause/HUDpause.png')
        this.load.image('volume', './assets/hudpause/volume.png')
        this.load.image('resume', './assets/hudpause/play.png')
        this.load.image('menuInicial', './assets/hudpause/MenuInicial.png')
        this.load.image('mute', './assets/hudpause/mute.png')
        this.load.image('hudcoracao', './assets/hudpause/hudcoração-export6.png')

        //carrega os audios do game
        this.load.audio('somFundo', './assets/audios/musicaTutorial.mp3');
        this.load.audio('vidaPerdida', './assets/audios/-1life.mp3');
        this.load.audio('collectPaper', './assets/audios/collectPaper.mp3');
        this.load.audio('openBook', './assets/audios/openBook.mp3');
        this.load.audio('pulo', './assets/audios/pulo.mp3');
        this.load.audio('correr', './assets/audios/correr.mp3');
        this.load.audio('musicaQuiz', './assets/audios/musicaQuiz.mp3');
        this.load.audio('srPoluicaoAtaque', './assets/audios/srPoluicaoAtaque.mp3');
        this.load.audio('somCutScene', './assets/audios/somCutScene.mp3');
        this.load.audio('unilsonAtaque', './assets/audios/unilsonAtaque.mp3');
        this.load.audio('checkPoint', './assets/audios/checkPoint.mp3');
        this.load.audio('trovao', './assets/audios/trovao.mp3');
        this.load.audio('somVitoria', './assets/audios/somVitoria.mp3');
        this.load.audio('somDerrota', './assets/audios/somDerrota.mp3');
        this.load.audio('somDeChuva', './assets/audios/chuva.mp3');

        

        this.load.spritesheet('monstro', './assets/garrafa.png', { frameWidth: 50, frameHeight: 26 }); //add o monstro garrafa

        this.load.image('botao-enter', './assets/enter.png'); //add botão enter

        this.load.image('coracao', './assets/hudpause/hudcoração1.png');

        this.load.image('faixas', './assets/tiles/faixas.png');

        this.load.image('balao', './assets/balao.png')

        this.load.image('hudQuiz', './assets/quiz/hudQuiz.png')

        this.load.image('testeFundo', './assets/quiz/testeFundo.png')

        this.load.video('danoUnilson', './assets/quiz/danoUnilson.mp4'); // add o video da cutscene

        this.load.video('batalhaIDLE', './assets/quiz/battleIDLE.mp4'); // add o video da cutscene

        this.load.video('danoSrPolu', './assets/quiz/danoSrPolu.mp4'); // add o video da cutscene

        this.load.image('botaoQuestao', './assets/quiz/botaoQuestao.png')

        this.load.image('final', './assets/final.png')

        this.load.image('inteli', './assets/logointeli.png')

        this.load.image('tela80', './assets/tela80.png')

        this.load.image('tela50', './assets/tela50.png')

        this.load.image('botaoDNV', './assets/jogarDNV.png')

        this.load.image('telaFim', './assets/fimDeJogo.png')

        this.load.image('vitoriaUnilson', './assets/quiz/vitoriaUnilson.png')

        this.load.image('derrotaUnilson', './assets/quiz/derrotaUnilson.png')

        this.load.image('hudLivro', './assets/livro/hudLivro.png')
        
        this.load.image('folhaLivro', './assets/livro/folha.png')

        this.load.image('xHudLivro', './assets/livro/xHudLivro.png')

        this.load.image('setaHudLivroEsquerda', './assets/livro/setaHudLivroEsquerda.png')

        this.load.image('setaHudLivroDireita', './assets/livro/setaHudLivroDireita.png')
        
        this.load.image('insigna1', './assets/livro/hudpagedove.png')

        this.load.image('insigna2', './assets/livro/hudpagekibom.png')
      
        this.load.image('insigna3', './assets/livro/hudpageomo.png')

        this.load.image('botaoHudLivro1', './assets/livro/hudLivroPag1.png')

        this.load.image('botaoHudLivro2', './assets/livro/hudLivroPag2.png')

        this.load.image('botaoHudLivro3', './assets/livro/hudLivroPag3.png')


        

    }

    create() {
        this.scene.stop()

        this.scene.start('tutorial')
        
    }

}