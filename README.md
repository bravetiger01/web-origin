# 🕷️ WITH GREAT POWER  
### A Cinematic WebGL Origin Story (Portfolio Experience)

> “With great power comes great responsibility.”

**WITH GREAT POWER** is an experimental, scroll-driven WebGL website that blends  
**cinematic storytelling, interactive 3D, and personal narrative** into a single continuous experience.

This is **not a fan site** and **not a traditional portfolio**.  
It is an **origin story** — told through motion, space, and interaction.

---

## 🎯 Purpose

The goal of this project is to:
- Showcase advanced **WebGL + frontend engineering**
- Demonstrate **UX storytelling**, not just visuals
- Replace static portfolio sections with a **narrative journey**
- Create a memorable experience that reflects **how I think**, not just what I build

---

## 🧠 Core Philosophy

- **Scroll = Camera Movement**
- **3D = Mood & Symbolism**
- **Text = Meaning**
- **UI = Minimal & Intentional**

Everything exists to serve the story — not to show off effects.

---

## 🎬 Narrative Structure (Acts)

The entire website is a **single continuous scroll-based scene**, divided into story “acts”.

---

### 🟥 ACT I — Before the Power (Introduction)

**Theme:** Normalcy  
**Mood:** Calm, grounded, quiet

- Subtle 3D city environment
- Minimal motion
- Slow camera push-in
- Clean typography

**Message:**  
> “Before the code.  
> Before the chaos.”

Purpose:
- Establish atmosphere
- Ease the user into the experience
- Set contrast for what comes next

---

### ⚡ ACT II — The Catalyst (The Bite)

**Theme:** Transformation  
**Mood:** Sudden, disruptive, intense

- Visual distortion / glitch
- Camera snap or rotation
- Red accent lighting
- First appearance of web-like geometry

This is the **signature moment** of the site.

Purpose:
- Mark the turning point
- Show control over timing, motion, and impact
- Transition from passive viewing to active experience

---

### 🕸️ ACT III — Learning the Power (Skills as a Web)

**Theme:** Growth & mastery  
**Mood:** Dynamic, interconnected

- Skills represented as **nodes**
- Connections represented as **web strands**
- Hover interactions cause subtle vibration
- Clicking a node zooms into a micro-focus

Each skill node represents:
- Web Development
- AI / ML
- Flutter
- IoT
- System Design

Purpose:
- Replace boring skill lists
- Visualize interconnected thinking
- Show abstraction and data-visualization mindset

---

### 🌆 ACT IV — Responsibility (Projects)

**Theme:** Impact  
**Mood:** Purposeful, grounded

- City zones represent real-world problems
- Each project “activates” a dark area
- Light spreads when a project is explored
- Project details appear as clean HTML overlays

Projects are framed as **solutions**, not features.

Purpose:
- Show real-world relevance
- Demonstrate problem-first thinking
- Blend narrative with portfolio content

---

### 🏁 ACT V — The Choice (Conclusion)

**Theme:** Clarity  
**Mood:** Minimal, calm, resolved

- Reduced motion
- Light background
- Strong typography
- One clear call-to-action

Final message reinforces responsibility and intent.

---

## 🛠️ Technical Stack

### Core
- **Next.js (App Router)**
- **React Three Fiber**
- **Three.js**
- **@react-three/drei**

### Animation & Scroll
- **GSAP**
- **ScrollTrigger**
- **Lenis (smooth scrolling)**

### Styling
- CSS / Tailwind (TBD)
- Strong typographic hierarchy
- Minimal color palette (black, white, red accent)

---

## 🧱 Architecture Overview

src/
├─ app/
│ ├─ page.jsx # Entry point
│ └─ layout.jsx
├─ components/
│ ├─ CanvasScene.jsx # Main WebGL canvas
│ ├─ CameraRig.jsx # Scroll-controlled camera
│ ├─ ScrollManager.jsx
│ └─ Overlay.jsx # HTML text/UI overlays
├─ scenes/
│ ├─ City.jsx # Act I
│ ├─ WebMoment.jsx # Act II
│ ├─ SkillWeb.jsx # Act III
│ └─ Finale.jsx # Act V
└─ styles/
    └─ global.css



---

## 🎥 Camera & Interaction Rules

- Camera movement is **never random**
- Every motion has narrative intent
- No unnecessary orbit controls
- Scroll always feels smooth and weighted

---

## ⚠️ Design Constraints

To keep the experience mature and professional:

- No full character modeling
- No explicit branding or copyrighted names
- Use silhouettes, shadows, abstractions
- Prioritize **performance over detail**

---

## 🚀 Current Status

- [ ] Project setup
- [ ] Base WebGL scene
- [ ] Scroll-controlled camera
- [ ] City environment
- [ ] Transformation moment
- [ ] Skill web system
- [ ] Project interaction layer
- [ ] Final polish & optimization

---

## 🧭 Future Enhancements (Optional)

- Subtle sound design
- Custom GLSL shaders
- WebGPU experimentation
- Accessibility-friendly fallback mode

---

## 🧠 Final Note

This project is not about superheroes.

It is about:
- Responsibility
- Growth
- Using technology with intent

**With great power comes great responsibility.**

