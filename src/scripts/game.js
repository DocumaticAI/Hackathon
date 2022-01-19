class Game {

  OBSTACLE_PREFAB = new THREE.BoxBufferGeometry(1, 1, 1);
  OBSTACLE_MATERIAL = new THREE.MeshBasicMaterial({ color: 0xFFFDDE });

  BONUS_PREFAB = new THREE.SphereBufferGeometry(1, 12, 12);

  COLLISION_THRESHOLD = 0.2;

  constructor(scene, camera) {
    // initialize variables
    this.speedZ = 20;
    this.speedX = 0; // -1: left, 0: straight, 1: right
    this.translateX = 0;

    this.health = 100;
    this.score = 0;

    this.rotationLerp = null;

    this.divHealth = document.getElementById('health');
    this.divScore = document.getElementById('score');

    // prepare 3D scene
    this._initializeScene(scene, camera);

    // bind event callbacks
    document.addEventListener('keydown', this._keydown.bind(this));
    document.addEventListener('keyup', this._keyup.bind(this));
    }
    
    update() {
      // recompute the game state
      const timeDelta = this.clock.getDelta();
      this.time += timeDelta;

      if (this.rotationLerp !== null)
        this.rotationLerp.update(timeDelta);
  
      this.translateX += this.speedX * -0.05;
  
      this._updateGrid();
      this._checkCollisions();
      this._updateInfoPanel();
    }

    _keydown(event) {
      let newSpeedX;
      switch (event.key) {
        case 'ArrowLeft':
          newSpeedX = -1.0;
          break;
        case 'ArrowRight':
          newSpeedX = 1.0;
          break;
        default:
          return;
    }

    if (this.speedX !== newSpeedX) {
      this.speedX = newSpeedX;
      this._rotateShip(-this.speedX * 20 * Math.PI / 180, 0.8);
    }
  }
  
  _keyup() {
    this.speedX = 0;
    this._rotateShip(0, 0.5);
  }

  _rotateShip(targetRotation, delay) {
    const $this = this;
    this.rotationLerp = new Lerp(this.ship.rotation.z, targetRotation, delay)
      .onUpdate((value) => { $this.ship.rotation.z = value })
      .onFinish(() => { $this.rotationLerp = null });
  }

  _updateGrid() {
      this.grid.material.uniforms.time.value = this.time;
      this.objectsParent.position.z = this.speedZ * this.time;

      this.grid.material.uniforms.translateX.value = this.translateX;
      this.objectsParent.position.x = this.translateX;
      
      this.objectsParent.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          // Z-position in world space
          const childZPos = child.position.z + this.objectsParent.position.z;
          if (childZPos > 0) {
            // reset the object
            const params = [child, -this.translateX, -this.objectsParent.position.z];
            if (child.userData.type === 'obstacle') {
              this._setupObstacle(...params);
            }
            else {
              const price = this._setupBonus(...params);
              child.userData.price = price;
            }
          }
        }
      });
    }

  _checkCollisions() {
    this.objectsParent.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // pos in world space
        const childZPos = child.position.z + this.objectsParent.position.z;
  
        // threshold distances
        const thresholdX = this.COLLISION_THRESHOLD + child.scale.x / 2;
        const thresholdZ = this.COLLISION_THRESHOLD + child.scale.z / 2;
          
        // check for collision
        if (
          childZPos > -thresholdZ &&
          Math.abs(child.position.x + this.translateX) < thresholdX
        ) {
          const params = [child, -this.translateX, -this.objectsParent.position.z];
          if (child.userData.type === 'obstacle') {
            this.health -= 10;
            this.divHealth.innerText = this.health;
            this._setupObstacle(...params);
          }
          else {
            this.score += child.userData.price;
            this.divScore.innerText = this.score;
            child.userData.price = this._setupBonus(...params);
          }
        }
      }
    });
  }

  _updateInfoPanel() {
      // obstacles
      // bonuses
    }

  _gameOver() {
      // show "end state" UI
      // reset instance variables for a new game
    }

  _createShip(scene) {
      const shipBody = new THREE.Mesh(
        new THREE.TetrahedronBufferGeometry(0.4),
        new THREE.MeshBasicMaterial({ color: 0x91C483 }),
      );

      shipBody.rotateX(45 * Math.PI / 180);
      shipBody.rotateY(45 * Math.PI / 180);
      
      this.ship = new THREE.Group();
      this.ship.add(shipBody);
  
      scene.add(this.ship);

      const reactorSocketGeometry = new THREE.CylinderBufferGeometry(0.08, 0.08, 0.1, 16);
      const reactorSocketMaterial = new THREE.MeshBasicMaterial({ color: 0xFF6464 });
      const reactorSocket1 = new THREE.Mesh(reactorSocketGeometry, reactorSocketMaterial);
      const reactorSocket2 = new THREE.Mesh(reactorSocketGeometry, reactorSocketMaterial);
      const reactorSocket3 = new THREE.Mesh(reactorSocketGeometry, reactorSocketMaterial);

      this.ship.add(reactorSocket1);
      this.ship.add(reactorSocket2);
      this.ship.add(reactorSocket3);
      reactorSocket1.rotateX(90 * Math.PI / 180);
      reactorSocket1.position.set(-0.15, 0, 0.1);
      reactorSocket2.rotateX(90 * Math.PI / 180);
      reactorSocket2.position.set(0.15, 0, 0.1);
      reactorSocket3.rotateX(90 * Math.PI / 180);
      reactorSocket3.position.set(0, -0.15, 0.1);

      const reactorLightGeometry = new THREE.CylinderBufferGeometry(0.055, 0.055, 0.1, 16);
      const reactorLightMaterial = new THREE.MeshBasicMaterial({ color: 0xFFE162 });
      const reactorLight1 = new THREE.Mesh(reactorLightGeometry, reactorLightMaterial);
      const reactorLight2 = new THREE.Mesh(reactorLightGeometry, reactorLightMaterial);
      const reactorLight3 = new THREE.Mesh(reactorLightGeometry, reactorLightMaterial);

      this.ship.add(reactorLight1);
      this.ship.add(reactorLight2);
      this.ship.add(reactorLight3);
      reactorLight1.rotateX(90 * Math.PI / 180);
      reactorLight1.position.set(-0.15, 0, 0.11);
      reactorLight2.rotateX(90 * Math.PI / 180);
      reactorLight2.position.set(0.15, 0, 0.11);
      reactorLight3.rotateX(90 * Math.PI / 180);
      reactorLight3.position.set(0, -0.15, 0.11);
    }

  _createGrid(scene) {

      let divisions = 30;
      let gridLimit = 200;
      this.grid = new THREE.GridHelper(gridLimit * 2, divisions, 0xccddee,0xccddee);

      const moveableX = [];
      const moveableZ = [];
      for (let i = 0; i <= divisions; i++) {
        moveableX.push(0, 0, 1, 1); // move vertical lines
        moveableZ.push(1, 1, 0, 0); // move horizontal lines
      }
      this.grid.geometry.setAttribute('moveableX', new THREE.BufferAttribute(new Uint8Array(moveableX), 1));
      this.grid.geometry.setAttribute('moveableZ', new THREE.BufferAttribute(new Uint8Array(moveableZ), 1));

      this.grid.material = new THREE.ShaderMaterial({
        uniforms: {
          speedZ: {
            value: this.speedZ
          },
          translateX: {
            value: this.translateX
          },
          gridLimits: {
            value: new THREE.Vector2(-gridLimit, gridLimit)
          },
          time: {
            value: 0
          }
        },
        vertexShader: `
        uniform float time;
        uniform vec2 gridLimits;
        uniform float speedZ;
        uniform float translateX;
        
        attribute float moveableX;
        attribute float moveableZ;
        
        varying vec3 vColor;
      
        void main() {
          vColor = color;
          float limLen = gridLimits.y - gridLimits.x;
          vec3 pos = position;
          if (floor(moveableX + 0.5) > 0.5) { // if a point has "moveableX" attribute = 1 
            float xDist = translateX;
            float curXPos = mod((pos.x + xDist) - gridLimits.x, limLen) + gridLimits.x;
            pos.x = curXPos;
          }
          if (floor(moveableZ + 0.5) > 0.5) { // if a point has "moveableZ" attribute = 1
            float zDist = speedZ * time;
            float curZPos = mod((pos.z + zDist) - gridLimits.x, limLen) + gridLimits.x;
            pos.z = curZPos;
          }
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
      
        void main() {
          gl_FragColor = vec4(vColor, 1.); // r, g, b channels + alpha (transparency)
        }
      `,
      vertexColors: THREE.VertexColors
    });

    scene.add(this.grid);

    this.time = 0;
    this.clock = new THREE.Clock();
  }
    
  _initializeScene(scene, camera) {
      this._createShip(scene);
      this._createGrid(scene);

      this.objectsParent = new THREE.Group();
      scene.add(this.objectsParent);

      // spawn 10 obstacles
      for (let i = 0; i < 10; i++)
        this._spawnObstacle();
      // spawn 10 bonuses
      for (let i = 0; i < 10; i++)
        this._spawnBonus();

      camera.rotateX(-20 * Math.PI / 180);
      camera.position.set(0, 1.5, 2);
    }

  _spawnObstacle() {
      const obj = new THREE.Mesh(
        this.OBSTACLE_PREFAB,
        this.OBSTACLE_MATERIAL
      );

      this._setupObstacle(obj);
      obj.userData = { type: 'obstacle' };
      this.objectsParent.add(obj);
    }

  _setupObstacle(obj, refXPos = 0, refZPos = 0) {
      // random scale
      obj.scale.set(
        this._randomFloat(0.5, 2),
        this._randomFloat(0.5, 2),
        this._randomFloat(0.5, 2)
      );
  
      // random position
      obj.position.set(
        refXPos + this._randomFloat(-30, 30),
        obj.scale.y * 0.5,
        refZPos - 100 - this._randomFloat(0, 100)
      );
    }
    
  _spawnBonus() {
      const obj = new THREE.Mesh(
        this.BONUS_PREFAB,
        new THREE.MeshBasicMaterial({ color: 0x000000 })
      );
      const price = this._setupBonus(obj);
      obj.userData = { type: 'bonus', price };
      this.objectsParent.add(obj);
    }
    
  _setupBonus(obj, refXPos = 0, refZPos = 0) {
      const price = this._randomInt(5, 20);
      const ratio = price / 20;
  
      const size = ratio * 0.5;
      obj.scale.set(size, size, size);
  
      const hue = 0.5 + 0.5 * ratio;
      obj.material.color.setHSL(hue, 1, 0.5);
  
      obj.position.set(
        refXPos + this._randomFloat(-30, 30),
        obj.scale.y * 0.5,
        refZPos - 100 - this._randomFloat(0, 100)
      );

      return price;
    }

  _randomFloat(min, max) {
      return Math.random() * (max - min) + min;
    }

  _randomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
  }