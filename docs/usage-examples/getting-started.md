# Getting Started with Octto

This guide covers the fundamentals of using octto effectively, from basic setup to understanding the interactive workflow.

## What is Octto?

Octto is an OpenCode plugin that transforms AI brainstorming from terminal typing to browser-based clicking. Instead of typing back-and-forth with an AI, you:

- **See all questions at once** in a visual interface
- **Answer in any order** by clicking options
- **Explore multiple approaches** in parallel branches
- **Get a structured design document** as output

**Result**: 10 minutes of terminal typing → 2 minutes of clicking

## Basic Setup

### 1. Installation

Add octto to your OpenCode configuration:

```jsonc
// ~/.config/opencode/opencode.jsonc
{
  "plugin": [
    "@opencode-ai/plugin@latest",
    "octto"
  ]
}
```

### 2. Configuration (Optional)

Create `~/.config/opencode/octto.json` for customization:

```json
{
  "port": 0,
  "timeouts": {
    "answer": 0,
    "review": 0
  },
  "agents": {
    "octto": {
      "model": "opencode-go/deepseek-v4-flash",
      "variant": "max",
      "temperature": 0.7
    }
  }
}
```

### 3. Start Using

Simply select the **octto** agent in OpenCode and make your request.

## Your First Session

### Step 1: Make a Request

Start with a clear, specific request:

```
I want to add a caching layer to the API
```

### Step 2: Browser UI Opens

A browser window will open showing:
- **2-4 parallel exploration branches** (different approaches)
- **Initial questions** for each branch
- **Progress indicator** showing overall completion

### Step 3: Answer Questions

- **Click options** instead of typing
- **Answer in any order** - no need to follow a sequence
- **See follow-ups appear** as you answer previous questions
- **Change answers** if you want to explore different paths

### Step 4: Review the Plan

Once all branches complete:
- **Review the final design document**
- **See the synthesis of all approaches**
- **Approve or request changes**

### Step 5: Save the Output

The design document is saved to:
```
thoughts/shared/designs/YYYY-MM-DD-{topic}-design.md
```

## Understanding the Workflow

### The Three-Agent System

Octto uses specialized agents for different tasks:

| Agent | Role | Temperature |
|-------|------|-------------|
| **bootstrapper** | Creates initial exploration branches | 0.5 (balanced) |
| **probe** | Generates follow-up questions based on context | 0.5 (balanced) |
| **octto** | Orchestrates the entire session | 0.7 (creative) |

### Parallel Exploration

Your request is split into 2-4 branches, each exploring a different approach:

```
Your Request
    │
    ├── Branch 1: "Redis-based caching"
    │   ├── Q1: What data should be cached?
    │   └── Q2: How long should cache entries live?
    │
    ├── Branch 2: "Application-level caching"
    │   ├── Q1: Which caching strategy fits best?
    │   └── Q2: How to handle cache invalidation?
    │
    └── Branch 3: "CDN-based caching"
        ├── Q1: What content should be cached?
        └── Q2: How to handle dynamic content?
```

### Question Types

Octto supports 15 different question types for structured input:

| Type | Use Case | Example |
|------|----------|---------|
| `pick_one` | Single choice from options | "Which database type?" |
| `pick_many` | Multiple selections | "Which features are essential?" |
| `confirm` | Yes/no decisions | "Should we include authentication?" |
| `ask_text` | Free-form input | "Describe your constraints" |
| `slider` | Numeric ranges | "Budget allocation (0-100%)" |
| `rank` | Order items by priority | "Rank these requirements" |
| `rate` | Rate options on a scale | "Rate each approach by complexity" |
| `thumbs` | Quick up/down feedback | "Is this approach viable?" |
| `show_options` | Options with pros/cons | "Compare implementation approaches" |
| `show_diff` | Code comparison | "Review this code change" |
| `ask_code` | Code input with syntax highlighting | "Provide example implementation" |
| `ask_image` | Image upload | "Upload wireframes/mockups" |
| `ask_file` | File upload | "Upload specification document" |
| `emoji_react` | Quick emoji feedback | "React to this approach" |
| `review_section` | Section-by-section review | "Review this design section" |

## Tips for First-Time Users

### Start Simple

Begin with straightforward requests:
- ✅ "Design a user authentication system"
- ✅ "Plan the data layer architecture"
- ❌ "Design a complete microservices architecture with authentication, logging, monitoring, and deployment"

### Be Specific but Open-Ended

Good balance between specificity and flexibility:
- ✅ "Design a REST API for user management with CRUD operations"
- ❌ "Design an API" (too vague)
- ❌ "Design a REST API for user management with specific endpoints, error handling, rate limiting, and caching strategies" (too constrained)

### Use the Parallel Exploration

Don't rush to answer all questions:
- **Compare approaches** across branches
- **Let the system explore** different angles
- **Go back and change answers** to see different outcomes

### Trust the Process

The multi-agent system is designed to:
- **Explore thoroughly** through parallel branches
- **Ask relevant follow-ups** based on your answers
- **Synthesize approaches** into a coherent design

## Common First-Time Questions

### Q: How long does a session take?

**A**: Typically 2-5 minutes for simple requests, 5-15 minutes for complex designs. The browser UI makes it much faster than terminal-based brainstorming.

### Q: Can I change my answers?

**A**: Yes! You can go back and change any answer. The system will regenerate follow-up questions based on your new responses.

### Q: What if I don't like any of the approaches?

**A**: Provide feedback in the text questions or use the "show_options" questions to suggest alternative approaches. The probe agent will adjust based on your input.

### Q: Can I save my progress?

**A**: The session is auto-saved as you answer. If you close the browser, you can reopen it from the same URL (the port remains constant during the session).

### Q: What happens after I finish?

**A**: Octto generates a comprehensive design document synthesizing all the explored approaches. You can review, edit, and use this as a starting point for implementation.

## Next Steps

Once you're comfortable with the basics:

1. **Explore [Example Prompts](./example-prompts.md)** for specific scenarios
2. **Read [Best Practices](./best-practices.md)** for advanced usage
3. **Check [Use Cases](./use-cases.md)** to understand when octto is most effective
4. **Refer to [Troubleshooting](./troubleshooting.md)** if you encounter issues

## Getting Help

If you run into issues:

- Check the [Troubleshooting Guide](./troubleshooting.md)
- Review the main [README.md](../../README.md) for technical details
- Open an issue on GitHub for bugs or feature requests