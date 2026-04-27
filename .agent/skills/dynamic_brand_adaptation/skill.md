---
name: dynamic_brand_adaptation
description: Extrapolates unique design languages (color palettes, typography, UI layout elements) from a client's specific brand identity to ensure bespoke websites are not homogeneous.
---

# Dynamic Brand Adaptation Blueprint

## Core Philosophy
When generating new layouts, **never default to a single aesthetic** (unless explicitly requested). This architecture requires treating each UI as an artisanal, high-end reflection of the specific client's niche.

## Execution Rules
1.  **Extract Context:** Read the user's prompt or the target client's industry to deduce mood, target demographic, and professional tone.
2.  **Color Palette Theory:**
    *   *Corporate/B2B:* Use stark monochromatic bases (slate/charcoal) with singular, highly contrasting accents (sapphire, emerald) as "Institutional Quiet."
    *   *Wellness/Luxury:* Utilize softer light themes or rich, deep tones with smooth gradients (rose-gold, muted lavender, warm taupe).
    *   *Tech/Contractors:* Rely on dark-mode bases (pitch black/deep navy) accompanied by high-luminance neon outlines (electric cyan, amber).
3.  **Typography Selection:** Never use default browser fonts. Match Google Fonts typography to the brand context. Ensure modern kerning and weights.
    *   *Technical:* `JetBrains Mono`, `Roboto Mono`, `Fira Code`.
    *   *Editorial/Luxury:* `Playfair Display`, `Cormorant Garamond`, `Lora`.
    *   *Modern/SaaS:* `Inter`, `Outfit`, `Poppins`, `Manrope`.
4.  **UI Component Rules:**
    *   Apply Glassmorphism (`backdrop-filter: blur(10px); background: rgba(...)`) strategically against rich backgrounds, but do not overuse it if the brand dictates Flat Design or Neo-Brutalism.
    *   Maintain robust padding (`padding: 2rem;`) for breathable interfaces.
