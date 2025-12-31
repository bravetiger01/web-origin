'use client'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import CameraRig from './CameraRig'

// Import all scenes
import City from '../scenes/City'
import WebMoment from '../scenes/WebMoment'
import SkillWeb from '../scenes/SkillWeb'
import Finale from '../scenes/Finale'

/**
 * CanvasScene Component
 * 
 * Main WebGL canvas with cinematic urban nighttime atmosphere.
 * - Dark urban sky gradient (not pure black)
 * - Atmospheric depth through fog
 * - Warm/cool contrast lighting
 */
export default function CanvasScene() {
    return (
        <div className="canvas-container">
            <Canvas
                camera={{
                    position: [0, 2, 15],
                    fov: 45,
                    near: 0.1,
                    far: 150
                }}
                dpr={[1, 2]}
                gl={{
                    antialias: true,
                    alpha: false,
                    powerPreference: 'high-performance'
                }}
            >
                {/* 
          Night sky color - near-black with subtle blue tint
          Avoids pure black for more natural feel
        */}
                <color attach="background" args={['#050510']} />

                {/* Global fog for atmospheric depth */}
                <fog attach="fog" args={['#0a0a15', 8, 50]} />

                {/* Ambient fill - very subtle, cool toned */}
                <ambientLight intensity={0.08} color="#8080a0" />

                {/* 
          Primary key light - distant city glow
          Warm orange to suggest urban light pollution
        */}
                <directionalLight
                    position={[0, 20, -30]}
                    intensity={0.15}
                    color="#ff9966"
                />

                {/* Cool rim light from above - night sky */}
                <directionalLight
                    position={[10, 30, 20]}
                    intensity={0.08}
                    color="#6688bb"
                />

                {/* Hemisphere light for natural sky/ground color gradient */}
                <hemisphereLight
                    args={['#1a1a30', '#0a0a10', 0.1]}
                />

                <Suspense fallback={null}>
                    {/* ACT I: NYC cityscape */}
                    <City />

                    {/* ACT II: Web transformation (anchored to city) */}
                    <WebMoment />

                    {/* ACT III: Skill web */}
                    <SkillWeb />

                    {/* ACT V: Finale */}
                    <Finale />
                </Suspense>

                {/* Camera controller */}
                <CameraRig />
            </Canvas>
        </div>
    )
}
