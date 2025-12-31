'use client'
import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * City Scene - ACT I: Before the Power
 * 
 * Stylized NYC nighttime urban environment with:
 * - Layered building silhouettes (foreground, midground, background)
 * - Volumetric fog for depth and scale
 * - Warm window emissive lighting
 * - Parallax movement based on camera
 */

// Individual building with window lights
function Building({ position, width, height, depth, windowDensity = 0.3, layer = 'mid' }) {
    const meshRef = useRef()

    // Layer-specific styling
    const layerColors = {
        fore: { base: '#0a0a0c', window: '#ffb347', windowIntensity: 0.15 },
        mid: { base: '#08080a', window: '#ffa500', windowIntensity: 0.08 },
        back: { base: '#060608', window: '#ff8c00', windowIntensity: 0.04 },
    }

    const colors = layerColors[layer] || layerColors.mid

    // Window flicker effect
    useFrame((state) => {
        if (meshRef.current && Math.random() > 0.995) {
            // Very subtle, rare flicker
            const flicker = 0.8 + Math.random() * 0.4
            meshRef.current.material.emissiveIntensity = colors.windowIntensity * flicker
        }
    })

    return (
        <mesh ref={meshRef} position={position}>
            <boxGeometry args={[width, height, depth]} />
            <meshStandardMaterial
                color={colors.base}
                emissive={colors.window}
                emissiveIntensity={colors.windowIntensity}
                roughness={0.9}
                metalness={0.1}
            />
        </mesh>
    )
}

// Layer of buildings at a specific depth
function BuildingLayer({ zOffset, count, layer, parallaxMultiplier = 1 }) {
    const groupRef = useRef()
    const { camera } = useThree()
    const baseY = useRef(0)

    // Generate buildings for this layer
    const buildings = useMemo(() => {
        const result = []
        const seed = zOffset * 100

        const seededRandom = (n) => {
            const x = Math.sin(seed + n) * 10000
            return x - Math.floor(x)
        }

        // Layer-specific settings
        const layerSettings = {
            fore: { xSpread: 60, heightMin: 3, heightMax: 8, widthMin: 0.8, widthMax: 1.5 },
            mid: { xSpread: 80, heightMin: 5, heightMax: 14, widthMin: 0.6, widthMax: 1.2 },
            back: { xSpread: 100, heightMin: 8, heightMax: 20, widthMin: 0.4, widthMax: 1.0 },
        }

        const settings = layerSettings[layer] || layerSettings.mid

        for (let i = 0; i < count; i++) {
            const x = (i / count - 0.5) * settings.xSpread + (seededRandom(i) - 0.5) * 3
            const height = settings.heightMin + seededRandom(i + 100) * (settings.heightMax - settings.heightMin)
            const width = settings.widthMin + seededRandom(i + 200) * (settings.widthMax - settings.widthMin)
            const depth = 0.5 + seededRandom(i + 300) * 1

            result.push({
                key: `${layer}-${i}`,
                position: [x, height / 2 - 0.5, zOffset + (seededRandom(i + 400) - 0.5) * 2],
                width,
                height,
                depth,
            })
        }

        return result
    }, [zOffset, count, layer])

    // Parallax movement
    useFrame(() => {
        if (groupRef.current) {
            // Subtle parallax based on camera position
            const parallaxX = camera.position.x * parallaxMultiplier * 0.1
            groupRef.current.position.x = parallaxX

            // Very subtle ambient sway
            groupRef.current.position.y = baseY.current + Math.sin(Date.now() * 0.0003) * 0.01
        }
    })

    return (
        <group ref={groupRef}>
            {buildings.map((building) => (
                <Building
                    key={building.key}
                    position={building.position}
                    width={building.width}
                    height={building.height}
                    depth={building.depth}
                    layer={layer}
                />
            ))}
        </group>
    )
}

// Ground plane with subtle reflection
function GroundPlane() {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
            <planeGeometry args={[300, 300]} />
            <meshStandardMaterial
                color="#040406"
                roughness={0.85}
                metalness={0.15}
            />
        </mesh>
    )
}

// Atmospheric fog gradient
function AtmosphericFog() {
    return (
        <>
            {/* Near fog - darker */}
            <fog attach="fog" args={['#0a0a10', 5, 35]} />
        </>
    )
}

// Backlight glow behind distant buildings (light pollution)
function LightPollutionGlow() {
    return (
        <>
            {/* Warm glow behind skyline */}
            <mesh position={[0, 8, -50]}>
                <planeGeometry args={[200, 40]} />
                <meshBasicMaterial
                    color="#1a0f05"
                    transparent
                    opacity={0.4}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Subtle orange light from behind buildings */}
            <pointLight
                position={[0, 10, -40]}
                intensity={0.3}
                color="#ff6b35"
                distance={80}
                decay={2}
            />

            {/* Light pollution ambient */}
            <hemisphereLight
                intensity={0.05}
                groundColor="#0a0a10"
                color="#1a1015"
            />
        </>
    )
}

export default function City() {
    const groupRef = useRef()

    // Subtle breathing motion for entire city
    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.015
        }
    })

    return (
        <group ref={groupRef} position={[0, 0, -5]}>
            {/* Atmospheric effects */}
            <AtmosphericFog />
            <LightPollutionGlow />

            {/* Ground reference */}
            <GroundPlane />

            {/* 
        Three-layer parallax skyline
        Background layer - tallest, farthest, slowest parallax
      */}
            <BuildingLayer
                zOffset={-35}
                count={40}
                layer="back"
                parallaxMultiplier={0.3}
            />

            {/* Midground layer - medium height, medium distance */}
            <BuildingLayer
                zOffset={-20}
                count={35}
                layer="mid"
                parallaxMultiplier={0.6}
            />

            {/* Foreground layer - shorter, closest, fastest parallax */}
            <BuildingLayer
                zOffset={-8}
                count={25}
                layer="fore"
                parallaxMultiplier={1.0}
            />

            {/* Street-level warm lighting */}
            <pointLight
                position={[0, 2, 0]}
                intensity={0.2}
                color="#ffaa55"
                distance={20}
                decay={2}
            />

            {/* Subtle cold fill from above (night sky) */}
            <directionalLight
                position={[0, 30, 10]}
                intensity={0.05}
                color="#4466aa"
            />
        </group>
    )
}
