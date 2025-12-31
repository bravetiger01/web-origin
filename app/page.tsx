'use client'

import dynamic from 'next/dynamic'
import ScrollManager from '../components/ScrollManager'
import Overlay from '../components/Overlay'

/**
 * Main Page Component
 * 
 * Composes the cinematic WebGL experience:
 * - ScrollManager: Handles Lenis smooth scrolling
 * - CanvasScene: Fixed WebGL canvas with all 3D scenes
 * - Overlay: HTML layer for narrative text
 * - Scroll container: Creates scrollable area to drive camera
 * 
 * Note: CanvasScene is dynamically imported with SSR disabled
 * because React Three Fiber requires browser APIs.
 */

// Dynamic import to prevent SSR issues with Three.js
const CanvasScene = dynamic(
  () => import('../components/CanvasScene'),
  {
    ssr: false,
    loading: () => (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontFamily: 'var(--font-geist-sans)',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontSize: '0.75rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#666',
            marginBottom: '1rem'
          }}>
            Loading
          </div>
          <div style={{
            width: '40px',
            height: '2px',
            background: '#dc2626',
            margin: '0 auto',
            animation: 'pulse 1.5s ease-in-out infinite',
          }} />
        </div>
      </div>
    )
  }
)

export default function Home() {
  return (
    <ScrollManager>
      {/* Fixed WebGL canvas */}
      <CanvasScene />

      {/* HTML overlay for text and UI */}
      <Overlay />

      {/* 
        Scroll container - empty div that creates scrollable area
        Height of 500vh creates scroll distance for 5 acts
        Each act is roughly 100vh of scroll
      */}
      <div className="scroll-container" aria-hidden="true" />
    </ScrollManager>
  )
}
