import { Box, Fog } from '@react-three/drei'

export default function City() {
  return (
    <>
      <fog attach="fog" args={['#0a0a0a', 5, 20]} />
      {Array.from({ length: 40 }).map((_, i) => (
        <Box
          key={i}
          position={[
            (Math.random() - 0.5) * 20,
            Math.random() * 3,
            (Math.random() - 0.5) * 20
          ]}
          scale={[1, Math.random() * 5 + 1, 1]}
        >
          <meshStandardMaterial color="#111" />
        </Box>
      ))}
    </>
  )
}
