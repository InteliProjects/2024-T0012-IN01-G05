export default class TiledMapGame    {
    constructor(scene) {
        this.scene = scene;
        this.map = this.scene.make.tilemap({key: 'mapGame'});

        //Criação dos tilesets
        this.tilesetcity = this.map.addTilesetImage('tilemap_all', 'tilemap_all');
        this.tilesetjungle =this. map.addTilesetImage('tileset_all', 'tileset_all');
        this.logoDove = this.map.addTilesetImage('dove-logo-2048x1420', 'dove-logo-2048x1420');
        this.logoKibon = this.map.addTilesetImage('logo_kibon', 'logo_kibon');
        this.logoUnilever = this.map.addTilesetImage('logo_unilever', 'logo_unilever');
        this.logoOmo = this.map.addTilesetImage('logo_omo', 'logo_omo'); 
        this.faixas = this.map.addTilesetImage('faixas', 'faixas');
        //Criação das camadas camadas 
            this.fundo = this.map.createLayer('fundo', this.tilesetcity, 0, 0).setDepth(-1);;
            this.elementos_do_fundo = this.map.createLayer('elementos_do_fundo', this.tilesetjungle, 0, 0);
            this.detalhes_do_elemento = this.map.createLayer('detalhes_do_elemento', [this.tilesetcity, this.tilesetjungle], 0, 0);
            this.chao = this.map.createLayer('chao', this.tilesetjungle, 0, 0 );
            this.espinhos = this.map.createLayer('espinhos', this.tilesetjungle, 0, 0 );
            this.agua = this.map.createLayer('agua', this.tilesetjungle, 0, 0 );
            this.chao_na_agua = this.map.createLayer('chao_na_agua', this.tilesetjungle, 0, 0 );
            this.ponte = this.map.createLayer('ponte', this.tilesetjungle, 0, 0 );
            this.fabrica_Uniops = this.map.createLayer('fabrica/Uniops', [this.tilesetcity, this.tilesetjungle, ], 0, 0 );
            this.detalhes_fabrica_uniops = this.map.createLayer('detalhes_fabrica/uniops', [this.tilesetcity, this.tilesetjungle, this.logoOmo, this.logoUnilever, this.logoKibon, this.logoDove], 0, 0 );
            this.detalhes_fabrica_uniops2 = this.map.createLayer('detalhes_fabrica/uniops2', [this.tilesetcity, this.tilesetjungle, this.logoOmo, this.logoUnilever, this.logoKibon, this.logoDove, this.faixas], 0, 0 );
            this.folhas_da_arvore = this.map.createLayer('folhas_da_arvore', this.tilesetjungle, 0, 0 );

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
