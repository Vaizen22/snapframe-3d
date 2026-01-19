import React, { useMemo, Suspense } from 'react'
import { RoundedBox, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

// ... (keep generateKeyboardTexture function)
function generateKeyboardTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 512
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#1a1a1a'
  ctx.fillRect(0, 0, 1024, 512)
  ctx.fillStyle = '#050505'
  const rows = 6
  const cols = 14
  const gap = 10
  const width = (1024 - gap * (cols + 1)) / cols
  const height = (512 - gap * (rows + 1)) / rows
  for(let i=0; i<rows; i++) {
      for(let j=0; j<cols; j++) {
          if (i === 5 && j > 3 && j < 10) continue 
          if (i === 5 && j === 3) {
             ctx.fillRect(gap + j*(width+gap), gap + i*(height+gap), width*7 + gap*6, height)
          } else if (!(i === 5 && j > 3 && j < 10)) {
             ctx.fillRect(gap + j*(width+gap), gap + i*(height+gap), width, height)
          }
      }
  }
  return new THREE.CanvasTexture(canvas)
}

function ProceduralLaptop({ color, texture }) {
    const keyboardTexture = useMemo(() => generateKeyboardTexture(), [])

    return (
    <group dispose={null} rotation={[0.3, -Math.PI / 6, 0]} position={[0, -1, 0]}>
      {/* Base Body */}
      <RoundedBox args={[6, 0.25, 4.2]} radius={0.15} position={[0, -0.1, 0]}>
         <meshStandardMaterial color={color} roughness={0.3} metalness={0.9} />
      </RoundedBox>

      {/* Screen Hinge */}
      <mesh position={[0, 0, -2]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 5, 32]} />
         <meshStandardMaterial color="#050505" />
      </mesh>

      {/* Screen Lid (Opened) */}
      <group position={[0, 0.08, -2]} rotation={[-Math.PI / 8, 0, 0]}>
        <RoundedBox args={[6, 4, 0.12]} radius={0.1} position={[0, 2, 0]}>
             <meshStandardMaterial color={color} roughness={0.3} metalness={0.9} />
        </RoundedBox>
        <mesh position={[0, 2, 0.07]}>
             <planeGeometry args={[5.8, 3.8]} />
             <meshBasicMaterial color="#000" />
        </mesh>
        <mesh position={[0, 2.1, 0.08]}>
             <planeGeometry args={[5.6, 3.5]} />
             {texture ? (
               <meshBasicMaterial map={texture} toneMapped={false} />
             ) : (
               <meshStandardMaterial color="#050505" roughness={0.2} metalness={0.9} />
             )}
        </mesh>
        <mesh position={[0, 3.92, 0.08]}>
            <circleGeometry args={[0.03]} />
            <meshBasicMaterial color="#111" />
        </mesh>
      </group>

      <mesh position={[0, 0.03, 0.4]} rotation={[-Math.PI/2, 0, 0]}>
        <planeGeometry args={[5.4, 2.2]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.04, 0.4]} rotation={[-Math.PI/2, 0, 0]}>
        <planeGeometry args={[5.2, 2.0]} />
        <meshStandardMaterial map={keyboardTexture} transparent opacity={0.9} roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.03, 1.6]} rotation={[-Math.PI/2, 0, 0]}>
        <planeGeometry args={[2.2, 1.4]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.5} />
      </mesh>
    </group>
    )
}

function RealLaptop({ texture, fallback }) {
    // Attempt to load from public/models/laptop.glb
    // If it fails, Suspense/ErrorBoundary higher up might catch it, 
    // but cleaner is to try-catch or assume it exists if user enabled it.
    // NOTE: This will crash if file missing.
    try {
        const { nodes, materials } = useGLTF('/models/laptop.glb')
        // This is a generic handler, assuming a standard GLTF structure.
        // Since we don't have the file, we can't map 'screen' mesh exactly.
        // This serves as a placeholder for the logic.
        return <primitive object={nodes.Scene || nodes.scene} />
    } catch (e) {
        return fallback
    }
}

export function Laptop({ color = '#e0e0e0', texture }) {
  if (texture) {
    texture.colorSpace = THREE.SRGBColorSpace
    texture.anisotropy = 16
    texture.center.set(0.5, 0.5)
    texture.rotation = 0
  }

  // TOGGLE: Change this to true if you have added 'laptop.glb' to public/models/
  const USE_REAL_MODEL = false 

  if (USE_REAL_MODEL) {
      return (
        <Suspense fallback={<ProceduralLaptop color={color} texture={texture} />}>
            <RealLaptop fallback={<ProceduralLaptop color={color} texture={texture} />} texture={texture}/>
        </Suspense>
      )
  }

  return <ProceduralLaptop color={color} texture={texture} />
}
