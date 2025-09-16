import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedPoints() {
  const ref = useRef<THREE.Points>(null);
  
  // Generate random positions for particles
  const particlesPosition = new Float32Array(2000 * 3);
  for (let i = 0; i < 2000; i++) {
    particlesPosition[i * 3] = (Math.random() - 0.5) * 10;
    particlesPosition[i * 3 + 1] = (Math.random() - 0.5) * 10;
    particlesPosition[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.1;
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.05) * 0.05;
    }
  });

  return (
    <Points ref={ref} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#2196f3"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

function FloatingGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.2;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={[2, 0, -2]}>
      <torusGeometry args={[1, 0.3, 16, 100]} />
      <meshPhongMaterial color="#ffd700" transparent opacity={0.3} />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#2196f3" />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#ffd700" />
      <AnimatedPoints />
      <FloatingGeometry />
    </>
  );
}

interface ThreeBackgroundProps {
  opacity?: number;
}

const ThreeBackground = ({ opacity = 0.15 }: ThreeBackgroundProps) => {
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default ThreeBackground;