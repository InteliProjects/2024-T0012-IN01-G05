// Classe responsável por configurar o mapa da fase 01
export default class TiledMapFase03F {
    constructor(scene) {
        // Recebe a cena como parâmetro
        this.scene = scene;
        // Cria o mapa de tiles
        this.map = this.scene.make.tilemap({ key: 'mapaF03' });

        // Carrega os tilesets para o mapa
        this.tilesetCity = this.map.addTilesetImage('fábrica', 'tilemap_all');
        this.tilesetJungle = this.map.addTilesetImage('floresta', 'tileset_all');
        this.tilesetPapelzinhos = this.map.addTilesetImage('papelzinho', 'papelzinho');
        this.tilesetBandeira = this.map.addTilesetImage('bandeira', 'bandeira');


        // Cria as camadas do mapa
        this.camada1 = this.map.createLayer('1', [this.tilesetCity, this.tilesetJungle], 0, 0).setDepth(-1);;
        this.camada2 = this.map.createLayer('2', [this.tilesetCity, this.tilesetJungle], 0, 0);
        this.camada3 = this.map.createLayer('3', [this.tilesetCity, this.tilesetJungle], 0, 0);
        this.camada4 = this.map.createLayer('4', [this.tilesetCity, this.tilesetJungle], 0, 0);
        this.platformsLayer = this.map.createLayer('5', [this.tilesetCity, this.tilesetJungle, this.tilesetBandeira], 0, 0);
        this.camada6 = this.map.createLayer('6', [this.tilesetCity, this.tilesetJungle], 0, 0);
        this.camada7 = this.map.createLayer('7', [this.tilesetCity, this.tilesetJungle], 0, 0);
        this.camada7 = this.map.createLayer('8', [this.tilesetCity, this.tilesetJungle], 0, 0);
        this.camadaPapelzinhos = this.map.createLayer('camadaPapelzinhos', this.tilesetPapelzinhos, 0, 0);
        
        // Obtém as camadas de objetos do mapa
        this.colisoes = this.map.getObjectLayer('colisoes');
        this.espinhosLayer = this.map.getObjectLayer('espinhos_agua');
        this.mudaCena = this.map.getObjectLayer('mudaCena');
        this.papelzinhoLayer = this.map.getObjectLayer('pegarPapelzinhos')['objects'];
        this.checkPoint = this.map.getObjectLayer('checkPoint');
        
        // Cria grupos de colisores estáticos para cada tipo de objeto
        this.colliders = this.scene.physics.add.staticGroup();
        this.espinhosLayerCollider = this.scene.physics.add.staticGroup();
        this.mudaCenaCollider = this.scene.physics.add.staticGroup();
        this.papelzinhoLayerCollider = this.scene.physics.add.staticGroup();
        this.checkPointCollider = this.scene.physics.add.staticGroup();



    }

    // Método para configurar as colisões dos objetos do mapa
    setupColliders() {
        // Configura as colisões para cada tipo de objeto
        this.colisoes.objects.forEach(obj => {
            const collider = this.colliders.create(obj.x + obj.width / 2, obj.y + obj.height / 2, null);
            collider.body.setSize(obj.width, obj.height);
            collider.setOrigin(0, 0);
            collider.setVisible(false);
        });

        this.espinhosLayer.objects.forEach(obj => {
            const collider2 = this.espinhosLayerCollider.create(obj.x + obj.width / 2, obj.y + obj.height / 2, null);
            collider2.body.setSize(obj.width, obj.height);
            collider2.setOrigin(0, 0);
            collider2.setVisible(false);
        });

        this.mudaCena.objects.forEach(obj => {
            const collider3 = this.mudaCenaCollider.create(obj.x + obj.width / 2, obj.y + obj.height / 2, null);
            collider3.body.setSize(obj.width, obj.height);
            collider3.setOrigin(0, 0);
            collider3.setVisible(false);
        });
        this.papelzinhoLayer.forEach(obj => {
            const collider4 = this.papelzinhoLayerCollider.create(obj.x + obj.width/2, obj.y + obj.height/2, 'papelzinho'); 
            collider4.body.setSize(obj.width, obj.height);
            collider4.setOrigin(0.5, 0.5);
            collider4.setVisible(false);
        })
        this.checkPoint.objects.forEach(obj => {
            const collider5 = this.checkPointCollider.create(obj.x + obj.width / 2, obj.y + obj.height / 2, null);
            collider5.body.setSize(obj.width, obj.height);
            collider5.setOrigin(0.5, 0.5);
            collider5.setVisible(false);
        });

}

}