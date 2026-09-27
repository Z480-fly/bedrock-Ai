# Far Lands Compass — Packwright Smith Knowledge

Separate lightweight addon (not part of Underworld generation).

## Purpose

Two navigation items that continuously point the player toward fixed Far Lands coordinates using Script API bearing + action bar. No coordinate HUD. No vanilla compass replacement.

## Targets

| Item | Identifier | Dimension | Target X/Z |
|------|------------|-----------|------------|
| Overworld Far Lands Compass | `farlands:overworld_compass` | Overworld only | 16,777,216 / 0 |
| Nether Far Lands Compass | `farlands:nether_compass` | Nether only | 2,097,152 / 0 |

Nether target is the 1:8 equivalent of the Overworld target.

## Behavior rules

- Correct dimension + held item → live action-bar direction + distance.
- Wrong dimension → "Wrong Dimension".
- Within ~32 blocks → "Far Lands reached".
- Direction is computed from player yaw vs bearing to the fixed X/Z.
- Vanilla compass icon. Max stack 1.

## Technical notes (Bedrock 1.21+ / 1.26.x)

- Module: `@minecraft/server` (stable).
- Continuous update via `system.runInterval` (every 5 ticks).
- Held item checked through inventory component + `selectedSlotIndex`.
- Dimension via `player.dimension.id`.
- Yaw via `player.getRotation().y`.
- Minecraft yaw convention: 0 = south (+Z), positive toward west.
- Bearing: `atan2(-dx, dz)` in degrees so it matches yaw.
- Display: `player.onScreenDisplay.setActionBar(...)`.
- Optional chat give: `!farlands` or `!fl`.

## What this does NOT do

- Does not modify terrain, world gen, dimensions, or existing blocks.
- Does not replace the vanilla compass system.
- Does not show raw coordinates as the primary UI (direction + distance only).
- Does not require experimental world-generation features.

## Location in this repo

```
packwright/farlands-compass/
  README.md
  FarLandsCompass_BP/
  FarLandsCompass_RP/
```

Import the packs (or the packaged `.mcaddon`) into a survival world, enable Beta APIs if prompted, then `/give` the items or use `!farlands`.

## Design pattern for similar navigation items

1. Custom item with vanilla icon if possible.
2. Script loop that only runs logic when the item is held.
3. Dimension gate before any target math.
4. Bearing from player position to fixed world X/Z.
5. Relative angle vs player yaw → short direction hint.
6. Distance threshold for "arrived".
7. Keep the addon self-contained; do not couple it to Underworld LevelDB generation.
