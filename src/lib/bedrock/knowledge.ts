export const FORMAT_VERSIONS = [
  { kind: "Manifest", version: "2", note: "Always 2 for BP/RP on retail" },
  { kind: "min_engine_version", version: "[1, 21, 0]", note: "Header in manifest" },
  { kind: "Item (BP)", version: "1.21.30", note: "Holiday creator items are stable" },
  { kind: "Block (BP)", version: "1.21.40", note: "Custom blocks with components" },
  { kind: "Entity (BP)", version: "1.21.50", note: "Behavior entity" },
  { kind: "Recipe", version: "1.21.50", note: "Shaped / shapeless / furnace" },
  { kind: "Spawn rules", version: "1.8.0", note: "1.17.0 also valid" },
  { kind: "Client entity (RP)", version: "1.10.0", note: "Render description" },
  { kind: "Geometry", version: "1.12.0", note: "1.16.0 for newer cubes" },
  { kind: "Render controller", version: "1.10.0", note: "Texture / geometry bind" },
  { kind: "Animation / AC", version: "1.10.0", note: "RP or BP" },
  { kind: "Particle", version: "1.10.0", note: "RP particles folder" },
  { kind: "Attachable", version: "1.10.0", note: "Handheld / worn items" },
] as const;

export const IDENTIFIER_RULES = [
  "Format is namespace:name — example packwright:ruby_sword",
  "Namespace and name are lowercase a-z, 0-9, underscore. No spaces, no caps.",
  "Never use minecraft: for custom content. That namespace is vanilla-only.",
  "Keep the same identifier in BP, RP, recipes, lang, and loot tables.",
  "File names should match the name half: ruby_sword.json",
  "Lang keys: item.namespace:name, tile.namespace:name.name, entity.namespace:name.name",
];

export const PACK_STRUCTURE = {
  BP: [
    "manifest.json (required)",
    "pack_icon.png (256×256 recommended)",
    "texts/en_US.lang",
    "items/*.json",
    "blocks/*.json",
    "entities/*.json",
    "recipes/*.json",
    "loot_tables/**/*.json",
    "spawn_rules/*.json",
    "functions/**/*.mcfunction",
    "animation_controllers/",
    "scripts/*.js (Script API, needs a script module)",
  ],
  RP: [
    "manifest.json (required)",
    "pack_icon.png",
    "texts/en_US.lang",
    "textures/item_texture.json",
    "textures/terrain_texture.json",
    "textures/items/*.png",
    "textures/blocks/*.png",
    "textures/entity/*.png",
    "entity/*.json (client entity)",
    "models/entity/*.json",
    "render_controllers/*.json",
    "animations/*.json",
    "attachables/*.json",
    "particles/*.json",
    "sounds.json + sounds/",
  ],
};

export type ComponentDoc = {
  id: string;
  kind: "item" | "block" | "entity";
  summary: string;
};

export const COMPONENTS: ComponentDoc[] = [
  { id: "minecraft:icon", kind: "item", summary: "Short name that maps through item_texture.json." },
  { id: "minecraft:max_stack_size", kind: "item", summary: "1–64. Weapons and tools are 1." },
  { id: "minecraft:hand_equipped", kind: "item", summary: "Held like a tool, not a block." },
  { id: "minecraft:damage", kind: "item", summary: "Melee attack damage added to the fist." },
  { id: "minecraft:durability", kind: "item", summary: "{ max_durability: number }." },
  { id: "minecraft:enchantable", kind: "item", summary: "{ slot, value } — slot sword, bow, pickaxe, armor…" },
  { id: "minecraft:food", kind: "item", summary: "{ nutrition, saturation_modifier, can_always_eat }." },
  { id: "minecraft:use_modifiers", kind: "item", summary: "Use duration; pair with food or throwables." },
  { id: "minecraft:wearable", kind: "item", summary: "{ slot: slot.armor.head|chest|legs|feet }." },
  { id: "minecraft:cooldown", kind: "item", summary: "Category + duration after use." },
  { id: "minecraft:projectile", kind: "item", summary: "Defines the entity a thrown item becomes." },
  { id: "minecraft:throwable", kind: "item", summary: "Makes the item a throwable." },
  { id: "minecraft:digger", kind: "item", summary: "Block destroy speeds; use_efficiency for enchantments." },
  { id: "minecraft:display_name", kind: "item", summary: "Fallback name; still ship a lang line." },
  { id: "minecraft:glint", kind: "item", summary: "Enchantment glint overlay." },
  { id: "minecraft:geometry", kind: "block", summary: "minecraft:geometry.full_block or a custom geo identifier." },
  { id: "minecraft:material_instances", kind: "block", summary: "Per-face texture + render_method (opaque, alpha_test, blend)." },
  { id: "minecraft:destructible_by_mining", kind: "block", summary: "{ seconds_to_destroy }." },
  { id: "minecraft:destructible_by_explosion", kind: "block", summary: "{ explosion_resistance }." },
  { id: "minecraft:friction", kind: "block", summary: "0–1. Ice is low, soul sand is high." },
  { id: "minecraft:light_emission", kind: "block", summary: "0–15 glow." },
  { id: "minecraft:light_dampening", kind: "block", summary: "0–15 how much light the block eats." },
  { id: "minecraft:collision_box", kind: "block", summary: "Custom AABB or false to disable." },
  { id: "minecraft:selection_box", kind: "block", summary: "Outline box for targeting." },
  { id: "minecraft:loot", kind: "block", summary: "Path to a loot table." },
  { id: "minecraft:map_color", kind: "block", summary: "Hex color on maps." },
  { id: "minecraft:health", kind: "entity", summary: "{ value, max }." },
  { id: "minecraft:movement", kind: "entity", summary: "{ value } base speed." },
  { id: "minecraft:navigation.walk", kind: "entity", summary: "Ground pathfinding. Pair with movement.basic + jump.static." },
  { id: "minecraft:behavior.random_stroll", kind: "entity", summary: "Wander. Needs navigation." },
  { id: "minecraft:behavior.nearest_attackable_target", kind: "entity", summary: "Pick a target. Filters on families." },
  { id: "minecraft:behavior.melee_box_attack", kind: "entity", summary: "Close-range attack." },
  { id: "minecraft:attack", kind: "entity", summary: "{ damage } for melee." },
  { id: "minecraft:scale", kind: "entity", summary: "Visual and collision scale." },
  { id: "minecraft:type_family", kind: "entity", summary: "Families used by filters and damage." },
  { id: "minecraft:physics", kind: "entity", summary: "Gravity and collision with world." },
  { id: "minecraft:pushable", kind: "entity", summary: "Pushed by players / other entities." },
  { id: "minecraft:collision_box", kind: "entity", summary: "{ width, height } in blocks." },
  { id: "minecraft:loot", kind: "entity", summary: "Death loot table path." },
  { id: "minecraft:despawn", kind: "entity", summary: "Natural despawn rules." },
  { id: "minecraft:rideable", kind: "entity", summary: "Seats, controlling_seat, family types." },
  { id: "minecraft:variant", kind: "entity", summary: "Integer skin / mark variant." },
];

export const MOLANG = [
  { expr: "q.life_time", meaning: "Seconds since the particle/entity started." },
  { expr: "q.health / q.max_health", meaning: "Health ratio 0–1." },
  { expr: "q.is_on_ground", meaning: "1 if standing on a block." },
  { expr: "q.is_alive", meaning: "1 while the entity lives." },
  { expr: "q.modified_move_speed", meaning: "Current speed, for walk animations." },
  { expr: "v.attack_time", meaning: "Swing progress. Common in attack anims." },
  { expr: "t.var_name", meaning: "Temp variable, this evaluation only." },
  { expr: "v.var_name", meaning: "Variable stored on the object." },
  { expr: "c.is_first_person", meaning: "Client query for attachables." },
];

export const SCRIPT_API = [
  {
    module: "@minecraft/server",
    version: "2.0.0",
    note: "World, system, Player, Entity, Block. Declare in manifest dependencies.",
  },
  {
    module: "@minecraft/server-ui",
    version: "2.0.0",
    note: "ActionFormData, ModalFormData, MessageFormData.",
  },
  {
    module: "script module",
    version: "entry",
    note: "modules[].type = script, language javascript, entry scripts/main.js.",
  },
];

export const INSTALL_STEPS = [
  {
    platform: "Windows",
    steps:
      "Double-click the .mcaddon. Minecraft opens and imports both packs. Create or edit a world → Resource Packs / Behavior Packs → activate both (RP first is fine; BP depends on the RP UUID).",
  },
  {
    platform: "iOS / iPadOS / Android",
    steps:
      "Open the downloaded .mcaddon with Minecraft. Wait for the import toast. Enable both packs on the world. Some files apps need Share → Minecraft.",
  },
  {
    platform: "Realms",
    steps:
      "Activate the packs in a local world, then replace the Realm world — or upload via the Realm resource/behavior slots if you have a .mcpack each.",
  },
  {
    platform: "Dedicated server (BDS)",
    steps:
      "Drop the unzipped BP and RP into behavior_packs and resource_packs. Add header UUID + version to the world’s world_behavior_packs.json and world_resource_packs.json.",
  },
];

export const COMMON_FAILURES = [
  "Reused tutorial UUIDs. Every header and module UUID must be unique, worldwide.",
  "Behavior pack module type must be data. Resource pack must be resources. Mixing them hides the pack.",
  "Identifier in BP does not match RP client entity / item_texture key.",
  "Missing item_texture.json entry — the item exists but is a magenta/black missing texture.",
  "Custom content under the minecraft: namespace. It will collide or fail.",
  "JSON trailing commas. Bedrock JSON is strict.",
  "min_engine_version newer than the player’s game. The pack is hidden.",
  "Forgot en_US.lang — creative inventory shows raw identifiers.",
  "Entity has behavior.random_stroll but no navigation.walk / movement.basic — it never moves.",
  "Java datapack paths (data/namespace/functions). Bedrock uses BP/functions and BP JSON, not the Java tree.",
  "Using Forge/Fabric Java events. Use BP components, Molang, or @minecraft/server.",
];

export const JAVA_VS_BEDROCK = [
  {
    java: "data/<ns>/function/*.mcfunction + datapack",
    bedrock: "BP/functions/*.mcfunction + tick.json, or Script API",
  },
  {
    java: "assets/<ns>/models/item JSON models",
    bedrock: "RP/models + attachables + render controllers",
  },
  {
    java: "CraftTweaker / datapack recipes",
    bedrock: "BP/recipes/*.json (shaped, shapeless, furnace, brewing)",
  },
  {
    java: "Fabric/Forge entity attributes",
    bedrock: "BP entity components + component groups + events",
  },
  {
    java: "resource pack pack.mcmeta",
    bedrock: "manifest.json with UUID + modules",
  },
];

export const STARTER_PROMPTS = [
  "Forge a ruby sword: 8 damage, 750 durability, sword enchantments, crafting recipe from redstone and a stick.",
  "Make a moss mite — a small passive cube mob that wanders and drops mossy cobble.",
  "Add a packed moss block that mines like grass and uses a custom texture.",
  "Create a glowberry tart food: 6 hunger, fast eat, always edible.",
  "Explain why my custom item is a missing-texture square in the hotbar.",
  "What is the difference between format_version and min_engine_version?",
  "Give me a loot table that drops 0–2 custom gems from a custom ore.",
  "How do I declare @minecraft/server 2.0.0 in a behavior pack manifest?",
];
