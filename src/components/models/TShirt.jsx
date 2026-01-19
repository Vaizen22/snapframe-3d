import React, { useRef } from 'react'
import * as THREE from 'three'

export function TShirt({ color = '#ffffff', texture }) {
  
  if (texture) {
    texture.colorSpace = THREE.SRGBColorSpace
    texture.anisotropy = 16
    // Adjust texture to fit center chest
    texture.repeat.set(1, 1)
    texture.center.set(0.5, 0.5)
  }

  return (
    <group dispose={null} rotation={[0, 0, 0]} scale={1.5}>
       {/* Main Body (Torso) */}
       <mesh position={[0, 0, 0]}>
         <boxGeometry args={[2, 2.8, 0.3]} />
         <meshStandardMaterial color={color} roughness={0.9} />
       </mesh>

       {/* Left Sleeve */}
       <mesh position={[-1.3, 1, 0]} rotation={[0, 0, 0.4]}>
          <boxGeometry args={[0.8, 1.2, 0.28]} />
          <meshStandardMaterial color={color} roughness={0.9} />
       </mesh>

        {/* Right Sleeve */}
       <mesh position={[1.3, 1, 0]} rotation={[0, 0, -0.4]}>
          <boxGeometry args={[0.8, 1.2, 0.28]} />
          <meshStandardMaterial color={color} roughness={0.9} />
       </mesh>

       {/* Neck Area */}
       <mesh position={[0, 1.3, 0.05]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 0.1, 32]} rotation={[Math.PI/2, 0, 0]} />
          <meshStandardMaterial color={color} roughness={0.9} />
       </mesh>
       <mesh position={[0, 1.35, 0.16]}>
           <torusGeometry args={[0.4, 0.05, 16, 32, Math.PI]} rotation={[0, 0, Math.PI]}/>
           <meshStandardMaterial color="#ddd" roughness={1} />
       </mesh>

       {/* Print Area (The design) */}
       <mesh position={[0, 0.2, 0.16]}>
          <planeGeometry args={[1.2, 1.6]} />
          {texture ? (
               <meshBasicMaterial map={texture} transparent={true} toneMapped={false} />
          ) : (
               <meshStandardMaterial color={color} opacity={0} transparent />
          )}
       </mesh>
    </group>
  )
}
