# Octto Plugin Verification & Testing Guide

This guide explains how to verify the Octto plugin is correctly loaded in OpenCode and how to use the available testing approaches.

## Verifying Plugin Loading

### 1. OpenCode Debug Commands

OpenCode provides built-in debugging tools to verify plugin status:

```bash
# Check final configuration (includes plugin-injected config)
opencode debug config

# List installed plugins (if available in your OpenCode version)
opencode plugin list

# Check specific agent details
opencode debug agent octto

# List loaded skills
opencode debug skill
```

### 2. Configuration File Verification

Check your plugin is properly configured:

```bash
# Check global config
cat ~/.config/opencode/opencode.json

# Check project-specific config
cat .opencode/config.json

# Verify the built plugin exists
ls -la dist/index.js
```

### 3. Adding Plugin Logging

Add structured logging to track plugin initialization. The plugin uses `client.app.log()` for structured logging:

```typescript
const Octto: Plugin = async ({ client, directory }) => {
  await client.app.log({
    body: {
      service: "octto",
      level: "info",
      message: "Octto plugin initializing",
      extra: { directory }
    }
  });

  // ... plugin initialization code ...

  await client.app.log({
    body: {
      service: "octto",
      level: "info", 
      message: "Octto plugin loaded successfully",
      extra: { 
        agentCount: Object.keys(customConfig.agents).length,
        toolCount: Object.keys(tools).length,
        tools: Object.keys(tools)
      }
    }
  });

  return {
    tool: tools,
    config: async (config) => {
      config.agent = { ...config.agent, ...customConfig.agents };
    },
    event: async ({ event }) => {
      // ... event handling
    }
  };
};
```

### 4. Agent Registration Verification

Verify the octto agent is registered with correct tools:

```bash
opencode debug agent octto
```

Expected output should show:
- Agent description and configuration
- Available tools (create_brainstorm, await_brainstorm_complete, end_brainstorm)
- System prompt with workflow instructions
- Model configuration
- Temperature settings

## Testing Approaches

### Unit Tests

Unit tests test the plugin in isolation with mocked contexts. Located in `tests/index.test.ts`.

```bash
# Run all unit tests
bun test

# Run with watch mode
bun test:watch
```

### Integration Tests

Integration tests test more realistic scenarios with temporary directories and configuration files. Located in `tests/integration.test.ts`.

```bash
# Run integration tests only
bun run test:integration
```

Integration tests cover:
- Configuration loading from project directories
- Custom fragments loading
- Tool availability and execution methods
- Event handling for various event types
- Error handling for missing/invalid configurations

### E2E Tests

E2E tests actually run OpenCode commands to verify the plugin works in a real OpenCode environment. Located in `tests/e2e-test.sh`.

```bash
# Run E2E tests
bun run test:e2e
```

The E2E test script:
1. Builds the plugin
2. Creates a temporary test directory
3. Initializes a git repository
4. Creates OpenCode configuration
5. Runs `opencode debug config` to verify plugin loading
6. Runs `opencode debug agent octto` to verify agent registration
7. Verifies all expected tools are available
8. Cleans up test environment

**Note**: E2E tests require OpenCode to be installed and available in your PATH.

## Expected Plugin Behavior

### When Plugin Loads Successfully

1. **Tools Available**: The plugin should provide these tools:
   - `start_session` - Start a brainstorming session
   - `push_question` - Push questions to the session
   - `get_next_answer` - Get the next answer from the session
   - `end_session` - End the session and get results

2. **Agent Configuration**: The plugin should:
   - Register the `octto` agent with the configured model
   - Inject custom fragments into agent prompts
   - Configure permissions for file access

3. **Event Handling**: The plugin should:
   - Handle `session.deleted` events to clean up sessions
   - Ignore other event types gracefully

4. **Configuration Hook**: The plugin should:
   - Merge custom agent configuration with default config
   - Apply fragment injections to agent prompts

### Common Issues and Solutions

#### Plugin Not Loading

**Symptoms**: `opencode debug config` doesn't show octto

**Solutions**:
1. Check the plugin path in `.opencode/config.json` is correct
2. Verify the plugin is built: `bun run build`
3. Check the built file exists: `ls -la dist/index.js`
4. Check OpenCode logs for loading errors

#### Agent Not Registered

**Symptoms**: `opencode debug agent octto` fails

**Solutions**:
1. Verify the config hook is working
2. Check agent configuration in `src/agents/octto.ts`
3. Ensure the plugin is returning a config function

#### Tools Not Available

**Symptoms**: Tools missing from agent configuration

**Solutions**:
1. Verify tools are being created in `src/tools/factory.ts`
2. Check the plugin is returning the tools object
3. Ensure tool names match expected names

#### Permission Errors

**Symptoms**: File access denied errors

**Solutions**:
1. Check permissions configuration in `~/.config/opencode/octto.json`
2. Verify allowedPaths are correct
3. Check fileAccess level is appropriate

## Development Workflow

1. **Make Changes**: Edit the plugin code
2. **Build**: `bun run build`
3. **Unit Test**: `bun test`
4. **Integration Test**: `bun run test:integration`
5. **E2E Test**: `bun run test:e2e` (if OpenCode is available)
6. **Manual Verification**: 
   - Load in OpenCode
   - Run `opencode debug agent octto`
   - Test with a real brainstorming session

## Continuous Integration

For CI/CD pipelines, use this testing order:

```yaml
# Example CI configuration
- bun run typecheck
- bun run lint
- bun test
- bun run test:integration
# Skip e2e tests in CI unless OpenCode is available
```

## Additional Resources

- [OpenCode Plugin Documentation](https://opencode.ai/docs/plugins)
- [OpenCode Debug Commands](https://github.com/anomalyco/opencode/blob/dev/packages/web/src/content/docs/cli.mdx)
- [OpenCode Troubleshooting](https://github.com/anomalyco/opencode/blob/dev/packages/web/src/content/docs/troubleshooting.mdx)
