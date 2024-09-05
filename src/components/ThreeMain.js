import React, { useEffect, useRef } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import '../App.css';
import * as THREE from 'three';

function ThreeMain() {
  const mountRef = useRef(null);
  const mixerRef = useRef(null);
  const cameraRef = useRef(null);
  const clock = useRef(new THREE.Clock());
  const idleActionRef = useRef(null);

  useEffect(() => {
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xf0f0f0); // Match the background color
    mountRef.current.appendChild(renderer.domElement);

    // Scene setup
    const scene = new THREE.Scene();

    // Camera setup
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(-10, 3, 18);
    camera.lookAt(0, -16, 0);
    cameraRef.current = camera;

    // Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minPolarAngle = Math.PI / 4;
    controls.maxPolarAngle = Math.PI / 2;
    controls.enablePan = false;
    controls.update();

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambientLight);

    // Load models
    const loader = new GLTFLoader();
    loader.load('thescene.glb', function (glb) {
      const assetone = glb.scene;
      scene.add(assetone);
      assetone.position.set(-0.5, -5, 4); // Adjust position
      assetone.scale.set(0.015, 0.02, 0.015);
      assetone.rotation.y = 0.6;

      if (glb.animations.length > 0) {
        glb.animations.forEach((clip) => {
          const action = mixerRef.current.clipAction(clip);
          if (clip.name === 'Take 001') {
            idleActionRef.current = action;
          }
          idleActionRef.current.play();
        });
      }
    });

    // Load Custom Font and create 3D text letter by letter
    const fontLoader = new FontLoader();
    fontLoader.load('coolfont.json', function (font) {
      const text = "Boost your business now!";
      const letterSpacing = 0.08;  // Default letter spacing
      let currentXOffset = 2;   // Start position for x
      let currentYOffset = 3.2;   // Start position for y
      let letterIndex = 0;

      const maxLineLength = 10;   // Max number of characters in a line before wrapping
      const frontMaterial = new THREE.MeshPhongMaterial({ color: 0x4061d6 });
      const sideMaterial = new THREE.MeshPhongMaterial({ color: 0xffe791});
      const topMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });

      function addLetter() {
        if (letterIndex < text.length) {
          const letter = text[letterIndex];

          if (letter === ' ') {
            currentXOffset += 0.2;  // Space width
            letterIndex++;
            setTimeout(addLetter, 200);
            return;
          }

          const letterGeometry = new TextGeometry(letter, {
            font: font,
            size: 0.7,
            depth: 0.2,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 5,
          });

          const materials = [frontMaterial, sideMaterial, topMaterial];
          const letterMesh = new THREE.Mesh(letterGeometry, materials);
          letterMesh.position.set(currentXOffset - 5, currentYOffset, 0);
          scene.add(letterMesh);

          letterGeometry.computeBoundingBox();
          const letterWidth = letterGeometry.boundingBox.max.x - letterGeometry.boundingBox.min.x;

          // Adjust spacing for specific letters to avoid excessive spacing
          if (letter === 's') {
            currentXOffset += letterWidth * 1;  // Decrease spacing for 's'
          } else if (letter === 'y') {
            currentXOffset += letterWidth * 1;  // Decrease spacing for 'y'
          }else if (letter === 'i') {
            currentXOffset += letterWidth * 1.4;  // Decrease spacing for 'i'
          } else {
            currentXOffset += letterWidth * 1.2;;
          }

          letterIndex++;

          // Check if we need to move to a new line
          if (letterIndex % maxLineLength === 0) {
            currentXOffset = 2.6;  // Reset x position for new line
            currentYOffset -= 1.2; // Move down for the new line
          }

          setTimeout(addLetter, 200);
        }
      }

      addLetter();
    });

    // Add a ground plane to cover negative space
    const floorGeometry = new THREE.PlaneGeometry(100, 100);
    const floorMaterial = new THREE.MeshBasicMaterial({ color: 0xf0f0f0, side: THREE.DoubleSide });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -5;
    scene.add(floor);

    // Scroll event listener
    const handleScroll = () => {
      if (cameraRef.current) {
        const scrollY = window.scrollY;
        cameraRef.current.position.z = 18 - scrollY * 0.03;
        cameraRef.current.position.x = -10 + scrollY * 0.08;
        cameraRef.current.lookAt.x = 0 - scrollY * 0.08;
        cameraRef.current.lookAt.y = 8 - scrollY * 2;
        cameraRef.current.lookAt.z = 0 - scrollY * 0.03;
        cameraRef.current.updateProjectionMatrix();
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Animation loop
    function animate() {
      const delta = clock.current.getDelta();
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }

    animate();

    // Resize handling
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Clean up
    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return <div ref={mountRef} style={{ margin: '0px' }} className='threebox' />;
}

export default ThreeMain;
