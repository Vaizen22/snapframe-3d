import React from 'react'
import { RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

export function Phone({ color = '#1c1c1c', texture }) {
  
  if (texture) {
    texture.colorSpace = THREE.SRGBColorSpace
    texture.anisotropy = 16
  }

  return (
    <group dispose={null}>
      {/* Main Body */}
      <RoundedBox args={[3.2, 6.5, 0.4]} radius={0.25} smoothness={4}>
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.7} />
      </RoundedBox>

      {/* Screen Display */}
      <mesh position={[0, 0, 0.21]}>
        <planeGeometry args={[2.9, 6.2]} />
        {texture ? (
          <meshBasicMaterial map={texture} toneMapped={false} />
        ) : (
          <meshStandardMaterial color="#050505" roughness={0.2} metalness={0.8} />
        )}
      </mesh>

      {/* Dynamic Island / Notch */}
      <mesh position={[0, 2.8, 0.211]} rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.12, 0.6, 4, 16]} />
        <meshBasicMaterial color="black" />
      </mesh>
      
      {/* Camera Module (Back) */}
      <RoundedBox args={[1.2, 1.2, 0.1]} radius={0.1} position={[0.7, 2.3, -0.22]}>
         <meshStandardMaterial color={color} roughness={0.3} metalness={0.7} />
      </RoundedBox>
      
       {/* Lens 1 */}
      <mesh position={[0.5, 2.5, -0.28]} rotation={[Math.PI/2, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.1, 32]} />
        <meshStandardMaterial color="#111" roughness={0.1} metalness={0.9} />
      </mesh>
       {/* Lens 2 */}
       <mesh position={[1.0, 2.5, -0.28]} rotation={[Math.PI/2, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.1, 32]} />
        <meshStandardMaterial color="#111" roughness={0.1} metalness={0.9} />
      </mesh>
       {/* Lens 3 */}
       <mesh position={[0.75, 2.1, -0.28]} rotation={[Math.PI/2, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.1, 32]} />
        <meshStandardMaterial color="#111" roughness={0.1} metalness={0.9} />
      </mesh>
    </group>
  )
}
