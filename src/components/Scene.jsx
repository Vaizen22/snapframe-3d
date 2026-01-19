import React, { Suspense, useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows, useTexture } from '@react-three/drei'
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

function ResponsiveCamera({ type }) {
   const { camera, viewport, size } = useThree()
   
   useEffect(() => {
     // Adjust camera Z based on viewport width (responsiveness)
     // Smaller screens need camera further away to see the whole object
     const baseDistance = type === 'laptop' ? 14 : type === 'tshirt' ? 10 : 12
     const factor = size.width < 768 ? 1.5 : 1
     
     camera.position.z = baseDistance * factor
     camera.updateProjectionMatrix()
   }, [size.width, camera, type])

   return null
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
    <div className="w-full h-full">
      <Canvas 
         shadows
         camera={{ position: [0, 0, 12], fov: 45 }} 
         gl={{ preserveDrawingBuffer: true, antialias: true }}
      >
        <ResponsiveCamera type={modelType} />
        <CaptureHandler captureRef={captureRef} />
        
        <ambientLight intensity={0.7} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <Environment preset="studio" />
        
        <Suspense fallback={null}>
            <ModelWrapper key={image || 'no-image'} type={modelType} image={image} color={color} />
        </Suspense>

        <ContactShadows position={[0, -3.4, 0]} opacity={0.5} scale={20} blur={2.5} far={4.5} />
        <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 1.6} enablePan={false} />
      </Canvas>
    </div>
  )
}
