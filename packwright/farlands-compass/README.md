# Far Lands Compass

Two navigation compass items for Minecraft Bedrock 1.21+ / 1.26.x.

| Item | Identifier | Target |
|------|------------|--------|
| Overworld Far Lands Compass | `farlands:overworld_compass` | Overworld X=16,777,216 Z=0 |
| Nether Far Lands Compass | `farlands:nether_compass` | Nether X=2,097,152 Z=0 |

## Behavior

- Hold the correct compass in the correct dimension → action bar shows live direction + distance.
- Wrong dimension → "Wrong Dimension".
- Within ~32 blocks of target → "Far Lands reached".
- Uses vanilla compass icon.
- Script API only (`@minecraft/server`).
- No terrain or world-gen changes.

## Install

1. Import the `.mcaddon` (or copy BP + RP folders).
2. Activate both packs on the world.
3. Enable Beta APIs if prompted.
4. `/give @s farlands:overworld_compass` and `/give @s farlands:nether_compass`
5. Or chat: `!farlands`

## Structure

```
FarLandsCompass_BP/
  manifest.json
  items/
  scripts/main.js
FarLandsCompass_RP/
  manifest.json
  texts/
```
