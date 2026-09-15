"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function CyberGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 220;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Globe Sphere Geometry
    const globeRadius = 75;
    const sphereGeometry = new THREE.SphereGeometry(globeRadius, 40, 40);
    
    // Wireframe Mesh
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x00C2FF,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const globeWireframe = new THREE.Mesh(sphereGeometry, wireframeMaterial);
    scene.add(globeWireframe);

    // Particle Cloud (Dot Grid on Globe Surface)
    const particlesCount = 1200;
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / particlesCount);
      const theta = Math.sqrt(particlesCount * Math.PI) * phi;

      const x = globeRadius * Math.cos(theta) * Math.sin(phi);
      const y = globeRadius * Math.sin(theta) * Math.sin(phi);
      const z = globeRadius * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Color variation (Neon Blue & Purple)
      const isPurple = Math.random() > 0.6;
      colors[i * 3] = isPurple ? 0.48 : 0.0;
      colors[i * 3 + 1] = isPurple ? 0.38 : 0.76;
      colors[i * 3 + 2] = isPurple ? 1.0 : 1.0;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 2.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    const pointCloud = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(pointCloud);

    // Glowing Outer Atmosphere Ring
    const ringGeo = new THREE.RingGeometry(globeRadius + 4, globeRadius + 6, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00C2FF,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.25,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 3;
    scene.add(ring);

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      globeWireframe.rotation.y += 0.002;
      pointCloud.rotation.y += 0.002;
      ring.rotation.z += 0.001;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center">
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#0D253F]/80 border border-[#00C2FF]/30 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-orbitron text-[#00C2FF] flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#00E676] animate-pulse" />
        LIVE CYBER THREAT GLOBE
      </div>
    </div>
  );
}
