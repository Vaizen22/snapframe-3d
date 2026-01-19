import React from 'react'
import { RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

export function Laptop({ color = '#e0e0e0', texture }) {
  
  if (texture) {
    texture.colorSpace = THREE.SRGBColorSpace
    texture.anisotropy = 16
    texture.center.set(0.5, 0.5)
    texture.rotation = 0
  }

  return (
    <group dispose={null} rotation={[0.3, -Math.PI / 6, 0]} position={[0, -1, 0]}>
      {/* Base Body */}
      <RoundedBox args={[6, 0.2, 4]} radius={0.1} position={[0, -0.1, 0]}>
         <meshStandardMaterial color={color} roughness={0.4} metalness={0.8} />
      </RoundedBox>

      {/* Screen Hinge */}
      <mesh position={[0, 0, -1.9]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 5.8, 32]} />
         <meshStandardMaterial color="#111" />
      </mesh>

      {/* Screen Lid (Opened) */}
      <group position={[0, 0.05, -1.9]} rotation={[-Math.PI / 8, 0, 0]}>
         {/* Lid Back */}
        <RoundedBox args={[6, 4, 0.1]} radius={0.1} position={[0, 2, 0]}>
             <meshStandardMaterial color={color} roughness={0.4} metalness={0.8} />
        </RoundedBox>
        
        {/* Bezel */}
        <mesh position={[0, 2, 0.06]}>
             <planeGeometry args={[5.8, 3.8]} />
             <meshBasicMaterial color="#000" />
        </mesh>

        {/* Display Panel */}
        <mesh position={[0, 2, 0.07]}>
             <planeGeometry args={[5.6, 3.6]} />
             {texture ? (
               <meshBasicMaterial map={texture} toneMapped={false} />
             ) : (
               <meshStandardMaterial color="#050505" roughness={0.2} metalness={0.9} />
             )}
        </mesh>
      </group>

      {/* Keyboard Area */}
      <mesh position={[0, 0.01, 0.5]} rotation={[-Math.PI/2, 0, 0]}>
        <planeGeometry args={[5.6, 2]} />
        <meshStandardMaterial color="#222" roughness={0.8} />
      </mesh>
      
      {/* Trackpad */}
      <mesh position={[0, 0.01, 1.4]} rotation={[-Math.PI/2, 0, 0]}>
        <planeGeometry args={[2, 1.2]} />
        <meshStandardMaterial color="#ccc" roughness={0.5} opacity={0.5} transparent />
      </mesh>
    </group>
  )
}
