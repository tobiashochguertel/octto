# Best Practices

This document provides guidelines and techniques for using octto effectively to get the best results.

## Prompt Engineering

### Be Specific but Flexible

**Good balance**:
- ✅ "Design a user authentication system for a web application with social login support"
- ❌ "Design an authentication system" (too vague)
- ❌ "Design a JWT-based authentication system with 1-hour token expiration, refresh tokens, and multi-device support" (too constrained)

**Why**: Octto needs enough context to explore relevant options but enough flexibility to consider different approaches.

### Include Key Constraints

**Add context about**:
- **Scale**: "for 1M daily users" or "for a small team"
- **Performance**: "with sub-second response times" or "with eventual consistency acceptable"
- **Compliance**: "GDPR-compliant" or "HIPAA-compliant"
- **Budget**: "cost-optimized" or "performance-optimized regardless of cost"
- **Timeline**: "for immediate deployment" or "for long-term maintainability"

**Example**:
```
Design a database architecture for a high-traffic e-commerce platform
with 10M daily requests, strict data consistency requirements, and
budget optimization in mind.
```

### Focus on the Problem, Not the Solution

**Problem-focused**:
- ✅ "Design a system to handle real-time user collaboration on documents"
- ❌ "Design a WebSocket-based system for real-time collaboration"

**Why**: Let octto explore different technical approaches (WebSocket, Server-Sent Events, polling, etc.)

### Use Domain-Specific Language

**Include relevant terminology**:
- "Design a RESTful API for user management"
- "Plan a microservices architecture with event-driven communication"
- "Design a data lake with partitioning for time-series data"

**Why**: Helps the agents understand the context and explore appropriate solutions.

## Session Management

### Take Time with Initial Answers

**Don't rush**:
- Read all initial questions across branches
- Consider the implications of each answer
- Don't feel pressured to answer quickly

**Why**: Early answers significantly influence the exploration direction.

### Answer in Logical Order

**Recommended approach**:
1. Start with questions that seem most critical
2. Move to questions that clarify constraints
3. Answer detailed questions last
4. Review and adjust if needed

**Why**: This builds context progressively and helps the probe agent ask better follow-ups.

### Use Text Questions for Nuance

**When to use text input**:
- To provide specific constraints
- To explain business context
- To clarify technical preferences
- To suggest alternative approaches

**Example**:
```
Q: "Any specific security requirements?"
A: "Must support OAuth 2.0 and have audit logging for compliance"
```

### Don't Over-Answer

**Provide sufficient but not excessive detail**:
- ✅ "Must support GDPR compliance with right to be forgotten"
- ❌ "Must support GDPR compliance with right to be forgotten, data portability, consent management, breach notification within 72 hours, DPO appointment, record-keeping, privacy by design, and regular impact assessments"

**Why**: Too much detail can constrain exploration unnecessarily.

## Working with Parallel Branches

### Compare Approaches Before Committing

**Process**:
1. Answer initial questions in all branches
2. Review the different directions each branch takes
3. Identify which approach aligns best with your needs
4. Focus your detailed answers on that branch
5. Keep other branches minimal if they're not relevant

### Use Branches for Risk Mitigation

**Strategy**:
- Let one branch explore the "safe" approach
- Let another branch explore the "innovative" approach
- Let a third branch explore the "cost-optimized" approach
- Compare trade-offs across all three

### Don't Feel Obligated to Complete All Branches

**It's okay to**:
- Focus on the most relevant branch
- Provide minimal answers to less relevant branches
- Let some branches remain less detailed
- The system will synthesize based on available information

## Leveraging Question Types

### Use `show_options` for Decisions

**When you see `show_options` questions**:
- Carefully review the pros and cons
- Consider the context provided
- Use the feedback field to add nuances
- Don't rush to select the "recommended" option

**Example**:
```
Q: "Which caching strategy?"
Options: [Redis, Memcached, Application-level]
Your answer: Select Redis with feedback: "Prefer Redis for persistence and data structures"
```

### Use `rank` for Prioritization

**When prioritizing requirements or features**:
- Consider business impact
- Consider implementation complexity
- Consider dependencies between items
- Don't just rank by personal preference

### Use `ask_code` for Technical Details

**When providing code examples**:
- Keep it focused on the concept
- Don't worry about perfect syntax
- Use it to illustrate architectural patterns
- Include comments to explain design decisions

### Use `confirm` for Go/No-Go Decisions

**For binary decisions**:
- Consider the implications carefully
- Use the context provided to understand the trade-offs
- Don't default to "yes" without consideration
- Use "cancel" if you need more information

## Iteration and Refinement

### Review Generated Documents Critically

**Check for**:
- Completeness of coverage
- Accuracy of technical details
- Alignment with your requirements
- Practicality of recommendations
- Missing considerations or edge cases

### Iterate on the Design

**If the output isn't quite right**:
- Start a new session with refined requirements
- Reference the previous output as context
- Provide specific feedback on what to change
- Focus the new session on the gaps

### Combine Multiple Sessions

**For complex systems**:
- Session 1: High-level architecture
- Session 2: Detailed component design
- Session 3: Infrastructure and deployment
- Session 4: Security and compliance

**Why**: Breaks down complex problems into manageable pieces.

## Team Collaboration

### Use Octto in Group Settings

**For team brainstorming**:
- Project the browser UI for group viewing
- Discuss questions as a team before answering
- Use the exploration to align on approaches
- Review the final document together

### Document Decision Rationale

**When answering questions**:
- Consider the team's perspective
- Include team constraints in text answers
- Use the process to build consensus
- Reference the generated document in future discussions

### Share Sessions with Stakeholders

**For stakeholder review**:
- Save the session URL for later review
- Export the final design document
- Use the parallel branches to show options considered
- Document the decision rationale

## Common Pitfalls

### Starting Too Broad

**Problem**: "Design a complete e-commerce platform"

**Better**: "Design the user authentication system for an e-commerce platform"

**Why**: Focused sessions produce more actionable results.

### Ignoring Context Questions

**Problem**: Skipping or rushing through context-setting questions

**Better**: Take time with context questions as they shape the entire exploration

**Why**: Context questions are critical for relevant exploration.

### Over-Constraining the Solution

**Problem**: Specifying implementation details in the initial prompt

**Better**: Focus on requirements and constraints, let octto explore solutions

**Why**: Over-constraining limits the value of parallel exploration.

### Not Reviewing the Output

**Problem**: Accepting the generated document without review

**Better**: Critically review and refine the output

**Why**: The output is a starting point, not a final specification.

### Using Octto for Simple Tasks

**Problem**: Using octto for questions that don't need exploration

**Better**: Use direct conversation for simple questions

**Why**: Octto has overhead that isn't justified for simple tasks.

## Advanced Techniques

### Custom Fragments for Domain-Specific Guidance

**Add to `~/.config/opencode/octto.json`**:
```json
{
  "fragments": {
    "octto": [
      "Always consider GDPR compliance",
      "Focus on cost optimization for cloud infrastructure",
      "Prioritize security over convenience"
    ],
    "probe": [
      "Ask about testing strategies for each component",
      "Consider operational requirements and monitoring"
    ]
  }
}
```

**Why**: Custom fragments guide the exploration toward your specific concerns.

### Project-Specific Configuration

**Create `.octto/fragments.json` in your project**:
```json
{
  "octto": [
    "This project uses TypeScript and React",
    "We prioritize developer experience",
    "Follow our existing design patterns"
  ],
  "probe": [
    "Consider integration with existing components",
    "Ask about backwards compatibility"
  ]
}
```

**Why**: Project-specific fragments ensure exploration aligns with your codebase.

### Temperature Tuning

**Adjust agent temperatures in `octto.json`**:
```json
{
  "agents": {
    "octto": {
      "temperature": 0.9  // More creative exploration
    },
    "probe": {
      "temperature": 0.3  // More focused follow-ups
    }
  }
}
```

**Why**: Different temperatures produce different exploration styles.

### Model Selection

**Use different models for different tasks**:
```json
{
  "agents": {
    "bootstrapper": {
      "model": "fast-model"  // Quick initial exploration
    },
    "probe": {
      "model": "smart-model"  // Thoughtful follow-ups
    }
  }
}
```

**Why**: Optimizes for the specific role of each agent.

## Quality Indicators

### Signs of a Good Session

✅ **Relevant Exploration**: Branches explore approaches that make sense for your context
✅ **Comprehensive Coverage**: All important aspects are considered
✅ **Actionable Output**: Generated document can be used directly
✅ **New Insights**: You learn something new or consider alternatives you hadn't thought of
✅ **Efficient Process**: Session completes faster than equivalent manual exploration

### Signs of a Problematic Session

❌ **Irrelevant Exploration**: Branches explore approaches that don't match your needs
❌ **Missing Coverage**: Important aspects are not considered
❌ **Generic Output**: Generated document is too generic to be useful
❌ **No New Insights**: Output confirms what you already knew
❌ **Frustrating Process**: Questions don't make sense or seem irrelevant

### Improving Problematic Sessions

**If exploration is irrelevant**:
- Refine your prompt with more specific context
- Add custom fragments to guide exploration
- Consider if octto is the right tool for this problem

**If coverage is missing**:
- Use text questions to mention missing aspects
- Start a new session focused on the gaps
- Combine multiple sessions for comprehensive coverage

**If output is too generic**:
- Provide more specific constraints in your answers
- Use text questions to add domain-specific details
- Add project-specific fragments for context

## Measuring Success

### Quantitative Metrics

- **Time saved**: Compare session time to equivalent manual exploration
- **Coverage**: Number of aspects considered vs manual brainstorming
- **Actionability**: Percentage of output that can be used directly

### Qualitative Metrics

- **New insights**: Number of new considerations or alternatives
- **Stakeholder alignment**: Team agreement with the approach
- **Decision quality**: Confidence in the final decision
- **Documentation quality**: Usability of the generated document

## Continuous Improvement

### Learn from Your Sessions

**After each session**:
- Note what worked well
- Identify what could be improved
- Refine your prompting approach
- Adjust custom fragments based on learnings

### Build a Prompt Library

**Create reusable prompts** for common scenarios:
- Standard architecture patterns
- Common technology choices
- Recurring design challenges

**Why**: Improves efficiency and consistency across sessions.

### Share with Your Team

**Document effective approaches**:
- Share successful prompts
- Document custom fragments
- Create team-specific best practices
- Build institutional knowledge

## Next Steps

- Try these best practices with your next session
- Refine your approach based on results
- Build a library of effective prompts for your domain
- Share learnings with your team