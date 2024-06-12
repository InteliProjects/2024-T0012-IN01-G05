export default class TiledMapFase04    {
    constructor(scene) {
        this.scene = scene;
        this.map = this.scene.make.tilemap({key: 'mapFase04'});

        //Criação dos tilesets
        this.tilesetjungle = this.map.addTilesetImage('tileset_all', 'tileset_all')
        this.tilesetcity = this.map.addTilesetImage('tilemap_all', 'tilemap_all')
        this.faixas = this.map.addTilesetImage('faixas', 'faixas');
        this.logoUnilever = this.map.addTilesetImage('logo_unilever', 'logoUnilever')
        //Criação das camadas camadas 
            this.camada1 = this.map.createLayer('1', [this.tilesetcity, this.tilesetjungle], 0, 0).setDepth(-1);;
            this.camada2 = this.map.createLayer('2', [this.tilesetcity, this.tilesetjungle], 0, 0);
            this.camada3 = this.map.createLayer('3', [this.tilesetcity, this.tilesetjungle], 0, 0);
            this.camada4 = this.map.createLayer('4', [this.tilesetcity, this.tilesetjungle], 0, 0);
            this.camada5 = this.map.createLayer('5', [this.tilesetcity, this.tilesetjungle, this.logoUnilever], 0, 0);
            this.camada6 = this.map.createLayer('6', [this.tilesetcity, this.tilesetjungle, this.faixas], 0, 0);

            this.colisoes = this.map.getObjectLayer('colisoes');
            this.espinhosLayer = this.map.getObjectLayer('espinhos_agua');
            this.mudaCena = this.map.getObjectLayer('mudaCena');

            this.colliders = this.scene.physics.add.staticGroup();
            this.espinhosLayerCollider = this.scene.physics.add.staticGroup();
            this.mudaCenaCollider = this.scene.physics.add.staticGroup();
    }
    //Implementando colisões
    setupColliders() {
        this.colisoes.objects.forEach(obj => { //Colisão do chão
            const collider = this.colliders.create(obj.x + obj.width / 2, obj.y + obj.height / 2, null);
            collider.body.setSize(obj.width, obj.height);
            collider.setOrigin(0.5, 0.5);
            collider.setVisible(false);
        });

        this.espinhosLayer.objects.forEach(obj => { //Colisão dos espinhos e da água
            const collider2 = this.espinhosLayerCollider.create(obj.x + obj.width / 2, obj.y + obj.height / 2, null);
            collider2.body.setSize(obj.width, obj.height);
            collider2.setOrigin(0.5, 0.5);
            collider2.setVisible(false);
        });

        this.mudaCena.objects.forEach(obj => { //Colisão para a mudança de cenas
            const collider3 = this.mudaCenaCollider.create(obj.x + obj.width / 2, obj.y + obj.height / 2, null);
            collider3.body.setSize(obj.width, obj.height);
            collider3.setOrigin(0.5, 0.5);
            collider3.setVisible(false);
        });
    }
}
