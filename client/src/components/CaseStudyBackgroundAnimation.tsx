import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
// No need to import the Replit mock for this simple background animation

// Particle system animation with dynamic color based on category
const ParticlesAnimation = ({ category }: { category: string }) => {
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  
  // Set color based on category
  const getColor = () => {
    switch(category) {
      case 'Automatisering':
      case 'Automation':
        return new THREE.Color('#0ea5e9');
      case 'Webontwikkeling':
      case 'Web Development':
        return new THREE.Color('#14b8a6');
      case 'AI & Chatbots':
        return new THREE.Color('#06b6d4');
      default:
        return new THREE.Color('#14b8a6');
    }
  };
  
  // Secondary color for gradient effect
  const getSecondaryColor = () => {
    switch(category) {
      case 'Automatisering':
      case 'Automation':
        return new THREE.Color('#0284c7');
      case 'Webontwikkeling':
      case 'Web Development':
        return new THREE.Color('#0f766e');
      case 'AI & Chatbots':
        return new THREE.Color('#0891b2');
      default:
        return new THREE.Color('#0f766e');
    }
  };
  
  const particleColor = getColor();
  const secondaryColor = getSecondaryColor();
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
    
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position;
      const colors = particlesRef.current.geometry.attributes.color;
      
      for (let i = 0; i < positions.count; i++) {
        const i3 = i * 3;
        const x = positions.array[i3];
        const y = positions.array[i3 + 1];
        const z = positions.array[i3 + 2];
        
        // Calculate distance from center for color gradient
        const distance = Math.sqrt(x * x + y * y + z * z);
        const ratio = Math.min(1, distance / 20);
        
        // Set color based on distance (gradient effect)
        const mixedColor = new THREE.Color().lerpColors(particleColor, secondaryColor, ratio);
        
        // Add time-based animation
        const time = clock.getElapsedTime();
        const angle = time * 0.2 + i * 0.001;
        const amplitude = 0.2;
        
        // Apply subtle wave animation
        positions.array[i3] = x + Math.sin(angle) * amplitude;
        positions.array[i3 + 1] = y + Math.cos(angle) * amplitude;
        positions.array[i3 + 2] = z + Math.sin(angle + y * 0.5) * amplitude;
        
        // Update color
        colors.array[i3] = mixedColor.r;
        colors.array[i3 + 1] = mixedColor.g;
        colors.array[i3 + 2] = mixedColor.b;
      }
      
      positions.needsUpdate = true;
      colors.needsUpdate = true;
    }
  });
  
  // Create particles
  const particleCount = 1000;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    // Create a sphere of particles
    const radius = 10 + Math.random() * 10;
    const phi = Math.acos(Math.random() * 2 - 1);
    const theta = Math.random() * Math.PI * 2;
    
    positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i3 + 2] = radius * Math.cos(phi);
    
    // Initialize colors (will be updated in useFrame)
    colors[i3] = particleColor.r;
    colors[i3 + 1] = particleColor.g;
    colors[i3 + 2] = particleColor.b;
  }
  
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  
  return (
    <group ref={groupRef}>
      <points ref={particlesRef} geometry={geometry}>
        <pointsMaterial 
          size={0.15} 
          vertexColors 
          transparent 
          opacity={0.6}
          sizeAttenuation 
        />
      </points>
    </group>
  );
};

interface CaseStudyBackgroundAnimationProps {
  category: string;
  className?: string;
}

const CaseStudyBackgroundAnimation: React.FC<CaseStudyBackgroundAnimationProps> = ({ 
  category,
  className = "absolute top-0 left-0 w-full h-full -z-10 opacity-30"
}) => {
  return (
    <div className={className}>
      <Suspense fallback={<div className="w-full h-full bg-primary" />}>
        <Canvas camera={{ position: [0, 0, 25], fov: 60 }}>
          <ambientLight intensity={0.2} />
          <ParticlesAnimation category={category} />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default CaseStudyBackgroundAnimation;