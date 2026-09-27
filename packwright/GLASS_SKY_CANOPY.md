# Glass Sky Canopy — Underworld

Reference screenshot: dense upward view of green / lime / purple / blue stained-glass cubes filling the sky (hanging sheets + fronds).

Photo saved for agents: user attachment `IMG_6100.jpg` (look-up through the canopy).

## Existing builder

File: `unstable-underworld-bedrock/src/world/structures_glass.ts`

```ts
export function glassSky(
  world: World,
  cx: number,
  cz: number,
  baseY: number,
  opts?: {
    layers?: number;        // default 5
    radius?: number;        // default 40
    layerGap?: number;      // default 7
    sheetThickness?: number;
    glasses?: BlockState[];
    underGlass?: BlockState[];
    frondChance?: number;   // green/lime hanging fronds
    seed?: number;
  },
): void
```

Canon: layered irregular discs of purple / blue / cyan / magenta glass, holes for parallax, green/lime fronds on the rim. Clamped under Y=124.

Related: `glassTree`, `prismPillar`, `glassMosaic`, `eyeWindow`, `gothicArch`, `PRISM` / `VIVID_PRISM` / `SOUL_GREEN` palettes.

## Goal: whole sky covered

Current calls are local landmarks (radius ~40). To cover the realm sky:

1. **Tile glassSky** across the map on a coarse grid (e.g. every 70–90 blocks) with overlapping radii so layers merge into a continuous canopy.
2. **Vary seed / offset** per tile so sheets do not form a flat grid pattern.
3. **Raise baseY** into the upper air (e.g. surface + 40–70, still under 124) so the player walks under a full stained-glass ceiling.
4. **Optional denser pass**: higher `layers`, larger `radius`, slightly higher `frondChance` for the look in the reference photo.
5. **Protect** after placement so later decorate passes do not punch holes in the canopy.

Suggested decorate-style call (illustrative):

```ts
// Cover a region with overlapping glass sky tiles
for (let cz = minZ; cz <= maxZ; cz += 80) {
  for (let cx = minX; cx <= maxX; cx += 80) {
    if (!world.inRealm(cx, cz)) continue;
    const y = Math.min(110, world.surfaceAt(cx, cz) + 55);
    glassSky(world, cx, cz, y, {
      layers: 6,
      radius: 55,
      layerGap: 6,
      frondChance: 0.14,
      seed: (cx * 131 + cz * 977) ^ 0x5c1a,
    });
  }
}
```

## Rules

- Pure vanilla stained glass. No packs required.
- Do not break existing glass cathedral / grove / tree logic; extend or add a dedicated sky pass.
- Keep reproducibility (seed from coordinates).
- Watch LevelDB size: full-sky glass is many blocks; prefer overlapping large sheets over solid fill.

## Status

- Builder already exists and matches the reference aesthetic.
- Full-sky tiling not yet forced in generation; Freebuff can wire the pass into decorate / areas when ready.
- Screenshot is the target look: looking straight up through dense green-purple glass swarm.
