# Troubleshooting

This document covers common issues, solutions, and tips for getting better results from octto.

## Common Issues

### Browser UI Doesn't Open

**Symptoms**: You start a session but no browser window opens

**Possible causes**:
1. **Port conflict**: Another process is using the port
2. **Browser not found**: System can't locate default browser
3. **Firewall blocking**: Security software is blocking the connection

**Solutions**:
```bash
# Check if port is in use
lsof -i :<port>

# Try a different port in octto.json
{
  "port": 3001  // Use a specific port instead of 0
}

# Manually open the URL
# The port will be shown in the terminal output
```

### Session Times Out

**Symptoms**: Questions timeout before you can answer them

**Possible causes**:
1. **Timeouts too short**: Default timeouts may not suit your workflow
2. **Complex questions**: Questions requiring deep thought take longer
3. **Interruptions**: You get distracted or need to research

**Solutions**:
```json
// Increase timeouts in octto.json
{
  "timeouts": {
    "answer": 0,    // Unlimited time for answering
    "review": 0     // Unlimited time for review
  }
}
```

### Questions Seem Irrelevant

**Symptoms**: The questions don't match your context or requirements

**Possible causes**:
1. **Prompt too vague**: Initial request lacks sufficient context
2. **Missing constraints**: Key requirements not specified
3. **Wrong tool for the job**: Problem doesn't benefit from exploration

**Solutions**:
- Refine your prompt with more specific context
- Add custom fragments to guide exploration
- Consider if direct conversation would be more appropriate
- Start a new session with refined requirements

### Exploration Stalls

**Symptoms**: No new questions appear after answering

**Possible causes**:
1. **Agent confusion**: Probe agent can't determine next steps
2. **Contradictory answers**: Your answers create logical conflicts
3. **Session completion**: All branches have completed

**Solutions**:
- Review your previous answers for consistency
- Use text questions to clarify conflicting requirements
- Check if the session has actually completed (look for completion message)
- Start a new session if the current one is stuck

### Output Too Generic

**Symptoms**: Generated design document lacks specific details

**Possible causes**:
1. **Insufficient detail**: Your answers were too high-level
2. **Missing domain context**: Technical specifics not provided
3. **Over-generalization**: Agents default to safe, generic recommendations

**Solutions**:
- Provide more specific technical details in text answers
- Add project-specific fragments with domain knowledge
- Use `ask_code` questions to provide implementation details
- Consider a follow-up session focused on specific components

### Browser UI Not Responsive

**Symptoms**: Browser interface freezes or doesn't update

**Possible causes**:
1. **WebSocket connection lost**: Network issue or server crash
2. **Browser compatibility**: Issue with specific browser
3. **JavaScript error**: Bug in the UI code

**Solutions**:
- Refresh the browser page
- Try a different browser (Chrome, Firefox, Safari)
- Check the terminal for error messages
- Restart the session if necessary

## Getting Better Results

### Improve Prompt Quality

**If exploration seems off-track**:
- Add more context about your specific situation
- Include constraints and requirements explicitly
- Mention technical preferences or existing systems
- Specify the scale and performance requirements

**Example refinement**:
```
Before: "Design a caching system"
After: "Design a caching strategy for a high-traffic API
with 10M daily requests, 5-minute data freshness requirements,
and strict budget constraints"
```

### Use Custom Fragments

**If exploration doesn't align with your needs**:
```json
// Add to ~/.config/opencode/octto.json
{
  "fragments": {
    "octto": [
      "Always consider GDPR compliance",
      "Prioritize cost optimization",
      "Focus on security best practices"
    ],
    "probe": [
      "Ask about testing strategies",
      "Consider operational requirements",
      "Include monitoring and observability"
    ]
  }
}
```

### Adjust Agent Configuration

**If exploration style doesn't match your preferences**:
```json
{
  "agents": {
    "octto": {
      "temperature": 0.9  // Higher for more creative exploration
    },
    "probe": {
      "temperature": 0.3  // Lower for more focused follow-ups
    }
  }
}
```

### Break Down Complex Problems

**If sessions seem overwhelming**:
- Split complex problems into multiple sessions
- Start with high-level architecture
- Follow up with component-specific sessions
- Combine outputs from multiple sessions

**Example**:
```
Session 1: "Design the overall system architecture"
Session 2: "Detail the authentication system"
Session 3: "Design the data layer"
Session 4: "Plan the deployment infrastructure"
```

## Performance Issues

### Slow Question Generation

**Symptoms**: Long wait times between questions

**Possible causes**:
1. **Model performance**: Selected model is slow
2. **Complex context**: Large context slows down processing
3. **Network issues**: API latency or connectivity problems

**Solutions**:
- Try a faster model if available
- Simplify your answers to reduce context size
- Check your network connection
- Consider if the complexity is necessary

### High Memory Usage

**Symptoms**: System becomes sluggish during sessions

**Possible causes**:
1. **Large context**: Extensive Q&A history consumes memory
2. **Browser issues**: Browser memory leak
3. **System resources**: Insufficient available memory

**Solutions**:
- Close unnecessary browser tabs
- Restart the browser if needed
- Break long sessions into smaller ones
- Monitor system resources

## Integration Issues

### Plugin Not Loading

**Symptoms**: Octto doesn't appear as an available agent

**Possible causes**:
1. **Installation issue**: Plugin not properly installed
2. **Configuration error**: Invalid configuration in opencode.jsonc
3. **Version incompatibility**: Plugin version incompatible with OpenCode

**Solutions**:
```bash
# Reinstall the plugin
cd ~/.config/opencode
npm install octto

# Check configuration
cat opencode.jsonc

# Check OpenCode version
opencode --version
```

### Configuration Not Applied

**Symptoms**: Settings in octto.json don't seem to take effect

**Possible causes**:
1. **File location**: octto.json in wrong directory
2. **JSON syntax**: Invalid JSON format
3. **Caching**: Old configuration cached

**Solutions**:
```bash
# Verify file location
ls ~/.config/opencode/octto.json

# Validate JSON syntax
cat ~/.config/opencode/octto.json | jq .

# Restart OpenCode to clear cache
```

### Tools Not Available

**Symptoms**: Octto tools don't appear in the agent tool list

**Possible causes**:
1. **Plugin not initialized**: Plugin loaded but not properly initialized
2. **Agent configuration**: Agent not configured to use octto tools
3. **Permission issues**: Insufficient permissions for tool access

**Solutions**:
- Check OpenCode logs for initialization errors
- Verify agent configuration in octto.json
- Ensure proper plugin loading order in opencode.jsonc

## Output Issues

### Document Not Generated

**Symptoms**: Session completes but no design document is created

**Possible causes**:
1. **File permissions**: No write access to output directory
2. **Path issues**: Output directory doesn't exist
3. **Session error**: Session ended abnormally

**Solutions**:
```bash
# Check output directory permissions
ls -la thoughts/shared/designs/

# Create directory if needed
mkdir -p thoughts/shared/designs/

# Check session logs for errors
```

### Document Format Issues

**Symptoms**: Generated document has formatting problems or missing sections

**Possible causes**:
1. **Template issues**: Document template has errors
2. **Data corruption**: Session data corrupted during generation
3. **Encoding issues**: Character encoding problems

**Solutions**:
- Manually review and fix formatting issues
- Start a new session if corruption is suspected
- Check for special characters in your answers

### Content Quality Issues

**Symptoms**: Generated content doesn't match your answers

**Possible causes**:
1. **Context loss**: Some answers not properly incorporated
2. **Synthesis errors**: Agent failed to properly synthesize responses
3. **Template mismatch**: Wrong document template used

**Solutions**:
- Review your answers in the session for accuracy
- Provide more explicit text answers for critical points
- Start a new session if synthesis is clearly wrong

## Debugging Tips

### Enable Verbose Logging

**Add to your environment**:
```bash
export OCTTO_DEBUG=true
export OCTTO_LOG_LEVEL=debug
```

### Check Session State

**Inspect active sessions**:
```bash
# The session manager logs state changes
# Check terminal output for session information
```

### Review Agent Prompts

**If you're curious about what agents are seeing**:
- The prompts are constructed in `src/agents/prompts.ts`
- Context building happens in `src/agents/context.ts`
- You can add logging to see what's being sent to agents

### Test Question Types

**If specific question types aren't working**:
- Test with a simple session first
- Try different question types to isolate the issue
- Check browser console for JavaScript errors

## When to Ask for Help

### GitHub Issues

**Create an issue if**:
- You encounter a bug or crash
- The plugin doesn't work as documented
- You have a feature request
- You found a security vulnerability

**Include in your issue**:
- Octto version
- OpenCode version
- Operating system and browser
- Steps to reproduce the issue
- Error messages or logs
- Configuration files (sanitized)

### Community Support

**Ask for help if**:
- You're not sure if something is a bug or expected behavior
- You need guidance on best practices
- You want to share your usage patterns
- You have questions about configuration

**Good places to ask**:
- GitHub Discussions
- OpenCode community forums
- Relevant Discord or Slack communities

## Preventive Measures

### Regular Updates

**Keep the plugin updated**:
```bash
cd ~/.config/opencode
npm update octto
```

### Configuration Backups

**Backup your configuration**:
```bash
cp ~/.config/opencode/octto.json ~/.config/opencode/octto.json.backup
```

### Session Documentation

**Document your sessions**:
- Save session URLs for reference
- Keep notes on what worked well
- Document custom fragments that are effective
- Maintain a library of effective prompts

## Performance Optimization

### Reduce Context Size

**If sessions are slow**:
- Keep answers concise
- Avoid unnecessary detail in early questions
- Use text questions strategically
- Break complex sessions into smaller ones

### Optimize Timeouts

**Configure appropriate timeouts**:
```json
{
  "timeouts": {
    "answer": 300000,   // 5 minutes for most cases
    "review": 600000    // 10 minutes for review
  }
}
```

### Choose Appropriate Models

**Balance speed and quality**:
```json
{
  "agents": {
    "bootstrapper": {
      "model": "fast-model"  // Use faster model for initial questions
    },
    "probe": {
      "model": "quality-model"  // Use better model for follow-ups
    }
  }
}
```

## Known Limitations

### Current Limitations

- **No code execution**: Octto is design-focused, doesn't execute code
- **Limited to design**: Not suitable for implementation or debugging
- **Browser dependency**: Requires a browser for the UI
- **Single session**: Each session is independent, no cross-session memory

### Workarounds

**For code execution**:
- Use octto for design, then implement separately
- Combine with other OpenCode agents for implementation

**For cross-session memory**:
- Document outputs from previous sessions
- Reference previous designs in new sessions
- Maintain your own design documentation

## Next Steps

- Try these solutions for your specific issue
- Check the [Best Practices](./best-practices.md) for preventive measures
- Review [Example Prompts](./example-prompts.md) for better results
- Create a GitHub issue if you encounter a bug