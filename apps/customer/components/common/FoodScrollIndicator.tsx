'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';

interface FoodScrollIndicatorProps {
  /** Pixel threshold below which "scroll down" is active; above → "scroll up" */
  threshold?: number;
  /** CSS class for the wrapper */
  className?: string;
}

export const FoodScrollIndicator: React.FC<FoodScrollIndicatorProps> = ({
  threshold = 200,
  className = '',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);
  const scrollDirRef = useRef<'down' | 'up'>('down');

  /* ─── Three.js scene setup ─── */
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = mount.clientWidth || 120;
    const H = mount.clientHeight || 120;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Scene & camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
    camera.position.set(0, 0, 6);

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambient);
    const dirLight = new THREE.DirectionalLight(0xff8c42, 1.4);
    dirLight.position.set(3, 5, 4);
    scene.add(dirLight);
    const rimLight = new THREE.DirectionalLight(0x4db6ff, 0.6);
    rimLight.position.set(-4, -2, -3);
    scene.add(rimLight);

    /* ─── Hamburger geometry (layered discs) ─── */
    const group = new THREE.Group();
    scene.add(group);

    const addDisc = (
      y: number,
      color: number,
      rx: number,
      ry: number,
      rz: number,
      segments = 40
    ) => {
      const geo = new THREE.CylinderGeometry(rx, rz, ry, segments);
      const mat = new THREE.MeshStandardMaterial({
        color,
        roughness: 0.55,
        metalness: 0.05,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.y = y;
      group.add(mesh);
      return mesh;
    };

    // Bun top (dome shape via SphereGeometry half)
    const bunTopGeo = new THREE.SphereGeometry(1, 40, 20, 0, Math.PI * 2, 0, Math.PI / 2);
    const bunMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.6 });
    const bunTop = new THREE.Mesh(bunTopGeo, bunMat);
    bunTop.position.y = 1.05;
    group.add(bunTop);

    // Sesame seeds on bun
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const r = 0.55;
      const seedGeo = new THREE.SphereGeometry(0.09, 8, 8);
      const seedMat = new THREE.MeshStandardMaterial({ color: 0xfef9c3 });
      const seed = new THREE.Mesh(seedGeo, seedMat);
      seed.position.set(Math.cos(angle) * r, 1.0 + Math.sin(angle * 0.5) * 0.05, Math.sin(angle) * r * 0.7);
      group.add(seed);
    }

    // Patty (dark brown disc)
    addDisc(0.55, 0x7c2d12, 0.92, 0.22, 0.96);

    // Cheese (yellow, slightly wider + rotated)
    const cheeseGeo = new THREE.BoxGeometry(2.1, 0.12, 2.1);
    const cheeseMat = new THREE.MeshStandardMaterial({ color: 0xfbbf24, roughness: 0.4 });
    const cheese = new THREE.Mesh(cheeseGeo, cheeseMat);
    cheese.position.y = 0.27;
    cheese.rotation.y = Math.PI / 4;
    group.add(cheese);

    // Lettuce (wavy green ring)
    const lettuceGeo = new THREE.TorusGeometry(0.9, 0.18, 8, 40);
    const lettuceMat = new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.8 });
    const lettuce = new THREE.Mesh(lettuceGeo, lettuceMat);
    lettuce.position.y = 0.04;
    lettuce.rotation.x = Math.PI / 2;
    group.add(lettuce);

    // Tomato slice
    addDisc(-0.2, 0xef4444, 0.88, 0.1, 0.9);

    // Bun bottom
    addDisc(-0.55, 0xd97706, 1.0, 0.35, 1.0);

    // ── Chevron arrow below burger ──
    const arrowGroup = new THREE.Group();
    scene.add(arrowGroup);
    arrowGroup.position.y = -2.2;

    const makeChevronBar = (angleZ: number, offsetX: number) => {
      const geo = new THREE.CylinderGeometry(0.07, 0.07, 0.7, 12);
      const mat = new THREE.MeshStandardMaterial({ color: 0xab3500, roughness: 0.3, metalness: 0.2 });
      const m = new THREE.Mesh(geo, mat);
      m.rotation.z = angleZ;
      m.position.x = offsetX;
      return m;
    };
    arrowGroup.add(makeChevronBar(Math.PI / 4, -0.32));
    arrowGroup.add(makeChevronBar(-Math.PI / 4, 0.32));

    // second (smaller) chevron
    const arrowGroup2 = new THREE.Group();
    scene.add(arrowGroup2);
    arrowGroup2.position.y = -2.7;
    arrowGroup2.scale.setScalar(0.75);
    const makeChevron2 = (angleZ: number, offsetX: number) => {
      const geo = new THREE.CylinderGeometry(0.07, 0.07, 0.7, 12);
      const mat = new THREE.MeshStandardMaterial({ color: 0xab3500, roughness: 0.3, metalness: 0.2, opacity: 0.55, transparent: true });
      const m = new THREE.Mesh(geo, mat);
      m.rotation.z = angleZ;
      m.position.x = offsetX;
      return m;
    };
    arrowGroup2.add(makeChevron2(Math.PI / 4, -0.32));
    arrowGroup2.add(makeChevron2(-Math.PI / 4, 0.32));

    /* ─── Raycaster for hover glow ─── */
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let isHovered = false;

    const onMouseMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / W) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / H) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(group.children, true);
      isHovered = hits.length > 0;
      mount.style.cursor = isHovered ? 'pointer' : 'default';
    };
    mount.addEventListener('mousemove', onMouseMove);

    /* ─── Animation loop ─── */
    let t = 0;

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      t += 0.016;

      // Gentle float + slow rotation
      group.position.y = Math.sin(t * 1.4) * 0.18;
      group.rotation.y += 0.008;
      if (isHovered) group.rotation.y += 0.012; // spin faster on hover

      // Scale pulse on hover
      const targetScale = isHovered ? 1.08 : 1.0;
      group.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

      // Chevron bounce — direction flips based on scroll
      const isDown = scrollDirRef.current === 'down';
      const bounce = Math.abs(Math.sin(t * 3)) * 0.15;
      arrowGroup.position.y = (isDown ? -2.2 : 2.8) + (isDown ? bounce : -bounce);
      arrowGroup2.position.y = (isDown ? -2.7 : 3.3) + (isDown ? bounce : -bounce);

      // Flip chevron direction visually
      const targetRot = isDown ? 0 : Math.PI;
      arrowGroup.rotation.x += (targetRot - arrowGroup.rotation.x) * 0.12;
      arrowGroup2.rotation.x += (targetRot - arrowGroup2.rotation.x) * 0.12;

      renderer.render(scene, camera);
    };
    animate();

    /* ─── Resize observer ─── */
    const ro = new ResizeObserver(() => {
      const nw = mount.clientWidth;
      const nh = mount.clientHeight;
      renderer.setSize(nw, nh);
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
    });
    ro.observe(mount);

    /* ─── Sync scroll direction ─── */
    const onScroll = () => {
      scrollDirRef.current = window.scrollY < threshold ? 'down' : 'up';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      mount.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      ro.disconnect();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, [threshold]);

  /* ─── Click handler ─── */
  const handleClick = useCallback(() => {
    if (scrollDirRef.current === 'down') {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  return (
    <div
      ref={mountRef}
      onClick={handleClick}
      className={`select-none ${className}`}
      aria-label="Scroll indicator — click to scroll"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
    />
  );
};
