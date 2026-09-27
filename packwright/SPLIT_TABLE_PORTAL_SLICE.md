# Split Table — Portal-Slice Design (Underworld)

## Goal

A decorative “split” Crafting Table / Enchanting Table look that works inside pure LevelDB-generated Underworld worlds with **zero resource-pack dependency**.

## Why not a single custom geometry block?

- Underworld writes vanilla block palette entries into LevelDB and exports a plain `.mcworld`.
- A true 1×1 custom geometry block requires a companion resource pack for the model and textures to appear.
- For generated content that must remain fully compatible without packs, use only vanilla blocks.

## Chosen method: Portal-slice sandwich

Layout (compact footprint, typically 3 wide × 2–3 tall × 1–2 deep):

```
[blackstone / deepslate / crying-obsidian frame]
[crafting_table]  [minecraft:portal]  [enchanting_table]
[blackstone / deepslate / crying-obsidian frame]
```

- The single `minecraft:portal` block acts as a glowing vertical “slice” / magical cut between the two tables.
- From most angles it reads as one ritual piece that has been split.
- All blocks already exist in the Underworld palette (`P.craftingTable`, `P.enchantingTable`, `P.portal`, blackstone/deepslate family).
- Fully reproducible, no pack required, no new palette entries.

## Existing helpers that already support this

In `unstable-underworld-bedrock/src/world/`:

- `blocks.ts` already exports `P.craftingTable`, `P.enchantingTable`, `P.portal`, `P.obsidian`, `P.cryingObsidian`, blackstone and deepslate variants.
- `structures.ts` already has `portalFrame()` which places portal blocks inside an obsidian frame. The slice technique reuses the same portal block in a thinner, decorative context.

## Recommended helper (add to structures.ts)

```ts
/**
 * Ritual split table: crafting_table | portal slice | enchanting_table
 * framed in blackstone/deepslate. Pure vanilla. Zero pack dependency.
 * Footprint ~3×2×1. Safe for LevelDB export.
 */
export function splitTable(
  world: World,
  cx: number,
  cz: number,
  baseY: number,
  alongX = true,
  style: BuildStyle = BLACKSTONE_STYLE,
): void {
  // floor / base
  for (let dx = -1; dx <= 1; dx++) {
    for (let dz = -1; dz <= 1; dz++) {
      world.set(cx + dx, baseY, cz + dz, style.floor);
    }
  }

  // left table, portal slice, right table
  if (alongX) {
    world.set(cx - 1, baseY + 1, cz, P.craftingTable);
    world.set(cx,     baseY + 1, cz, P.portal);
    world.set(cx + 1, baseY + 1, cz, P.enchantingTable);
  } else {
    world.set(cx, baseY + 1, cz - 1, P.craftingTable);
    world.set(cx, baseY + 1, cz,     P.portal);
    world.set(cx, baseY + 1, cz + 1, P.enchantingTable);
  }

  // simple frame pillars
  for (const [ox, oz] of [[-1, -1], [-1, 1], [1, -1], [1, 1]] as const) {
    world.set(cx + ox, baseY + 1, cz + oz, style.accent);
    world.set(cx + ox, baseY + 2, cz + oz, style.trim);
  }

  // optional light
  world.set(cx, baseY + 2, cz, style.light);
}
```

## Placement rules for generation

- Call only on unprotected land away from major landmarks (same rules as `decorate.ts` / `scatterRuins`).
- Prefer blackstone style on the western (darker) side of the map, deepslate style elsewhere.
- Protect the 3×3 footprint after placement so later passes do not overwrite it.

## Alternative (higher fidelity, requires packs)

A true single-block custom geometry with two cubes (left = crafting table UVs, right = enchanting table UVs) is still valid as a **companion resource pack**. It shares one block identifier and one LevelDB palette entry, but the player must enable the pack for the visual split to appear. Keep that path as an optional upgrade, not the default for generated worlds.

## Status

- Design confirmed 2026-09-27.
- Helper not yet committed to `unstable-underworld-bedrock` (Freebuff may be generating concurrently).
- This document lives in `bedrock-Ai` so any agent can learn the preferred approach.
