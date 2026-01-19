import React, { useMemo, Suspense } from 'react'
import * as THREE from 'three'
import { Decal, useTexture, useGLTF } from '@react-three/drei'

function ProceduralTShirt({ color, texture }) {
    const { geometry, material } = useMemo(() => {
    const shape = new THREE.Shape();
    
    // Improved T-Shirt Silhouette (Smoother)
    const width = 2.4;
    const height = 3.4;
    const sleeveWidth = 1.1;
    const sleeveHeight = 0.9;
    
    shape.moveTo(0, -height/2);
    shape.lineTo(-width/2, -height/2); 
    shape.bezierCurveTo(-width/2 - 0.1, -1, -width/2 - 0.1, 0, -width/2, height/2 - sleeveHeight);
    shape.quadraticCurveTo(-width/2, height/2 - sleeveHeight + 0.3, -width/2 - sleeveWidth, height/2 - sleeveHeight + 0.2);
    shape.lineTo(-width/2 - sleeveWidth, height/2);
    shape.lineTo(-width/2 + 0.4, height/2 + 0.3);
    
    const neckRadius = 0.7;
    shape.lineTo(-neckRadius, height/2 + 0.3);
    shape.absarc(0, height/2 + 0.3, neckRadius, Math.PI, 0, true);
    
    shape.lineTo(width/2 - 0.4, height/2 + 0.3);
    shape.lineTo(width/2 + sleeveWidth, height/2);
    shape.lineTo(width/2 + sleeveWidth, height/2 - sleeveHeight + 0.2);
    shape.quadraticCurveTo(width/2, height/2 - sleeveHeight + 0.3, width/2, height/2 - sleeveHeight);
    shape.bezierCurveTo(width/2 + 0.1, 0, width/2 + 0.1, -1, width/2, -height/2);
    shape.lineTo(0, -height/2);

    const extrudeSettings = {
      depth: 0.2, 
      bevelEnabled: true,
      bevelSegments: 5,
      steps: 4,
      bevelSize: 0.1, 
      bevelThickness: 0.1
    };

    const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geo.center(); 

    const mat = new THREE.MeshStandardMaterial({ 
        color: color, 
        roughness: 0.9, 
        metalness: 0.05,
    });

    return { geometry: geo, material: mat };
  }, [color]);

  return (
    <group dispose={null}>
      <mesh geometry={geometry} material={material} position={[0, 0, 0]}>
         {texture && (
             <Decal 
                position={[0, 0.4, 0.2]} 
                rotation={[0, 0, 0]} 
                scale={[1.4, 1.8, 1]} 
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
       <mesh position={[0, 1.6, 0.1]}>
           <torusGeometry args={[0.7, 0.08, 16, 64, Math.PI]} rotation={[0, 0, Math.PI]}/>
           <meshStandardMaterial color={color} roughness={1} />
       </mesh>
    </group>
  )
}

export function TShirt({ color = '#ffffff', texture }) {
    // TOGGLE: Change to true if you add 'tshirt.glb' to public/models/
    const USE_REAL_MODEL = false

    if (USE_REAL_MODEL) {
        // Implementation for GLTF loading would go here
        // For now, we fallback to procedural to avoid crash
    }
    
    return <ProceduralTShirt color={color} texture={texture} />
}
