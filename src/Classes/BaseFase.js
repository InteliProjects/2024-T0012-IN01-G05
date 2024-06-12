// Declaração das variáveis globais para o player e os cursores de teclado.
var cursors
var papelzinhosColetados = 0;
var vidas = 5; // Quantidade inicial de vidas
var vidasImages = []; // Array para armazenar as imagens dos corações
export {papelzinhosColetados};
// BaseFase.js
import Player from './player.js';
import Hud from './hud.js';

export default class BaseFase extends Phaser.Scene {
  constructor(key, playerStartX, playerStartY, respawnX, respawnY, nextSceneKey) {
    super({ key: key });
    this.playerStartX = playerStartX;
    this.playerStartY = playerStartY;
    this.respawnX = respawnX;
    this.respawnY = respawnY;
    this.nextSceneKey = nextSceneKey;
    this.pausado = false;
    this.checkPointIndex = 0
    this.checkpointPositions = [];
  }

  preload() {
    // Carregamento de assets comuns, se necessário
  }

  create(mapClass) {
    this.game = new mapClass(this);
    this.game.setupColliders();

    this.cursors = this.input.keyboard.createCursorKeys();
    this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    this.keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

    this.player = new Player(this, this.playerStartX, this.playerStartY, 'boneco');
    this.hud = new Hud(this, 50, 50, papelzinhosColetados, vidasImages);
    this.vidaPerdida = this.sound.add('vidaPerdida',{ volume: 0.2 });
    this.collectPaper = this.sound.add('collectPaper', { volume: 0.3 });
    this.openBook = this.sound.add('openBook', { volume: 0.2 });

    this.setupCamera();
    this.setupCollisions();
    this.setupOverlapHandlers();
  }

  setupCamera() {
    this.cameras.main.fadeIn(500, 0, 0, 0);
    this.physics.world.bounds.width = this.game.map.widthInPixels;
    this.physics.world.bounds.height = this.game.map.heightInPixels;
    this.cameras.main.startFollow(this.player, true);
    this.cameras.main.setBounds(0, 0, this.game.map.widthInPixels, this.game.map.heightInPixels);
  }

  setupCollisions() {
    this.physics.add.collider(this.player, this.game.colliders);
    // Adicione aqui outras colisões necessárias
  }

  setupOverlapHandlers() {
    this.physics.add.overlap(this.player, this.game.papelzinhoLayerCollider, (player, papelCollider) => {
      papelzinhosColetados += 1;
      this.hud.updateScore(papelzinhosColetados);
      this.collectPaper.play();
      // Suponha que o papelzinho ocupe 2x3 tiles
      const tilesWide = 2; // Largura do papelzinho em tiles
      const tilesHigh = 2; // Altura do papelzinho em tiles
      // Calcula a coordenada inicial do tile (superior esquerdo do papelzinho)
      const startTileX = this.game.camadaPapelzinhos.worldToTileX(papelCollider.x);
      const startTileY = this.game.camadaPapelzinhos.worldToTileY(papelCollider.y);
      // Remove os tiles que compõem o papelzinho
      for (let x = 0; x < tilesWide; x++) {
        for (let y = 0; y < tilesHigh; y++) {
          this.game.camadaPapelzinhos.removeTileAt(startTileX + x, startTileY + y);
        }
      }
      papelCollider.destroy(); // Destrua o colisor do papelzinho
    });

    this.physics.add.overlap(this.player, this.game.espinhosLayerCollider, () => { //Função da colisão entre o player e os espinhos/água
      if (vidas >= 0) {
        // Remove um coração quando o jogador perde uma vida
        this.vidaPerdida.play();
        vidas--;
        const coracaoPerdido = vidasImages.pop();
        coracaoPerdido.destroy();
      }
      this.player.setAlpha(0); // Torna o jogador invisível.
      this.player.body.enable = false; // Desativa a física do jogador.
      this.time.delayedCall((1000), () => {
        this.player.setAlpha(1); // Torna o jogador visível após meio segundo.
        this.player.setPosition(this.respawnX, this.respawnY); // Muda a posição do jogador após torná-lo visível novamente.
        this.player.body.enable = true; // Ativa a física do jogador novamente.
      });


    });

    this.physics.add.overlap(this.player, this.game.mudaCenaCollider, () => {
      // this.player.correr.destroy()
      if (this.scene.get('telaInicial').facil) {
        if (papelzinhosColetados === 0 || papelzinhosColetados === 10 || papelzinhosColetados === 20 || papelzinhosColetados === 30) {
          vidas = 5
          this.scene.stop(this.key);
          this.cameras.main.fadeOut(2000, 0, 0, 0);
          this.scene.start(this.nextSceneKey);
        }
      } else {
        if (papelzinhosColetados === 0 || papelzinhosColetados === 20 || papelzinhosColetados === 40 || papelzinhosColetados === 60) {
          vidas = 5
          this.scene.stop(this.key);
          this.cameras.main.fadeOut(2000, 0, 0, 0);
          this.scene.start(this.nextSceneKey);
        }
      }

    })
  }

  setupcheckPoint() {
    // Configura a lógica de overlap para a camada de checkpoints
    // Isso pressupõe que setupColliders() no TiledMapFase01 já criou os colisores de checkpoint
    this.game.checkPointCollider.children.entries.forEach(checkpointCollider => {
      this.physics.add.overlap(this.player, checkpointCollider, () => {
        // Atualiza as posições de respawn para a posição do checkpoint
        this.respawnX = checkpointCollider.x;
        this.respawnY = checkpointCollider.y - 40;

        // Aqui você pode executar qualquer lógica adicional necessária quando um checkpoint é atingido
        // Por exemplo, tocar um som, salvar o progresso, etc.
        this.checkPoint = this.sound.add('checkPoint', {volume: 0.5});
        this.checkPoint.play();
        // Se você quiser que o checkpoint seja usado apenas uma vez, desabilite o colisor
        checkpointCollider.body.enable = false;
        checkpointCollider.destroy()
      });
    });
  }

  handlePlayerCollision() {
    if (vidas >= 0) {
      vidas--;
      const coracaoPerdido = vidasImages.pop();
      if (coracaoPerdido) coracaoPerdido.destroy();
      this.vidaPerdida.play();

      this.player.setAlpha(0);
      this.player.body.enable = false;
      this.time.delayedCall(2000, () => {
        this.player.setAlpha(1);
        this.player.setPosition(this.respawnX, this.respawnY);
        this.player.body.enable = true;
      });
    }
  }

  gameOver() {
    this.scene.stop()
    this.scene.start('GameOver', { previousScene: this.scene.key });
    vidas = 5

  }

  menuPausa() {
    const keyQJustDown = Phaser.Input.Keyboard.JustDown(this.keyQ);

    if (keyQJustDown) {
      this.pausado = !this.pausado;

      if (this.pausado) {
        this.scene.launch('PauseScene', { previousScene: this.scene.key });
      } else {
        this.scene.resume('PauseScene');
      }
    }
  }


  update() {
    this.player.update(cursors);
    this.hud.update(papelzinhosColetados, vidasImages);

    //define qual ação será realizada quando a tecla P for apertada
    const keyPJustDown = Phaser.Input.Keyboard.JustDown(this.keyP)
    if (keyPJustDown) {
      this.scene.pause(this);
      this.openBook.play()
      this.scene.launch('HudLivro', { previousScene: this.scene.key, pedacosColetados: papelzinhosColetados }); // inicia a cena do livro
    }
    const keyESCJustDown = Phaser.Input.Keyboard.JustDown(this.keyESC)
    if (keyESCJustDown) {
      this.pausado === true
      this.scene.pause(this);
      this.openBook.play()
      this.scene.launch('menuPause', { previousScene: this.scene.key, pedacosColetados: papelzinhosColetados }); // inicia a cena do livro
    }

    console.log(this.respawnX)
    console.log(this.respawnY)

    if (vidas === 0) {
      this.player.correr.stop()
      this.gameOver()
      papelzinhosColetados = 0
    }
  }
}

