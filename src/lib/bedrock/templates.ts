import type { PackFile } from "./types";
import {
  BLOCK_PIXELS,
  FOOD_PIXELS,
  MOB_PIXELS,
  SWORD_PIXELS,
  dataUrlToBase64,
  pixelsToPngDataUrl,
} from "./pixels";

export type TemplateId = "sword" | "food" | "block" | "mob";

export type PackTemplate = {
  id: TemplateId;
  title: string;
  blurb: string;
  build: (namespace: string) => PackFile[];
};

function pretty(value: unknown): string {
  return JSON.stringify(value, null, 2) + "\n";
}

function png(pixels: string[][]): PackFile["content"] {
  return dataUrlToBase64(pixelsToPngDataUrl(pixels, 1));
}

function swordFiles(ns: string): PackFile[] {
  const id = `${ns}:ruby_sword`;
  return [
    {
      path: "BP/items/ruby_sword.json",
      content: pretty({
        format_version: "1.21.30",
        "minecraft:item": {
          description: {
            identifier: id,
            menu_category: {
              category: "equipment",
              group: "minecraft:itemGroup.name.sword",
            },
          },
          components: {
            "minecraft:max_stack_size": 1,
            "minecraft:hand_equipped": true,
            "minecraft:icon": "ruby_sword",
            "minecraft:display_name": { value: "Ruby Sword" },
            "minecraft:damage": 8,
            "minecraft:durability": { max_durability: 750 },
            "minecraft:enchantable": { slot: "sword", value: 12 },
            "minecraft:digger": {
              use_efficiency: true,
              destroy_speeds: [
                {
                  block: { tags: "q.any_tag('minecraft:is_sword_item_destructible')" },
                  speed: 8,
                },
              ],
            },
          },
        },
      }),
    },
    {
      path: "BP/recipes/ruby_sword.json",
      content: pretty({
        format_version: "1.21.50",
        "minecraft:recipe_shaped": {
          description: { identifier: `${ns}:ruby_sword_recipe` },
          tags: ["crafting_table"],
          pattern: [" R ", " R ", " S "],
          key: {
            R: { item: "minecraft:redstone" },
            S: { item: "minecraft:stick" },
          },
          unlock: [{ item: "minecraft:redstone" }],
          result: { item: id },
        },
      }),
    },
    {
      path: "RP/textures/item_texture.json",
      content: pretty({
        resource_pack_name: ns,
        texture_name: "atlas.items",
        texture_data: { ruby_sword: { textures: "textures/items/ruby_sword" } },
      }),
    },
    {
      path: "RP/textures/items/ruby_sword.png",
      content: png(SWORD_PIXELS),
      encoding: "base64",
    },
    {
      path: "RP/texts/en_US.lang",
      content: `item.${id}=Ruby Sword\nitem.${id}.name=Ruby Sword\n`,
    },
    {
      path: "BP/texts/en_US.lang",
      content: `item.${id}=Ruby Sword\n`,
    },
  ];
}

function foodFiles(ns: string): PackFile[] {
  const id = `${ns}:glowberry_tart`;
  return [
    {
      path: "BP/items/glowberry_tart.json",
      content: pretty({
        format_version: "1.21.30",
        "minecraft:item": {
          description: {
            identifier: id,
            menu_category: { category: "equipment", group: "minecraft:itemGroup.name.miscFood" },
          },
          components: {
            "minecraft:max_stack_size": 16,
            "minecraft:icon": "glowberry_tart",
            "minecraft:display_name": { value: "Glowberry Tart" },
            "minecraft:use_modifiers": { use_duration: 1.6, movement_modifier: 0.35 },
            "minecraft:food": {
              nutrition: 6,
              saturation_modifier: 0.6,
              can_always_eat: true,
            },
            "minecraft:use_animation": "eat",
          },
        },
      }),
    },
    {
      path: "BP/recipes/glowberry_tart.json",
      content: pretty({
        format_version: "1.21.50",
        "minecraft:recipe_shapeless": {
          description: { identifier: `${ns}:glowberry_tart_recipe` },
          tags: ["crafting_table"],
          ingredients: [
            { item: "minecraft:glow_berries" },
            { item: "minecraft:glow_berries" },
            { item: "minecraft:wheat" },
            { item: "minecraft:egg" },
          ],
          unlock: [{ item: "minecraft:glow_berries" }],
          result: { item: id, count: 2 },
        },
      }),
    },
    {
      path: "RP/textures/item_texture.json",
      content: pretty({
        resource_pack_name: ns,
        texture_name: "atlas.items",
        texture_data: { glowberry_tart: { textures: "textures/items/glowberry_tart" } },
      }),
    },
    {
      path: "RP/textures/items/glowberry_tart.png",
      content: png(FOOD_PIXELS),
      encoding: "base64",
    },
    {
      path: "RP/texts/en_US.lang",
      content: `item.${id}=Glowberry Tart\nitem.${id}.name=Glowberry Tart\n`,
    },
  ];
}

function blockFiles(ns: string): PackFile[] {
  const id = `${ns}:packed_moss`;
  return [
    {
      path: "BP/blocks/packed_moss.json",
      content: pretty({
        format_version: "1.21.40",
        "minecraft:block": {
          description: {
            identifier: id,
            menu_category: { category: "construction" },
          },
          components: {
            "minecraft:geometry": "minecraft:geometry.full_block",
            "minecraft:material_instances": {
              "*": { texture: "packed_moss", render_method: "opaque" },
            },
            "minecraft:destructible_by_mining": { seconds_to_destroy: 0.8 },
            "minecraft:destructible_by_explosion": { explosion_resistance: 3 },
            "minecraft:friction": 0.6,
            "minecraft:map_color": "#6e8f52",
            "minecraft:loot": "loot_tables/blocks/packed_moss.json",
          },
        },
      }),
    },
    {
      path: "BP/loot_tables/blocks/packed_moss.json",
      content: pretty({
        pools: [
          {
            rolls: 1,
            entries: [{ type: "item", name: id, weight: 1 }],
          },
        ],
      }),
    },
    {
      path: "BP/recipes/packed_moss.json",
      content: pretty({
        format_version: "1.21.50",
        "minecraft:recipe_shaped": {
          description: { identifier: `${ns}:packed_moss_recipe` },
          tags: ["crafting_table"],
          pattern: ["MM", "MM"],
          key: { M: { item: "minecraft:moss_block" } },
          unlock: [{ item: "minecraft:moss_block" }],
          result: { item: id },
        },
      }),
    },
    {
      path: "RP/textures/terrain_texture.json",
      content: pretty({
        resource_pack_name: ns,
        texture_name: "atlas.terrain",
        padding: 8,
        num_mip_levels: 4,
        texture_data: { packed_moss: { textures: "textures/blocks/packed_moss" } },
      }),
    },
    {
      path: "RP/textures/blocks/packed_moss.png",
      content: png(BLOCK_PIXELS),
      encoding: "base64",
    },
    {
      path: "RP/texts/en_US.lang",
      content: `tile.${id}.name=Packed Moss\n`,
    },
  ];
}

function mobFiles(ns: string): PackFile[] {
  const id = `${ns}:moss_mite`;
  return [
    {
      path: "BP/entities/moss_mite.json",
      content: pretty({
        format_version: "1.21.50",
        "minecraft:entity": {
          description: {
            identifier: id,
            is_spawnable: true,
            is_summonable: true,
            is_experimental: false,
          },
          component_groups: {},
          components: {
            "minecraft:type_family": { family: ["moss_mite", "mob"] },
            "minecraft:collision_box": { width: 0.6, height: 0.6 },
            "minecraft:health": { value: 8, max: 8 },
            "minecraft:hurt_on_condition": {
              damage_conditions: [
                {
                  filters: { test: "in_lava", subject: "self", operator: "==", value: true },
                  cause: "lava",
                  damage_per_tick: 4,
                },
              ],
            },
            "minecraft:physics": {},
            "minecraft:pushable": { is_pushable: true, is_pushable_by_piston: true },
            "minecraft:movement": { value: 0.22 },
            "minecraft:movement.basic": {},
            "minecraft:jump.static": {},
            "minecraft:navigation.walk": {
              can_walk: true,
              avoid_water: true,
              avoid_damage_blocks: true,
            },
            "minecraft:behavior.float": { priority: 0 },
            "minecraft:behavior.panic": { priority: 1, speed_multiplier: 1.6 },
            "minecraft:behavior.random_stroll": { priority: 4, speed_multiplier: 1 },
            "minecraft:behavior.look_at_player": { priority: 5, look_distance: 6, probability: 0.02 },
            "minecraft:behavior.random_look_around": { priority: 6 },
            "minecraft:loot": { table: "loot_tables/entities/moss_mite.json" },
            "minecraft:despawn": {
              despawn_from_distance: { min_distance: 32, max_distance: 56 },
            },
            "minecraft:scale": { value: 0.85 },
          },
          events: {},
        },
      }),
    },
    {
      path: "BP/loot_tables/entities/moss_mite.json",
      content: pretty({
        pools: [
          {
            rolls: 1,
            entries: [
              {
                type: "item",
                name: "minecraft:mossy_cobblestone",
                weight: 1,
                functions: [{ function: "set_count", count: { min: 0, max: 2 } }],
              },
            ],
          },
        ],
      }),
    },
    {
      path: "BP/spawn_rules/moss_mite.json",
      content: pretty({
        format_version: "1.8.0",
        "minecraft:spawn_rules": {
          description: { identifier: id, population_control: "animal" },
          conditions: [
            {
              "minecraft:spawns_on_surface": {},
              "minecraft:brightness_filter": { min: 7, max: 15, adjust_for_weather: false },
              "minecraft:weight": { default: 8 },
              "minecraft:herd": { min_size: 2, max_size: 4 },
              "minecraft:biome_filter": {
                test: "has_biome_tag",
                operator: "==",
                value: "animal",
              },
            },
          ],
        },
      }),
    },
    {
      path: "RP/entity/moss_mite.json",
      content: pretty({
        format_version: "1.10.0",
        "minecraft:client_entity": {
          description: {
            identifier: id,
            materials: { default: "entity_alphatest" },
            textures: { default: `textures/entity/moss_mite` },
            geometry: { default: "geometry.moss_mite" },
            render_controllers: ["controller.render.moss_mite"],
            spawn_egg: { base_color: "#6e8f52", overlay_color: "#c5d9a8" },
          },
        },
      }),
    },
    {
      path: "RP/models/entity/moss_mite.geo.json",
      content: pretty({
        format_version: "1.12.0",
        "minecraft:geometry": [
          {
            description: {
              identifier: "geometry.moss_mite",
              texture_width: 16,
              texture_height: 16,
              visible_bounds_width: 2,
              visible_bounds_height: 2,
              visible_bounds_offset: [0, 0.5, 0],
            },
            bones: [
              {
                name: "body",
                pivot: [0, 0, 0],
                cubes: [{ origin: [-4, 0, -4], size: [8, 8, 8], uv: [0, 0] }],
              },
            ],
          },
        ],
      }),
    },
    {
      path: "RP/render_controllers/moss_mite.json",
      content: pretty({
        format_version: "1.10.0",
        render_controllers: {
          "controller.render.moss_mite": {
            geometry: "geometry.default",
            materials: [{ "*": "material.default" }],
            textures: ["texture.default"],
          },
        },
      }),
    },
    {
      path: "RP/textures/entity/moss_mite.png",
      content: png(MOB_PIXELS),
      encoding: "base64",
    },
    {
      path: "RP/texts/en_US.lang",
      content: `entity.${id}.name=Moss Mite\nitem.spawn_egg.entity.${id}.name=Moss Mite Spawn Egg\n`,
    },
  ];
}

export const TEMPLATES: PackTemplate[] = [
  {
    id: "sword",
    title: "Ruby sword",
    blurb: "Equipment item, durability, recipe, 16×16 texture.",
    build: swordFiles,
  },
  {
    id: "food",
    title: "Glowberry tart",
    blurb: "Food item with nutrition, eat animation, shapeless recipe.",
    build: foodFiles,
  },
  {
    id: "block",
    title: "Packed moss",
    blurb: "Custom full block, loot, terrain texture, shaped recipe.",
    build: blockFiles,
  },
  {
    id: "mob",
    title: "Moss mite",
    blurb: "Passive cube mob: BP entity, spawn rules, geo, render, loot.",
    build: mobFiles,
  },
];
