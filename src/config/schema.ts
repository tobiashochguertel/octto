import * as v from "valibot";

import { AGENTS } from "@/agents";

export const MAX_PORT = 65535;

export const DEFAULT_ANSWER_TIMEOUT_MS = 300000; // 5 minutes
export const DEFAULT_REVIEW_TIMEOUT_MS = 600000; // 10 minutes

export const AgentOverrideSchema = v.partial(
  v.object({
    model: v.string(),
    variant: v.string(),
    temperature: v.pipe(v.number(), v.minValue(0), v.maxValue(2)),
    maxSteps: v.pipe(v.number(), v.integer(), v.minValue(1)),
  }),
);

export const PortSchema = v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(MAX_PORT));

export const TimeoutSchema = v.pipe(v.number(), v.integer(), v.minValue(0)); // 0 = no timeout

export const TimeoutsSchema = v.optional(
  v.object({
    answer: v.optional(TimeoutSchema),
    review: v.optional(TimeoutSchema),
  }),
);

export const FragmentsSchema = v.optional(v.record(v.picklist(Object.values(AGENTS)), v.array(v.string())));

export const OcttoConfigSchema = v.object({
  agents: v.optional(v.record(v.picklist(Object.values(AGENTS)), AgentOverrideSchema)),
  port: v.optional(PortSchema),
  fragments: FragmentsSchema,
  timeouts: TimeoutsSchema,
});

export type AgentOverride = v.InferOutput<typeof AgentOverrideSchema>;
export type Timeouts = v.InferOutput<typeof TimeoutsSchema>;
export type Fragments = v.InferOutput<typeof FragmentsSchema>;
export type OcttoConfig = v.InferOutput<typeof OcttoConfigSchema>;
