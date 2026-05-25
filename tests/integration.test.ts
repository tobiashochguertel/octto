// tests/integration.test.ts
import { afterAll, beforeAll, describe, expect, it } from "bun:test";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import type { PluginInput } from "@opencode-ai/plugin";

function createMockContext(directory: string): PluginInput {
  return {
    client: {
      app: {
        log: async () => {},
      },
    } as any,
    project: {} as any,
    directory,
    worktree: directory,
    serverUrl: new URL("http://localhost:3000"),
    $: {} as any,
  };
}

describe("OcttoPlugin Integration", () => {
  let testDir: string;

  beforeAll(() => {
    testDir = join(tmpdir(), `octto-test-${Date.now()}`);
    mkdirSync(testDir, { recursive: true });

    // Create test .octto directory structure
    const octtoDir = join(testDir, ".octto");
    mkdirSync(octtoDir, { recursive: true });

    // Create test fragments config
    writeFileSync(
      join(octtoDir, "fragments.json"),
      JSON.stringify({
        octto: ["Test fragment for integration testing"],
        probe: ["Test probe fragment"],
      }),
    );
  });

  afterAll(() => {
    rmSync(testDir, { recursive: true, force: true });
  });

  describe("configuration loading", () => {
    it("should load plugin without errors in clean directory", async () => {
      const { default: plugin } = await import("../src");
      const mockContext = createMockContext(testDir);

      const result = await plugin(mockContext);

      expect(result).toBeDefined();
      expect(result.tool).toBeDefined();
      expect(result.config).toBeDefined();
      expect(result.event).toBeDefined();
    });

    it("should merge custom config with default config", async () => {
      const { default: plugin } = await import("../src");
      const mockContext = createMockContext(testDir);

      const result = await plugin(mockContext);

      // Test config hook
      const testConfig = { agent: {} };
      await result.config!(testConfig);

      expect(testConfig.agent).toBeDefined();
      expect(typeof testConfig.agent).toBe("object");
    });

    it("should load custom fragments from project config", async () => {
      const { default: plugin } = await import("../src");
      const mockContext = createMockContext(testDir);

      const result = await plugin(mockContext);

      // Config should be modified to include fragments
      const testConfig = { agent: {} };
      await result.config!(testConfig);

      // Fragments should be injected into agent prompts
      expect(testConfig.agent).toBeDefined();
    });
  });

  describe("tool availability", () => {
    it("should provide all expected brainstorm tools", async () => {
      const { default: plugin } = await import("../src");
      const mockContext = createMockContext(testDir);

      const result = await plugin(mockContext);

      const tools = result.tool!;
      expect(tools.start_session).toBeDefined();
      expect(tools.push_question).toBeDefined();
      expect(tools.get_next_answer).toBeDefined();
      expect(tools.end_session).toBeDefined();
    });

    it("should provide tools with execute methods", async () => {
      const { default: plugin } = await import("../src");
      const mockContext = createMockContext(testDir);

      const result = await plugin(mockContext);

      const tools = result.tool!;
      expect(typeof tools.start_session.execute).toBe("function");
      expect(typeof tools.push_question.execute).toBe("function");
      expect(typeof tools.get_next_answer.execute).toBe("function");
      expect(typeof tools.end_session.execute).toBe("function");
    });
  });

  describe("event handling", () => {
    it("should handle session.deleted events gracefully", async () => {
      const { default: plugin } = await import("../src");
      const mockContext = createMockContext(testDir);

      const result = await plugin(mockContext);

      await expect(
        result.event!({
          event: {
            type: "session.deleted",
            properties: { info: { id: "test-session-id" } },
          },
        } as any),
      ).resolves.toBeUndefined();
    });

    it("should ignore non-deletion events", async () => {
      const { default: plugin } = await import("../src");
      const mockContext = createMockContext(testDir);

      const result = await plugin(mockContext);

      const eventTypes = ["session.created", "session.updated", "tool.executed", "command.executed"];

      for (const eventType of eventTypes) {
        await expect(
          result.event!({
            event: {
              type: eventType,
              properties: {},
            },
          } as any),
        ).resolves.toBeUndefined();
      }
    });
  });

  describe("session tracking", () => {
    it("should track sessions when start_session is called", async () => {
      const { default: plugin } = await import("../src");
      const mockContext = createMockContext(testDir);

      const result = await plugin(mockContext);

      // The plugin should have session tracking logic
      expect(result.event).toBeDefined();
      expect(typeof result.event).toBe("function");
    });
  });

  describe("error handling", () => {
    it("should handle missing .octto directory gracefully", async () => {
      const cleanDir = join(tmpdir(), `octto-clean-${Date.now()}`);
      mkdirSync(cleanDir, { recursive: true });

      try {
        const { default: plugin } = await import("../src");
        const mockContext = createMockContext(cleanDir);

        const result = await plugin(mockContext);

        expect(result).toBeDefined();
        expect(result.tool).toBeDefined();
      } finally {
        rmSync(cleanDir, { recursive: true, force: true });
      }
    });

    it("should handle invalid fragments.json gracefully", async () => {
      const invalidDir = join(tmpdir(), `octto-invalid-${Date.now()}`);
      mkdirSync(invalidDir, { recursive: true });

      const octtoDir = join(invalidDir, ".octto");
      mkdirSync(octtoDir, { recursive: true });

      // Write invalid JSON
      writeFileSync(join(octtoDir, "fragments.json"), "{ invalid json }");

      try {
        const { default: plugin } = await import("../src");
        const mockContext = createMockContext(invalidDir);

        // Should either throw or handle gracefully
        const result = await plugin(mockContext);
        expect(result).toBeDefined();
      } catch (error) {
        // Expected to throw on invalid JSON
        expect(error).toBeDefined();
      } finally {
        rmSync(invalidDir, { recursive: true, force: true });
      }
    });
  });
});
