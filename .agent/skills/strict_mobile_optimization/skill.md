---
name: strict_mobile_optimization
description: Enforces bulletproof mobile-first design rules, viewport scaling constraints, touch-target sizing, and responsive reflows for all generated web components.
---

# Strict Mobile Optimization Blueprint

## Core Philosophy
Mobile users make up >70% of traffic. A site that looks broken or behaves unpredictably on an iPhone or Android device instantly kills conversion. Mobile optimization is not an afterthought; it is the default state.

## Execution Rules
1.  **Viewport Constraints (Anti-Zoom):**
    *   **Always** include this tag exactly in the `<head>` of any generated HTML:
    *   `<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">`
    *   *Why?* This prevents iOS Safari from automatically zooming into the screen when a user taps an input field or dropdown, which breaks the layout and requires the user to pinch-to-zoom back out.
2.  **Touch Targets:**
    *   Any actionable element (buttons, links, form inputs, checkboxes) must have a minimum clickable area of 44x44 CSS pixels.
    *   Apply padding to links `<a style="padding: 12px 16px;">` rather than just sizing the text.
3.  **Responsive Reflows (No Horizontal Scroll):**
    *   Ensure `overflow-x: hidden;` is applied to the `body` or main wrapper to prevent accidental horizontal scrolling caused by animations or padding pushing out of bounding boxes.
    *   Tables or matrices that cannot compress natively must be wrapped in a container that allows specific `overflow-x: auto` scrolling while the rest of the page remains fixed.
4.  **Hover States on Mobile:**
    *   Be aware that `:hover` states get "stuck" on mobile tap. Use media queries (`@media (hover: hover)`) to ensure hover animations are only applied on cursor-enabled devices.
