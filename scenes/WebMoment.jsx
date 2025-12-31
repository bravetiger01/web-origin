'use client'
import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * WebMoment Scene - ACT II: The Catalyst
 * 
 * Spider-web anchored to the city skyline.
 * Web strands fade into fog/buildings, not floating in empty space.
 * Red accent lighting for transformation moment.
 */

// Spider web structure anchored at rooftop height
function SpiderWeb({ anchorHeight = 8, radius = 6, radialLines = 18, spiralRings = 14 }) {
    const webRef = useRef()

    const { radialPoints, spiralPoints } = useMemo(() => {
        const radial = []
        const spiral = []

        // Radial lines from center outward - anchored at building height
        for (let i = 0; i < radialLines; i++) {
            const angle = (i / radialLines) * Math.PI * 2

            // Calculate end position with some going toward buildings
            const endRadius = radius + (Math.sin(angle * 3) * 0.5)
            const endY = (Math.cos(angle) * 0.3) + (Math.random() * 0.2) // Slight vertical variation

            // Some strands extend toward buildings (fade into distance)
            const endZ = Math.sin(angle) * endRadius * 0.4 - radius * 0.3

            radial.push({
                start: [0, anchorHeight, 0],
                end: [
                    Math.cos(angle) * endRadius,
                    anchorHeight + endY,
                    endZ,
                ],
                opacity: 0.6 + Math.abs(Math.sin(angle)) * 0.3, // Vary opacity for depth
                key: `radial-${i}`,
            })
        }

        // Spiral rings connecting radials
        for (let ring = 2; ring <= spiralRings; ring++) {
            const ringRadius = (ring / spiralRings) * radius
            const ringHeight = anchorHeight + (ring / spiralRings) * 0.3 // Slight upward curve

            for (let i = 0; i < radialLines; i++) {
                const angle1 = (i / radialLines) * Math.PI * 2
                const angle2 = ((i + 1) / radialLines) * Math.PI * 2

                // Add organic irregularity
                const offset1 = Math.sin(ring + i) * 0.1
                const offset2 = Math.cos(ring + i + 1) * 0.1

                const r1 = ringRadius + offset1
                const r2 = ringRadius + offset2

                spiral.push({
                    start: [
                        Math.cos(angle1) * r1,
                        ringHeight + Math.sin(angle1) * 0.2,
                        Math.sin(angle1) * r1 * 0.4,
                    ],
                    end: [
                        Math.cos(angle2) * r2,
                        ringHeight + Math.sin(angle2) * 0.2,
                        Math.sin(angle2) * r2 * 0.4,
                    ],
                    opacity: 0.3 + (ring / spiralRings) * 0.4, // Fade toward edges
                    key: `spiral-${ring}-${i}`,
                })
            }
        }

        return { radialPoints: radial, spiralPoints: spiral }
    }, [anchorHeight, radius, radialLines, spiralRings])

    // Web animation
    useFrame((state) => {
        if (webRef.current) {
            // Gentle rotation
            webRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
            // Subtle breathing
            const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.01
            webRef.current.scale.setScalar(pulse)
        }
    })

    return (
        <group ref={webRef}>
            {radialPoints.map((line) => (
                <WebStrand
                    key={line.key}
                    start={line.start}
                    end={line.end}
                    isRadial
                    opacity={line.opacity}
                />
            ))}
            {spiralPoints.map((line) => (
                <WebStrand
                    key={line.key}
                    start={line.start}
                    end={line.end}
                    opacity={line.opacity}
                />
            ))}
        </group>
    )
}

// Individual web strand with fog fade
function WebStrand({ start, end, isRadial = false, opacity = 0.7 }) {
    const lineRef = useRef()

    const points = useMemo(() => [
        new THREE.Vector3(...start),
        new THREE.Vector3(...end),
    ], [start, end])

    // Subtle shimmer effect
    useFrame((state) => {
        if (lineRef.current) {
            const shimmer = opacity * (0.9 + Math.sin(state.clock.elapsedTime * 3 + start[0]) * 0.1)
            lineRef.current.material.opacity = shimmer
        }
    })

    return (
        <line ref={lineRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={points.length}
                    array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
                    itemSize={3}
                />
            </bufferGeometry>
            <lineBasicMaterial
                color={isRadial ? '#ffffff' : '#dc2626'}
                transparent
                opacity={opacity}
                fog={true} // Allow fog to affect strands
            />
        </line>
    )
}

// Central energy point - the transformation nexus
function WebCenter({ height = 8 }) {
    const coreRef = useRef()
    const ringsRef = useRef()

    useFrame((state) => {
        if (coreRef.current) {
            const pulse = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.2
            coreRef.current.scale.setScalar(pulse)
        }
        if (ringsRef.current) {
            ringsRef.current.rotation.z = state.clock.elapsedTime * 1.5
        }
    })

    return (
        <group position={[0, height, 0]}>
            {/* Glowing core */}
            <mesh ref={coreRef}>
                <sphereGeometry args={[0.12, 24, 24]} />
                <meshBasicMaterial color="#dc2626" />
            </mesh>

            {/* Energy rings */}
            <group ref={ringsRef}>
                {[0.25, 0.4, 0.55].map((r, i) => (
                    <mesh key={i} rotation={[Math.PI / 2, 0, (i * Math.PI) / 4]}>
                        <torusGeometry args={[r, 0.008, 8, 32]} />
                        <meshBasicMaterial
                            color="#dc2626"
                            transparent
                            opacity={0.6 - i * 0.15}
                        />
                    </mesh>
                ))}
            </group>

            {/* Ambient glow */}
            <pointLight
                position={[0, 0, 0]}
                intensity={2}
                color="#dc2626"
                distance={15}
                decay={2}
            />
        </group>
    )
}

// Anchor strands connecting web to buildings
function AnchorStrands({ anchorHeight = 8 }) {
    const strandsRef = useRef()

    const strands = useMemo(() => {
        const result = []
        // Create strands that appear to connect to distant buildings
        const anchorPoints = [
            { target: [-15, 4, -12], opacity: 0.3 },
            { target: [18, 6, -15], opacity: 0.25 },
            { target: [-10, 5, -18], opacity: 0.2 },
            { target: [12, 3, -10], opacity: 0.35 },
            { target: [0, 10, -25], opacity: 0.15 },
        ]

        anchorPoints.forEach((anchor, i) => {
            result.push({
                start: [0, anchorHeight, 0],
                end: anchor.target,
                opacity: anchor.opacity,
                key: `anchor-${i}`,
            })
        })

        return result
    }, [anchorHeight])

    useFrame((state) => {
        if (strandsRef.current) {
            // Very subtle sway
            strandsRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.05
        }
    })

    return (
        <group ref={strandsRef}>
            {strands.map((strand) => (
                <line key={strand.key}>
                    <bufferGeometry>
                        <bufferAttribute
                            attach="attributes-position"
                            count={2}
                            array={new Float32Array([...strand.start, ...strand.end])}
                            itemSize={3}
                        />
                    </bufferGeometry>
                    <lineBasicMaterial
                        color="#dc2626"
                        transparent
                        opacity={strand.opacity}
                        fog={true}
                    />
                </line>
            ))}
        </group>
    )
}

export default function WebMoment() {
    const groupRef = useRef()
    const anchorHeight = 8 // Rooftop height for web anchor

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
        }
    })

    return (
        <group ref={groupRef} position={[0, 0, 0]}>
            {/* Main spider web structure */}
            <SpiderWeb anchorHeight={anchorHeight} radius={5} radialLines={20} spiralRings={12} />

            {/* Central transformation point */}
            <WebCenter height={anchorHeight} />

            {/* Strands connecting to distant buildings */}
            <AnchorStrands anchorHeight={anchorHeight} />
        </group>
    )
}
