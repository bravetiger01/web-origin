'use client'
import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function CameraRig() {
  const { camera } = useThree()

  useEffect(() => {
    gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    })
    .to(camera.position, { z: 6 })   // intro
    .to(camera.position, { y: 4, z: 3 }) // power moment
    .to(camera.position, { y: 1, z: 8 }) // calm ending
  }, [])

  return null
}
