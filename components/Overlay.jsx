'use client'
import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Overlay Component
 * HTML layer on top of WebGL canvas for narrative text and UI.
 * Each act has its own section with scroll-triggered visibility.
 */

// Act I content - Before the Power
function ActOne({ isVisible }) {
    return (
        <section
            className={`act-section ${isVisible ? 'act-section--visible' : ''}`}
            data-act="1"
        >
            <div style={{ textAlign: 'center', maxWidth: '600px' }}>
                <p className="text-caption" style={{ marginBottom: '1rem' }}>ACT I</p>
                <h1 className="text-hero">Before the code.</h1>
                <h1 className="text-hero" style={{ marginBottom: '2rem' }}>Before the chaos.</h1>
                <p className="text-subtitle">Scroll to begin the journey</p>
            </div>
        </section>
    )
}

// Act II content - The Catalyst
function ActTwo({ isVisible }) {
    return (
        <section
            className={`act-section act-section--catalyst ${isVisible ? 'act-section--visible' : ''}`}
            data-act="2"
        >
            <div style={{ textAlign: 'center', maxWidth: '600px' }}>
                <p className="text-caption" style={{ marginBottom: '1rem', color: '#dc2626' }}>ACT II</p>
                <h1 className="text-hero glitch accent" data-text="The Catalyst">The Catalyst</h1>
                <p className="text-subtitle" style={{ marginTop: '2rem' }}>
                    A moment of transformation.
                </p>
            </div>
        </section>
    )
}

// Act III content - Learning the Power
function ActThree({ isVisible }) {
    return (
        <section
            className={`act-section ${isVisible ? 'act-section--visible' : ''}`}
            data-act="3"
        >
            <div style={{
                position: 'absolute',
                top: '10%',
                left: '5%',
                maxWidth: '300px'
            }}>
                <p className="text-caption" style={{ marginBottom: '1rem' }}>ACT III</p>
                <h2 className="text-title">Learning the Power</h2>
                <p className="text-body" style={{ marginTop: '1rem', color: '#888' }}>
                    Skills are not isolated. They connect, interweave, and strengthen each other.
                </p>
                <p className="text-body" style={{ marginTop: '1rem', color: '#666' }}>
                    Hover over the nodes to explore.
                </p>
            </div>
        </section>
    )
}

// Act IV content - Responsibility (Projects)
function ActFour({ isVisible }) {
    return (
        <section
            className={`act-section ${isVisible ? 'act-section--visible' : ''}`}
            data-act="4"
        >
            <div style={{
                position: 'absolute',
                bottom: '10%',
                right: '5%',
                maxWidth: '400px',
                textAlign: 'right'
            }}>
                <p className="text-caption" style={{ marginBottom: '1rem' }}>ACT IV</p>
                <h2 className="text-title">Responsibility</h2>
                <p className="text-body" style={{ marginTop: '1rem', color: '#888' }}>
                    Every project is a solution. Every solution carries weight.
                </p>
                <p className="text-body" style={{ marginTop: '1rem', color: '#666' }}>
                    Building with purpose, not just features.
                </p>
            </div>
        </section>
    )
}

// Act V content - The Choice
function ActFive({ isVisible }) {
    return (
        <section
            className={`act-section ${isVisible ? 'act-section--visible' : ''}`}
            data-act="5"
        >
            <div style={{ textAlign: 'center', maxWidth: '700px' }}>
                <p className="text-caption" style={{ marginBottom: '1rem' }}>ACT V</p>
                <h1 className="text-hero">The Choice</h1>
                <p className="text-subtitle" style={{ marginTop: '2rem', marginBottom: '3rem' }}>
                    With great power comes <span className="accent">great responsibility.</span>
                </p>
                <a
                    href="mailto:hello@example.com"
                    className="cta-button cta-button--accent"
                    style={{ pointerEvents: 'auto' }}
                >
                    Let&apos;s Connect
                </a>
            </div>
        </section>
    )
}

export default function Overlay() {
    const [currentAct, setCurrentAct] = useState(1)
    const overlayRef = useRef(null)

    useEffect(() => {
        // Define scroll ranges for each act
        const actRanges = [
            { act: 1, start: 0, end: 0.2 },
            { act: 2, start: 0.2, end: 0.35 },
            { act: 3, start: 0.35, end: 0.6 },
            { act: 4, start: 0.6, end: 0.8 },
            { act: 5, start: 0.8, end: 1 },
        ]

        // Create scroll trigger to update current act
        ScrollTrigger.create({
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            onUpdate: (self) => {
                const progress = self.progress
                const activeAct = actRanges.find(
                    range => progress >= range.start && progress < range.end
                )
                if (activeAct) {
                    setCurrentAct(activeAct.act)
                }
            },
        })

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        }
    }, [])

    return (
        <div className="overlay" ref={overlayRef}>
            <ActOne isVisible={currentAct === 1} />
            <ActTwo isVisible={currentAct === 2} />
            <ActThree isVisible={currentAct === 3} />
            <ActFour isVisible={currentAct === 4} />
            <ActFive isVisible={currentAct === 5} />
        </div>
    )
}
