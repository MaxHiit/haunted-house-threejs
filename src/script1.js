import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import { Mesh, MeshBasicMaterial } from "three";

/**
 * Base
 */
const gui = new dat.GUI();

// canva
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * House
 */
// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(20, 20),
  new THREE.MeshStandardMaterial({ color: "#a9c388" })
);
floor.rotation.x = -Math.PI * 0.5;
floor.position.y = 0;
scene.add(floor);

// House group
const house = new THREE.Group();
scene.add(house);

// walls
const wallsHouse = new THREE.Mesh(
  new THREE.BoxBufferGeometry(4, 2.5, 4),
  new THREE.MeshStandardMaterial({ color: "#ac8e82" })
);
wallsHouse.position.y = 1.25;
house.add(wallsHouse);

// roof
const roofHouse = new THREE.Mesh(
  new THREE.ConeBufferGeometry(3.5, 1, 4),
  new THREE.MeshStandardMaterial({ color: "#b35f45" })
);
roofHouse.rotation.y = Math.PI * 0.25;
roofHouse.position.y = 2.5 + 0.5;
house.add(roofHouse);

// door
const doorHouse = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(2, 2),
  new THREE.MeshStandardMaterial({ color: "#b35f45" })
);
doorHouse.position.y = 1;
doorHouse.position.z = 2 + 0.01;
house.add(doorHouse);

// bushes
const bushGeometry = new THREE.SphereBufferGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial({ color: "#89c854" });

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.scale.set(0.5, 0.5, 0.5);
bush1.position.set(1.2, 0.2, 2.2);

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.scale.set(0.25, 0.25, 0.25);
bush2.position.set(1.2 + 0.5, 0.1, 2.1);

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.scale.set(0.4, 0.4, 0.4);
bush3.position.set(-1.2, 0.2, 2.2);

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.scale.set(0.25, 0.25, 0.25);
bush4.position.set(-1.2, 0.05, 2.6);

house.add(bush1, bush2, bush3, bush4);

// low walls
const lowWalls = new THREE.Group();

// back walls
const lowWallsGeometry = new THREE.BoxBufferGeometry(3, 1, 0.3);
const lowWallMaterial = new THREE.MeshStandardMaterial({ color: "#ececec" });

const backLeftWall = new THREE.Mesh(lowWallsGeometry, lowWallMaterial);
backLeftWall.position.set(-3.5, 0.5, -1.85);

const backRightWall = new THREE.Mesh(lowWallsGeometry, lowWallMaterial);
backRightWall.position.set(3.5, 0.5, -1.85);

// middle walls
const middleLeftWall = new THREE.Mesh(lowWallsGeometry, lowWallMaterial);
middleLeftWall.position.set(-5, 0.5, 1.75);
middleLeftWall.rotation.y = Math.PI * 0.5;
middleLeftWall.scale.x = 2.5;

const middleRightWall = new THREE.Mesh(lowWallsGeometry, lowWallMaterial);
middleRightWall.position.set(5, 0.5, 1.75);
middleRightWall.rotation.y = Math.PI * 0.5;
middleRightWall.scale.x = 2.5;

// front walls
const frontLeftWall = new THREE.Mesh(lowWallsGeometry, lowWallMaterial);
frontLeftWall.position.set(-3.5, 0.5, 4);

const frontRightWall = new THREE.Mesh(lowWallsGeometry, lowWallMaterial);
frontRightWall.position.set(3.5, 0.5, 4);

lowWalls.add(
  backLeftWall,
  backRightWall,
  middleRightWall,
  middleLeftWall,
  frontLeftWall,
  frontRightWall
);
scene.add(lowWalls);
// alley
// graves

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight("#ffffff", 0.5);
gui.add(ambientLight, "intensity").min(0).max(1).step(0.001);
scene.add(ambientLight);

/**
 *  Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};

window.addEventListener("resize", () => {
  // update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);

camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 5;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const animate = () => {
  const elapsedTime = clock.getElapsedTime();
  // update controls
  controls.update();
  // render
  renderer.render(scene, camera);

  // call animate function on the next requestAnimationFrame
  window.requestAnimationFrame(animate);
};

animate();
