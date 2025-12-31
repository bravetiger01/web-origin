'use client'
import { useEffect, useRef, createContext, useContext, useState } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

/**
 * ScrollContext provides scroll progress (0-1) to child components
 * This allows scenes and overlays to react to scroll position
 */
const ScrollContext = createContext({
    progress: 0,
    lenis: null,
})

export const useScroll = () => useContext(ScrollContext)

/**
 * ScrollManager Component
 * - Initializes Lenis for smooth scrolling
 * - Connects Lenis to GSAP ScrollTrigger
 * - Provides scroll progress via context
 */
export default function ScrollManager({ children }) {
    const [progress, setProgress] = useState(0)
    const lenisRef = useRef(null)

    useEffect(() => {
        // Initialize Lenis smooth scrolling
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        })

        lenisRef.current = lenis

        // Connect Lenis to GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update)

        // Add Lenis's requestAnimationFrame to GSAP's ticker
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000)
        })

        // Disable GSAP's built-in lag smoothing to prevent conflicts
        gsap.ticker.lagSmoothing(0)

        // Create a global scroll progress tracker
        ScrollTrigger.create({
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            onUpdate: (self) => {
                setProgress(self.progress)
            },
        })

        // Cleanup
        return () => {
            lenis.destroy()
            gsap.ticker.remove(lenis.raf)
            ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        }
    }, [])

    return (
        <ScrollContext.Provider value={{ progress, lenis: lenisRef.current }}>
            {children}
        </ScrollContext.Provider>
    )
}
