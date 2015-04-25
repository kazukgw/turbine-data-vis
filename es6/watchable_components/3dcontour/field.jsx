var React = require('react');
var THREE = require('THREE');
THREE.TrackballControls = require('vendor/trackball_controls');
THREE.TrackballControls.prototype = Object.create( THREE.EventDispatcher.prototype );
THREE.TrackballControls.prototype.constructor = THREE.TrackballControls;

var Field = React.createClass({
  getInitialState() {
    var camera = this.initCamera();
    var controls = this.initControls(camera);
    return {
      points: this.initPoints(),
      meshes: this.initMeshes(),
      scene: new THREE.Scene(),
      lights: this.initLights(),
      camera: camera,
      controls: controls,
      renderer: this.initRenderer(),
      raycaster: new THREE.Raycaster()
    };
  },

  initRenderer() {
    var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setClearColor(0xDDDDDD, 1);
    renderer.setSize(this.props.outerWidth, this.props.outerHeight);
    return renderer;
  },

  componentDidMount() {
    React.findDOMNode(this.refs.container).appendChild(this.state.renderer.domElement);
    this.setItemToScene();
    this.state.scene.add(new THREE.AxisHelper(1000));
    this.state.camera.position.x = 700;
    this.state.camera.position.y = 700;
    this.state.camera.position.z = 700;
    this.state.camera.lookAt(new THREE.Vector3(0, 0, 0));
    this.state.renderer.render(this.state.scene, this.state.camera);
  },

  render() {
    return (
      <div ref="container"
        style={{width: this.props.outerWidth, height: this.props.outerHeight}}
      />
    );
  },

  setItemToScene() {
    var s = this.state.scene;
    s.add(this.state.camera);
    this.state.lights.forEach((l) => s.add(l));
    s.add(this.state.points);
    s.add(this.state.meshes);
  },

  initPoints() {
    var self = this;
    var spheres = new THREE.Object3D();
    this.props.data.rows.forEach((row, iy)=>{
      row.forEach((d, ix)=>{
        var geometry = new THREE.SphereGeometry( 1, 32, 32 );
        var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
        var sphere = new THREE.Mesh( geometry, material );
        sphere.position.x = ix * 30;
        sphere.position.z = iy * 30; // threejs が 右手系なので y は zになる
        sphere.position.y = d;
        spheres.add(sphere);
      })
    });
    return spheres;
  },

  initMeshes() {
    var rowsLength = this.props.data.rows.length;
    var meshes = new THREE.Object3D();
    var self = this;
    var rows = this.props.data.rows;
    this.props.data.rows.forEach((row, iy)=>{
      if(iy >= rowsLength - 1) {
        return;
      }

      var rowLength = row.length;
      row.forEach((d, ix)=>{
        if(ix >= rowLength - 1) {
          return;
        }

        var v1 = { x: ix * 30, y: iy * 30, z: d};
        var v2 = { x: (ix+1) * 30, y: (iy) * 30, z: row[ix + 1]};
        var v3 = { x: (ix) * 30, y: (iy+1) * 30, z: rows[iy + 1][ix]};
        var v4 = { x: (ix+1) * 30, y: (iy+1) * 30, z: rows[iy + 1][ix + 1]};

        v1 = new THREE.Vector3(v1.x,  v1.z, v1.y);
        v2 = new THREE.Vector3(v2.x,  v2.z, v2.y);
        v3 = new THREE.Vector3(v3.x,  v3.z, v3.y);
        v4 = new THREE.Vector3(v4.x,  v4.z, v4.y);


        console.log('v1-4: ', v1, v2, v3, v4);

        var geometry = new THREE.Geometry();
        geometry.vertices.push(v1, v2, v3, v4);

        var normal = new THREE.Vector3();
        geometry.faces.push( new THREE.Face3( 0, 2, 1, new THREE.Vector3(1, 0, 1), new THREE.Color('#FF0000')),
                             new THREE.Face3( 2, 3, 1, new THREE.Vector3(1, 0, 1), new THREE.Color('#FFFF00')) );

        geometry.computeFaceNormals();

        var mesh =  new THREE.Mesh(
                      geometry,
                      new THREE.MeshLambertMaterial({
                        color: 0x000099
                      })
                    );

        mesh.position.x = 0 ; //ix * 20;
        mesh.position.z = 0 ;// iy * 20; // threejs が 右手系なので y は zになる
        mesh.position.y = 0;

        meshes.add(mesh);
      });
    });

    return meshes;
  },

  initLights() {
    var light1 = new THREE.DirectionalLight(0xffffffff, 1);
    var light2 = new THREE.DirectionalLight(0xffffffff, 0.3);
    var light3 = new THREE.DirectionalLight(0xffffffff, 1);
    var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.25);
    light1.position.set(1000, -10000, 750);
    light2.position.set(-1000, -1000, -750);
    light3.position.set(1000, 1000, 750);
    return [light1, light2, light3, hemiLight];
  },

  initCamera() {
    var camera = new THREE.PerspectiveCamera(
      70,
      this.props.outerWidth / this.props.outerHeight,
      1,
      40 * 1000
    );
    return camera;
  },

  initControls(camera) {
    var controls = new THREE.TrackballControls(camera);
    controls.staticMoving = true;
    controls.noRoll = true;
    controls.noRotate = false;
    controls.minDistance = 100;
    controls.maxDistance = 3000;
    return controls;
  },

  update() {
    if(this.state.controls) this.state.controls.update();
    // this.TWEEN.update();
  },

  animationStart() {
    requestAnimationFrame(this.animationStart.bind(this));
    this.update();
    this.webglRender();
  },

  webglRender() {
    this.state.renderer.render(this.state.scene, this.state.camera);
  }
});

module.exports = Field;
