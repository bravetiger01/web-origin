'use client'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import CameraRig from './CameraRig'

export default function CanvasScene() {
  return (
    <Canvas camera={{ position: [0, 2, 10], fov: 45 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 5]} intensity={1} />
      <Environment preset="city" />

      <CameraRig />
    </Canvas>
  )
}
