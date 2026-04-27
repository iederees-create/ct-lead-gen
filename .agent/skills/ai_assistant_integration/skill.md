---
name: ai_assistant_integration
description: A blueprint detailing the required architecture, UI formatting, and connection logic for injecting customized LLM chatbots seamlessly into user portals or ecosystem applications.
---

# AI Assistant Integration Blueprint

## Core Philosophy
Modern SaaS platforms and portals require embedded intelligence. When adding an AI Chatbot to a project, it must feel deeply native to the platform's individual brand and architecture, operating from a non-intrusive sliding drawer or floating panel. We must maintain absolute brand separation; the bot adapts to the current project, it does not carry over identities from past projects.

## Execution Rules
1.  **Structural Positioning:**
    *   Do not overtake the main page content. The AI assistant should default to a fixed floating activation button (e.g., in the bottom-right corner).
    *   Upon click, it should trigger a sliding drawer (`transform: translateX(100%);` transitioning to `translateX(0);`) or a neat, glassmorphic floating popover.
2.  **UI/UX Design Patterns:**
    *   *Message Bubbles:* User messages aligned right, bot messages aligned left.
    *   *Aesthetics:* Inherit the exact color palette and typography of the *current* project. Subtly distinct background colors should differentiate the bot's messages from the user's messages.
    *   *Input:* Include a sleek input field fixed to the bottom of the drawer, with an icon-based submit button. Disable the input state during `Loading...` states.
3.  **Logical Architecture (Front-End):**
    *   Construct the Javascript necessary to handle DOM insertion of new messages dynamically.
    *   Include a `fetch` wrapper designed to ping a generic LLM API backend (`/api/chat` or similar), passing the conversation history array.
4.  **System Prompts & Constraints (Training):**
    *   Always isolate the bot's "training data" (System Prompt) into a dedicated constant at the top of the logic block.
    *   Format the system prompt so the user can easily define constraints (e.g., `const SYSTEM_PROMPT = "You are the specialist assistant for [BRAND_NAME]..."`).
