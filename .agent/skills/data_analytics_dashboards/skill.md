---
name: data_analytics_dashboards
description: A blueprint for structuring secure, data-rich portals, teaching the agent how to build interactive UI matrices and integrate visual chart processing logic similar to advanced bespoke platforms.
---

# Data Analytics Dashboards Blueprint

## Core Philosophy
When generating portals that present complex data, the UI must translate dense information into immediate, actionable insights. An excellent portal uses distinct visualization states, matrix layouts, and interactive visual feedback logic.

## Execution Rules
1.  **Component Structure (The Matrix Method):**
    *   Do not stack data vertically in endless unwieldy lists. Use CSS CSS-grid matrices (`d-grid`, `grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))`) to build high-level KPI cards at the top.
    *   Below the KPIs, split the view into primary charting (e.g., Line/Bar charts) and secondary actionable lists (e.g., recent transactions or alerts).
2.  **Visual Processing Integration:**
    *   *Charts:* Assume Chart.js or D3.js structure when rendering graphical data. Define empty `<canvas id="analytics-chart"></canvas>` elements and supply placeholder JS configuration blocks to bootstrap the chart instantiation.
    *   *Interactive Matrices:* If building specific tracking visualizers (e.g., asset statuses or complex human-performance layouts), construct layered CSS grid representations mimicking specific SVG map feedback (color-coding regions based on data state: Active=Cyan, Inactive=Slate, Alert=Amber).
3.  **Data Handling Structure:**
    *   Do not hardcode massive datasets into the HTML. Build clean Javascript wrapper functions (e.g., `async function fetchDashboardData() {...}`) that update the DOM dynamically, making it easy to wire into a backend later.
