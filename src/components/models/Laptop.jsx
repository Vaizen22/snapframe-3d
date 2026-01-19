import React from 'react'
import { RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

export function Laptop({ color = '#e0e0e0', texture }) {
  
  if (texture) {
    texture.colorSpace = THREE.SRGBColorSpace
    texture.anisotropy = 16
    // Rotate texture for landscape screen
    texture.center.set(0.5, 0.5)
    texture.rotation = 0
  }

  return (
    <group dispose={null} rotation={[0, -Math.PI / 6, 0]}>
      {/* Base */}
      <RoundedBox args={[5, 0.2, 3.5]} radius={0.1} position={[0, -0.1, 0]}>
         <meshStandardMaterial color={color} roughness={0.4} metalness={0.8} />
      </RoundedBox>

      {/* Screen Hinge Part */}
      <mesh position={[0, 0, -1.7]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 4.8, 32]} />
         <meshStandardMaterial color="#111" />
      </mesh>

      {/* Screen Lid (Opened at 100 degrees) */}
      <group position={[0, 0.05, -1.7]} rotation={[-Math.PI / 6, 0, 0]}>
         {/* Back of Lid */}
        <RoundedBox args={[5, 3.2, 0.1]} radius={0.05} position={[0, 1.6, 0]}>
             <meshStandardMaterial color={color} roughness={0.4} metalness={0.8} />
        </RoundedBox>
        
        {/* Bezel */}
        <mesh position={[0, 1.6, 0.06]}>
             <planeGeometry args={[4.9, 3.1]} />
             <meshBasicMaterial color="black" />
        </mesh>

        {/* Display */}
        <mesh position={[0, 1.65, 0.07]}>
             <planeGeometry args={[4.7, 2.95]} />
             {texture ? (
               <meshBasicMaterial map={texture} toneMapped={false} />
             ) : (
               <meshStandardMaterial color="#050505" roughness={0.2} metalness={0.8} />
             )}
        </mesh>
      </group>

      {/* Keyboard Area (Simplified) */}
      <mesh position={[0, 0.01, 0.5]} rotation={[-Math.PI/2, 0, 0]}>
        <planeGeometry args={[4.6, 1.8]} />
        <meshStandardMaterial color="#222" roughness={0.8} />
      </mesh>
      
      {/* Trackpad */}
      <mesh position={[0, 0.01, 1.2]} rotation={[-Math.PI/2, 0, 0]}>
        <planeGeometry args={[1.5, 1]} />
        <meshStandardMaterial color="#ccc" roughness={0.5} opacity={0.5} transparent />
      </mesh>
    </group>
  )
}
