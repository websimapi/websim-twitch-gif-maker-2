import * as THREE from 'https://cdn.skypack.dev/three@0.136.0';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/GLTFLoader.js';

// Scene variables
let scene, camera, renderer, controls;
let gridAreas = [];
let recordingStatus = null;
let isRecording = false;
let recordedFrames = {};
let bucket = null;
let waterObjects = [];

// Initialize the 3D scene
export function initScene(container) {
    // Create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0e0e10);
    
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
    controls.dampingFactor = 0.25;
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;
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
    
    // Create status indicator
    recordingStatus = document.createElement('div');
    recordingStatus.className = 'recording-status';
    recordingStatus.textContent = 'Ready';
    container.appendChild(recordingStatus);
    
    // Start animation loop
    animate();
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    if (controls) controls.update();
    
    // Animate water objects
    waterObjects.forEach(water => {
        if (water.userData.animating) {
            water.position.y -= 0.05;
            water.scale.y -= 0.01;
            
            if (water.scale.y <= 0) {
                scene.remove(water);
                waterObjects = waterObjects.filter(w => w !== water);
            }
        }
    });
    
    renderer.render(scene, camera);
    
    // Capture frames if recording
    if (isRecording) {
        captureGridFrames();
    }
}

// Setup grid for recording
export function setupRecordingGrid(rows = 2, cols = 2, height = 5, width = 5) {
    // Clear existing grid areas
    gridAreas.forEach(area => {
        scene.remove(area);
    });
    gridAreas = [];
    
    const gridSize = Math.max(width, height);
    const cellWidth = width / cols;
    const cellHeight = height / rows;
    
    // Create grid cells
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const geometry = new THREE.BoxGeometry(cellWidth, 0.1, cellHeight);
            const material = new THREE.MeshBasicMaterial({ 
                color: 0x9147ff,
                transparent: true,
                opacity: 0.3
            });
            
            const gridArea = new THREE.Mesh(geometry, material);
            gridArea.position.set(
                col * cellWidth - (width / 2) + (cellWidth / 2),
                0.05,
                row * cellHeight - (height / 2) + (cellHeight / 2)
            );
            
            // Add wireframe
            const wireframe = new THREE.LineSegments(
                new THREE.EdgesGeometry(geometry),
                new THREE.LineBasicMaterial({ color: 0xffffff })
            );
            gridArea.add(wireframe);
            
            // Add ID for tracking
            const id = `grid-${row}-${col}`;
            gridArea.userData = { id, row, col };
            
            scene.add(gridArea);
            gridAreas.push(gridArea);
        }
    }
}

// Add water surface
export function addWater() {
    const geometry = new THREE.BoxGeometry(1, 0.2, 1);
    const material = new THREE.MeshStandardMaterial({
        color: 0x00ccff,
        transparent: true,
        opacity: 0.7
    });
    
    const water = new THREE.Mesh(geometry, material);
    water.position.set(0, 0.1, 0);
    water.userData = { type: 'water', animating: false };
    scene.add(water);
    waterObjects.push(water);
    
    return water;
}

// Add bucket object
export function addBucket(position = { x: 0, y: 1, z: 0 }) {
    // Create a simple bucket
    const bucketGroup = new THREE.Group();
    
    // Bucket body
    const bodyGeometry = new THREE.CylinderGeometry(0.5, 0.4, 1, 16);
    const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x888888 });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.castShadow = true;
    bucketGroup.add(body);
    
    // Bucket water
    const waterGeometry = new THREE.CylinderGeometry(0.45, 0.35, 0.3, 16);
    const waterMaterial = new THREE.MeshStandardMaterial({
        color: 0x00ccff,
        transparent: true,
        opacity: 0.7
    });
    const water = new THREE.Mesh(waterGeometry, waterMaterial);
    water.position.y = 0.3;
    bucketGroup.add(water);
    
    // Bucket handle
    const handleGeometry = new THREE.TorusGeometry(0.4, 0.05, 8, 16, Math.PI);
    const handleMaterial = new THREE.MeshStandardMaterial({ color: 0x444444 });
    const handle = new THREE.Mesh(handleGeometry, handleMaterial);
    handle.rotation.x = Math.PI / 2;
    handle.position.y = 0.7;
    bucketGroup.add(handle);
    
    bucketGroup.position.set(position.x, position.y, position.z);
    bucketGroup.userData = { type: 'bucket' };
    
    // Add water pouring functionality
    bucketGroup.pourWater = function() {
        const water = addWater();
        water.position.copy(this.position);
        water.position.y -= 0.5;
        water.userData.animating = true;
    };
    
    scene.add(bucketGroup);
    bucket = bucketGroup;
    
    return bucketGroup;
}

// Load 3D model
export function loadModel(url, position = { x: 0, y: 0, z: 0 }, scale = 1) {
    const loader = new GLTFLoader();
    
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
    }, undefined, (error) => {
        console.error('Error loading model:', error);
    });
}

// Get bucket object
export function getBucket() {
    return bucket;
}

// Start recording GIFs for each grid area
export function startRecording(duration = 3) {
    if (isRecording) return; // Already recording
    
    isRecording = true;
    recordedFrames = {};
    
    // Initialize frames arrays for each grid
    gridAreas.forEach(area => {
        recordedFrames[area.userData.id] = [];
    });
    
    // Update status
    if (recordingStatus) {
        recordingStatus.textContent = 'Recording...';
        recordingStatus.classList.add('active');
    }
    
    // Set timeout to stop recording
    setTimeout(() => {
        stopRecording();
    }, duration * 1000);
}

// Capture frames for each grid area
function captureGridFrames() {
    // Limit frame capture rate to prevent crashes
    const maxFramesPerArea = 30;
    
    gridAreas.forEach(area => {
        const areaId = area.userData.id;
        
        // Skip if we already have enough frames for this area
        if (recordedFrames[areaId] && recordedFrames[areaId].length >= maxFramesPerArea) {
            return;
        }
        
        try {
            // Calculate bounds for the grid area in 3D space
            const halfWidth = area.geometry.parameters.width / 2;
            const halfDepth = area.geometry.parameters.depth / 2;
            
            const bounds = {
                minX: area.position.x - halfWidth,
                maxX: area.position.x + halfWidth,
                minZ: area.position.z - halfDepth,
                maxZ: area.position.z + halfDepth
            };
            
            // Create a temporary camera positioned at the area looking down
            const tempCamera = camera.clone();
            tempCamera.position.set(
                area.position.x,
                camera.position.y,
                area.position.z
            );
            tempCamera.lookAt(area.position.x, 0, area.position.z);
            
            // Create temporary renderer for this frame
            const tempRenderer = new THREE.WebGLRenderer({ 
                antialias: true,
                preserveDrawingBuffer: true 
            });
            tempRenderer.setSize(112, 112);
            tempRenderer.render(scene, tempCamera);
            
            // Get frame data
            const frameData = tempRenderer.domElement.toDataURL('image/png');
            recordedFrames[areaId].push(frameData);
            
            // Dispose temporary renderer to free memory
            tempRenderer.dispose();
            
        } catch (error) {
            console.error(`Error capturing frame for ${areaId}:`, error);
        }
    });
}

// Stop recording and generate GIFs
function stopRecording() {
    isRecording = false;
    
    // Update status
    if (recordingStatus) {
        recordingStatus.textContent = 'Processing...';
    }
    
    // Get GIF worker blob from app.js (shared resource)
    let gifWorkerBlob = window.gifWorkerBlob;
    
    if (!gifWorkerBlob) {
        // Fallback if gifWorkerBlob is not available
        fetch('https://cdnjs.cloudflare.com/ajax/libs/gif.js/0.2.0/gif.worker.js')
            .then(response => response.blob())
            .then(blob => {
                gifWorkerBlob = blob;
                processGifs(gifWorkerBlob);
            });
    } else {
        processGifs(gifWorkerBlob);
    }
}

// Process recorded frames into GIFs
function processGifs(workerBlob) {
    let completedGifs = 0;
    const totalGifs = Object.keys(recordedFrames).length;
    
    // Process each grid area's frames into a GIF
    for (const [areaId, frames] of Object.entries(recordedFrames)) {
        if (frames.length === 0) {
            completedGifs++;
            continue;
        }
        
        // Find the corresponding grid area
        const area = gridAreas.find(a => a.userData.id === areaId);
        if (!area) continue;
        
        try {
            // Process in batches to avoid browser crash
            const batchSize = 5;
            const gif = new GIF({
                workers: 2,
                quality: 10,
                width: 112,
                height: 112,
                workerScript: URL.createObjectURL(workerBlob)
            });
            
            // Add frames in batches
            const addFramesInBatches = (startIdx = 0) => {
                const endIdx = Math.min(startIdx + batchSize, frames.length);
                
                for (let i = startIdx; i < endIdx; i++) {
                    const img = new Image();
                    img.src = frames[i];
                    
                    img.onload = function() {
                        gif.addFrame(img, { delay: 100, copy: true });
                        
                        // If this is the last frame in the batch or overall
                        if (i === endIdx - 1) {
                            if (endIdx < frames.length) {
                                // Process next batch
                                setTimeout(() => addFramesInBatches(endIdx), 100);
                            } else {
                                // All frames added, render the GIF
                                gif.render();
                            }
                        }
                    };
                }
            };
            
            // Start processing frames
            addFramesInBatches();
            
            // Handle GIF completion
            gif.on('finished', function(blob) {
                completedGifs++;
                
                // Create a URL for the GIF
                const url = URL.createObjectURL(blob);
                
                // Add to gallery
                const gallery = document.getElementById('gifGallery');
                if (gallery) {
                    const item = document.createElement('div');
                    item.className = 'gif-item';
                    
                    const gifPreview = document.createElement('img');
                    gifPreview.src = url;
                    gifPreview.className = 'preview-canvas';
                    
                    const gifTitle = document.createElement('div');
                    gifTitle.className = 'gif-title';
                    gifTitle.textContent = `Grid ${area.userData.row}-${area.userData.col}`;
                    
                    const downloadBtn = document.createElement('button');
                    downloadBtn.textContent = 'Download';
                    downloadBtn.onclick = function() {
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = `grid-${area.userData.row}-${area.userData.col}.gif`;
                        link.click();
                    };
                    
                    item.appendChild(gifPreview);
                    item.appendChild(gifTitle);
                    item.appendChild(downloadBtn);
                    gallery.appendChild(item);
                }
                
                // Update status when all GIFs are done
                if (completedGifs >= totalGifs && recordingStatus) {
                    recordingStatus.textContent = 'Completed';
                    recordingStatus.classList.remove('active');
                    
                    // Clean up after 5 seconds to prevent memory leaks
                    setTimeout(() => {
                        recordingStatus.textContent = 'Ready';
                    }, 5000);
                }
            });
            
        } catch (error) {
            console.error(`Error processing GIF for ${areaId}:`, error);
            completedGifs++;
            
            if (completedGifs >= totalGifs && recordingStatus) {
                recordingStatus.textContent = 'Error';
                recordingStatus.classList.remove('active');
            }
        }
    }
}