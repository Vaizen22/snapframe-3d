import React, { useMemo } from 'react'
import * as THREE from 'three'
import { Decal } from '@react-three/drei'

export function TShirt({ color = '#ffffff', texture }) {
  
  const { geometry, material } = useMemo(() => {
    // Define the T-Shirt Shape
    const shape = new THREE.Shape();
    
    // Starting from bottom center
    const width = 2.4;
    const height = 3.2;
    const sleeveWidth = 1.0;
    const sleeveHeight = 0.8;
    const neckRadius = 0.6;
    
    // Draw left side
    shape.moveTo(0, -height/2);
    shape.lineTo(-width/2, -height/2); // Bottom left
    shape.lineTo(-width/2, height/2 - sleeveHeight); // Armpit
    shape.lineTo(-width/2 - sleeveWidth, height/2 - sleeveHeight + 0.2); // Sleeve bottom
    shape.lineTo(-width/2 - sleeveWidth, height/2); // Sleeve top
    shape.lineTo(-width/2 + 0.2, height/2 + 0.2); // Shoulder
    
    // Neck
    shape.lineTo(-neckRadius, height/2 + 0.2);
    shape.absarc(0, height/2 + 0.2, neckRadius, Math.PI, 0, true); // Neck curve
    
    // Draw right side (mirror)
    shape.lineTo(width/2 - 0.2, height/2 + 0.2); // Shoulder
    shape.lineTo(width/2 + sleeveWidth, height/2); // Sleeve top
    shape.lineTo(width/2 + sleeveWidth, height/2 - sleeveHeight + 0.2); // Sleeve bottom
    shape.lineTo(width/2, height/2 - sleeveHeight); // Armpit
    shape.lineTo(width/2, -height/2); // Bottom right
    shape.lineTo(0, -height/2); // Back to start
    
    const extrudeSettings = {
      depth: 0.1,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 2,
      bevelSize: 0.05,
      bevelThickness: 0.05
    };

    const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    
    // Fix UVs for the main texture to cover the chest area
    // This is tricky with ExtrudeGeometry. 
    // Instead, we will use a plain material for the shirt, and a Decal for the image.
    
    const mat = new THREE.MeshStandardMaterial({ 
        color: color, 
        roughness: 0.8,
        metalness: 0.1 
    });

    return { geometry: geo, material: mat };
  }, [color]);

  return (
    <group dispose={null}>
      <mesh geometry={geometry} material={material} position={[0, 0, 0]}>
         {/* If we have a texture, we apply it as a Decal (sticker) on the chest */}
         {texture && (
             <Decal 
                position={[0, 0.5, 0.15]} // Chest position
                rotation={[0, 0, 0]} 
                scale={[1.5, 2, 1]} // Size of the print area
             >
                <meshBasicMaterial 
                    map={texture} 
                    transparent 
                    polygonOffset 
                    polygonOffsetFactor={-1} 
                    toneMapped={false}
                />
             </Decal>
         )}
      </mesh>
    </group>
  )
}
