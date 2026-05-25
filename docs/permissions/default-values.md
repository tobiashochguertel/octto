# Default Permissions Configuration

This document describes the default permission values for octto agents and how to customize them through `~/.config/opencode/octto.json`.

## Overview

The octto plugin uses a whitelist-based permission system to control agent access to tools and file system operations. By default, permissions are configured with safe defaults that maintain security while providing essential functionality.

## Default Permission Values

### Octto Agent

The main octto agent has the most permissive defaults to enable its core functionality:

```json
{
  "tools": [
    "create_brainstorm",
    "await_brainstorm_complete",
    "end_brainstorm",
    "get_session_summary",
    "start_session",
    "end_session",
    "push_question",
    "get_answer",
    "get_next_answer",
    "list_questions",
    "cancel_question",
    "pick_one",
    "pick_many",
    "confirm",
    "rate",
    "rank",
    "slider",
    "ask_text",
    "ask_code",
    "thumbs",
    "emoji_react",
    "show_options",
    "review"
  ],
  "fileAccess": "write-only",
  "allowedPaths": ["docs/plans/", "docs/", "thoughts/"]
}
```

**Default Behavior**:
- **Tool Access**: All approved brainstorming, session, and question tools
- **File Access**: Write-only access to create new documents
- **Allowed Paths**: Can write to `docs/plans/`, `docs/`, and `thoughts/` directories

### Bootstrapper Agent

The bootstrapper agent is a subagent with restricted permissions:

```json
{
  "tools": [],
  "fileAccess": "none",
  "allowedPaths": []
}
```

**Default Behavior**:
- **Tool Access**: No tool access (empty array)
- **File Access**: No file system access
- **Allowed Paths**: No directory access

### Probe Agent

The probe agent is another subagent with restricted permissions:

```json
{
  "tools": [],
  "fileAccess": "none",
  "allowedPaths": []
}
```

**Default Behavior**:
- **Tool Access**: No tool access (empty array)
- **File Access**: No file system access
- **Allowed Paths**: No directory access

## Permission Levels

The `fileAccess` field supports the following levels:

| Level | Description | Use Case |
|-------|-------------|----------|
| `none` | No file system access | Subagents, security-critical scenarios |
| `read-only` | Can read files only | Context gathering, document analysis |
| `write-only` | Can write files only (default for octto) | Creating new documents, brainstorming |
| `read-write` | Can read and write files | Advanced use cases requiring both operations |

## Changing Default Permissions

### Configuration File

To customize permissions, add a `permissions` section to your `~/.config/opencode/octto.json`:

```json
{
  "permissions": {
    "octto": {
      "tools": ["create_brainstorm", "await_brainstorm_complete"],
      "fileAccess": "write-only",
      "allowedPaths": ["docs/plans/production/"]
    },
    "bootstrapper": {
      "tools": [],
      "fileAccess": "none"
    },
    "probe": {
      "tools": [],
      "fileAccess": "none"
    }
  }
}
```

### Partial Configuration

You can specify only the agents you want to customize. Unspecified agents will use their default permissions:

```json
{
  "permissions": {
    "octto": {
      "allowedPaths": ["docs/plans/production/"]
    }
  }
}
```

In this example:
- **octto**: Custom path, default tools and file access
- **bootstrapper**: Default permissions (no access)
- **probe**: Default permissions (no access)

## Configuration Examples

### Example 1: Restrict to Single Directory

Restrict octto to only write to a specific production directory:

```json
{
  "permissions": {
    "octto": {
      "allowedPaths": ["docs/plans/production/"]
    }
  }
}
```

### Example 2: Grant Read Access for Context

Allow octto to read existing design documents for context:

```json
{
  "permissions": {
    "octto": {
      "fileAccess": "read-write",
      "allowedPaths": ["docs/plans/", "docs/architecture/", "docs/design/"]
    }
  }
}
```

### Example 3: Minimal Tool Set

Restrict octto to only brainstorming tools:

```json
{
  "permissions": {
    "octto": {
      "tools": [
        "create_brainstorm",
        "await_brainstorm_complete",
        "end_brainstorm",
        "get_session_summary"
      ],
      "fileAccess": "write-only",
      "allowedPaths": ["docs/plans/"]
    }
  }
}
```

### Example 4: Development Mode

Configure permissions for a development/testing environment:

```json
{
  "permissions": {
    "octto": {
      "allowedPaths": ["docs/plans/", "docs/testing/", "docs/wip/"]
    }
  }
}
```

### Example 5: Strict Security Mode

Maximum security with minimal permissions:

```json
{
  "permissions": {
    "octto": {
      "tools": ["create_brainstorm", "await_brainstorm_complete", "end_brainstorm"],
      "fileAccess": "write-only",
      "allowedPaths": ["docs/plans/sandbox/"]
    },
    "bootstrapper": {
      "tools": [],
      "fileAccess": "none"
    },
    "probe": {
      "tools": [],
      "fileAccess": "none"
    }
  }
}
```

## Approved Tools

The following tools are approved for the octto agent:

### Brainstorming Tools
- `create_brainstorm` - Create a brainstorming session
- `await_brainstorm_complete` - Wait for brainstorm completion
- `end_brainstorm` - End a brainstorming session
- `get_session_summary` - Get session summary

### Session Tools
- `start_session` - Start a new session
- `end_session` - End a session

### Question Tools
- `push_question` - Push a question to a session
- `get_answer` - Get answer to a specific question
- `get_next_answer` - Get the next pending answer
- `list_questions` - List all questions in a session
- `cancel_question` - Cancel a pending question

### Question Types
- `pick_one` - Single choice question
- `pick_many` - Multiple choice question
- `confirm` - Yes/no confirmation
- `rate` - Rating question
- `rank` - Ranking question
- `slider` - Slider input
- `ask_text` - Text input
- `ask_code` - Code input
- `thumbs` - Thumbs up/down
- `emoji_react` - Emoji reaction
- `show_options` - Display options
- `review` - Review request

**Note**: Subagents (bootstrapper, probe) have no approved tools for security reasons.

## Approved Directories

The following directories are approved for file operations by default:

- `docs/plans/` - Planning documents
- `docs/` - General documentation
- `thoughts/` - Thought and scratchpad files

**Custom Path Configuration**: Users can add `"*"` (glob pattern) to their `allowedPaths` configuration to allow file operations anywhere in the project directory. This provides flexibility for working in different directories while still preventing directory traversal attacks.

**Example**:
```json
{
  "permissions": {
    "octto": {
      "allowedPaths": ["*", "docs/plans/", "custom/path/"]
    }
  }
}
```

**Security Note**: Using `"*"` gives the agent broad file access. Users should understand the security implications and use this configuration only when needed.

## Security Considerations

### Whitelist Validation

- Only tools in the approved whitelist can be used
- Only directories in the approved whitelist can be accessed
- Invalid tool names or paths are rejected with warnings

### Safe Defaults

- Invalid configurations fall back to safe defaults
- Missing configuration sections use hardcoded defaults
- Validation failures are logged but don't break the system

### Path Validation

- Paths must be relative (no absolute paths)
- Parent directory traversal (`..`) is blocked
- Paths are normalized before validation

### Audit Logging

All permission configurations are logged with `[octto] SECURITY:` prefix for audit purposes:

```
[octto] SECURITY: Loaded permissions for octto: tools=18, fileAccess=write-only, paths=3
[octto] SECURITY: Using default permissions for bootstrapper
[octto] SECURITY: Using default permissions for probe
```

## Troubleshooting

### Configuration Not Applied

If your permissions configuration doesn't seem to be applied:

1. Check the console output for SECURITY log messages
2. Verify your `octto.json` syntax is valid
3. Ensure the file is in the correct location: `~/.config/opencode/octto.json`
4. Look for validation warnings in the logs

### Invalid Tool Names

If you see warnings about invalid tool names:

```
[octto] SECURITY: Invalid tool permissions
[octto] SECURITY: Requested tools: invalid_tool, another_invalid
```

Check that all tool names in your configuration are in the approved tools list above.

### Invalid Paths

If you see warnings about invalid paths:

```
[octto] SECURITY: Invalid paths: ../etc/, /absolute/path/
```

Ensure:
- Paths are relative to the project root
- Paths don't use `..` for parent directory traversal
- Paths are in the approved directories list

## Migration from Defaults

### No Action Required

If you don't configure permissions, the system uses the safe defaults described above. No migration is needed.

### Gradual Customization

You can gradually customize permissions by:

1. Start with an empty `permissions` object to see defaults
2. Add one agent configuration at a time
3. Test each change before adding more
4. Monitor SECURITY logs for validation issues

### Testing Configuration

To test your configuration:

1. Add your permissions to `octto.json`
2. Restart your octto session
3. Check console output for SECURITY log messages
4. Verify the expected behavior
5. Adjust configuration as needed

## Best Practices

1. **Start with defaults**: Use the default permissions as a baseline
2. **Minimal changes**: Only customize what you need
3. **Test thoroughly**: Test permission changes in a safe environment
4. **Monitor logs**: Watch SECURITY log messages for validation issues
5. **Document changes**: Keep track of your custom permissions for your team
6. **Review regularly**: Periodically review your permission configuration
7. **Security first**: Prefer more restrictive permissions for production use

## Related Documentation

- [README.md](../../README.md) - Main project documentation
- [PERMISSIONS_DESIGN.md](../../PERMISSIONS_DESIGN.md) - Security design and implementation details
- [Usage Examples](../usage-examples/) - Practical usage examples
