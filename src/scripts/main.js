window.onload = () => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  // create an instance of our Game class
  // to initialise and manage the game itself
  const gameInstance = new Game(scene, camera);

  function animate() {
    requestAnimationFrame(animate);
    // directly call the game instance method to
    // be agnostic of all details
    gameInstance.update();
    renderer.render(scene, camera);
  }
  animate();
  }