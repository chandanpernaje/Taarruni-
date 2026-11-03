import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Eye, RotateCcw, Sparkles, Layers, Sliders, ChevronDown, ChevronUp, Maximize2 } from 'lucide-react';

type ModelType = 'logo' | 'network' | 'multimedia' | 'marketing';
type FinishType = 'hologram' | 'cyan' | 'magenta' | 'chrome';

export const Interactive3DStudio: React.FC = () => {
  const canvasMountRef = useRef<HTMLDivElement>(null);

  // Studio states
  const [activeModel, setActiveModel] = useState<ModelType>('logo');
  const [activeFinish, setActiveFinish] = useState<FinishType>('hologram');
  const [isWireframe, setIsWireframe] = useState<boolean>(false);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [explodeScale, setExplodeScale] = useState<number>(1);
  const [isControlsCollapsed, setIsControlsCollapsed] = useState<boolean>(false);

  // Three.js internal references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const activeGroupRef = useRef<THREE.Group | null>(null);
  const partsRef = useRef<THREE.Mesh[]>([]);

  // Drag interaction state
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });

  // Update material colors & wireframe dynamically
  useEffect(() => {
    if (!partsRef.current.length) return;

    let targetColor = 0x8b5cf6; // default hologram
    let emissiveColor = 0x2e1065;
    let metalnessVal = 0.8;
    let roughnessVal = 0.25;

    if (activeFinish === 'cyan') {
      targetColor = 0x22d3ee;
      emissiveColor = 0x083344;
      metalnessVal = 0.85;
      roughnessVal = 0.2;
    } else if (activeFinish === 'magenta') {
      targetColor = 0xf472b6;
      emissiveColor = 0x500724;
      metalnessVal = 0.75;
      roughnessVal = 0.3;
    } else if (activeFinish === 'chrome') {
      targetColor = 0xe2e8f0;
      emissiveColor = 0x0f172a;
      metalnessVal = 0.95;
      roughnessVal = 0.12;
    }

    partsRef.current.forEach((mesh, index) => {
      const mat = mesh.material as THREE.MeshStandardMaterial;
      if (mat) {
        mat.wireframe = isWireframe;
        // Vary metalness slightly per part
        mat.metalness = Math.min(1, metalnessVal + (index % 2 === 0 ? 0.05 : -0.05));
        mat.roughness = Math.max(0.05, roughnessVal + (index % 3 === 0 ? 0.08 : -0.04));
        mat.color.setHex(targetColor);
        mat.emissive.setHex(emissiveColor);
        mat.needsUpdate = true;
      }
    });
  }, [activeFinish, isWireframe]);

  // Update expansion/explode
  useEffect(() => {
    if (!partsRef.current.length) return;
    partsRef.current.forEach((mesh, idx) => {
      const basePos = (mesh.userData.basePosition as THREE.Vector3) || new THREE.Vector3();
      mesh.position.set(
        basePos.x * explodeScale,
        basePos.y * explodeScale,
        basePos.z * explodeScale
      );
    });
  }, [explodeScale]);

  // Rebuild model when activeModel changes
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    // Clean previous group
    if (activeGroupRef.current) {
      scene.remove(activeGroupRef.current);
      partsRef.current.forEach(m => {
        m.geometry.dispose();
        if (Array.isArray(m.material)) m.material.forEach(mat => mat.dispose());
        else m.material.dispose();
      });
      partsRef.current = [];
    }

    const group = new THREE.Group();
    activeGroupRef.current = group;
    scene.add(group);

    const finishColor = activeFinish === 'cyan' ? 0x22d3ee : (activeFinish === 'magenta' ? 0xf472b6 : (activeFinish === 'chrome' ? 0xe2e8f0 : 0x8b5cf6));

    const createPart = (geo: THREE.BufferGeometry, basePos: THREE.Vector3, extraRot?: THREE.Euler) => {
      const mat = new THREE.MeshStandardMaterial({
        color: finishColor,
        roughness: 0.22,
        metalness: 0.85,
        wireframe: isWireframe,
        transparent: true,
        opacity: 0.92,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.copy(basePos);
      if (extraRot) mesh.rotation.copy(extraRot);
      mesh.userData.basePosition = basePos.clone();
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      group.add(mesh);
      partsRef.current.push(mesh);
      return mesh;
    };

    if (activeModel === 'logo') {
      // 1. Procedural Taarruni Circular Ring Emblem (matching taarruni.com)
      // Signature outer circular ring
      const emblemRingGeo = new THREE.TorusGeometry(2.0, 0.22, 24, 80);
      createPart(emblemRingGeo, new THREE.Vector3(0, 0, 0));

      // Central inner circular backplate
      const centerPlateGeo = new THREE.CylinderGeometry(1.4, 1.4, 0.2, 48);
      createPart(centerPlateGeo, new THREE.Vector3(0, 0, -0.05), new THREE.Euler(Math.PI / 2, 0, 0));

      // Raised central 'T' horizontal bar
      const tTopGeo = new THREE.BoxGeometry(1.6, 0.35, 0.35);
      createPart(tTopGeo, new THREE.Vector3(0, 0.42, 0.22));

      // Raised central 'T' vertical stem
      const tStemGeo = new THREE.BoxGeometry(0.38, 1.15, 0.35);
      createPart(tStemGeo, new THREE.Vector3(0, -0.25, 0.22));

      // Signature accent dot on the right edge of the ring (matching taarruni. red dot)
      const dotGeo = new THREE.SphereGeometry(0.24, 20, 20);
      createPart(dotGeo, new THREE.Vector3(1.7, -0.2, 0.15));

      // Outer floating orbital halo
      const haloGeo = new THREE.TorusGeometry(2.9, 0.035, 16, 72);
      createPart(haloGeo, new THREE.Vector3(0, 0, 0), new THREE.Euler(Math.PI / 3, 0, 0));
    } else if (activeModel === 'network') {
      // 2. Web & CMS Geodesic Core
      const coreGeo = new THREE.IcosahedronGeometry(1.6, 2);
      createPart(coreGeo, new THREE.Vector3(0, 0, 0));

      const satelliteGeo = new THREE.SphereGeometry(0.24, 16, 16);
      createPart(satelliteGeo, new THREE.Vector3(2.2, 0.5, 0));
      createPart(satelliteGeo, new THREE.Vector3(-2.2, -0.5, 0));
      createPart(satelliteGeo, new THREE.Vector3(0, 2.2, 0.5));
      createPart(satelliteGeo, new THREE.Vector3(0, -2.2, -0.5));
      createPart(satelliteGeo, new THREE.Vector3(1.4, 1.4, 1.4));
      createPart(satelliteGeo, new THREE.Vector3(-1.4, -1.4, -1.4));

      const ringOrbitGeo = new THREE.TorusGeometry(2.5, 0.03, 16, 80);
      createPart(ringOrbitGeo, new THREE.Vector3(0, 0, 0), new THREE.Euler(Math.PI / 3, Math.PI / 4, 0));
    } else if (activeModel === 'multimedia') {
      // 3. Multimedia Torus Knot & Orbitals
      const knotGeo = new THREE.TorusKnotGeometry(1.4, 0.4, 100, 16);
      createPart(knotGeo, new THREE.Vector3(0, 0, 0));

      const outerRing1 = new THREE.TorusGeometry(2.7, 0.03, 16, 64);
      createPart(outerRing1, new THREE.Vector3(0, 0, 0), new THREE.Euler(Math.PI / 2, 0, 0));

      const outerRing2 = new THREE.TorusGeometry(3.0, 0.03, 16, 64);
      createPart(outerRing2, new THREE.Vector3(0, 0, 0), new THREE.Euler(0, Math.PI / 2, 0));
    } else {
      // 4. Marketing Growth Matrix
      const centerCube = new THREE.BoxGeometry(1.4, 1.4, 1.4);
      createPart(centerCube, new THREE.Vector3(0, 0, 0));

      const childGeo = new THREE.BoxGeometry(0.7, 0.7, 0.7);
      createPart(childGeo, new THREE.Vector3(1.6, 1.6, 0));
      createPart(childGeo, new THREE.Vector3(-1.6, -1.6, 0));
      createPart(childGeo, new THREE.Vector3(1.6, -1.6, 0));
      createPart(childGeo, new THREE.Vector3(-1.6, 1.6, 0));
      createPart(childGeo, new THREE.Vector3(0, 0, 1.8));
      createPart(childGeo, new THREE.Vector3(0, 0, -1.8));
    }
  }, [activeModel]);

  // Main Scene Setup
  useEffect(() => {
    const mount = canvasMountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0.8, 6.2);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    mount.appendChild(renderer.domElement);

    // Studio 3-Point Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xa78bfa, 3.2);
    keyLight.position.set(5, 7, 6);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x38bdf8, 2.0);
    fillLight.position.set(-6, -2, 4);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xf472b6, 3.0, 15);
    rimLight.position.set(0, 4, -4);
    scene.add(rimLight);

    // Contact ground plane shadow
    const shadowGeo = new THREE.PlaneGeometry(8, 8);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x030206,
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
    });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -2.2;
    scene.add(shadowPlane);

    // Drag interaction handlers
    const domElement = renderer.domElement;

    const onPointerDown = (e: PointerEvent) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current || !activeGroupRef.current) return;
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      activeGroupRef.current.rotation.y += deltaX * 0.008;
      activeGroupRef.current.rotation.x += deltaY * 0.008;

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = () => {
      isDraggingRef.current = false;
    };

    domElement.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // Resize observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      }
    });
    resizeObserver.observe(mount);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      if (activeGroupRef.current && autoRotate && !isDraggingRef.current) {
        activeGroupRef.current.rotation.y += delta * 0.45;
        activeGroupRef.current.position.y = Math.sin(elapsed * 1.5) * 0.12;
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      domElement.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      resizeObserver.disconnect();

      if (renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const handleResetCamera = () => {
    if (activeGroupRef.current) {
      activeGroupRef.current.rotation.set(0, 0, 0);
      activeGroupRef.current.position.set(0, 0, 0);
    }
    setExplodeScale(1);
  };

  return (
    <section id="interactive-3d-lab" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-cyan-400 uppercase mb-3">
          <span>● Spatial Computing & WebGL</span>
          <span aria-hidden="true">·</span>
          <span>Since 2005</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
          Interactive <span className="gradient-text">3D Innovation Lab</span>
        </h2>
        <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
          Taarruni pioneers 3D spatial visualization and multimedia animation. Drag to rotate in 360°, inspect dimensional components, and toggle procedural finishes in real time.
        </p>
      </div>

      {/* 3D Viewport Container */}
      <div className="relative w-full h-[540px] sm:h-[620px] rounded-3xl overflow-hidden glass-panel border border-purple-500/20 shadow-2xl shadow-purple-950/40">
        {/* WebGL Canvas Mount */}
        <div
          ref={canvasMountRef}
          className="w-full h-full cursor-grab active:cursor-grabbing touch-none select-none"
        />

        {/* Top-Left Minimal Model Spec Badge */}
        <div className="absolute top-5 left-5 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 text-xs text-slate-300">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-semibold text-white uppercase tracking-wider">
            {activeModel === 'logo' && 'Taarruni Emblem 3D'}
            {activeModel === 'network' && 'Web & CMS Network Node'}
            {activeModel === 'multimedia' && '3D Multimedia Torus'}
            {activeModel === 'marketing' && 'Marketing Growth Matrix'}
          </span>
          <span className="text-slate-500">·</span>
          <span className="text-slate-400">WebGL 2.0 PBR</span>
        </div>

        {/* Top-Right Quick Reset Action */}
        <div className="absolute top-5 right-5 z-10 flex items-center gap-2">
          <button
            onClick={handleResetCamera}
            className="p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10 transition-colors shadow-lg"
            title="Reset Orientation"
            aria-label="Reset 3D orientation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Unified Bottom Control Dock (Follows Ergonomic Dock Guideline) */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 w-[95%] max-w-2xl transition-all duration-300">
          {/* Collapse/Expand Toggle Button */}
          <div className="flex justify-center -mb-2 relative z-30">
            <button
              onClick={() => setIsControlsCollapsed(!isControlsCollapsed)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-t-lg bg-slate-900/90 hover:bg-slate-800 text-xs font-medium text-slate-300 border-t border-x border-white/10 transition-colors"
            >
              {isControlsCollapsed ? (
                <>
                  <ChevronUp className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Show 3D Studio Controls</span>
                </>
              ) : (
                <>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  <span>Zen Mode (Hide Controls)</span>
                </>
              )}
            </button>
          </div>

          {!isControlsCollapsed && (
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-white/15 shadow-2xl flex flex-col gap-4">
              {/* Row 1: Model Selection Tabs */}
              <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 sm:pb-0">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider shrink-0 mr-1 hidden sm:inline">
                  Subject:
                </span>
                <div className="flex items-center gap-1.5 p-1 bg-black/40 rounded-xl border border-white/5 w-full justify-between">
                  {(
                    [
                      { id: 'logo', label: 'Taarruni Emblem' },
                      { id: 'network', label: 'CMS Network' },
                      { id: 'multimedia', label: 'Multimedia Knot' },
                      { id: 'marketing', label: 'Growth Matrix' },
                    ] as const
                  ).map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setActiveModel(m.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                        activeModel === m.id
                          ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-md'
                          : 'text-slate-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Row 2: Finishes & Sliders */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/10 text-xs">
                {/* Finish Swatches */}
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-medium">Material:</span>
                  <div className="flex items-center gap-1.5">
                    {(
                      [
                        { id: 'hologram', color: 'bg-purple-500', name: 'Violet' },
                        { id: 'cyan', color: 'bg-cyan-400', name: 'Cyan' },
                        { id: 'magenta', color: 'bg-pink-500', name: 'Magenta' },
                        { id: 'chrome', color: 'bg-slate-300', name: 'Chrome' },
                      ] as const
                    ).map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setActiveFinish(f.id)}
                        className={`w-6 h-6 rounded-full ${f.color} transition-transform ${
                          activeFinish === f.id
                            ? 'ring-2 ring-white scale-110 shadow-lg'
                            : 'opacity-70 hover:opacity-100 hover:scale-105'
                        }`}
                        title={f.name}
                        aria-label={`Select ${f.name} material finish`}
                      />
                    ))}
                  </div>
                </div>

                {/* Explode / Scale Slider */}
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-medium">Explode:</span>
                  <input
                    type="range"
                    min="1"
                    max="1.7"
                    step="0.05"
                    value={explodeScale}
                    onChange={(e) => setExplodeScale(parseFloat(e.target.value))}
                    className="w-20 sm:w-28 accent-cyan-400 cursor-pointer h-1.5 bg-slate-700 rounded-lg"
                    aria-label="Explode 3D components slider"
                  />
                </div>

                {/* Toggles */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsWireframe(!isWireframe)}
                    className={`px-2.5 py-1 rounded-md border text-[11px] font-medium transition-colors ${
                      isWireframe
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                        : 'border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    Wireframe
                  </button>
                  <button
                    onClick={() => setAutoRotate(!autoRotate)}
                    className={`px-2.5 py-1 rounded-md border text-[11px] font-medium transition-colors ${
                      autoRotate
                        ? 'bg-purple-500/20 border-purple-400 text-purple-300'
                        : 'border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    {autoRotate ? 'Rotating' : 'Static'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
