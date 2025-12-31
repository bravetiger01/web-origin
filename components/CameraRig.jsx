'use client'
import { useThree, useFrame } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'

gsap.registerPlugin(ScrollTrigger)

/**
 * CameraRig Component
 * Controls camera position and rotation based on scroll progress.
 * 
 * ACT BREAKDOWN (scroll percentages):
 * - ACT I   (0-20%):   Before the Power - Slow push through city
 * - ACT II  (20-35%):  The Catalyst - Transformation moment
 * - ACT III (35-60%):  Learning the Power - Skill web exploration
 * - ACT IV  (60-80%):  Responsibility - Project zones
 * - ACT V   (80-100%): The Choice - Resolution & outro
 */
export default function CameraRig() {
    const { camera } = useThree()
    const timelineRef = useRef(null)

    useEffect(() => {
        // Store initial camera state
        const initialPosition = { x: 0, y: 2, z: 15 }

        // Set initial camera position
        camera.position.set(initialPosition.x, initialPosition.y, initialPosition.z)
        camera.lookAt(0, 0, 0)

        // Create master timeline for camera movement
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: document.body,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1.5, // Smooth scrubbing
            },
        })

        // ACT I: Before the Power (0% - 20%)
        // Slow, calm push-in through the city
        tl.to(camera.position, {
            x: 0,
            y: 3,
            z: 8,
            duration: 0.2,
            ease: 'power1.inOut',
        }, 0)

        // ACT II: The Catalyst (20% - 35%)
        // Quick camera rotation and position snap - the "bite" moment
        tl.to(camera.position, {
            x: 0,
            y: 0,
            z: 5,
            duration: 0.15,
            ease: 'power3.in',
        }, 0.2)

        // Add subtle camera shake for transformation effect
        tl.to(camera.rotation, {
            z: Math.PI * 0.02,
            duration: 0.05,
            ease: 'power2.inOut',
        }, 0.25)

        tl.to(camera.rotation, {
            z: -Math.PI * 0.02,
            duration: 0.05,
            ease: 'power2.inOut',
        }, 0.30)

        tl.to(camera.rotation, {
            z: 0,
            duration: 0.05,
            ease: 'power2.out',
        }, 0.35)

        // ACT III: Learning the Power (35% - 60%)
        // Pan across the skill web
        tl.to(camera.position, {
            x: 0,
            y: 1,
            z: 10,
            duration: 0.25,
            ease: 'power2.out',
        }, 0.35)

        // ACT IV: Responsibility - Projects (60% - 80%)
        // Elevated view of project zones
        tl.to(camera.position, {
            x: 0,
            y: 5,
            z: 12,
            duration: 0.2,
            ease: 'power2.inOut',
        }, 0.6)

        // ACT V: The Choice (80% - 100%)
        // Pull back to calm, resolved position
        tl.to(camera.position, {
            x: 0,
            y: 2,
            z: 20,
            duration: 0.2,
            ease: 'power1.out',
        }, 0.8)

        timelineRef.current = tl

        // Cleanup
        return () => {
            if (timelineRef.current) {
                timelineRef.current.kill()
            }
            ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        }
    }, [camera])

    // Keep camera looking at center with smooth interpolation
    useFrame(() => {
        camera.lookAt(0, 0, 0)
    })

    return null
}
