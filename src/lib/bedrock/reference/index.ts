export const CUSTOM_DIMENSION_PATTERNS = `
# Custom dimension patterns

- Custom dimensions are usually registered at startup via a behavior pack script.
- Bedrock custom dimensions are still tied to Beta APIs and often require a world reload.
- A custom dimension can be a void shell that is filled with structure tiles, world chunks, or block placement data at runtime.
- When a dimension is large, persist placement state in a world dynamic property so it does not regenerate every load.
- The world should keep the terrain in a saved dimension state instead of rebuilding a giant map from scratch.
- For large custom worlds, runtime placement and a structure/tile pipeline is a better pattern than trying to make Bedrock generate everything directly.
- Always keep the BP dimension definition, RP biome definition, and script registration consistent.
`;

export const CUSTOM_ITEM_PATTERNS = `
# Custom item patterns

- Custom items should keep identifiers consistent across BP, RP, recipes, scripts, and lang files.
- Use `minecraft:food`, `minecraft:use_modifiers`, and custom script components for consumables that grant effects.
- For custom effect items, register a custom item component through `@minecraft/server` and apply effects on consume.
- Pair the item JSON with an icon mapping in the resource pack and a matching lang line.
- A recipe should usually exist if the item is craftable, and it should reference the correct custom identifiers.
- Missing textures usually indicate an icon atlas or lang issue, not a script issue.
`;

export const FAILURE_PATTERNS = `
# Failure and anti-pattern patterns

- Wrong namespace usage: custom content should stay in the pack namespace, not the `minecraft:` namespace.
- Duplicate or reused UUIDs in manifests or script modules.
- Wrong module type in manifests: BP data modules and RP resources modules must match the pack.
- Missing `en_US.lang` lines make custom names unreadable in the creative inventory.
- Missing item atlas mappings cause a missing-texture square even when the item JSON is valid.
- Custom dimension problems often hide behind Beta API configuration rather than logic errors.
- If a pack loads but a feature does not work, check the manifest and file names before changing gameplay logic.
- Java datapack layouts should not be copied directly into Bedrock projects.
`;

export const WORLD_EXPORT_PATTERNS = `
# World export and procedural map patterns

- A `.mcworld` is a real Bedrock world archive, not just a texture or resource pack.
- World export projects often involve `level.dat`, `db/`, chunk metadata, and subchunk payload validation.
- Block palette validation matters: every block used in the world must exist for the target Bedrock version.
- Keep world generation deterministic and compact, especially on mobile.
- Performance and compatibility depend on chunk metadata, sparse subchunks, and controlled world complexity.
- A generated world should avoid unnecessary entities, ticking systems, and heavy data bloat.
`;

export const REFERENCE_GUIDES = [
  { name: "Custom dimensions", content: CUSTOM_DIMENSION_PATTERNS },
  { name: "Custom items", content: CUSTOM_ITEM_PATTERNS },
  { name: "Failure and anti-patterns", content: FAILURE_PATTERNS },
  { name: "World export and map generation", content: WORLD_EXPORT_PATTERNS },
];
