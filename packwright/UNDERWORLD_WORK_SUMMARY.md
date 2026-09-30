# Underworld Work Summary

**Project:** `unstable-underworld-bedrock`  
**Scope:** Procedural Bedrock world generation (LevelDB / NBT). Pure vanilla blocks. No behavior/resource pack required for these builds.

---

## Goal

Extend the Underworld map with decorative structures that fit the existing architecture: gray/black stone, stained-glass accents, and nether-portal slices used as thin animated planes — without custom block packs or experimental world-gen features.

---

## What was added

### Portal-slice structure helpers

**File:** `src/world/structures.ts`

New builders (footprint-protected, seed-safe, same style as existing `P.*` palette helpers):

| Helper | Purpose |
|--------|--------|
| `splitTable` | One-block ritual: crafting table and enchanting table split by a thin `minecraft:portal` plane, framed in blackstone / deepslate |
| `brokenSplitTable` | Ruined variant — missing half, crying-obsidian debris |
| `glassSplitTable` | Same split with purple / gray glass so the portal glows through |
| `portalRibbon` | Short horizontal portal line on the floor |
| `voidWindow` | Deepslate / blackstone frame with portal core and glass faces |
| `portalPillar` | Vertical pillar with a portal core up the center |

**How the “split table” look works:**  
Bedrock’s nether portal block is a thin animated plane. Placing it between two solid blocks in one cell-width sandwich reads as a single 1×1×1 ritual table that is half crafting table and half enchanting table — without custom geometry.

These helpers are **available to call**. They were not forced into the main decorate / landmark pass, so generation can wire them when ready without conflicting with other work.

---

### Glass sky canopy (documented, not rewired)

**Existing builder:** `glassSky` in `src/world/structures_glass.ts`

- Layered irregular discs of purple / blue / cyan / magenta glass  
- Green / lime hanging fronds on the rim  
- Holes for parallax between layers  
- Clamped under Y ≈ 124  

**Target look:** Looking straight up through a dense green–purple glass swarm (reference screenshot from the map).

**Full-sky approach (documented, not committed as a decorate pass):**  
Tile `glassSky` on a coarse grid (e.g. every ~80 blocks), radius ~55, several layers, varied seeds, so overlapping sheets form a continuous canopy over the realm.

---

## Design rules followed

- Vanilla blocks only (portal, glass, blackstone, deepslate, tables)  
- No Script API, no custom items, no pack dependency for these structures  
- Preserve existing namespaces, UUIDs, folder layout, and LevelDB export path  
- Deterministic placement (coordinate-based seeds)  
- Do not break glass cathedral / glass tree / landmark logic  

---

## Status

| Item | Status |
|------|--------|
| Portal-slice helpers in `structures.ts` | Done |
| Called from decorate / landmarks | Not yet (optional next step) |
| `glassSky` builder | Already existed |
| Full-sky tiling pass | Documented only |
| Standalone addons (compass, swords, etc.) | Out of scope for this summary |

---

## Next steps (optional)

1. Call `splitTable` / variants from a decorate or landmark pass at chosen coordinates.  
2. Add a sky pass that tiles `glassSky` across the realm bounds.  
3. Keep both pure vanilla so existing survival worlds stay compatible.

---

*Packwright Smith — Underworld generation only.*
