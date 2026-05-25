#!/bin/bash
# E2E test script for Octto plugin

set -e

echo "🧪 Running Octto Plugin E2E Tests"

# Build the plugin
echo "📦 Building plugin..."
bun run build

# Create test environment
TEST_DIR=$(mktemp -d)
echo "📁 Test directory: $TEST_DIR"

# Setup test project
cd "$TEST_DIR"
git init
mkdir -p .octto

# Create test config
cat > .opencode/config.json <<EOF
{
  "plugins": ["$(pwd)/../../dist/index.js"]
}
EOF

# Test 1: Check if plugin loads
echo "🔍 Test 1: Checking plugin loads..."
if opencode debug config | grep -q "octto"; then
  echo "✅ Plugin loaded successfully"
else
  echo "❌ Plugin not found in debug config"
  exit 1
fi

# Test 2: Check agent registration
echo "🔍 Test 2: Checking agent registration..."
if opencode debug agent octto; then
  echo "✅ Agent registered successfully"
else
  echo "❌ Agent not registered"
  exit 1
fi

# Test 3: Check tools are available
echo "🔍 Test 3: Checking tools availability..."
AGENT_OUTPUT=$(opencode debug agent octto)
if echo "$AGENT_OUTPUT" | grep -q "create_brainstorm" && \
   echo "$AGENT_OUTPUT" | grep -q "await_brainstorm_complete" && \
   echo "$AGENT_OUTPUT" | grep -q "end_brainstorm"; then
  echo "✅ All expected tools available"
else
  echo "❌ Some tools missing"
  echo "Output: $AGENT_OUTPUT"
  exit 1
fi

# Cleanup
cd -
rm -rf "$TEST_DIR"

echo "🎉 All E2E tests passed!"
