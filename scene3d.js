import * as THREE from 'https://cdn.skypack.dev/three@0.136.0';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/GLTFLoader.js';
import { Water } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/objects/Water.js';

// Scene elements
let scene, camera, renderer, controls, container;
let gridAreas = [];
let objects = [];
let buckets = [];
let recordingStatus;
let isRecording = false;
let recordingTimer;
let recordedFrames = {};
let livePreviewGif = null;
let livePreviewTimer = null;

// Initialize the 3D scene
export function initScene(containerElement) {
    container = containerElement;
    
    // Create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111111);
    
    // Create camera
    camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    
    // Create renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);
    
    // Add orbit controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    scene.add(directionalLight);
    
    // Add ground
    const groundGeometry = new THREE.PlaneGeometry(20, 20);
    const groundMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x554422, 
        roughness: 0.8 
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);
    
    // Add grid helper
    const gridHelper = new THREE.GridHelper(20, 20);
    scene.add(gridHelper);
    
    // Add recording status indicator
    recordingStatus = document.createElement('div');
    recordingStatus.className = 'recording-status';
    recordingStatus.textContent = 'Not Recording';
    container.appendChild(recordingStatus);
    
    // Create live preview element
    createLivePreview();
    
    // Start animation loop
    animate();
}

// Create live preview element
function createLivePreview() {
    const livePreviewContainer = document.createElement('div');
    livePreviewContainer.className = 'live-preview-container';
    livePreviewContainer.innerHTML = `
        <h4>Live Preview</h4>
        <div id="scene3dLivePreview" class="live-preview"></div>
    `;
    
    // Add to DOM after the scene container
    container.parentNode.insertBefore(livePreviewContainer, container.nextSibling);
    
    // Start live preview
    startLivePreview();
}

// Start live preview generation
function startLivePreview() {
    // Clear previous timer
    if (livePreviewTimer) {
        clearTimeout(livePreviewTimer);
    }
    
    // Generate preview initially
    generateLivePreview();
    
    // Then update every 5 seconds
    livePreviewTimer = setInterval(generateLivePreview, 5000);
}

// Generate live preview GIF
function generateLivePreview() {
    if (!window.gifWorkerBlob) {
        console.error('GIF Worker Blob not available');
        return;
    }
    
    // Create a GIF
    const gif = new GIF({
        workers: 1,
        quality: 5,
        width: 112,
        height: 112,
        workerScript: URL.createObjectURL(window.gifWorkerBlob)
    });
    
    // Take 10 quick snapshots of the scene
    const framesNeeded = 10;
    let frameCount = 0;
    
    function captureFrame() {
        if (frameCount >= framesNeeded) {
            // All frames captured, render the GIF
            gif.render();
            return;
        }
        
        // Slightly rotate the camera for dynamic preview
        camera.position.x = 5 * Math.cos(frameCount * 0.2);
        camera.position.z = 5 * Math.sin(frameCount * 0.2);
        camera.lookAt(0, 0, 0);
        controls.update();
        
        // Update objects
        objects.forEach(obj => {
            if (obj.update) obj.update();
        });
        
        // Render at a smaller size
        const originalSize = { 
            width: renderer.domElement.width, 
            height: renderer.domElement.height 
        };
        renderer.setSize(112, 112);
        renderer.render(scene, camera);
        
        // Add frame to GIF
        gif.addFrame(renderer.domElement, { copy: true, delay: 200 });
        
        // Restore renderer size
        renderer.setSize(originalSize.width, originalSize.height);
        
        // Continue with next frame
        frameCount++;
        setTimeout(captureFrame, 10);
    }
    
    // Start capturing frames
    captureFrame();
    
    // When GIF is done
    gif.on('finished', function(blob) {
        // Clean up previous GIF if exists
        if (livePreviewGif) {
            URL.revokeObjectURL(livePreviewGif);
        }
        
        // Create URL for the new GIF
        livePreviewGif = URL.createObjectURL(blob);
        
        // Display in live preview container
        const previewContainer = document.getElementById('scene3dLivePreview');
        if (previewContainer) {
            previewContainer.innerHTML = '';
            const img = document.createElement('img');
            img.src = livePreviewGif;
            img.className = 'preview-canvas';
            previewContainer.appendChild(img);
        }
    });
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    // Update controls
    controls.update();
    
    // Update objects
    objects.forEach(obj => {
        if (obj.update) obj.update();
    });
    
    // Render
    renderer.render(scene, camera);
    
    // Capture frame if recording
    if (isRecording) {
        captureGridFrames();
    }
}

// Add a water plane
export function addWater() {
    const waterGeometry = new THREE.PlaneGeometry(10, 10, 20, 20);
    
    const water = new Water(waterGeometry, {
        textureWidth: 512,
        textureHeight: 512,
        waterNormals: new THREE.TextureLoader().load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/waternormals.jpg', function(texture) {
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        }),
        sunDirection: new THREE.Vector3(0, 1, 0),
        sunColor: 0xffffff,
        waterColor: 0x001e0f,
        distortionScale: 3.7
    });
    
    water.rotation.x = -Math.PI / 2;
    water.position.y = 0.05; // Just above ground
    
    scene.add(water);
    objects.push(water);
    
    // Add update method
    water.update = function() {
        water.material.uniforms['time'].value += 1.0 / 60.0;
    };
    
    return water;
}

// Add a simple bucket object
export function addBucket(position = { x: 0, y: 1, z: 0 }) {
    // Create bucket group
    const bucket = new THREE.Group();
    
    // Create bucket cylinder
    const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.4, 1, 16);
    const cylinderMaterial = new THREE.MeshStandardMaterial({ color: 0x8888ff });
    const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
    cylinder.castShadow = true;
    bucket.add(cylinder);
    
    // Create bucket handle
    const handleGeometry = new THREE.TorusGeometry(0.4, 0.05, 8, 16, Math.PI);
    const handleMaterial = new THREE.MeshStandardMaterial({ color: 0x444444 });
    const handle = new THREE.Mesh(handleGeometry, handleMaterial);
    handle.rotation.x = Math.PI / 2;
    handle.position.y = 0.5;
    handle.castShadow = true;
    bucket.add(handle);
    
    // Set position
    bucket.position.set(position.x, position.y, position.z);
    
    // Add pour water method
    bucket.pourWater = function() {
        // Create water particles
        const particleCount = 50;
        const particles = new THREE.Group();
        
        for (let i = 0; i < particleCount; i++) {
            const particleGeometry = new THREE.SphereGeometry(0.05, 8, 8);
            const particleMaterial = new THREE.MeshStandardMaterial({ color: 0x0077ff });
            const particle = new THREE.Mesh(particleGeometry, particleMaterial);
            
            // Set initial position
            particle.position.x = (Math.random() - 0.5) * 0.3;
            particle.position.y = -0.5;
            particle.position.z = (Math.random() - 0.5) * 0.3;
            
            // Add metadata
            particle.userData = {
                velocity: new THREE.Vector3(0, -0.05 - Math.random() * 0.1, 0),
                lifetime: 2 + Math.random() * 2
            };
            
            particles.add(particle);
        }
        
        // Add to bucket
        bucket.add(particles);
        
        // Add update method for particles
        particles.update = function() {
            let allParticlesGone = true;
            
            particles.children.forEach(particle => {
                // Update position
                particle.position.add(particle.userData.velocity);
                
                // Reduce lifetime
                particle.userData.lifetime -= 0.05;
                
                // Check if particle should be removed
                if (particle.userData.lifetime <= 0) {
                    particles.remove(particle);
                } else {
                    allParticlesGone = false;
                }
            });
            
            // Remove particles group if all particles are gone
            if (allParticlesGone && particles.children.length === 0) {
                bucket.remove(particles);
                objects.splice(objects.indexOf(particles), 1);
            }
        };
        
        // Add to objects array for updates
        objects.push(particles);
    };
    
    // Add to scene
    scene.add(bucket);
    objects.push(bucket);
    buckets.push(bucket);
    
    return bucket;
}

// Get the first bucket in the scene
export function getBucket() {
    return buckets.length > 0 ? buckets[0] : null;
}

// Load a 3D model
export function loadModel(url, position = { x: 0, y: 0, z: 0 }, scale = 1) {
    const loader = new GLTFLoader();
    
    loader.load(url, function(gltf) {
        const model = gltf.scene;
        
        // Set position and scale
        model.position.set(position.x, position.y, position.z);
        model.scale.set(scale, scale, scale);
        
        // Add to scene
        scene.add(model);
        objects.push(model);
        
        console.log('Model loaded:', url);
    }, undefined, function(error) {
        console.error('Error loading model:', error);
    });
}

// Set up grid for recording
export function setupRecordingGrid(rows = 2, cols = 2, height = 5, width = 5) {
    // Remove existing grid areas
    gridAreas.forEach(area => {
        scene.remove(area);
    });
    gridAreas = [];
    
    // Calculate grid cell size
    const cellWidth = width / cols;
    const cellHeight = height / rows;
    
    // Create grid cells
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            // Create grid cell
            const areaGeometry = new THREE.PlaneGeometry(cellWidth, cellHeight);
            const areaMaterial = new THREE.MeshBasicMaterial({ 
                color: 0x9147ff, 
                transparent: true, 
                opacity: 0.2,
                side: THREE.DoubleSide 
            });
            const area = new THREE.Mesh(areaGeometry, areaMaterial);
            area.rotation.x = -Math.PI / 2;
            area.position.y = 0.01; // Slightly above ground
            area.position.x = -width/2 + cellWidth/2 + col * cellWidth;
            area.position.z = -height/2 + cellHeight/2 + row * cellHeight;
            
            // Add metadata
            area.userData = {
                row,
                col,
                id: `grid_${row}_${col}`
            };
            
            // Store in array
            gridAreas.push(area);
            
            // Add to scene
            scene.add(area);
            
            // Initialize recorded frames for this grid area
            recordedFrames[area.userData.id] = [];
        }
    }
    
    console.log(`Created ${rows}x${cols} grid for recording`);
}

// Capture frames from grid areas
function captureGridFrames() {
    // Temporarily hide recording status for clean capture
    recordingStatus.style.opacity = '0';
    
    // Create temporary canvas for rendering
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = 112;
    tempCanvas.height = 112;
    const tempCtx = tempCanvas.getContext('2d');
    
    // Store original renderer size
    const originalSize = { 
        width: renderer.domElement.width, 
        height: renderer.domElement.height 
    };
    
    // Set renderer to capture size
    renderer.setSize(112, 112);
    
    // Capture each grid area
    gridAreas.forEach(area => {
        // Create a camera specifically for this grid area
        const gridCamera = camera.clone();
        
        // Position camera to look down at the grid area
        const centerPosition = new THREE.Vector3().copy(area.position);
        centerPosition.y += 5; // Move up 5 units
        
        gridCamera.position.copy(centerPosition);
        gridCamera.lookAt(area.position);
        
        // Render the scene from this camera's perspective
        renderer.render(scene, gridCamera);
        
        // Get the image data
        tempCtx.clearRect(0, 0, 112, 112);
        tempCtx.drawImage(renderer.domElement, 0, 0, 112, 112);
        
        // Clone the image data to avoid reference issues
        const imageData = new ImageData(
            new Uint8ClampedArray(tempCtx.getImageData(0, 0, 112, 112).data),
            112, 112
        );
        
        // Store the frame
        const frames = recordedFrames[area.userData.id];
        frames.push(imageData);
        
        // Limit the number of frames to prevent memory issues
        if (frames.length > 60) {
            frames.shift(); // Remove oldest frame
        }
    });
    
    // Reset renderer size
    renderer.setSize(originalSize.width, originalSize.height);
    
    // Show recording status again
    recordingStatus.style.opacity = '1';
}

// Start recording process
export function startRecording(duration = 3) {
    // Check if already recording
    if (isRecording) {
        console.log('Already recording');
        return;
    }
    
    // Clear previous recordings
    gridAreas.forEach(area => {
        recordedFrames[area.userData.id] = [];
    });
    
    // Update status
    isRecording = true;
    recordingStatus.textContent = 'Recording...';
    recordingStatus.classList.add('active');
    
    console.log(`Started recording for ${duration} seconds`);
    
    // Set timer to stop recording
    recordingTimer = setTimeout(() => {
        stopRecording();
    }, duration * 1000);
}

// Stop recording and generate GIFs
function stopRecording() {
    // Check if recording
    if (!isRecording) {
        return;
    }
    
    // Update status
    isRecording = false;
    recordingStatus.textContent = 'Processing...';
    
    console.log('Stopped recording, processing GIFs...');
    
    // Clear timer
    clearTimeout(recordingTimer);
    
    // Process each grid area with a delay to prevent browser from freezing
    let areaIndex = 0;
    
    function processNextArea() {
        if (areaIndex >= gridAreas.length) {
            // All areas processed
            recordingStatus.textContent = 'Not Recording';
            recordingStatus.classList.remove('active');
            return;
        }
        
        const area = gridAreas[areaIndex];
        const frames = recordedFrames[area.userData.id];
        
        if (frames.length > 0) {
            generateGif(area, frames);
        }
        
        areaIndex++;
        setTimeout(processNextArea, 500); // Add a delay between processing each area
    }
    
    // Start processing
    processNextArea();
}

// Generate GIF from frames
function generateGif(area, frames) {
    // Create a GIF for this area
    const gif = new GIF({
        workers: 2,
        quality: 5,
        width: 112,
        height: 112,
        workerScript: URL.createObjectURL(window.gifWorkerBlob)
    });
    
    // Create temporary canvas for processing frames
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = 112;
    tempCanvas.height = 112;
    const tempCtx = tempCanvas.getContext('2d');
    
    // Add frames to GIF with reduced frame count for better performance
    const frameStep = Math.max(1, Math.floor(frames.length / 30)); // Limit to ~30 frames
    
    for (let i = 0; i < frames.length; i += frameStep) {
        tempCtx.putImageData(frames[i], 0, 0);
        gif.addFrame(tempCanvas, { copy: true, delay: 1000 / 15 }); // 15fps
    }
    
    // When GIF is finished
    gif.on('finished', function(blob) {
        // Create URL for the GIF
        const url = URL.createObjectURL(blob);
        
        // Add to gallery
        addToGallery(url, `Grid ${area.userData.row},${area.userData.col}`);
        
        console.log(`Generated GIF for grid ${area.userData.row},${area.userData.col}`);
    });
    
    // Start rendering GIF
    gif.render();
}

// Add GIF to gallery
function addToGallery(url, title) {
    const gallery = document.getElementById('gifGallery');
    
    const item = document.createElement('div');
    item.className = 'gif-item';
    
    const img = document.createElement('img');
    img.src = url;
    img.className = 'preview-canvas';
    
    const titleEl = document.createElement('div');
    titleEl.className = 'gif-title';
    titleEl.textContent = title;
    
    const downloadBtn = document.createElement('button');
    downloadBtn.textContent = 'Download';
    downloadBtn.addEventListener('click', () => {
        const link = document.createElement('a');
        link.href = url;
        link.download = `grid-${title.replace(' ', '-')}.gif`;
        link.click();
    });
    
    item.appendChild(img);
    item.appendChild(titleEl);
    item.appendChild(downloadBtn);
    
    gallery.appendChild(item);
}

// Handle window resize
window.addEventListener('resize', () => {
    if (container && renderer && camera) {
        // Update camera aspect ratio
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        
        // Update renderer size
        renderer.setSize(container.clientWidth, container.clientHeight);
    }
});

// Clean up resources when page is unloaded
window.addEventListener('beforeunload', () => {
    if (livePreviewTimer) {
        clearInterval(livePreviewTimer);
    }
    
    if (livePreviewGif) {
        URL.revokeObjectURL(livePreviewGif);
    }
});