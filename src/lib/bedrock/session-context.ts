/**
 * Session context: user work on Bedrock toolchain and Smith assistant
 * Date: 2026-09-27
 * 
 * This captures the user's current projects, goals, and what Smith should know
 * about their Minecraft Bedrock engineering work and how to assist better.
 */

export const SESSION_CONTEXT = {
  user: "Z480-fly",
  focus: "Bedrock addon engineering + AI-assisted pack generation",
  
  projects: [
    {
      name: "unstable-underworld-bedrock",
      type: "world generation",
      status: "active",
      purpose: "Procedural reconstruction of Unstable SMP Underworld as importable .mcworld",
      key_features: [
        "TypeScript world generator",
        "LevelDB and NBT serialization",
        "Orbital Strike platform (planned/recent)",
        "Expanded terrain, broken portals, more glass",
        "bun build pipeline",
      ],
      note: "structures.ts was broken placeholder—needs restoration from a8f44fed333d7df943d74c6eeb6d46c77b4c5e94",
    },
    {
      name: "bedrock-Ai (Packwright Smith)",
      type: "assistant + pack editor",
      status: "60-65% complete (experimental)",
      purpose: "AI assistant that learns from user's Minecraft repos to help generate and debug Bedrock packs",
      current_work: [
        "Wired reference guides for custom dimensions, items, world export, failure patterns",
        "Added Bedrock knowledge base extracted from user's projects",
        "System prompt includes identity as 'Packwright Smith'",
        "File generation, validation, project context injection",
      ],
      missing: [
        "Fresh copy storage / versioning system",
        "Live reference-guide prompt wiring (partially done)",
        "Production-ready persistence",
        "Better snapshot/restore flow",
      ],
    },
    {
      name: "sakura-underworld-dimension",
      type: "Bedrock addon",
      status: "solid reference",
      purpose: "Custom dimension from existing Freebuff world",
      pattern_teaches_smith: "Custom dimension + runtime registration + world persistence + structure placement",
    },
    {
      name: "Diamond-Apple-Addon",
      type: "Bedrock addon (item + effect)",
      status: "reference example",
      purpose: "Custom food item with script-based effects",
      pattern_teaches_smith: "Item + recipe + lang + custom component + effect system",
    },
    {
      name: "shale-quiet-brave-light",
      type: "web tool + reference",
      status: "useful utility",
      purpose: "Chunk Shear: browser-based Bedrock world editor/cutter",
      note: "Not primarily for Bedrock building, but shows strong understanding of LevelDB, NBT, chunk structure",
    },
    {
      name: "rich-status-studio",
      type: "web application",
      status: "production-oriented",
      purpose: "Discord presence + activity bridge with worker",
      note: "Separate from Minecraft focus; ambitious deployment architecture",
    },
  ],

  smith_teaching_approach: [
    "Learn from user's actual Bedrock project patterns, not generic knowledge",
    "Include failure modes and anti-patterns the user has encountered",
    "Understand that user is new to serious Bedrock building (~1-2 weeks focused)",
    "But user has strong software engineering mindset + quick learning curve",
    "Treat Smith as a feedback loop: generate → user builds → Smith learns → generate better",
  ],

  recent_session_summary: {
    date: "2026-09-27",
    topics: [
      "Analyzed user's full repo portfolio (7 repos)",
      "Ranked by technical significance and Minecraft focus",
      "Discussed unique aspects: system-thinking approach to Bedrock toolchain",
      "Identified Smith's role: AI assistant that learns from user's work, not generic Minecraft helper",
      "Discussed: world generation → editing → addon wrapping → AI assistance as connected pipeline",
      "User background: casual Bedrock tinkering for months → serious building for ~1-2 weeks",
    ],
    key_insight: "User's uniqueness is not in individual techniques but in system thinking: treating Bedrock as engineering problem, building for reproducibility and automation, creating AI assistant that learns from actual work",
  },

  smith_immediate_goals: [
    "Help user restore and rebuild unstable-underworld-bedrock with latest features",
    "Improve reference-guide wiring so Smith actively pulls from teaching pack during generation",
    "Add fresh-copy / snapshot system so projects can be versioned and restored",
    "Become the primary way user generates and debugs Bedrock pack files",
  ],

  user_style: "Direct, pragmatic, values honesty over flattery, appreciates technical depth",
};

export function formatSessionContextForSmith(): string {
  return `
# Session Context: Z480-fly's Bedrock Toolchain

You are Packwright Smith, an AI assistant that helps generate, debug, and improve Minecraft Bedrock addon packs.

The user has been building a connected system of Bedrock projects over the last 1–2 weeks:
- World generation pipelines (unstable-underworld-bedrock)
- World editing tools (shale-quiet-brave-light)
- Addon generation (sakura-underworld-dimension, Diamond-Apple-Addon)
- This assistant (bedrock-Ai / Packwright Smith)

## Your core responsibility:
Learn from the user's actual Bedrock work patterns and teach yourself to generate better, more correct Bedrock packs.

## Current reference knowledge you should use:
- Custom dimension patterns (runtime registration, world persistence, structure tiles)
- Custom item patterns (BP/RP consistency, lang mapping, script components)
- World export patterns (LevelDB, NBT, chunk validation, mobile performance)
- Failure patterns (namespace collision, UUID reuse, module type mismatch, missing lang lines)

## When generating Bedrock files:
- Always validate identifiers and manifest structure
- Include matching lang lines and texture atlas entries
- Reuse the project's namespace and existing UUIDs
- Target retail Bedrock 1.21.x
- Emit files in \`packwright path=BP/...\` format
- After generation, explain the in-game result and activation steps

## User context:
- New to serious Bedrock building but strong software engineer
- Builds for reproducibility and automation
- Values directness and technical honesty
- Thinks in systems, not isolated features

Be precise, practical, and opinionated. Don't hedge.
  `.trim();
}
