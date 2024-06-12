import preload from "./preload.js";

import telaInicial from "./Ínicio-Fim/telaInicial.js";
import tutorial from "./Levels/1 - Tutorial/tutorial.js";
import cutScene from "./Levels/1 - Tutorial/cutscene.js"


import Game from "./Levels/2 - Fábrica/game.js"
import Fase01 from "./Levels/3 - Fase01/Fase01.js";
import Fase02 from "./Levels/4 - Fase02/Fase02.js";
import Fase03 from "./Levels/5 - Fase03/Fase03.js";

import Fase01F from "./Levels/Facil/Fase01F.js";
import Fase02F from "./Levels/Facil/Fase02F.js";
import Fase03F from "./Levels/Facil/Fase03F.js";

import Fase04 from "./Levels/6 - Fase04/Fase04.js";
import quizFinal from "./Levels/7 - Fase05/faseQuiz.js";
import telaFinal from "./Ínicio-Fim/telaFinal.js"

import Livro from "./Classes/livro.js";
import GameOver from "./Classes/gameOver.js";
import menuPause from "./Classes/menuPause.js"



var config = { //Configuração do Jogo
    type: Phaser.WEBGL, // defini o tipo de renderização
    width: 1200, // largura da tela do game
    height: 600, // altura da tela do game
    // ?? não sei exlpicar]
    fps: {
        target: 120, // Defina o valor desejado para a taxa de quadros
        forceSetTimeOut: true // Opcionalmente, forçar o uso do setTimeout
    },

    scale: {
        mode: Phaser.Scale.FIT,
    },
    
    render: { //Configurações de renderização do jogo
        antialias: false,
        pixelArt: true,
        roundPixels: false,
        transparent: false,
        // Habilitar V-Sync
        vSync: true
    },
    physics: { //Físicas do jogo
        default: 'arcade',
        arcade: {
            gravity: { y: 700 },
            debug: false
        },    
    },

    //Defini as cenas executadas no game em ordem
    scene: [telaInicial, preload, tutorial,cutScene, Game, 
        Fase01, Fase02, Fase03,
        Fase01F, Fase02F, Fase03F,
        Fase04, quizFinal, Livro, telaFinal, GameOver, menuPause] 
    
}


var game = new Phaser.Game(config); // defini a variável game e "guarda" nela as configurações que colocamos no config
var platforms; // variável para identificar o chão
var player; // variável para identifcar o boneco
var cursors; // variável para identificar o teclado



