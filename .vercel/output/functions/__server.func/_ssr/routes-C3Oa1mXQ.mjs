import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { _ as Check, a as Send, b as BookOpen, c as Image, d as FileJson, f as FileCode2, g as ChevronDown, h as ChevronRight, i as Sword, l as Hammer, m as Copy, n as TriangleAlert, o as Plus, p as Download, r as Trash2, s as LoaderCircle, t as X, u as FolderTree, v as Bug, x as Apple, y as BrickWall } from "../_libs/lucide-react.mjs";
import { a as DialogOverlay$1, i as DialogDescription$1, m as Slot, n as DialogClose, o as DialogPortal$1, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as IDENTIFIER_RULES, c as MOLANG, d as STARTER_PROMPTS, f as Route$1, i as FORMAT_VERSIONS, l as PACK_STRUCTURE, n as COMMON_FAILURES, o as INSTALL_STEPS, p as cn, r as COMPONENTS, s as JAVA_VS_BEDROCK, u as SCRIPT_API } from "./router-4xYrrImm.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { t as require_lib } from "../_libs/jszip+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-C3Oa1mXQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_lib = /* @__PURE__ */ __toESM(require_lib());
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-[opacity,background-color,transform,box-shadow] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]", {
	variants: {
		variant: {
			default: "bg-accent text-accent-fg hover:opacity-90",
			secondary: "bg-elevated text-fg shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]",
			ghost: "text-muted hover:bg-elevated hover:text-fg",
			outline: "bg-transparent text-fg shadow-[var(--shadow-border)] hover:bg-elevated",
			danger: "bg-danger text-fg hover:opacity-90"
		},
		size: {
			default: "h-11 rounded-md px-4",
			sm: "h-9 rounded-sm px-3 text-xs",
			lg: "h-12 rounded-lg px-5",
			icon: "size-11 rounded-md",
			"icon-sm": "size-9 rounded-sm"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-11 w-full rounded-md bg-elevated px-3 text-sm text-fg shadow-[var(--shadow-border)]", "placeholder:text-subtle", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent", "disabled:cursor-not-allowed disabled:opacity-40", className),
		ref,
		...props
	});
});
Input.displayName = "Input";
/** Tiny nearest-neighbour PNG from a hex grid. Browser-only. */
function pixelsToPngDataUrl(pixels, scale = 1) {
	const h = pixels.length;
	const w = pixels[0]?.length ?? 0;
	const canvas = document.createElement("canvas");
	canvas.width = w * scale;
	canvas.height = h * scale;
	const ctx = canvas.getContext("2d");
	if (!ctx) return "";
	ctx.imageSmoothingEnabled = false;
	for (let y = 0; y < h; y++) {
		const row = pixels[y] ?? [];
		for (let x = 0; x < w; x++) {
			const color = row[x];
			if (!color || color === "transparent") continue;
			ctx.fillStyle = color;
			ctx.fillRect(x * scale, y * scale, scale, scale);
		}
	}
	return canvas.toDataURL("image/png");
}
function dataUrlToBase64(dataUrl) {
	const comma = dataUrl.indexOf(",");
	return comma >= 0 ? dataUrl.slice(comma + 1) : dataUrl;
}
function makePackIcon(seed) {
	const moss = [
		"#6e8f52",
		"#9bbf7a",
		"#c5d9a8",
		"#4f6a38",
		"#1c211c"
	];
	const n = hash(seed);
	const size = 16;
	const grid = [];
	for (let y = 0; y < size; y++) {
		const row = [];
		for (let x = 0; x < size; x++) {
			if (x === 0 || y === 0 || x === 15 || y === 15) {
				row.push("#0b0d0b");
				continue;
			}
			const v = (hash(`${n}-${x}-${y}`) + x * 3 + y * 5) % moss.length;
			row.push(moss[v] ?? "#9bbf7a");
		}
		grid.push(row);
	}
	const mid = 6;
	for (let y = mid; y < 10; y++) for (let x = mid; x < 10; x++) {
		const cell = grid[y];
		if (cell) cell[x] = "#e6ebe3";
	}
	return pixelsToPngDataUrl(grid, 16);
}
function hash(input) {
	let h = 2166136261;
	for (let i = 0; i < input.length; i++) {
		h ^= input.charCodeAt(i);
		h = Math.imul(h, 16777619);
	}
	return h >>> 0;
}
var SWORD_PIXELS = [
	[
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"#d7e4c5",
		"#9bbf7a",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent"
	],
	[
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"#d7e4c5",
		"#e6ebe3",
		"#6e8f52",
		"#4f6a38",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent"
	],
	[
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"#d7e4c5",
		"#e6ebe3",
		"#9bbf7a",
		"#6e8f52",
		"#4f6a38",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent"
	],
	[
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"#c5d9a8",
		"#e6ebe3",
		"#9bbf7a",
		"#6e8f52",
		"#4f6a38",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent"
	],
	[
		"transparent",
		"transparent",
		"transparent",
		"#c5d9a8",
		"#e6ebe3",
		"#9bbf7a",
		"#6e8f52",
		"#4f6a38",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent"
	],
	[
		"transparent",
		"transparent",
		"#c5d9a8",
		"#e6ebe3",
		"#9bbf7a",
		"#6e8f52",
		"#4f6a38",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent"
	],
	[
		"transparent",
		"#8a6a48",
		"#e6ebe3",
		"#9bbf7a",
		"#6e8f52",
		"#4f6a38",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent"
	],
	[
		"#8a6a48",
		"#c4a07a",
		"#8a6a48",
		"#6e8f52",
		"#4f6a38",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent"
	],
	[
		"transparent",
		"#8a6a48",
		"#c4a07a",
		"#8a6a48",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent"
	],
	[
		"transparent",
		"transparent",
		"#8a6a48",
		"#5c4630",
		"#8a6a48",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent"
	],
	[
		"transparent",
		"transparent",
		"transparent",
		"#8a6a48",
		"#5c4630",
		"#8a6a48",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent"
	],
	[
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"#8a6a48",
		"#5c4630",
		"#8a6a48",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent"
	],
	[
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"#8a6a48",
		"#5c4630",
		"#3d2e20",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent"
	],
	[
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"#5c4630",
		"#3d2e20",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent"
	],
	[
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"#3d2e20",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent"
	],
	[
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent",
		"transparent"
	]
];
var FOOD_PIXELS = fillPattern([
	"#3d2e20",
	"#8a6a48",
	"#c45c4c",
	"#e6ebe3",
	"#9bbf7a",
	"#6e8f52"
]);
var BLOCK_PIXELS = (() => {
	const a = [
		"#4f6a38",
		"#6e8f52",
		"#9bbf7a",
		"#3d522c"
	];
	const grid = [];
	for (let y = 0; y < 16; y++) {
		const row = [];
		for (let x = 0; x < 16; x++) row.push(a[(x + y * 3 + (x >> 2) + (y >> 1)) % a.length] ?? "#6e8f52");
		grid.push(row);
	}
	return grid;
})();
var MOB_PIXELS = (() => {
	const grid = Array.from({ length: 16 }, () => Array.from({ length: 16 }, () => "#6e8f52"));
	for (let y = 0; y < 16; y++) for (let x = 0; x < 16; x++) {
		const row = grid[y];
		if (!row) continue;
		if (x === 0 || y === 0 || x === 15 || y === 15) row[x] = "#4f6a38";
		if ((x === 5 || x === 10) && y === 6) row[x] = "#0b0d0b";
		if (y === 10 && x >= 6 && x <= 9) row[x] = "#3d2e20";
		if ((x + y) % 7 === 0) row[x] = "#9bbf7a";
	}
	return grid;
})();
function fillPattern(palette) {
	const grid = [];
	for (let y = 0; y < 16; y++) {
		const row = [];
		for (let x = 0; x < 16; x++) {
			const ring = Math.min(x, y, 15 - x, 15 - y);
			if (ring === 0) row.push(palette[0] ?? "#3d2e20");
			else if (ring === 1) row.push(palette[1] ?? "#8a6a48");
			else if (x >= 5 && x <= 10 && y >= 5 && y <= 10) row.push(palette[2] ?? "#c45c4c");
			else row.push(palette[(x + y) % 2 === 0 ? 4 : 5] ?? "#9bbf7a");
		}
		grid.push(row);
	}
	return grid;
}
var MIN_ENGINE = [
	1,
	21,
	0
];
function slugifyNamespace(name) {
	const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "").slice(0, 24);
	return slug.length >= 2 ? slug : "packwright";
}
function isValidNamespace(ns) {
	return /^[a-z][a-z0-9_]{1,23}$/.test(ns);
}
function pretty$1(value) {
	return JSON.stringify(value, null, 2) + "\n";
}
function createBlankPack(input) {
	const bpHeader = crypto.randomUUID();
	const bpModule = crypto.randomUUID();
	const rpHeader = crypto.randomUUID();
	const rpModule = crypto.randomUUID();
	const icon = dataUrlToBase64(makePackIcon(input.namespace + input.name));
	const bpManifest = {
		format_version: 2,
		header: {
			name: input.name,
			description: input.description,
			uuid: bpHeader,
			version: [
				1,
				0,
				0
			],
			min_engine_version: MIN_ENGINE
		},
		modules: [{
			type: "data",
			uuid: bpModule,
			version: [
				1,
				0,
				0
			]
		}],
		dependencies: [{
			uuid: rpHeader,
			version: [
				1,
				0,
				0
			]
		}],
		metadata: {
			authors: ["Packwright"],
			generated_with: { packwright: ["1.0.0"] }
		}
	};
	const rpManifest = {
		format_version: 2,
		header: {
			name: `${input.name} Resources`,
			description: `Textures and models for ${input.name}`,
			uuid: rpHeader,
			version: [
				1,
				0,
				0
			],
			min_engine_version: MIN_ENGINE
		},
		modules: [{
			type: "resources",
			uuid: rpModule,
			version: [
				1,
				0,
				0
			]
		}],
		metadata: {
			authors: ["Packwright"],
			generated_with: { packwright: ["1.0.0"] }
		}
	};
	const itemTexture = {
		resource_pack_name: input.namespace,
		texture_name: "atlas.items",
		texture_data: {}
	};
	const terrainTexture = {
		resource_pack_name: input.namespace,
		texture_name: "atlas.terrain",
		padding: 8,
		num_mip_levels: 4,
		texture_data: {}
	};
	const lang = [
		`pack.name=${input.name}`,
		`pack.description=${input.description}`,
		""
	].join("\n");
	return [
		{
			path: "BP/manifest.json",
			content: pretty$1(bpManifest)
		},
		{
			path: "BP/pack_icon.png",
			content: icon,
			encoding: "base64"
		},
		{
			path: "BP/texts/en_US.lang",
			content: lang
		},
		{
			path: "RP/manifest.json",
			content: pretty$1(rpManifest)
		},
		{
			path: "RP/pack_icon.png",
			content: icon,
			encoding: "base64"
		},
		{
			path: "RP/texts/en_US.lang",
			content: lang
		},
		{
			path: "RP/textures/item_texture.json",
			content: pretty$1(itemTexture)
		},
		{
			path: "RP/textures/terrain_texture.json",
			content: pretty$1(terrainTexture)
		}
	];
}
function upsertFile(files, next) {
	if (!files.find((f) => f.path === next.path)) return [...files, next].sort((a, b) => a.path.localeCompare(b.path));
	if (shouldMerge(next.path)) return files.map((f) => f.path === next.path ? {
		...f,
		content: mergeContents(f, next)
	} : f);
	return files.map((f) => f.path === next.path ? {
		...next,
		encoding: next.encoding ?? f.encoding
	} : f);
}
function shouldMerge(path) {
	return path.endsWith("item_texture.json") || path.endsWith("terrain_texture.json") || path.endsWith("en_US.lang");
}
function mergeContents(prev, next) {
	if (prev.path.endsWith(".lang") || next.path.endsWith(".lang")) return [...new Set([...prev.content.split(/\r?\n/), ...next.content.split(/\r?\n/)].map((l) => l.trimEnd()).filter((l) => l.length > 0))].join("\n") + "\n";
	try {
		const a = JSON.parse(prev.content);
		const b = JSON.parse(next.content);
		const aData = a.texture_data ?? {};
		const bData = b.texture_data ?? {};
		return JSON.stringify({
			...a,
			...b,
			texture_data: {
				...aData,
				...bData
			}
		}, null, 2) + "\n";
	} catch {
		return next.content;
	}
}
function newProject(input) {
	const now = Date.now();
	return {
		id: crypto.randomUUID(),
		name: input.name.trim() || "Untitled Pack",
		namespace: slugifyNamespace(input.namespace || input.name),
		description: input.description.trim() || "A Minecraft Bedrock addon forged in Packwright.",
		files: createBlankPack({
			name: input.name.trim() || "Untitled Pack",
			namespace: slugifyNamespace(input.namespace || input.name),
			description: input.description.trim() || "A Minecraft Bedrock addon forged in Packwright."
		}),
		messages: [],
		createdAt: now,
		updatedAt: now
	};
}
function validateProject(project) {
	const issues = [];
	const paths = new Set(project.files.map((f) => f.path));
	if (!paths.has("BP/manifest.json")) issues.push({
		path: "BP/manifest.json",
		level: "error",
		message: "Behavior pack manifest is missing."
	});
	if (!paths.has("RP/manifest.json")) issues.push({
		path: "RP/manifest.json",
		level: "error",
		message: "Resource pack manifest is missing."
	});
	if (!isValidNamespace(project.namespace)) issues.push({
		path: "project",
		level: "error",
		message: "Namespace must be lowercase, start with a letter, and use only a-z, 0-9, underscore."
	});
	for (const file of project.files) {
		if (file.encoding === "base64") continue;
		if (file.path.endsWith(".json")) try {
			JSON.parse(file.content);
		} catch (err) {
			issues.push({
				path: file.path,
				level: "error",
				message: err instanceof Error ? err.message : "Invalid JSON"
			});
		}
		if (file.path === "BP/manifest.json") try {
			const manifest = JSON.parse(file.content);
			const type = manifest.modules?.[0]?.type;
			if (type && type !== "data" && type !== "script") issues.push({
				path: file.path,
				level: "error",
				message: `Behavior pack module type should be "data" (found "${type}").`
			});
			if (!manifest.header?.uuid) issues.push({
				path: file.path,
				level: "error",
				message: "Header UUID is required."
			});
		} catch {}
		if (file.path === "RP/manifest.json") try {
			const type = JSON.parse(file.content).modules?.[0]?.type;
			if (type && type !== "resources") issues.push({
				path: file.path,
				level: "error",
				message: `Resource pack module type should be "resources" (found "${type}").`
			});
		} catch {}
	}
	return issues;
}
function fileKind(path) {
	if (path.endsWith(".json")) return "json";
	if (path.endsWith(".lang")) return "lang";
	if (path.endsWith(".mcfunction") || path.endsWith(".js") || path.endsWith(".ts")) return "function";
	if (path.endsWith(".png")) return "png";
	return "other";
}
function dirname(path) {
	const i = path.lastIndexOf("/");
	return i <= 0 ? "" : path.slice(0, i);
}
function basename(path) {
	const i = path.lastIndexOf("/");
	return i < 0 ? path : path.slice(i + 1);
}
function pretty(value) {
	return JSON.stringify(value, null, 2) + "\n";
}
function png(pixels) {
	return dataUrlToBase64(pixelsToPngDataUrl(pixels, 1));
}
function swordFiles(ns) {
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
							group: "minecraft:itemGroup.name.sword"
						}
					},
					components: {
						"minecraft:max_stack_size": 1,
						"minecraft:hand_equipped": true,
						"minecraft:icon": "ruby_sword",
						"minecraft:display_name": { value: "Ruby Sword" },
						"minecraft:damage": 8,
						"minecraft:durability": { max_durability: 750 },
						"minecraft:enchantable": {
							slot: "sword",
							value: 12
						},
						"minecraft:digger": {
							use_efficiency: true,
							destroy_speeds: [{
								block: { tags: "q.any_tag('minecraft:is_sword_item_destructible')" },
								speed: 8
							}]
						}
					}
				}
			})
		},
		{
			path: "BP/recipes/ruby_sword.json",
			content: pretty({
				format_version: "1.21.50",
				"minecraft:recipe_shaped": {
					description: { identifier: `${ns}:ruby_sword_recipe` },
					tags: ["crafting_table"],
					pattern: [
						" R ",
						" R ",
						" S "
					],
					key: {
						R: { item: "minecraft:redstone" },
						S: { item: "minecraft:stick" }
					},
					unlock: [{ item: "minecraft:redstone" }],
					result: { item: id }
				}
			})
		},
		{
			path: "RP/textures/item_texture.json",
			content: pretty({
				resource_pack_name: ns,
				texture_name: "atlas.items",
				texture_data: { ruby_sword: { textures: "textures/items/ruby_sword" } }
			})
		},
		{
			path: "RP/textures/items/ruby_sword.png",
			content: png(SWORD_PIXELS),
			encoding: "base64"
		},
		{
			path: "RP/texts/en_US.lang",
			content: `item.${id}=Ruby Sword\nitem.${id}.name=Ruby Sword\n`
		},
		{
			path: "BP/texts/en_US.lang",
			content: `item.${id}=Ruby Sword\n`
		}
	];
}
function foodFiles(ns) {
	const id = `${ns}:glowberry_tart`;
	return [
		{
			path: "BP/items/glowberry_tart.json",
			content: pretty({
				format_version: "1.21.30",
				"minecraft:item": {
					description: {
						identifier: id,
						menu_category: {
							category: "equipment",
							group: "minecraft:itemGroup.name.miscFood"
						}
					},
					components: {
						"minecraft:max_stack_size": 16,
						"minecraft:icon": "glowberry_tart",
						"minecraft:display_name": { value: "Glowberry Tart" },
						"minecraft:use_modifiers": {
							use_duration: 1.6,
							movement_modifier: .35
						},
						"minecraft:food": {
							nutrition: 6,
							saturation_modifier: .6,
							can_always_eat: true
						},
						"minecraft:use_animation": "eat"
					}
				}
			})
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
						{ item: "minecraft:egg" }
					],
					unlock: [{ item: "minecraft:glow_berries" }],
					result: {
						item: id,
						count: 2
					}
				}
			})
		},
		{
			path: "RP/textures/item_texture.json",
			content: pretty({
				resource_pack_name: ns,
				texture_name: "atlas.items",
				texture_data: { glowberry_tart: { textures: "textures/items/glowberry_tart" } }
			})
		},
		{
			path: "RP/textures/items/glowberry_tart.png",
			content: png(FOOD_PIXELS),
			encoding: "base64"
		},
		{
			path: "RP/texts/en_US.lang",
			content: `item.${id}=Glowberry Tart\nitem.${id}.name=Glowberry Tart\n`
		}
	];
}
function blockFiles(ns) {
	const id = `${ns}:packed_moss`;
	return [
		{
			path: "BP/blocks/packed_moss.json",
			content: pretty({
				format_version: "1.21.40",
				"minecraft:block": {
					description: {
						identifier: id,
						menu_category: { category: "construction" }
					},
					components: {
						"minecraft:geometry": "minecraft:geometry.full_block",
						"minecraft:material_instances": { "*": {
							texture: "packed_moss",
							render_method: "opaque"
						} },
						"minecraft:destructible_by_mining": { seconds_to_destroy: .8 },
						"minecraft:destructible_by_explosion": { explosion_resistance: 3 },
						"minecraft:friction": .6,
						"minecraft:map_color": "#6e8f52",
						"minecraft:loot": "loot_tables/blocks/packed_moss.json"
					}
				}
			})
		},
		{
			path: "BP/loot_tables/blocks/packed_moss.json",
			content: pretty({ pools: [{
				rolls: 1,
				entries: [{
					type: "item",
					name: id,
					weight: 1
				}]
			}] })
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
					result: { item: id }
				}
			})
		},
		{
			path: "RP/textures/terrain_texture.json",
			content: pretty({
				resource_pack_name: ns,
				texture_name: "atlas.terrain",
				padding: 8,
				num_mip_levels: 4,
				texture_data: { packed_moss: { textures: "textures/blocks/packed_moss" } }
			})
		},
		{
			path: "RP/textures/blocks/packed_moss.png",
			content: png(BLOCK_PIXELS),
			encoding: "base64"
		},
		{
			path: "RP/texts/en_US.lang",
			content: `tile.${id}.name=Packed Moss\n`
		}
	];
}
function mobFiles(ns) {
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
						is_experimental: false
					},
					component_groups: {},
					components: {
						"minecraft:type_family": { family: ["moss_mite", "mob"] },
						"minecraft:collision_box": {
							width: .6,
							height: .6
						},
						"minecraft:health": {
							value: 8,
							max: 8
						},
						"minecraft:hurt_on_condition": { damage_conditions: [{
							filters: {
								test: "in_lava",
								subject: "self",
								operator: "==",
								value: true
							},
							cause: "lava",
							damage_per_tick: 4
						}] },
						"minecraft:physics": {},
						"minecraft:pushable": {
							is_pushable: true,
							is_pushable_by_piston: true
						},
						"minecraft:movement": { value: .22 },
						"minecraft:movement.basic": {},
						"minecraft:jump.static": {},
						"minecraft:navigation.walk": {
							can_walk: true,
							avoid_water: true,
							avoid_damage_blocks: true
						},
						"minecraft:behavior.float": { priority: 0 },
						"minecraft:behavior.panic": {
							priority: 1,
							speed_multiplier: 1.6
						},
						"minecraft:behavior.random_stroll": {
							priority: 4,
							speed_multiplier: 1
						},
						"minecraft:behavior.look_at_player": {
							priority: 5,
							look_distance: 6,
							probability: .02
						},
						"minecraft:behavior.random_look_around": { priority: 6 },
						"minecraft:loot": { table: "loot_tables/entities/moss_mite.json" },
						"minecraft:despawn": { despawn_from_distance: {
							min_distance: 32,
							max_distance: 56
						} },
						"minecraft:scale": { value: .85 }
					},
					events: {}
				}
			})
		},
		{
			path: "BP/loot_tables/entities/moss_mite.json",
			content: pretty({ pools: [{
				rolls: 1,
				entries: [{
					type: "item",
					name: "minecraft:mossy_cobblestone",
					weight: 1,
					functions: [{
						function: "set_count",
						count: {
							min: 0,
							max: 2
						}
					}]
				}]
			}] })
		},
		{
			path: "BP/spawn_rules/moss_mite.json",
			content: pretty({
				format_version: "1.8.0",
				"minecraft:spawn_rules": {
					description: {
						identifier: id,
						population_control: "animal"
					},
					conditions: [{
						"minecraft:spawns_on_surface": {},
						"minecraft:brightness_filter": {
							min: 7,
							max: 15,
							adjust_for_weather: false
						},
						"minecraft:weight": { default: 8 },
						"minecraft:herd": {
							min_size: 2,
							max_size: 4
						},
						"minecraft:biome_filter": {
							test: "has_biome_tag",
							operator: "==",
							value: "animal"
						}
					}]
				}
			})
		},
		{
			path: "RP/entity/moss_mite.json",
			content: pretty({
				format_version: "1.10.0",
				"minecraft:client_entity": { description: {
					identifier: id,
					materials: { default: "entity_alphatest" },
					textures: { default: `textures/entity/moss_mite` },
					geometry: { default: "geometry.moss_mite" },
					render_controllers: ["controller.render.moss_mite"],
					spawn_egg: {
						base_color: "#6e8f52",
						overlay_color: "#c5d9a8"
					}
				} }
			})
		},
		{
			path: "RP/models/entity/moss_mite.geo.json",
			content: pretty({
				format_version: "1.12.0",
				"minecraft:geometry": [{
					description: {
						identifier: "geometry.moss_mite",
						texture_width: 16,
						texture_height: 16,
						visible_bounds_width: 2,
						visible_bounds_height: 2,
						visible_bounds_offset: [
							0,
							.5,
							0
						]
					},
					bones: [{
						name: "body",
						pivot: [
							0,
							0,
							0
						],
						cubes: [{
							origin: [
								-4,
								0,
								-4
							],
							size: [
								8,
								8,
								8
							],
							uv: [0, 0]
						}]
					}]
				}]
			})
		},
		{
			path: "RP/render_controllers/moss_mite.json",
			content: pretty({
				format_version: "1.10.0",
				render_controllers: { "controller.render.moss_mite": {
					geometry: "geometry.default",
					materials: [{ "*": "material.default" }],
					textures: ["texture.default"]
				} }
			})
		},
		{
			path: "RP/textures/entity/moss_mite.png",
			content: png(MOB_PIXELS),
			encoding: "base64"
		},
		{
			path: "RP/texts/en_US.lang",
			content: `entity.${id}.name=Moss Mite\nitem.spawn_egg.entity.${id}.name=Moss Mite Spawn Egg\n`
		}
	];
}
var TEMPLATES = [
	{
		id: "sword",
		title: "Ruby sword",
		blurb: "Equipment item, durability, recipe, 16×16 texture.",
		build: swordFiles
	},
	{
		id: "food",
		title: "Glowberry tart",
		blurb: "Food item with nutrition, eat animation, shapeless recipe.",
		build: foodFiles
	},
	{
		id: "block",
		title: "Packed moss",
		blurb: "Custom full block, loot, terrain texture, shaped recipe.",
		build: blockFiles
	},
	{
		id: "mob",
		title: "Moss mite",
		blurb: "Passive cube mob: BP entity, spawn rules, geo, render, loot.",
		build: mobFiles
	}
];
function touch(project) {
	return {
		...project,
		updatedAt: Date.now()
	};
}
function withCurrent(state, fn) {
	const id = state.currentId;
	if (!id) return {};
	return { projects: state.projects.map((p) => p.id === id ? touch(fn(p)) : p) };
}
var useStudio = create()(persist((set, get) => ({
	projects: [],
	currentId: null,
	selectedPath: null,
	mobileTab: "smith",
	draftMessages: [],
	hydrated: false,
	setHydrated: () => set({ hydrated: true }),
	current: () => get().projects.find((p) => p.id === get().currentId) ?? null,
	messages: () => {
		const project = get().current();
		return project ? project.messages : get().draftMessages;
	},
	issues: () => {
		const project = get().current();
		return project ? validateProject(project) : [];
	},
	setMobileTab: (mobileTab) => set({ mobileTab }),
	selectPath: (selectedPath) => set({
		selectedPath,
		mobileTab: "editor"
	}),
	createPack: (input) => {
		const drafts = get().draftMessages;
		const project = {
			...newProject(input),
			messages: drafts
		};
		set((s) => ({
			projects: [project, ...s.projects],
			currentId: project.id,
			selectedPath: "BP/manifest.json",
			draftMessages: []
		}));
		return project.id;
	},
	openPack: (id) => {
		set({
			currentId: id,
			selectedPath: get().projects.find((p) => p.id === id)?.files[0]?.path ?? null,
			mobileTab: "files"
		});
	},
	closePack: () => set({
		currentId: null,
		selectedPath: null,
		mobileTab: "smith"
	}),
	deletePack: (id) => set((s) => {
		const projects = s.projects.filter((p) => p.id !== id);
		const currentId = s.currentId === id ? null : s.currentId;
		return {
			projects,
			currentId,
			selectedPath: currentId ? s.selectedPath : null
		};
	}),
	applyFiles: (files) => set((s) => withCurrent(s, (project) => {
		let next = project.files;
		for (const file of files) next = upsertFile(next, file);
		return {
			...project,
			files: next
		};
	})),
	applyTemplate: (id) => {
		const template = TEMPLATES.find((t) => t.id === id);
		if (!template) return;
		if (!get().current()) get().createPack({
			name: template.title,
			namespace: "packwright",
			description: template.blurb
		});
		const project = get().current();
		if (!project) return;
		const files = template.build(project.namespace);
		get().applyFiles(files);
		set({
			selectedPath: files.find((f) => f.path.endsWith(".json") && !f.path.endsWith("manifest.json") && !f.path.includes("texture"))?.path ?? get().selectedPath,
			mobileTab: "editor"
		});
	},
	writeFile: (path, content) => set((s) => withCurrent(s, (project) => ({
		...project,
		files: project.files.map((f) => f.path === path ? {
			...f,
			content
		} : f)
	}))),
	addFile: (path, content = "") => set((s) => {
		return {
			selectedPath: path,
			mobileTab: "editor",
			...withCurrent(s, (project) => ({
				...project,
				files: upsertFile(project.files, {
					path,
					content: content || (path.endsWith(".json") ? "{\n  \n}\n" : "")
				})
			}))
		};
	}),
	removeFile: (path) => set((s) => {
		return {
			selectedPath: s.selectedPath === path ? null : s.selectedPath,
			...withCurrent(s, (project) => ({
				...project,
				files: project.files.filter((f) => f.path !== path)
			}))
		};
	}),
	addMessage: (message) => {
		if (!get().currentId) {
			set((s) => ({ draftMessages: [...s.draftMessages, message].slice(-40) }));
			return;
		}
		set((s) => withCurrent(s, (project) => ({
			...project,
			messages: [...project.messages, message].slice(-40)
		})));
	},
	patchMessage: (id, patch) => {
		if (!get().currentId) {
			set((s) => ({ draftMessages: s.draftMessages.map((m) => m.id === id ? {
				...m,
				...patch
			} : m) }));
			return;
		}
		set((s) => withCurrent(s, (project) => ({
			...project,
			messages: project.messages.map((m) => m.id === id ? {
				...m,
				...patch
			} : m)
		})));
	},
	renamePack: ({ name, description }) => set((s) => withCurrent(s, (project) => ({
		...project,
		name: name.trim() || project.name,
		description: description.trim() || project.description
	})))
}), {
	name: "packwright-studio",
	partialize: (s) => ({
		projects: s.projects,
		currentId: s.currentId,
		selectedPath: s.selectedPath,
		draftMessages: s.draftMessages
	})
}));
function nest(paths) {
	const folderMap = /* @__PURE__ */ new Map();
	const roots = [];
	const ensure = (path, isFile) => {
		const existing = folderMap.get(path);
		if (existing) return existing;
		const node = isFile ? {
			name: basename(path),
			path
		} : {
			name: basename(path) || path,
			path,
			children: []
		};
		folderMap.set(path, node);
		const parent = dirname(path);
		if (!parent) roots.push(node);
		else ensure(parent, false).children.push(node);
		return node;
	};
	const folders = /* @__PURE__ */ new Set();
	for (const path of paths) {
		let parent = dirname(path);
		while (parent) {
			folders.add(parent);
			parent = dirname(parent);
		}
	}
	[...folders].sort().forEach((f) => ensure(f, false));
	paths.forEach((p) => ensure(p, true));
	const sortNodes = (nodes) => {
		nodes.sort((a, b) => {
			const ad = a.children ? 0 : 1;
			const bd = b.children ? 0 : 1;
			if (ad !== bd) return ad - bd;
			return a.name.localeCompare(b.name);
		});
		nodes.forEach((n) => n.children && sortNodes(n.children));
	};
	sortNodes(roots);
	return roots;
}
function FileGlyph({ path }) {
	const kind = fileKind(path);
	if (kind === "png") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "size-3.5 text-muted" });
	if (kind === "json") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileJson, { className: "size-3.5 text-muted" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCode2, { className: "size-3.5 text-muted" });
}
function TreeNode({ node }) {
	const selectedPath = useStudio((s) => s.selectedPath);
	const selectPath = useStudio((s) => s.selectPath);
	const removeFile = useStudio((s) => s.removeFile);
	const [open, setOpen] = (0, import_react.useState)(true);
	if (Boolean(node.children)) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		className: "flex h-9 w-full items-center gap-1.5 rounded-sm px-2 text-left text-sm text-muted hover:bg-elevated hover:text-fg",
		onClick: () => setOpen((v) => !v),
		children: [open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "truncate font-medium",
			children: node.name
		})]
	}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "ml-3 border-l border-border",
		children: node.children.map((child) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TreeNode, { node: child }, child.path))
	})] });
	const selected = selectedPath === node.path;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("group flex h-9 items-center gap-1 pr-1", selected && "bg-elevated"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			className: cn("flex min-w-0 flex-1 items-center gap-2 rounded-sm px-2 text-left text-sm", selected ? "text-fg" : "text-muted hover:text-fg"),
			onClick: () => selectPath(node.path),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileGlyph, { path: node.path }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "truncate",
				children: node.name
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "grid size-8 place-items-center rounded-sm text-subtle opacity-0 hover:bg-surface hover:text-danger group-hover:opacity-100",
			"aria-label": `Delete ${node.name}`,
			onClick: () => removeFile(node.path),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
		})]
	});
}
function FileTree() {
	const project = useStudio((s) => s.projects.find((p) => p.id === s.currentId) ?? null);
	const addFile = useStudio((s) => s.addFile);
	const applyTemplate = useStudio((s) => s.applyTemplate);
	const [adding, setAdding] = (0, import_react.useState)(false);
	const [newPath, setNewPath] = (0, import_react.useState)("BP/items/");
	const tree = (0, import_react.useMemo)(() => nest(project?.files.map((f) => f.path) ?? []), [project?.files]);
	if (!project) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-4 text-sm leading-relaxed text-muted",
		children: "No pack open. Forge one, drop a starter kit, or ask Smith to write files and save them into a new addon."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full min-h-0 flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-2 px-3 pt-3 pb-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate text-sm font-medium",
						children: project.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "truncate font-mono text-xs text-muted",
						children: [project.namespace, ":"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "icon-sm",
					variant: "ghost",
					"aria-label": "Add file",
					onClick: () => setAdding((v) => !v),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" })
				})]
			}),
			adding && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
				className: "flex gap-2 px-3 pb-2",
				onSubmit: (e) => {
					e.preventDefault();
					const path = newPath.trim().replace(/^\/+/, "");
					if (!/^(BP|RP)\//.test(path) || path.includes("..")) return;
					addFile(path);
					setAdding(false);
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: newPath,
					onChange: (e) => setNewPath(e.target.value),
					className: "h-9 font-mono text-xs",
					autoFocus: true,
					spellCheck: false
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-h-0 flex-1 overflow-y-auto px-1 pb-2",
				children: tree.map((node) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TreeNode, { node }, node.path))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t border-border px-3 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-2 text-xs tracking-wide text-subtle uppercase",
					children: "Kits"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-1.5",
					children: TEMPLATES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "secondary",
						onClick: () => applyTemplate(t.id),
						children: t.title
					}, t.id))
				})]
			})
		]
	});
}
function Badge({ className, tone = "muted", children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium", tone === "muted" && "bg-elevated text-muted", tone === "accent" && "bg-accent text-accent-fg", tone === "ok" && "bg-ok/15 text-ok", tone === "danger" && "bg-danger/15 text-danger", tone === "warn" && "bg-warn/15 text-warn", className),
		children
	});
}
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-24 w-full rounded-md bg-elevated px-3 py-2.5 text-sm text-fg shadow-[var(--shadow-border)]", "placeholder:text-subtle", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent", "disabled:cursor-not-allowed disabled:opacity-40", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
function EditorPanel() {
	const project = useStudio((s) => s.projects.find((p) => p.id === s.currentId) ?? null);
	const selectedPath = useStudio((s) => s.selectedPath);
	const writeFile = useStudio((s) => s.writeFile);
	const file = project?.files.find((f) => f.path === selectedPath) ?? null;
	const [copied, setCopied] = (0, import_react.useState)(false);
	const jsonError = (0, import_react.useMemo)(() => {
		if (!file || fileKind(file.path) !== "json") return null;
		try {
			JSON.parse(file.content);
			return null;
		} catch (err) {
			return err instanceof Error ? err.message : "Invalid JSON";
		}
	}, [file]);
	if (!project) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
		title: "No pack on the bench",
		body: "Create an addon or apply a starter kit. Smith can still answer Bedrock questions without a pack open."
	});
	if (!file) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
		title: "Select a file",
		body: "Open something from the tree. JSON, lang, functions, and textures all live here."
	});
	const kind = fileKind(file.path);
	const pngSrc = kind === "png" ? `data:image/png;base64,${file.content}` : null;
	function formatJson() {
		if (!file || kind !== "json") return;
		try {
			writeFile(file.path, JSON.stringify(JSON.parse(file.content), null, 2) + "\n");
			toast.success("Formatted JSON");
		} catch {
			toast.error("Cannot format invalid JSON");
		}
	}
	async function copy() {
		if (!file) return;
		await navigator.clipboard.writeText(file.content);
		setCopied(true);
		window.setTimeout(() => setCopied(false), 1200);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full min-h-0 flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center gap-2 border-b border-border px-4 py-2.5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "min-w-0 flex-1 truncate font-mono text-xs text-muted",
					children: file.path
				}),
				kind === "json" && (jsonError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					tone: "danger",
					children: "Invalid JSON"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					tone: "ok",
					children: "Valid JSON"
				})),
				kind === "json" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "ghost",
					onClick: formatJson,
					children: "Format"
				}),
				kind !== "png" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "icon-sm",
					variant: "ghost",
					onClick: copy,
					"aria-label": "Copy",
					children: copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" })
				})
			]
		}), pngSrc ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex min-h-0 flex-1 items-center justify-center p-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-lg bg-elevated p-4 shadow-[var(--shadow-border)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: pngSrc,
					alt: file.path,
					className: "h-48 w-48 [image-rendering:pixelated]",
					crossOrigin: "anonymous"
				})
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-0 flex-1 flex-col",
			children: [jsonError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "flex items-start gap-2 px-4 py-2 text-xs text-danger",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "mt-0.5 size-3.5 shrink-0" }), jsonError]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
				className: "min-h-0 flex-1 resize-none rounded-none bg-transparent font-mono text-xs leading-relaxed shadow-none",
				value: file.content,
				spellCheck: false,
				onChange: (e) => writeFile(file.path, e.target.value),
				onKeyDown: (e) => {
					if ((e.metaKey || e.ctrlKey) && e.key === "s") {
						e.preventDefault();
						formatJson();
					}
				}
			}, file.path)]
		})]
	});
}
function Empty({ title, body }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col justify-center px-8 py-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-xl font-semibold",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 max-w-sm text-sm leading-relaxed text-muted",
			children: body
		})]
	});
}
function GuidePanel() {
	const [q, setQ] = (0, import_react.useState)("");
	const query = q.trim().toLowerCase();
	const components = (0, import_react.useMemo)(() => {
		if (!query) return COMPONENTS;
		return COMPONENTS.filter((c) => c.id.toLowerCase().includes(query) || c.summary.toLowerCase().includes(query) || c.kind.includes(query));
	}, [query]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-full min-h-0 overflow-y-auto",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-8 px-5 py-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "space-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-xl font-semibold",
							children: "Bedrock bench notes"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-relaxed text-muted",
							children: "Smith is trained on this same sheet. Search components, or read the pack rules before you export."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: q,
							onChange: (e) => setQ(e.target.value),
							placeholder: "Search components, Molang, failures…"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
					title: "Install an .mcaddon",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
						className: "space-y-3",
						children: INSTALL_STEPS.map((step) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-sm font-medium",
							children: step.platform
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-1 text-sm leading-relaxed text-muted",
							children: step.steps
						})] }, step.platform))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
					title: "Pack folders",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-4 md:grid-cols-2",
						children: ["BP", "RP"].map((side) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mb-2 font-mono text-xs text-accent",
							children: [side, "/"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-1 text-sm text-muted",
							children: PACK_STRUCTURE[side].map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: line }, line))
						})] }, side))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
					title: "Identifiers",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-1.5 text-sm text-muted",
						children: IDENTIFIER_RULES.map((rule) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: rule }, rule))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
					title: "Format versions (1.21 retail)",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full text-left text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
								className: "text-xs tracking-wide text-subtle uppercase",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-1.5 pr-3 font-medium",
										children: "Kind"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-1.5 pr-3 font-medium",
										children: "Version"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-1.5 font-medium",
										children: "Note"
									})
								] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: FORMAT_VERSIONS.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-t border-border",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2 pr-3",
										children: row.kind
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2 pr-3 font-mono text-xs",
										children: row.version
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2 text-muted",
										children: row.note
									})
								]
							}, row.kind)) })]
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
					title: "Components",
					children: components.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "No components match."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-3",
						children: components.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-xs text-accent",
								children: c.kind
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-sm",
								children: c.id
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: c.summary
							})
						] }, c.id))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
					title: "Molang",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-2",
						children: MOLANG.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-sm",
							children: m.expr
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: m.meaning
						})] }, m.expr))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
					title: "Script API",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-2",
						children: SCRIPT_API.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-mono text-sm",
							children: [
								s.module,
								" ",
								s.version
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: s.note
						})] }, s.module))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
					title: "Java vs Bedrock",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-2 text-sm",
						children: JAVA_VS_BEDROCK.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted",
								children: row.java
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mx-2 text-subtle",
								children: "→"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: row.bedrock })
						] }, row.java))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
					title: "Why packs fail to load",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-1.5 text-sm text-muted",
						children: COMMON_FAILURES.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: line }, line))
					})
				})
			]
		})
	});
}
function Section({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "space-y-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "font-display text-base font-semibold",
			children: title
		}), children]
	});
}
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-bg/80", className),
	...props
}));
DialogOverlay.displayName = DialogOverlay$1.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn("fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2", "rounded-xl bg-surface p-6 shadow-[var(--shadow-border)]", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
		className: "absolute top-4 right-4 rounded-sm text-muted transition-colors hover:text-fg",
		"aria-label": "Close",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
	})]
})] }));
DialogContent.displayName = DialogContent$1.displayName;
function DialogHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("mb-4 space-y-1.5 pr-8", className),
		...props
	});
}
function DialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
		className: cn("font-display text-lg font-semibold tracking-tight", className),
		...props
	});
}
function DialogDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
		className: cn("text-sm text-muted", className),
		...props
	});
}
function NewPackDialog({ open, onOpenChange }) {
	const createPack = useStudio((s) => s.createPack);
	const [name, setName] = (0, import_react.useState)("Ruby Pack");
	const [namespace, setNamespace] = (0, import_react.useState)("ruby_pack");
	const [nsTouched, setNsTouched] = (0, import_react.useState)(false);
	const [description, setDescription] = (0, import_react.useState)("Custom Bedrock items, blocks, and mobs.");
	(0, import_react.useEffect)(() => {
		if (!open) return;
		setName("Ruby Pack");
		setNamespace("ruby_pack");
		setNsTouched(false);
		setDescription("Custom Bedrock items, blocks, and mobs.");
	}, [open]);
	function onName(value) {
		setName(value);
		if (!nsTouched) setNamespace(slugifyNamespace(value));
	}
	const valid = name.trim().length > 0 && isValidNamespace(namespace);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "New addon" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Creates a linked behavior pack and resource pack with unique UUIDs, empty texture atlases, and lang files. Targets Bedrock 1.21." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "space-y-4",
			onSubmit: (e) => {
				e.preventDefault();
				if (!valid) return;
				createPack({
					name,
					namespace,
					description
				});
				onOpenChange(false);
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-medium text-muted",
						children: "Pack name"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: name,
						onChange: (e) => onName(e.target.value),
						autoComplete: "off",
						required: true
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block space-y-1.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-medium text-muted",
							children: "Namespace"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: namespace,
							onChange: (e) => {
								setNsTouched(true);
								setNamespace(e.target.value.toLowerCase());
							},
							autoComplete: "off",
							spellCheck: false,
							required: true
						}),
						!isValidNamespace(namespace) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-danger",
							children: "Lowercase, starts with a letter, only a-z, 0-9, underscore."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-medium text-muted",
						children: "Description"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						value: description,
						onChange: (e) => setDescription(e.target.value),
						rows: 3
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-end gap-2 pt-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "ghost",
						onClick: () => onOpenChange(false),
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						disabled: !valid,
						children: "Forge pack"
					})]
				})
			]
		})] })
	});
}
var TEXT_LIMIT = 3500;
var EXCERPT_BUDGET = 14e3;
function buildSmithProject(project, selectedPath) {
	if (!project) return null;
	const textFiles = project.files.filter((f) => (f.encoding ?? "utf8") !== "base64" && fileKind(f.path) !== "png");
	const preferred = new Set([
		"BP/manifest.json",
		"RP/manifest.json",
		"BP/texts/en_US.lang",
		"RP/texts/en_US.lang",
		selectedPath
	].filter(Boolean));
	const ordered = [...textFiles.filter((f) => preferred.has(f.path)), ...textFiles.filter((f) => !preferred.has(f.path))];
	const excerpts = [];
	let used = 0;
	for (const file of ordered) {
		if (used >= EXCERPT_BUDGET) break;
		const slice = file.content.slice(0, TEXT_LIMIT);
		excerpts.push({
			path: file.path,
			content: slice
		});
		used += slice.length;
	}
	return {
		name: project.name,
		namespace: project.namespace,
		description: project.description,
		selectedPath,
		fileIndex: project.files.map((f) => f.path),
		excerpts
	};
}
var FENCE = /```packwright[ \t]+path=([^\n]+)\n([\s\S]*?)```/g;
function parseSmithFiles(text) {
	const files = [];
	const seen = /* @__PURE__ */ new Set();
	for (const match of text.matchAll(FENCE)) {
		const rawPath = (match[1] ?? "").trim().replace(/^\/+/, "");
		const body = (match[2] ?? "").replace(/\s+$/, "") + "\n";
		if (!rawPath || seen.has(rawPath)) continue;
		if (!/^(BP|RP)\//.test(rawPath)) continue;
		if (rawPath.includes("..") || rawPath.includes("\\")) continue;
		seen.add(rawPath);
		const encoding = rawPath.endsWith(".png") ? "base64" : "utf8";
		files.push({
			path: rawPath,
			content: body,
			encoding
		});
	}
	return files;
}
function stripSmithFences(text) {
	return text.replace(FENCE, "").replace(/\n{3,}/g, "\n\n").trim();
}
async function streamSmith(request, onDelta, signal) {
	const res = await fetch("/api/smith", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(request),
		signal
	});
	if (!res.ok) {
		let message = `Smith returned ${res.status}`;
		try {
			const data = await res.json();
			if (data.error) message = data.error;
		} catch {}
		throw new Error(message);
	}
	const contentType = res.headers.get("content-type") ?? "";
	if (!res.body || contentType.includes("application/json")) {
		const data = await res.json();
		if (data.error) throw new Error(data.error);
		const text = data.text ?? "";
		onDelta(text);
		return {
			text,
			files: parseSmithFiles(text)
		};
	}
	const reader = res.body.getReader();
	const decoder = new TextDecoder();
	let buffer = "";
	let text = "";
	while (true) {
		const { done, value } = await reader.read();
		if (done) break;
		buffer += decoder.decode(value, { stream: true });
		const chunks = buffer.split("\n");
		buffer = chunks.pop() ?? "";
		for (const line of chunks) {
			const trimmed = line.trim();
			if (!trimmed.startsWith("data:")) continue;
			const payload = trimmed.slice(5).trim();
			if (!payload || payload === "[DONE]") continue;
			try {
				const piece = JSON.parse(payload).choices?.[0]?.delta?.content ?? "";
				if (piece) {
					text += piece;
					onDelta(text);
				}
			} catch {}
		}
	}
	return {
		text,
		files: parseSmithFiles(text)
	};
}
function SmithChat({ available, onNeedPack }) {
	const project = useStudio((s) => s.projects.find((p) => p.id === s.currentId) ?? null);
	const selectedPath = useStudio((s) => s.selectedPath);
	const messages = useStudio((s) => s.currentId ? s.projects.find((p) => p.id === s.currentId)?.messages ?? [] : s.draftMessages);
	const addMessage = useStudio((s) => s.addMessage);
	const patchMessage = useStudio((s) => s.patchMessage);
	const applyFiles = useStudio((s) => s.applyFiles);
	const selectPath = useStudio((s) => s.selectPath);
	const [draft, setDraft] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const scroller = (0, import_react.useRef)(null);
	async function send(text) {
		const content = text.trim();
		if (!content || busy) return;
		if (!available) {
			toast.error("Smith is unavailable right now.");
			return;
		}
		setDraft("");
		addMessage({
			id: crypto.randomUUID(),
			role: "user",
			content,
			createdAt: Date.now()
		});
		const assistantId = crypto.randomUUID();
		addMessage({
			id: assistantId,
			role: "assistant",
			content: "",
			createdAt: Date.now()
		});
		setBusy(true);
		try {
			const { text: full, files } = await streamSmith({
				messages: useStudio.getState().messages().filter((m) => m.id !== assistantId).map((m) => ({
					role: m.role,
					content: m.content
				})),
				project: buildSmithProject(useStudio.getState().current(), selectedPath)
			}, (next) => {
				patchMessage(assistantId, { content: next });
				requestAnimationFrame(() => {
					scroller.current?.scrollTo({ top: scroller.current.scrollHeight });
				});
			});
			patchMessage(assistantId, {
				content: full,
				files: files.length ? files : void 0
			});
			if (files.length && project) {
				applyFiles(files);
				const first = files.find((f) => f.path.endsWith(".json"));
				if (first) selectPath(first.path);
				toast.success(`Applied ${files.length} file${files.length === 1 ? "" : "s"} to the pack.`);
			}
		} catch (err) {
			const message = err instanceof Error ? err.message : "Smith failed.";
			patchMessage(assistantId, { content: message });
			toast.error(message);
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full min-h-0 flex-col bg-surface",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 border-b border-border px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hammer, { className: "size-4 text-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium",
					children: "Smith"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted",
					children: "Bedrock-only. Refuses everything else."
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				ref: scroller,
				className: "min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-4",
				children: [
					messages.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-relaxed text-muted",
							children: "Ask for a custom item, block, mob, recipe, loot table, Molang snippet, or a fix for a JSON file. Off-topic questions get a short no."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-col gap-2",
							children: STARTER_PROMPTS.slice(0, 4).map((prompt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								disabled: !available || busy,
								onClick: () => send(prompt),
								className: "rounded-lg bg-elevated px-3 py-2.5 text-left text-xs leading-relaxed text-fg shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)] disabled:opacity-40",
								children: prompt
							}, prompt))
						})]
					}),
					messages.map((message) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: cn("space-y-2", message.role === "user" && "ml-6"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-medium tracking-wide text-subtle uppercase",
								children: message.role === "user" ? "You" : "Smith"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm leading-relaxed whitespace-pre-wrap text-fg",
								children: message.role === "assistant" ? stripSmithFences(message.content) || (busy ? "Forging…" : "") : message.content
							}),
							message.files && message.files.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-md bg-elevated p-3 shadow-[var(--shadow-border)]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted",
										children: [
											message.files.length,
											" file",
											message.files.length === 1 ? "" : "s"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
										className: "mt-1 space-y-0.5 font-mono text-xs text-fg",
										children: message.files.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: f.path }, f.path))
									}),
									project ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										className: "mt-3",
										onClick: () => {
											applyFiles(message.files);
											toast.success("Files applied.");
										},
										children: "Apply to pack"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										className: "mt-3",
										onClick: () => onNeedPack(message.files),
										children: "Create pack and apply"
									})
								]
							})
						]
					}, message.id)),
					busy && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex items-center gap-2 text-xs text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-3.5 animate-spin" }), "Smith is writing"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "border-t border-border p-3",
				onSubmit: (e) => {
					e.preventDefault();
					send(draft);
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-end gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						value: draft,
						disabled: !available || busy,
						onChange: (e) => setDraft(e.target.value),
						placeholder: available ? "Ask for a Bedrock addon, component, or a JSON fix…" : "Smith is unavailable in this environment.",
						rows: 3,
						className: "min-h-20 flex-1",
						onKeyDown: (e) => {
							if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
								e.preventDefault();
								send(draft);
							}
						}
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						size: "icon",
						disabled: !available || busy || !draft.trim(),
						"aria-label": "Send",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-4" })
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs text-subtle",
					children: "Ctrl/Cmd + Enter to send."
				})]
			})
		]
	});
}
function folderName(project, kind) {
	return `${slugifyNamespace(project.name)}_${kind}`;
}
async function exportMcaddon(project) {
	const zip = new import_lib.default();
	const bpRoot = folderName(project, "BP");
	const rpRoot = folderName(project, "RP");
	for (const file of project.files) {
		const mapped = file.path.startsWith("BP/") ? `${bpRoot}/${file.path.slice(3)}` : file.path.startsWith("RP/") ? `${rpRoot}/${file.path.slice(3)}` : file.path;
		if (file.encoding === "base64") zip.file(mapped, file.content, { base64: true });
		else zip.file(mapped, file.content);
	}
	const blob = await zip.generateAsync({
		type: "blob",
		compression: "DEFLATE",
		compressionOptions: { level: 6 }
	});
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = `${slugifyNamespace(project.name)}.mcaddon`;
	document.body.appendChild(a);
	a.click();
	a.remove();
	window.setTimeout(() => URL.revokeObjectURL(url), 1500);
}
function StudioHeader({ onNewPack, onHome }) {
	const project = useStudio((s) => s.projects.find((p) => p.id === s.currentId) ?? null);
	const errorCount = useStudio((s) => s.issues()).filter((i) => i.level === "error").length;
	async function onExport() {
		if (!project) {
			toast.error("Open a pack first.");
			return;
		}
		if (errorCount > 0) {
			toast.error("Fix JSON errors before export.");
			return;
		}
		try {
			await exportMcaddon(project);
			toast.success("Download started. Open the .mcaddon in Minecraft Bedrock.");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Export failed");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "flex h-14 shrink-0 items-center gap-3 border-b border-border bg-bg/90 px-3 backdrop-blur-sm md:px-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: onHome,
				className: "flex items-center gap-2.5 rounded-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "grid size-7 place-items-center rounded-sm bg-accent",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "block size-3 bg-accent-fg" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display text-sm font-semibold tracking-tight",
					children: "Packwright"
				})]
			}),
			project && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "hidden text-subtle sm:inline",
					children: "/"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "hidden min-w-0 truncate text-sm text-muted sm:block",
					children: project.name
				}),
				errorCount > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
					tone: "danger",
					children: [
						errorCount,
						" error",
						errorCount === 1 ? "" : "s"
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					tone: "ok",
					className: "hidden sm:inline-flex",
					children: "Ready"
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ml-auto flex items-center gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					variant: "ghost",
					onClick: onNewPack,
					className: "hidden sm:inline-flex",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "New"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					variant: "secondary",
					onClick: onExport,
					disabled: !project,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden sm:inline",
							children: "Export .mcaddon"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "sm:hidden",
							children: "Export"
						})
					]
				})]
			})
		]
	});
}
function MobileNav({ tab, onTab }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "flex h-14 border-t border-border bg-surface pb-[env(safe-area-inset-bottom)] lg:hidden",
		children: [
			{
				id: "smith",
				label: "Smith",
				icon: Hammer
			},
			{
				id: "files",
				label: "Files",
				icon: FolderTree
			},
			{
				id: "editor",
				label: "Editor",
				icon: FileCode2
			},
			{
				id: "guide",
				label: "Guide",
				icon: BookOpen
			}
		].map((item) => {
			const Icon = item.icon;
			const active = tab === item.id;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => onTab(item.id),
				className: "flex flex-1 flex-col items-center justify-center gap-0.5 text-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: active ? "size-4 text-accent" : "size-4 text-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: active ? "text-fg" : "text-muted",
					children: item.label
				})]
			}, item.id);
		})
	});
}
var ICONS = {
	sword: Sword,
	food: Apple,
	block: BrickWall,
	mob: Bug
};
function Welcome({ onNewPack, onAskSmith }) {
	const projects = useStudio((s) => s.projects);
	const openPack = useStudio((s) => s.openPack);
	const applyTemplate = useStudio((s) => s.applyTemplate);
	const deletePack = useStudio((s) => s.deletePack);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex w-full max-w-5xl flex-col gap-12 px-5 py-10 md:py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-9 place-items-center rounded-md bg-accent text-accent-fg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "block size-4 bg-accent-fg/90" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-lg font-semibold tracking-tight",
						children: "Packwright"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "hidden text-xs tracking-wide text-muted uppercase sm:block",
					children: "Bedrock only"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "max-w-2xl space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium tracking-[0.18em] text-accent uppercase",
						children: "Addon smith"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "font-display text-4xl leading-[1.05] font-semibold tracking-tight md:text-6xl",
						children: [
							"An AI that only speaks",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-accent",
								children: "Bedrock."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "max-w-xl text-base leading-relaxed text-muted md:text-lg",
						children: [
							"Smith forges behavior packs, resource packs, Molang, items, mobs, and the Script API. Java, Forge, and everything else are out of scope. Export a real ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-fg",
								children: ".mcaddon"
							}),
							"."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-3 sm:flex-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "lg",
							onClick: onNewPack,
							children: "New addon"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "lg",
							variant: "secondary",
							onClick: onAskSmith,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hammer, { className: "size-4" }), "Ask Smith"]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xs font-medium tracking-[0.16em] text-muted uppercase",
					children: "Starter kits"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3 sm:grid-cols-2",
					children: TEMPLATES.map((template) => {
						const Icon = ICONS[template.id];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => applyTemplate(template.id),
							className: "rounded-xl bg-surface p-5 text-left shadow-[var(--shadow-border)] transition-[box-shadow] hover:shadow-[var(--shadow-border-hover)]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "mb-4 size-5 text-accent" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-base font-semibold",
									children: template.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm leading-relaxed text-muted",
									children: template.blurb
								})
							]
						}, template.id);
					})
				})]
			}),
			projects.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xs font-medium tracking-[0.16em] text-muted uppercase",
					children: "Recent packs"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y divide-border rounded-xl bg-surface shadow-[var(--shadow-border)]",
					children: projects.map((project) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center gap-3 px-4 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "min-w-0 flex-1 text-left",
							onClick: () => openPack(project.id),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate font-medium",
								children: project.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "truncate font-mono text-xs text-muted",
								children: [
									project.namespace,
									": · ",
									project.files.length,
									" files"
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							size: "sm",
							variant: "ghost",
							onClick: () => deletePack(project.id),
							children: "Remove"
						})]
					}, project.id))
				})]
			})
		]
	});
}
function Studio({ available }) {
	const hydrated = useStudio((s) => s.hydrated);
	const currentId = useStudio((s) => s.currentId);
	const mobileTab = useStudio((s) => s.mobileTab);
	const setMobileTab = useStudio((s) => s.setMobileTab);
	const closePack = useStudio((s) => s.closePack);
	const createPack = useStudio((s) => s.createPack);
	const applyFiles = useStudio((s) => s.applyFiles);
	const setHydrated = useStudio((s) => s.setHydrated);
	const [newOpen, setNewOpen] = (0, import_react.useState)(false);
	const [center, setCenter] = (0, import_react.useState)("editor");
	const [pendingFiles, setPendingFiles] = (0, import_react.useState)(null);
	const [forceStudio, setForceStudio] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const finish = () => setHydrated();
		const unsub = useStudio.persist.onFinishHydration(finish);
		if (useStudio.persist.hasHydrated()) finish();
		const timeout = window.setTimeout(finish, 600);
		return () => {
			unsub();
			window.clearTimeout(timeout);
		};
	}, [setHydrated]);
	(0, import_react.useEffect)(() => {
		if (!pendingFiles || !currentId) return;
		applyFiles(pendingFiles);
		setPendingFiles(null);
	}, [
		pendingFiles,
		currentId,
		applyFiles
	]);
	if (!hydrated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-dvh items-center justify-center bg-bg text-muted",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-lg",
			children: "Packwright"
		})
	});
	const inStudio = Boolean(currentId) || forceStudio;
	function handleNeedPack(files) {
		const hint = files.map((f) => f.path).find((p) => p.includes("/"))?.split("/").at(-1)?.replace(/\.[^.]+$/, "") ?? "smith_pack";
		setPendingFiles(files);
		createPack({
			name: hint.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
			namespace: slugifyNamespace(hint),
			description: "Forged by Smith in Packwright."
		});
		setForceStudio(true);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex flex-col bg-bg text-fg", inStudio ? "h-dvh overflow-hidden" : "min-h-dvh"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewPackDialog, {
			open: newOpen,
			onOpenChange: setNewOpen
		}), !inStudio ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "min-h-dvh overflow-y-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Welcome, {
				onNewPack: () => setNewOpen(true),
				onAskSmith: () => {
					setForceStudio(true);
					setMobileTab("smith");
				}
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioHeader, {
				onNewPack: () => setNewOpen(true),
				onHome: () => {
					closePack();
					setForceStudio(false);
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
					className: "hidden w-64 shrink-0 overflow-hidden border-r border-border lg:block",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileTree, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 flex-1 flex-col",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hidden items-center gap-1 border-b border-border px-3 py-1.5 lg:flex",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: center === "editor" ? "secondary" : "ghost",
							onClick: () => setCenter("editor"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCode2, { className: "size-4" }), "Editor"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: center === "guide" ? "secondary" : "ghost",
							onClick: () => setCenter("guide"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-4" }), "Guide"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-h-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: cn("min-h-0 min-w-0 flex-1 overflow-hidden", mobileTab === "smith" && "hidden lg:block"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "hidden h-full lg:block",
								children: center === "guide" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GuidePanel, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditorPanel, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "h-full lg:hidden",
								children: [
									mobileTab === "files" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileTree, {}),
									mobileTab === "editor" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditorPanel, {}),
									mobileTab === "guide" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GuidePanel, {})
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
							className: cn("min-h-0 overflow-hidden border-border", mobileTab === "smith" ? "flex flex-1" : "hidden", "lg:flex lg:w-[24rem] lg:flex-none lg:border-l xl:w-[26rem]"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full w-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmithChat, {
									available,
									onNeedPack: handleNeedPack
								})
							})
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileNav, {
				tab: mobileTab,
				onTab: setMobileTab
			})
		] })]
	});
}
function Home() {
	const { available } = Route$1.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Studio, { available });
}
//#endregion
export { Home as component };
