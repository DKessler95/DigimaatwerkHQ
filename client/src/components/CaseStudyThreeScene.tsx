import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, Canvas } from '@react-three/fiber';
import { Html, useTexture, OrbitControls, ContactShadows, Environment, Sphere } from '@react-three/drei';

// Floating text component
const FloatingText = ({ position, text, color = '#ffffff', scale = 1 }: { position: [number, number, number]; text: string; color?: string; scale?: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.position.y += Math.sin(clock.getElapsedTime()) * 0.001;
      groupRef.current.rotation.y += 0.002;
    }
  });
  
  return (
    <group ref={groupRef} position={position} scale={[scale, scale, scale]}>
      <Html 
        transform
        distanceFactor={10}
        position={[0, 0, 0]}
        style={{ 
          color,
          fontSize: '2em',
          fontWeight: 'bold',
          textShadow: '0 0 10px rgba(0, 0, 0, 0.5)'
        }}
      >
        {text}
      </Html>
    </group>
  );
};

// Automation-themed animation
const AutomationAnimation = () => {
  const gearRef = useRef<THREE.Mesh>(null);
  const spheresRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (gearRef.current) {
      gearRef.current.rotation.z += 0.01;
    }
    
    if (spheresRef.current) {
      spheresRef.current.rotation.y += 0.005;
      spheresRef.current.children.forEach((child, i) => {
        const mesh = child as THREE.Mesh;
        mesh.position.y = Math.sin(clock.getElapsedTime() * 1.5 + i) * 0.2;
      });
    }
  });
  
  return (
    <group>
      <mesh ref={gearRef} position={[0, 0, -3]}>
        <torusGeometry args={[1, 0.2, 16, 100]} />
        <meshStandardMaterial color="#0ea5e9" metalness={0.9} roughness={0.2} />
      </mesh>
      
      <group ref={spheresRef} position={[0, 0, 0]}>
        {Array.from({ length: 5 }).map((_, i) => {
          const angle = (Math.PI * 2 / 5) * i;
          const x = Math.cos(angle) * 2;
          const z = Math.sin(angle) * 2;
          return (
            <mesh key={i} position={[x, 0, z]}>
              <sphereGeometry args={[0.3, 16, 16]} />
              <meshStandardMaterial 
                color={i % 2 === 0 ? "#14b8a6" : "#0ea5e9"} 
                metalness={0.5} 
                roughness={0.2} 
              />
            </mesh>
          );
        })}
      </group>
      
      <FloatingText position={[0, 1.5, 0]} text="Automation" color="#14b8a6" />
    </group>
  );
};

// Web development-themed animation
const WebDevAnimation = ({ logoUrl = '/digimaatwerkLOGO.png' }) => {
  const groupRef = useRef<THREE.Group>(null);
  const planeRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(logoUrl);
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.3;
    }
    
    if (planeRef.current) {
      planeRef.current.position.y = Math.sin(clock.getElapsedTime()) * 0.2 + 0.5;
      planeRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.3) * 0.05;
    }
  });
  
  return (
    <group ref={groupRef}>
      {/* Floating screen with logo */}
      <mesh ref={planeRef} position={[0, 0.5, 0]}>
        <planeGeometry args={[2, 1.5]} />
        <meshStandardMaterial map={texture} transparent />
      </mesh>
      
      {/* Base structure */}
      <mesh position={[0, -1, 0]}>
        <boxGeometry args={[3, 0.2, 1.5]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
      </mesh>
      
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.2, 0.3, 1, 16]} />
        <meshStandardMaterial color="#64748b" metalness={0.8} roughness={0.2} />
      </mesh>
      
      <FloatingText position={[0, 2, 0]} text="Web Development" color="#14b8a6" />
    </group>
  );
};

// AI-themed animation
const AIAnimation = () => {
  const brainRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (brainRef.current) {
      brainRef.current.rotation.y += 0.005;
      brainRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.1;
    }
    
    if (particlesRef.current) {
      particlesRef.current.children.forEach((child, i) => {
        const mesh = child as THREE.Mesh;
        const angle = clock.getElapsedTime() * (0.2 + i * 0.05);
        mesh.position.x = Math.cos(angle) * (1 + i * 0.1);
        mesh.position.z = Math.sin(angle) * (1 + i * 0.1);
        mesh.position.y = Math.sin(angle * 2) * 0.5;
      });
    }
  });
  
  return (
    <group>
      {/* Brain-like structure */}
      <group ref={brainRef}>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color="#14b8a6" wireframe />
        </mesh>
        
        <mesh position={[0, 0, 0]} scale={0.9}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial 
            color="#0f172a" 
            transparent 
            opacity={0.8}
            metalness={0.2}
            roughness={0.8}
          />
        </mesh>
      </group>
      
      {/* Neural network particles */}
      <group ref={particlesRef}>
        {Array.from({ length: 20 }).map((_, i) => (
          <mesh key={i} position={[0, 0, 0]}>
            <sphereGeometry args={[0.07, 8, 8]} />
            <meshStandardMaterial 
              color={i % 3 === 0 ? "#06b6d4" : (i % 3 === 1 ? "#14b8a6" : "#0ea5e9")} 
              emissive={i % 3 === 0 ? "#06b6d4" : (i % 3 === 1 ? "#14b8a6" : "#0ea5e9")}
              emissiveIntensity={0.5}
            />
          </mesh>
        ))}
      </group>
      
      <FloatingText position={[0, 1.8, 0]} text="AI & Chatbots" color="#14b8a6" />
    </group>
  );
};

// Generic scene that chooses animation based on category
const AnimationScene = ({ category }: { category: string }) => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 2.5} maxPolarAngle={Math.PI / 2.5} />
      <ContactShadows
        position={[0, -1.5, 0]}
        opacity={0.4}
        scale={10}
        blur={2}
        far={5}
      />
      <Environment preset="city" />
      
      {/* Choose animation based on category */}
      {category === 'Automatisering' || category === 'Automation' ? (
        <AutomationAnimation />
      ) : category === 'Webontwikkeling' || category === 'Web Development' ? (
        <WebDevAnimation />
      ) : category === 'AI & Chatbots' ? (
        <AIAnimation />
      ) : (
        <AutomationAnimation />
      )}
    </>
  );
};

// Data wave animation for the case study content background
export const DataWaveBackground = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      const time = clock.getElapsedTime();
      const position = meshRef.current.geometry.attributes.position;
      
      for (let i = 0; i < position.count; i++) {
        const x = position.getX(i);
        const y = position.getY(i);
        
        // Create a wave effect
        const anim = 0.2 * Math.sin(x * 2 + time) * Math.sin(y * 2 + time);
        position.setZ(i, anim);
      }
      
      position.needsUpdate = true;
    }
  });
  
  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[15, 15, 32, 32]} />
      <meshStandardMaterial 
        color="#14b8a6" 
        wireframe 
        side={THREE.DoubleSide}
        transparent
        opacity={0.1}
      />
    </mesh>
  );
};

interface CaseStudyThreeSceneProps {
  category: string;
  className?: string;
  height?: string;
}

// Main component export
const CaseStudyThreeScene: React.FC<CaseStudyThreeSceneProps> = ({ 
  category,
  className = "h-64",
  height = "300px"
}) => {
  return (
    <div className={`${className} my-8 rounded-lg overflow-hidden`} style={{ height }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <AnimationScene category={category} />
      </Canvas>
    </div>
  );
};

export default CaseStudyThreeScene;