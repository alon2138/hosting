let camera, renderer;
let scene, model, raycaster, mouse;
let pointLight, ambientLight;
let container, containerWidth, containerHeight;
const INTERSECTED = null;

function initThreeJsDemo() {
  container = document.getElementById("threejs-container");
  containerWidth = container.clientWidth;
  containerHeight = container.clientHeight;

  scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer({ antialias: true });
  camera = new THREE.PerspectiveCamera(75, containerWidth / containerHeight, 0.1, 1000);
  
  renderer.setSize(containerWidth, containerHeight);
  container.appendChild(renderer.domElement);

  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  // Add OrbitControls
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; // Enable smooth damping
  controls.dampingFactor = 0.05;
  
  // Solid color background
  scene.background = new THREE.Color(0x222222);
  
  // or use a texture as background
  const backgroundTexture = new THREE.TextureLoader().load('https://cdn.shopify.com/s/files/1/0754/1833/7620/t/1/assets/background.jpg?v=1682713309');
  scene.background = backgroundTexture;
  
  // Load the 3D model
  const loader = new THREE.GLTFLoader();
  loader.load("https://alon2138.github.io/hosting/Hummingbird_Model.glb", (gltf) => {
    model = gltf.scene;
    model.scale.set(3,3,3)
    scene.add(model);
    model.rotation.y = Math.PI; // Rotate the model if necessary
    camera.position.z = 5;
    animate();
  });

  // Add dynamic lighting
  ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(10, 10, 10);
  scene.add(pointLight);

  // Add event listeners for interaction and responsiveness
  window.addEventListener("resize", updateSize);
  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("click", onMouseClick);
}

function animate() {
  requestAnimationFrame(animate);

  if (!model) {
    return;
  }

  model.rotation.y += 0.003;
  
// Update the controls
  controls.update();
  renderer.render(scene, camera);
}

function updateSize() {
  containerWidth = container.clientWidth;
  containerHeight = container.clientHeight;

  camera.aspect = containerWidth / containerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(containerWidth, containerHeight);
}

function onMouseMove(event) {
  // Normalize mouse coordinates
  mouse.x = (event.clientX / containerWidth) * 2 - 1;
  mouse.y = -(event.clientY / containerHeight) * 2 + 1;
}

function onMouseClick(event) {
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(model.children, true);

  if (intersects.length > 0) {
    const firstObject = intersects[0].object;
    // Handle the interaction with the clicked object, e.g., show a tooltip or additional information
  }
}

window.addEventListener("load", () => {
  initThreeJsDemo();
});
