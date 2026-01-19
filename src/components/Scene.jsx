import React, { Suspense, useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows, useTexture, Bounds, useBounds } from '@react-three/drei'
import { Phone } from './models/Phone'
import { Laptop } from './models/Laptop'
import { TShirt } from './models/TShirt'

function ModelWrapper({ type, image, color }) {
    const texture = image ? useTexture(image) : null
    
    switch (type) {
        case 'laptop':
            return <Laptop color={color} texture={texture} />
        case 'tshirt':
            return <TShirt color={color} texture={texture} />
        case 'phone':
        default:
            return <Phone color={color} texture={texture} />
    }
}

function AutoFit({ children }) {
  const bounds = useBounds()
  useEffect(() => {
     // Fit the object to the screen with some margin/padding
     // clip: ensures we don't zoom out too far if not needed
     // margin: 1.2 means 20% margin
     bounds.refresh().clip().fit()
  }, [children, bounds])
  return <group>{children}</group>
}

function CaptureHandler({ captureRef }) {
  const { gl, scene, camera } = useThree()

  useEffect(() => {
    if (captureRef) {
      captureRef.current = (multiplier = 1) => {
        const originalPixelRatio = gl.getPixelRatio()
        gl.setPixelRatio(originalPixelRatio * multiplier)
        gl.render(scene, camera)
        const dataUrl = gl.domElement.toDataURL('image/png')
        gl.setPixelRatio(originalPixelRatio)
        return dataUrl
      }
    }
  }, [gl, scene, camera, captureRef])

  return null
}

export function Scene({ modelType, image, color, captureRef }) {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas 
         shadows
         // Initial camera position will be overridden by Bounds but good to have reasonable default
         camera={{ position: [0, 0, 10], fov: 50 }} 
         gl={{ preserveDrawingBuffer: true, antialias: true }}
      >
        <CaptureHandler captureRef={captureRef} />
        
        <ambientLight intensity={0.7} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <Environment preset="studio" />
        
        <Suspense fallback={null}>
          <Bounds fit clip observe margin={1.2}>
             <ModelWrapper key={image || 'no-image'} type={modelType} image={image} color={color} />
          </Bounds>
        </Suspense>

        <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={20} blur={2.5} far={4.5} />
        <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.6} enablePan={true} />
      </Canvas>
    </div>
  )
}
