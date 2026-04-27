---
name: auth_flow_architecture
description: Teaches the agent the standardized, high-end design patterns and structural logic for Login, Signup, and Forgot Password authentication flows.
---

# Authentication Flow Architecture Blueprint

## Core Philosophy
User authentication is the gateway to value. Poorly designed auth screens look cheap and untrustworthy. Every sign-in or registration interface must project ironclad security, institutional cleanliness, and frictionless usability.

## Execution Rules
1.  **Split-Screen Layouts for Desktop:** 
    *   Auth views should generally utilize a 50/50 or 40/60 split-screen on desktop.
    *   One half contains the clean auth form against a stark background.
    *   The other half contains a brand-relevant context image, value proposition, or a subtle CSS-animated brand logo (e.g., rotating 3D vector or glowing gradient mesh).
2.  **Input Field Best Practices:**
    *   Floating labels or clean inline placeholders.
    *   Distinct focus states (`:focus-within`) that change the border color to the brand accent color.
    *   Implement "eye" toggle icons for password visibility.
3.  **Validation & Security Signals:**
    *   Live password strength validation indicators (bars or icons) as the user types.
    *   Clear, inline error messaging (red/amber) below the input, rather than jarring browser alert pop-ups.
4.  **Backend Integration Prep:**
    *   Structure the HTML `id` attributes logically (`id="auth-email"`, `id="auth-password"`, `id="auth-submit"`).
    *   Assume BaaS (Supabase/Firebase) connections unless a custom API route is specified by the user.

## Forgot Password Flow
*   Must be a simplified single-input screen.
*   Must include a clear "Back to Login" text link.
