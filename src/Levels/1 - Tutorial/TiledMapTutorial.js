// Classe que define um mapa criado no Tiled para o tutorial do jogo.
export default class TiledMapTutorial {
    constructor(scene) {
        // Construtor da classe, recebe a cena onde o mapa será usado.

        // Atribuição da cena recebida à propriedade "scene" da classe.
        this.scene = scene;

        // Criação do mapa tiled usando a chave 'mapTutorial'.
        this.map = this.scene.make.tilemap({ key: 'mapTutorial' });

        // Adição dos tilesets utilizados no mapa.
        this.tilesetCity = this.map.addTilesetImage('fábrica', 'tilemap_all');
        this.tilesetJungle = this.map.addTilesetImage('floresta', 'tileset_all');
        this.setas = this.map.addTilesetImage('keyboard', 'keyboard');

        // Criação das camadas do mapa.
        this.fundo = this.map.createLayer('fundo', this.tilesetCity, 0, 0).setDepth(-1);
        this.elementosDecoracao = this.map.createLayer('elementosDecoracao', [this.tilesetCity, this.tilesetJungle], 0, 0);
        this.elementosDecoracao2 = this.map.createLayer('elementosDecoracao2', [this.tilesetCity, this.tilesetJungle, this.setas], 0, 0);
        this.agua = this.map.createLayer('agua', [this.tilesetCity, this.tilesetJungle], 0, 0);
        this.chao = this.map.createLayer('chao', [this.tilesetCity, this.tilesetJungle], 0, 0);

        // Obtenção das camadas de objetos do mapa.
        this.colisoes = this.map.getObjectLayer('colisoes');
        this.espinhosLayer = this.map.getObjectLayer('espinhos_agua');
        this.mudaCena = this.map.getObjectLayer('mudaCena');

        // Criação de grupos estáticos de colisão para cada tipo de objeto de colisão.
        this.colliders = this.scene.physics.add.staticGroup();
        this.espinhosLayerCollider = this.scene.physics.add.staticGroup();
        this.mudaCenaCollider = this.scene.physics.add.staticGroup();
    }

    setupColliders() {
        // Método para configurar os colisores do mapa.

        // Configuração dos colisores para os objetos na camada 'colisoes'.
        this.colisoes.objects.forEach(obj => {
            const collider = this.colliders.create(obj.x + obj.width / 2, obj.y + obj.height / 2, null);
            collider.body.setSize(obj.width, obj.height);
            collider.setOrigin(0.5, 0.5);
            collider.setVisible(false);
        });

        // Configuração dos colisores para os objetos na camada 'espinhos_agua'.
        this.espinhosLayer.objects.forEach(obj => {
            const collider2 = this.espinhosLayerCollider.create(obj.x + obj.width / 2, obj.y + obj.height / 2, null);
            collider2.body.setSize(obj.width, obj.height);
            collider2.setOrigin(0.5, 0.5);
            collider2.setVisible(false);
        });

        // Configuração dos colisores para os objetos na camada 'mudaCena'.
        this.mudaCena.objects.forEach(obj => {
            const collider3 = this.mudaCenaCollider.create(obj.x + obj.width / 2, obj.y + obj.height / 2, null);
            collider3.body.setSize(obj.width, obj.height);
            collider3.setOrigin(0.5, 0.5);
            collider3.setVisible(false);
        });
    }
}
