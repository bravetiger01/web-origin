'use client'
import { useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'

/**
 * SkillWeb Scene - ACT III: Learning the Power
 * 
 * Skills as interconnected nodes in a web structure.
 * Positioned at rooftop level to integrate with city environment.
 */

// Skill data
const SKILLS = [
    { id: 'web', label: 'Web Development', position: [0, 10, 0], color: '#dc2626' },
    { id: 'ai', label: 'AI / ML', position: [4, 8.5, 1.5], color: '#dc2626' },
    { id: 'flutter', label: 'Flutter', position: [-4, 8.5, 1.5], color: '#dc2626' },
    { id: 'iot', label: 'IoT', position: [2.5, 6.5, -1], color: '#dc2626' },
    { id: 'system', label: 'System Design', position: [-2.5, 6.5, -1], color: '#dc2626' },
]

// Connections
const CONNECTIONS = [
    ['web', 'ai'],
    ['web', 'flutter'],
    ['web', 'iot'],
    ['web', 'system'],
    ['ai', 'iot'],
    ['ai', 'system'],
    ['flutter', 'iot'],
    ['flutter', 'system'],
    ['system', 'iot'],
]

function SkillNode({ skill, onHover, onUnhover, onClick, isHovered }) {
    const meshRef = useRef()
    const [localHover, setLocalHover] = useState(false)
    const active = isHovered || localHover

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.position.y = skill.position[1] +
                Math.sin(state.clock.elapsedTime * 1.5 + skill.position[0]) * 0.05

            if (active) {
                meshRef.current.position.x = skill.position[0] + (Math.random() - 0.5) * 0.03
                meshRef.current.scale.setScalar(1.2)
            } else {
                meshRef.current.position.x = skill.position[0]
                meshRef.current.scale.setScalar(1)
            }
        }
    })

    return (
        <group position={skill.position}>
            <mesh
                ref={meshRef}
                onPointerEnter={(e) => {
                    e.stopPropagation()
                    setLocalHover(true)
                    onHover?.(skill.id)
                    document.body.style.cursor = 'pointer'
                }}
                onPointerLeave={(e) => {
                    e.stopPropagation()
                    setLocalHover(false)
                    onUnhover?.()
                    document.body.style.cursor = 'auto'
                }}
                onClick={(e) => {
                    e.stopPropagation()
                    onClick?.(skill.id)
                }}
            >
                <octahedronGeometry args={[0.25, 0]} />
                <meshStandardMaterial
                    color={active ? '#dc2626' : '#ffffff'}
                    emissive={active ? '#dc2626' : '#ffaa55'}
                    emissiveIntensity={active ? 0.6 : 0.1}
                    roughness={0.3}
                    metalness={0.6}
                />
            </mesh>

            <Html position={[0, 0.7, 0]} center style={{ pointerEvents: 'none' }}>
                <div style={{
                    background: 'rgba(5, 5, 15, 0.9)',
                    color: active ? '#dc2626' : '#ffffff',
                    padding: '6px 12px',
                    fontSize: '10px',
                    fontWeight: '600',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    border: `1px solid ${active ? '#dc2626' : '#333'}`,
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s ease',
                }}>
                    {skill.label}
                </div>
            </Html>
        </group>
    )
}

function WebStrand({ startPos, endPos, isActive }) {
    const points = useMemo(() => {
        const start = new THREE.Vector3(...startPos)
        const end = new THREE.Vector3(...endPos)
        const mid = new THREE.Vector3().lerpVectors(start, end, 0.5)
        mid.y -= start.distanceTo(end) * 0.12
        const curve = new THREE.QuadraticBezierCurve3(start, mid, end)
        return curve.getPoints(16)
    }, [startPos, endPos])

    return (
        <line>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={points.length}
                    array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
                    itemSize={3}
                />
            </bufferGeometry>
            <lineBasicMaterial
                color={isActive ? '#dc2626' : '#444'}
                transparent
                opacity={isActive ? 0.8 : 0.35}
                fog={true}
            />
        </line>
    )
}

export default function SkillWeb() {
    const groupRef = useRef()
    const [hoveredSkill, setHoveredSkill] = useState(null)

    const positionsMap = useMemo(() => {
        return SKILLS.reduce((acc, skill) => {
            acc[skill.id] = skill.position
            return acc
        }, {})
    }, [])

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.12) * 0.1
        }
    })

    const isConnectionActive = (conn) => {
        return hoveredSkill && (conn[0] === hoveredSkill || conn[1] === hoveredSkill)
    }

    return (
        <group ref={groupRef} position={[0, 0, 0]}>
            {SKILLS.map((skill) => (
                <SkillNode
                    key={skill.id}
                    skill={skill}
                    onHover={(id) => setHoveredSkill(id)}
                    onUnhover={() => setHoveredSkill(null)}
                    onClick={() => { }}
                    isHovered={hoveredSkill === skill.id}
                />
            ))}

            {CONNECTIONS.map(([start, end]) => (
                <WebStrand
                    key={`${start}-${end}`}
                    startPos={positionsMap[start]}
                    endPos={positionsMap[end]}
                    isActive={isConnectionActive([start, end])}
                />
            ))}

            {/* Warm accent light */}
            <pointLight position={[0, 10, 3]} intensity={0.3} color="#ffaa55" distance={15} />
        </group>
    )
}
