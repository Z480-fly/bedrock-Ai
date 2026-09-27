# Underworld Decorative Block Options

Quick reference of visual concepts discussed for the Underworld aesthetic (dark stone, glass, liminal purple light, soul, sculk, portal).

## 1. Portal-slice Split Table (recommended for pure generation)

- Vanilla only: `crafting_table` | `minecraft:portal` | `enchanting_table` + blackstone/deepslate frame.
- Zero pack dependency.
- See `SPLIT_TABLE_PORTAL_SLICE.md`.

## 2. Custom 1×1 Geometry Split Table (companion pack)

- Single custom block identifier, two cubes in one geometry.
- Requires resource pack for the dual appearance.
- Highest visual fidelity when the pack is enabled.
- Suitable as an optional upgrade, not the default generated content.

## 3. Other thematic pieces that fit the existing pipeline

| Idea | Vanilla / Custom | Notes |
|------|------------------|-------|
| Split blackstone altar | 2 vanilla blocks + frame | Ritual / liminal |
| Glass-veined deepslate pillar | Layered glass + deepslate | Matches glass cathedral / grove |
| Crying-obsidian lectern | Lectern on crying obsidian base | Library / knowledge |
| Tinted-glass void window | Tinted glass in deepslate frame | Looking into the dark |
| Soul-fire brazier | Soul campfire / lantern in blackstone | Atmosphere |
| Ancient-city remnant table | Chiseled deepslate + sculk + crafting table | Reuse ancient_city patterns |
| Sakura-tinted glass cube | Pink glass / petals | Soft contrast if sakura theme is active |
| Portal-frame fragment | Crying obsidian + end rod / amethyst | Dimension transition |

All of the above can be stamped with existing structure helpers and the current block palette in `blocks.ts`.

## Decision rule

- Generated worlds that must stay pack-free → portal-slice or pure vanilla structures.
- Optional visual upgrade for players who enable packs → custom geometry block.
- Never invent new architecture; always extend the current LevelDB / structure / decorate pipeline.
