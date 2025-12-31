'use client'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

/**
 * Finale Scene - ACT V: The Choice
 * 
 * Minimal, calm resolution above the city.
 * Clean geometry with warm lighting representing clarity.
 */

function ClarityShape() {
    const meshRef = useRef()

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.08
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.1
            meshRef.current.position.y = 12 + Math.sin(state.clock.elapsedTime * 0.4) * 0.1
        }
    })

    return (
        <mesh ref={meshRef} position={[0, 12, 5]}>
            <octahedronGeometry args={[0.6, 0]} />
            <meshStandardMaterial
                color="#ffffff"
                emissive="#ffaa55"
                emissiveIntensity={0.1}
                roughness={0.15}
                metalness={0.85}
                transparent
                opacity={0.9}
            />
        </mesh>
    )
}

function ResolutionRing() {
    const ringRef = useRef()

    useFrame((state) => {
        if (ringRef.current) {
            ringRef.current.rotation.z = state.clock.elapsedTime * 0.08
        }
    })

    return (
        <mesh ref={ringRef} position={[0, 12, 5]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.5, 0.015, 16, 64]} />
            <meshBasicMaterial color="#dc2626" transparent opacity={0.4} />
        </mesh>
    )
}

function AmbientParticles() {
    const pointsRef = useRef()

    const particleCount = 60
    const positions = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos((Math.random() * 2) - 1)
        const radius = 4 + Math.random() * 8

        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
        positions[i * 3 + 1] = 12 + radius * Math.sin(phi) * Math.sin(theta) * 0.5
        positions[i * 3 + 2] = 5 + radius * Math.cos(phi) * 0.5
    }

    useFrame((state) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y = state.clock.elapsedTime * 0.015
        }
    })

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particleCount}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.04}
                color="#ffaa55"
                transparent
                opacity={0.4}
                sizeAttenuation
                fog={true}
            />
        </points>
    )
}

export default function Finale() {
    return (
        <group position={[0, 0, 0]}>
            <ClarityShape />
            <ResolutionRing />
            <AmbientParticles />

            {/* Warm resolution light */}
            <pointLight
                position={[0, 12, 5]}
                intensity={0.5}
                color="#ffaa55"
                distance={15}
                decay={2}
            />
        </group>
    )
}
