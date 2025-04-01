import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { setupReplitMock } from '@/lib/mockReplit';

// Set up Replit mock to prevent errors
setupReplitMock();

// Basic color scheme based on category
const getCategoryColor = (category: string): string => {
  switch(category) {
    case 'Automatisering':
    case 'Automation':
      return '#0ea5e9';
    case 'Webontwikkeling':
    case 'Web Development':
      return '#14b8a6';
    case 'AI & Chatbots':
      return '#06b6d4';
    default:
      return '#14b8a6';
  }
};

// Secondary color based on category
const getSecondaryColor = (category: string): string => {
  switch(category) {
    case 'Automatisering':
    case 'Automation':
      return '#0284c7';
    case 'Webontwikkeling':
    case 'Web Development':
      return '#0f766e';
    case 'AI & Chatbots':
      return '#0891b2';
    default:
      return '#0f766e';
  }
};

// Simple animation for webdev
const WebDevAnimation: React.FC<{ category: string }> = ({ category }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const primaryColor = getCategoryColor(category);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.5) * 0.2;
      meshRef.current.rotation.y += 0.01;
    }
  });
  
  return (
    <mesh ref={meshRef} position={[0, 0, 0]} castShadow>
      <boxGeometry args={[2, 2, 0.2]} />
      <meshStandardMaterial color={primaryColor} metalness={0.5} roughness={0.2} />
    </mesh>
  );
};

// Simple animation for automation
const AutomationAnimation: React.FC<{ category: string }> = ({ category }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const primaryColor = getCategoryColor(category);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.01;
    }
  });
  
  return (
    <mesh ref={meshRef} position={[0, 0, 0]} castShadow>
      <torusGeometry args={[1.5, 0.3, 16, 50]} />
      <meshStandardMaterial color={primaryColor} metalness={0.7} roughness={0.2} />
    </mesh>
  );
};

// Simple animation for AI
const AIAnimation: React.FC<{ category: string }> = ({ category }) => {
  const meshRef = useRef<THREE.Group>(null);
  const primaryColor = getCategoryColor(category);
  const secondaryColor = getSecondaryColor(category);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = Math.sin(clock.getElapsedTime()) * 0.1;
    }
  });
  
  return (
    <group ref={meshRef}>
      <mesh position={[0, 0, 0]} castShadow>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color={primaryColor} wireframe />
      </mesh>
      
      <mesh position={[0, 0, 0]} scale={0.8} castShadow>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial 
          color={secondaryColor} 
          transparent 
          opacity={0.7}
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>
    </group>
  );
};

// Main Scene component
const Scene: React.FC<{ category: string }> = ({ category }) => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} castShadow />
      
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#f1f5f9" />
      </mesh>
      
      {category === 'Automatisering' || category === 'Automation' ? (
        <AutomationAnimation category={category} />
      ) : category === 'Webontwikkeling' || category === 'Web Development' ? (
        <WebDevAnimation category={category} />
      ) : category === 'AI & Chatbots' ? (
        <AIAnimation category={category} />
      ) : (
        <AutomationAnimation category={category} />
      )}
    </>
  );
};

interface SimpleCaseStudyAnimationProps {
  category: string;
  className?: string;
  height?: string;
}

const SimpleCaseStudyAnimation: React.FC<SimpleCaseStudyAnimationProps> = ({ 
  category,
  className = "h-64 my-8",
  height = "300px"
}) => {
  return (
    <div className={`${className} rounded-lg overflow-hidden`} style={{ height }}>
      <Suspense fallback={
        <div className="w-full h-full flex items-center justify-center bg-secondary/30">
          <div className="animate-spin w-8 h-8 border-4 border-accent border-t-transparent rounded-full" />
        </div>
      }>
        <Canvas 
          camera={{ position: [0, 0, 5], fov: 50 }}
          shadows
        >
          <Scene category={category} />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default SimpleCaseStudyAnimation;