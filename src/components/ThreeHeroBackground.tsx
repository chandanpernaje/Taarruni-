import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeHeroBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL guard
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    // Setup scene & camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x06050d, 0.035);

    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    container.appendChild(renderer.domElement);

    // Root Group for interactive rotation
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // Multi-part procedural geometries
    // 1. Primary outer cage: Icosahedron Wireframe
    const outerGeo = new THREE.IcosahedronGeometry(2.6, 1);
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6, // Violet
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    worldGroup.add(outerMesh);

    // 2. Secondary inner core: Torus Knot
    const innerGeo = new THREE.TorusKnotGeometry(1.4, 0.35, 120, 16);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x22d3ee, // Cyan
      roughness: 0.2,
      metalness: 0.85,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    worldGroup.add(innerMesh);

    // 3. Accent floating orbital rings
    const ringGeo1 = new THREE.TorusGeometry(3.6, 0.02, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0xf472b6, // Pink
      transparent: true,
      opacity: 0.5,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    worldGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(3.9, 0.015, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.35,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.z = Math.PI / 5;
    worldGroup.add(ring2);

    // 4. Floating Particles Constellation
    const particleCount = isSoftwareGl ? 350 : 800;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const colorViolet = new THREE.Color(0x8b5cf6);
    const colorCyan = new THREE.Color(0x22d3ee);
    const colorPink = new THREE.Color(0xf472b6);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 26;
      positions[i3 + 1] = (Math.random() - 0.5) * 26;
      positions[i3 + 2] = (Math.random() - 0.5) * 20;

      const mixedColor = Math.random() < 0.4 ? colorViolet : (Math.random() < 0.7 ? colorCyan : colorPink);
      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }

    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
    });

    const particles = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particles);

    // 5. Studio Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xa78bfa, 2.5);
    keyLight.position.set(5, 6, 6);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x38bdf8, 1.8);
    fillLight.position.set(-6, -4, 4);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xf472b6, 2.0, 20);
    rimLight.position.set(0, 4, -4);
    scene.add(rimLight);

    // Motion variables with smooth damping
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let scrollYRatio = 0;

    const handlePointerMove = (e: PointerEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollYRatio = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);

      // Adapt group position based on desktop vs mobile
      if (width > 1024) {
        worldGroup.position.x = 2.4;
        worldGroup.scale.setScalar(1.05);
      } else if (width > 640) {
        worldGroup.position.x = 1.2;
        worldGroup.scale.setScalar(0.85);
      } else {
        worldGroup.position.x = 0;
        worldGroup.scale.setScalar(0.7);
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    handleResize();

    // Animation loop with delta time
    const clock = new THREE.Clock();
    let animationFrameId: number;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const animate = () => {
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Exponential damping on pointer interaction
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      if (!reducedMotion) {
        // Rotations
        outerMesh.rotation.x = elapsedTime * 0.12;
        outerMesh.rotation.y = elapsedTime * 0.18;

        innerMesh.rotation.x = -elapsedTime * 0.22;
        innerMesh.rotation.z = elapsedTime * 0.15;

        ring1.rotation.z = elapsedTime * 0.15;
        ring2.rotation.z = -elapsedTime * 0.12;

        particles.rotation.y = elapsedTime * 0.015;
        particles.rotation.x = elapsedTime * 0.008;

        // Subtle vertical breathing with scroll reaction
        const baseOffset = Math.sin(elapsedTime * 0.7) * 0.25;
        worldGroup.position.y = baseOffset - scrollYRatio * 4.5;
        worldGroup.rotation.y = mouseX * 0.75;
        worldGroup.rotation.x = -mouseY * 0.5;

        // Camera responsive depth
        camera.position.z = 7.5 + scrollYRatio * 2;
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      // Dispose geometries & materials
      outerGeo.dispose();
      outerMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
};
