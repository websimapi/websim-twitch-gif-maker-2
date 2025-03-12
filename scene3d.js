// 3D Scene for Grid-based GIF Recording
import * as THREE from 'https://cdn.skypack.dev/three@0.136.0';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/GLTFLoader.js';
import { Water } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/objects/Water.js';

let scene, camera, renderer, controls;
let gridHelpers = [];
let recordingAreas = [];
let isRecording = false;
let recordedFrames = {};
let recordingInterval;
let waterSurface;
let models = [];

// Scene setup
function initScene(container) {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87ceeb);
    
    camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(5, 5, 5);
    
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    scene.add(directionalLight);
    
    // Add grid for reference
    const gridHelper = new THREE.GridHelper(20, 20);
    scene.add(gridHelper);
    
    // Add ground
    const groundGeometry = new THREE.PlaneGeometry(20, 20);
    const groundMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x554422,
        roughness: 0.8,
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);
    
    // Set up controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);
    controls.update();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
    
    animate();
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    // Update animations or physics here
    if (waterSurface) {
        waterSurface.material.uniforms['time'].value += 1.0/60.0;
    }
    
    renderer.render(scene, camera);
    
    // Record frames if active
    if (isRecording) {
        captureGridFrames();
    }
}

// Water effects
function addWater() {
    const waterGeometry = new THREE.PlaneGeometry(10, 10);
    
    waterSurface = new Water(
        waterGeometry,
        {
            textureWidth: 512,
            textureHeight: 512,
            waterNormals: new THREE.TextureLoader().load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/waternormals.jpg', function(texture) {
                texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            }),
            sunDirection: new THREE.Vector3(0, 1, 0),
            sunColor: 0xffffff,
            waterColor: 0x001e0f,
            distortionScale: 3.7,
            fog: scene.fog !== undefined
        }
    );
    
    waterSurface.rotation.x = -Math.PI / 2;
    waterSurface.position.y = 0.5;
    scene.add(waterSurface);
    
    return waterSurface;
}

// Add a bucket that can pour water
function addBucket(position = { x: 0, y: 2, z: 0 }) {
    const bucketGroup = new THREE.Group();
    
    // Bucket body
    const bucketGeometry = new THREE.CylinderGeometry(0.5, 0.4, 1, 16);
    const bucketMaterial = new THREE.MeshStandardMaterial({ color: 0x888888 });
    const bucket = new THREE.Mesh(bucketGeometry, bucketMaterial);
    bucket.castShadow = true;
    bucketGroup.add(bucket);
    
    // Bucket handle
    const handleGeometry = new THREE.TorusGeometry(0.4, 0.05, 8, 16, Math.PI);
    const handle = new THREE.Mesh(handleGeometry, bucketMaterial);
    handle.position.y = 0.5;
    handle.rotation.x = Math.PI / 2;
    handle.castShadow = true;
    bucketGroup.add(handle);
    
    bucketGroup.position.set(position.x, position.y, position.z);
    scene.add(bucketGroup);
    
    models.push({
        object: bucketGroup,
        type: 'bucket',
        canAnimate: true,
        pourWater: function() {
            // Create water droplet particles
            const particleCount = 100;
            const particleGroup = new THREE.Group();
            
            for (let i = 0; i < particleCount; i++) {
                const dropletGeometry = new THREE.SphereGeometry(0.03, 8, 8);
                const dropletMaterial = new THREE.MeshStandardMaterial({ color: 0x0077ff });
                const droplet = new THREE.Mesh(dropletGeometry, dropletMaterial);
                
                // Random position within the bucket
                droplet.position.set(
                    (Math.random() - 0.5) * 0.5,
                    0,
                    (Math.random() - 0.5) * 0.5
                );
                
                // Add physics data
                droplet.userData.velocity = new THREE.Vector3(
                    (Math.random() - 0.5) * 0.05,
                    0,
                    (Math.random() - 0.5) * 0.05
                );
                
                particleGroup.add(droplet);
            }
            
            bucketGroup.add(particleGroup);
            
            // Animation function for the pouring
            const pourAnimation = {
                time: 0,
                duration: 3, // seconds
                update: function(delta) {
                    this.time += delta;
                    
                    // Tilt the bucket
                    const tiltProgress = Math.min(this.time / (this.duration * 0.3), 1);
                    bucketGroup.rotation.x = tiltProgress * Math.PI * 0.6;
                    
                    // Animate water droplets
                    particleGroup.children.forEach(droplet => {
                        if (droplet.position.y > -5) {
                            // Apply gravity
                            droplet.userData.velocity.y -= 0.01;
                            
                            // Update position
                            droplet.position.x += droplet.userData.velocity.x;
                            droplet.position.y += droplet.userData.velocity.y;
                            droplet.position.z += droplet.userData.velocity.z;
                        }
                    });
                    
                    // Remove animation when complete
                    if (this.time >= this.duration) {
                        const index = activeAnimations.indexOf(this);
                        if (index !== -1) {
                            activeAnimations.splice(index, 1);
                            
                            // Remove water particles
                            setTimeout(() => {
                                bucketGroup.remove(particleGroup);
                            }, 1000);
                        }
                    }
                }
            };
            
            activeAnimations.push(pourAnimation);
        }
    });
    
    return bucketGroup;
}

// Load 3D model
function loadModel(url, position = { x: 0, y: 0, z: 0 }, scale = 1) {
    const loader = new GLTFLoader();
    
    return new Promise((resolve, reject) => {
        loader.load(url, (gltf) => {
            const model = gltf.scene;
            
            model.position.set(position.x, position.y, position.z);
            model.scale.set(scale, scale, scale);
            
            model.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            
            scene.add(model);
            
            models.push({
                object: model,
                type: 'loaded',
                url: url
            });
            
            resolve(model);
        }, undefined, reject);
    });
}

// Active animations
const activeAnimations = [];
let lastTime = 0;

function updateAnimations(time) {
    const delta = (time - lastTime) / 1000; // convert to seconds
    lastTime = time;
    
    activeAnimations.forEach(animation => {
        animation.update(delta);
    });
}

// Define recording grid
function setupRecordingGrid(rows, cols, height = 5, width = 5) {
    // Clear previous grid
    gridHelpers.forEach(helper => scene.remove(helper));
    gridHelpers = [];
    recordingAreas = [];
    
    const cellWidth = width / cols;
    const cellHeight = height / rows;
    
    // Create grid cells
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            // Calculate bounds
            const minX = (c * cellWidth) - (width / 2);
            const maxX = ((c + 1) * cellWidth) - (width / 2);
            const minZ = (r * cellHeight) - (height / 2);
            const maxZ = ((r + 1) * cellHeight) - (height / 2);
            
            // Create visual helper
            const geometry = new THREE.EdgesGeometry(
                new THREE.BoxGeometry(cellWidth, 2, cellHeight)
            );
            const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
            const helper = new THREE.LineSegments(geometry, material);
            
            helper.position.set(
                minX + (cellWidth / 2),
                1,
                minZ + (cellHeight / 2)
            );
            
            scene.add(helper);
            gridHelpers.push(helper);
            
            // Define recording area
            recordingAreas.push({
                id: `grid_${r}_${c}`,
                bounds: { minX, maxX, minZ, maxZ },
                helper: helper
            });
        }
    }
    
    return recordingAreas;
}

// Capture frames for each grid cell
function captureGridFrames() {
    if (!isRecording) return;
    
    // Create a temporary scene and camera for capturing
    const tempScene = scene.clone();
    
    recordingAreas.forEach(area => {
        // Only record if the area doesn't have enough frames yet
        if (!recordedFrames[area.id] || recordedFrames[area.id].length < 30) {
            // Position camera to look at this grid cell
            const centerX = (area.bounds.minX + area.bounds.maxX) / 2;
            const centerZ = (area.bounds.minZ + area.bounds.maxZ) / 2;
            
            const tempCamera = camera.clone();
            tempCamera.position.set(centerX, 3, centerZ + 3);
            tempCamera.lookAt(centerX, 0, centerZ);
            
            // Render to an offscreen canvas
            const captureCanvas = document.createElement('canvas');
            captureCanvas.width = 112;
            captureCanvas.height = 112;
            const tempRenderer = new THREE.WebGLRenderer({
                canvas: captureCanvas,
                antialias: true
            });
            
            tempRenderer.setSize(112, 112);
            tempRenderer.render(tempScene, tempCamera);
            
            // Store the frame
            if (!recordedFrames[area.id]) {
                recordedFrames[area.id] = [];
            }
            
            // Convert canvas to ImageBitmap
            createImageBitmap(captureCanvas).then(bitmap => {
                recordedFrames[area.id].push(bitmap);
            });
        }
    });
    
    // Check if we've captured enough frames for all areas
    const allComplete = recordingAreas.every(area => 
        recordedFrames[area.id] && recordedFrames[area.id].length >= 30
    );
    
    if (allComplete) {
        stopRecording();
    }
}

// Start recording
function startRecording(duration = 3) {
    isRecording = true;
    recordedFrames = {};
    
    // Highlight grid cells being recorded
    recordingAreas.forEach(area => {
        area.helper.material.color.set(0x00ff00);
    });
    
    // Set timeout to stop recording
    setTimeout(() => {
        stopRecording();
    }, duration * 1000);
}

// Stop recording
function stopRecording() {
    isRecording = false;
    
    // Reset grid colors
    recordingAreas.forEach(area => {
        area.helper.material.color.set(0xff0000);
    });
    
    // Export recorded frames
    exportRecordedGifs();
}

// Export GIFs from recorded frames
function exportRecordedGifs() {
    Object.keys(recordedFrames).forEach(areaId => {
        const frames = recordedFrames[areaId];
        if (frames.length > 0) {
            convertFramesToGif(frames, areaId);
        }
    });
}

// Convert frames to GIF
function convertFramesToGif(frames, name) {
    // Create GIF using gif.js library (similar to main app)
    const gif = new GIF({
        workers: 2,
        quality: 7,
        width: 112,
        height: 112,
        workerScript: URL.createObjectURL(gifWorkerBlob)
    });
    
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = 112;
    tempCanvas.height = 112;
    const tempCtx = tempCanvas.getContext('2d');
    
    frames.forEach(frame => {
        tempCtx.clearRect(0, 0, 112, 112);
        tempCtx.drawImage(frame, 0, 0, 112, 112);
        gif.addFrame(tempCanvas, { delay: 1000 / 30, copy: true });
    });
    
    gif.on('finished', blob => {
        const url = URL.createObjectURL(blob);
        
        // Add to gallery
        addToGallery(url, name);
        
        // Create download link
        const link = document.createElement('a');
        link.href = url;
        link.download = `${name}.gif`;
        link.click();
        
        setTimeout(() => {
            URL.revokeObjectURL(url);
        }, 1000);
    });
    
    gif.render();
}

// Add exported GIF to gallery
function addToGallery(url, name) {
    const gallery = document.getElementById('gifGallery') || createGallery();
    
    const gifContainer = document.createElement('div');
    gifContainer.className = 'gif-item';
    
    const gifImage = document.createElement('img');
    gifImage.src = url;
    gifImage.alt = name;
    gifImage.width = 112;
    gifImage.height = 112;
    
    const gifTitle = document.createElement('div');
    gifTitle.className = 'gif-title';
    gifTitle.textContent = name;
    
    gifContainer.appendChild(gifImage);
    gifContainer.appendChild(gifTitle);
    gallery.appendChild(gifContainer);
}

// Create gallery if it doesn't exist
function createGallery() {
    const container = document.querySelector('.container');
    
    const gallery = document.createElement('div');
    gallery.id = 'gifGallery';
    gallery.className = 'gif-gallery';
    
    container.appendChild(gallery);
    
    return gallery;
}

export {
    initScene,
    addWater,
    addBucket,
    loadModel,
    setupRecordingGrid,
    startRecording,
    stopRecording
};