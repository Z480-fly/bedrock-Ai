# Universal Enchant Anvil

Custom enchant system for Bedrock 1.21+ / 1.26.x. Remade enchants apply to **any** weapon or armor via a custom anvil UI. Effects are script-driven (not vanilla compatibility tables).

## How to use

1. Import `UniversalEnchant.mcaddon` (BP + RP).
2. Enable **Beta APIs** on the world.
3. Chat `!ue` → get anvil block + 8 tomes.
4. Place **Universal Enchant Anvil**.
5. Hold any weapon or armor.
6. Interact with the anvil → pick category → enchant → level.
7. Cost: **1 Universal Enchant Tome** per apply.
8. Lore lines show as `UE: Sharpness V` etc.

## Commands

- `!ue` / `!universalenchant` — starter kit
- `!uehelp` — short help
- `/give @s universal:enchant_anvil`
- `/give @s universal:enchant_tome`

## Enchant categories implemented

- **Combat:** Sharpness, Smite, Bane, Fire Aspect, Knockback, Looting, Sweeping Edge
- **Armor:** Protection, Fire/Blast/Projectile Protection, Thorns, Feather Falling, Respiration, Aqua Affinity, Depth Strider, Soul Speed, Swift Sneak
- **Utility:** Unbreaking, Mending, Efficiency, Fortune, Silk Touch
- **Ranged:** Power, Punch, Flame, Infinity, Multishot, Piercing, Quick Charge, Loyalty, Channeling, Riptide, Impaling

## Effect notes (v1)

Fully scripted in combat pipeline:

- Sharpness / Smite / Bane / Impaling / Power → bonus damage on hit
- Fire Aspect / Flame → set on fire
- Knockback / Punch → applyKnockback
- Sweeping Edge → nearby entity damage
- Protection family / Feather Falling → mitigation assist on hurt
- Thorns → reflect chance

Tagged for future expansion (lore present, full dig/move effects can be extended):

- Looting, Mending, Efficiency, Fortune, Silk Touch, Infinity, etc.

## Design rules

- Does not modify vanilla enchant tables.
- Does not claim incompatible vanilla enchants on items.
- Universal = script lore + script effects.
- Lightweight; no world-gen changes.

## Files

```
UniversalEnchant_BP/
  manifest.json
  blocks/enchant_anvil.json
  items/enchant_tome.json
  scripts/main.js
UniversalEnchant_RP/
  manifest.json
  blocks.json
  textures/...
  texts/...
```
