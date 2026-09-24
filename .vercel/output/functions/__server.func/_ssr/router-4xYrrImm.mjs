import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as useRouter, f as createRouter, g as createRootRoute, h as createFileRoute, l as Scripts, m as lazyRouteComponent, p as Outlet, u as HeadContent } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { n as TriangleAlert } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { n as Portal, r as Provider, t as Content2 } from "../_libs/@radix-ui/react-tooltip+[...].mjs";
import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-4xYrrImm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var TooltipProvider = Provider;
var TooltipContent = import_react.forwardRef(({ className, sideOffset = 6, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	sideOffset,
	className: cn("z-50 overflow-hidden rounded-sm bg-elevated px-2.5 py-1.5 text-xs text-fg shadow-[var(--shadow-border)]", className),
	...props
}) }));
TooltipContent.displayName = Content2.displayName;
var styles_default = "/assets/styles-BsF80abv.css";
var APP_NAME = "Packwright";
var Route$2 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "Bedrock-only addon smith. Forge behavior packs, resource packs, items, mobs, and Script API — nothing else."
			},
			{
				name: "theme-color",
				content: "#0b0d0b"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,400;0,500;0,600;0,700;1,400&family=IBM+Plex+Mono:wght@400;500&family=Syne:wght@500;600;700&display=swap"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "bg-bg text-fg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipProvider, {
					delayDuration: 200,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
					theme: "dark",
					position: "bottom-right",
					toastOptions: { classNames: {
						toast: "bg-elevated text-fg border border-border font-sans shadow-none",
						title: "text-fg",
						description: "text-muted"
					} }
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	})
});
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var getSmithStatus = createServerFn({ method: "GET" }).handler(createSsrRpc("b32cb844387607479c01b5aee189be7b79c9c375a2ab2c51d11d96584a0502f1"));
var $$splitComponentImporter = () => import("./routes-C3Oa1mXQ.mjs");
var Route$1 = createFileRoute("/")({
	loader: () => getSmithStatus(),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var FORMAT_VERSIONS = [
	{
		kind: "Manifest",
		version: "2",
		note: "Always 2 for BP/RP on retail"
	},
	{
		kind: "min_engine_version",
		version: "[1, 21, 0]",
		note: "Header in manifest"
	},
	{
		kind: "Item (BP)",
		version: "1.21.30",
		note: "Holiday creator items are stable"
	},
	{
		kind: "Block (BP)",
		version: "1.21.40",
		note: "Custom blocks with components"
	},
	{
		kind: "Entity (BP)",
		version: "1.21.50",
		note: "Behavior entity"
	},
	{
		kind: "Recipe",
		version: "1.21.50",
		note: "Shaped / shapeless / furnace"
	},
	{
		kind: "Spawn rules",
		version: "1.8.0",
		note: "1.17.0 also valid"
	},
	{
		kind: "Client entity (RP)",
		version: "1.10.0",
		note: "Render description"
	},
	{
		kind: "Geometry",
		version: "1.12.0",
		note: "1.16.0 for newer cubes"
	},
	{
		kind: "Render controller",
		version: "1.10.0",
		note: "Texture / geometry bind"
	},
	{
		kind: "Animation / AC",
		version: "1.10.0",
		note: "RP or BP"
	},
	{
		kind: "Particle",
		version: "1.10.0",
		note: "RP particles folder"
	},
	{
		kind: "Attachable",
		version: "1.10.0",
		note: "Handheld / worn items"
	}
];
var IDENTIFIER_RULES = [
	"Format is namespace:name — example packwright:ruby_sword",
	"Namespace and name are lowercase a-z, 0-9, underscore. No spaces, no caps.",
	"Never use minecraft: for custom content. That namespace is vanilla-only.",
	"Keep the same identifier in BP, RP, recipes, lang, and loot tables.",
	"File names should match the name half: ruby_sword.json",
	"Lang keys: item.namespace:name, tile.namespace:name.name, entity.namespace:name.name"
];
var PACK_STRUCTURE = {
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
		"scripts/*.js (Script API, needs a script module)"
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
		"sounds.json + sounds/"
	]
};
var COMPONENTS = [
	{
		id: "minecraft:icon",
		kind: "item",
		summary: "Short name that maps through item_texture.json."
	},
	{
		id: "minecraft:max_stack_size",
		kind: "item",
		summary: "1–64. Weapons and tools are 1."
	},
	{
		id: "minecraft:hand_equipped",
		kind: "item",
		summary: "Held like a tool, not a block."
	},
	{
		id: "minecraft:damage",
		kind: "item",
		summary: "Melee attack damage added to the fist."
	},
	{
		id: "minecraft:durability",
		kind: "item",
		summary: "{ max_durability: number }."
	},
	{
		id: "minecraft:enchantable",
		kind: "item",
		summary: "{ slot, value } — slot sword, bow, pickaxe, armor…"
	},
	{
		id: "minecraft:food",
		kind: "item",
		summary: "{ nutrition, saturation_modifier, can_always_eat }."
	},
	{
		id: "minecraft:use_modifiers",
		kind: "item",
		summary: "Use duration; pair with food or throwables."
	},
	{
		id: "minecraft:wearable",
		kind: "item",
		summary: "{ slot: slot.armor.head|chest|legs|feet }."
	},
	{
		id: "minecraft:cooldown",
		kind: "item",
		summary: "Category + duration after use."
	},
	{
		id: "minecraft:projectile",
		kind: "item",
		summary: "Defines the entity a thrown item becomes."
	},
	{
		id: "minecraft:throwable",
		kind: "item",
		summary: "Makes the item a throwable."
	},
	{
		id: "minecraft:digger",
		kind: "item",
		summary: "Block destroy speeds; use_efficiency for enchantments."
	},
	{
		id: "minecraft:display_name",
		kind: "item",
		summary: "Fallback name; still ship a lang line."
	},
	{
		id: "minecraft:glint",
		kind: "item",
		summary: "Enchantment glint overlay."
	},
	{
		id: "minecraft:geometry",
		kind: "block",
		summary: "minecraft:geometry.full_block or a custom geo identifier."
	},
	{
		id: "minecraft:material_instances",
		kind: "block",
		summary: "Per-face texture + render_method (opaque, alpha_test, blend)."
	},
	{
		id: "minecraft:destructible_by_mining",
		kind: "block",
		summary: "{ seconds_to_destroy }."
	},
	{
		id: "minecraft:destructible_by_explosion",
		kind: "block",
		summary: "{ explosion_resistance }."
	},
	{
		id: "minecraft:friction",
		kind: "block",
		summary: "0–1. Ice is low, soul sand is high."
	},
	{
		id: "minecraft:light_emission",
		kind: "block",
		summary: "0–15 glow."
	},
	{
		id: "minecraft:light_dampening",
		kind: "block",
		summary: "0–15 how much light the block eats."
	},
	{
		id: "minecraft:collision_box",
		kind: "block",
		summary: "Custom AABB or false to disable."
	},
	{
		id: "minecraft:selection_box",
		kind: "block",
		summary: "Outline box for targeting."
	},
	{
		id: "minecraft:loot",
		kind: "block",
		summary: "Path to a loot table."
	},
	{
		id: "minecraft:map_color",
		kind: "block",
		summary: "Hex color on maps."
	},
	{
		id: "minecraft:health",
		kind: "entity",
		summary: "{ value, max }."
	},
	{
		id: "minecraft:movement",
		kind: "entity",
		summary: "{ value } base speed."
	},
	{
		id: "minecraft:navigation.walk",
		kind: "entity",
		summary: "Ground pathfinding. Pair with movement.basic + jump.static."
	},
	{
		id: "minecraft:behavior.random_stroll",
		kind: "entity",
		summary: "Wander. Needs navigation."
	},
	{
		id: "minecraft:behavior.nearest_attackable_target",
		kind: "entity",
		summary: "Pick a target. Filters on families."
	},
	{
		id: "minecraft:behavior.melee_box_attack",
		kind: "entity",
		summary: "Close-range attack."
	},
	{
		id: "minecraft:attack",
		kind: "entity",
		summary: "{ damage } for melee."
	},
	{
		id: "minecraft:scale",
		kind: "entity",
		summary: "Visual and collision scale."
	},
	{
		id: "minecraft:type_family",
		kind: "entity",
		summary: "Families used by filters and damage."
	},
	{
		id: "minecraft:physics",
		kind: "entity",
		summary: "Gravity and collision with world."
	},
	{
		id: "minecraft:pushable",
		kind: "entity",
		summary: "Pushed by players / other entities."
	},
	{
		id: "minecraft:collision_box",
		kind: "entity",
		summary: "{ width, height } in blocks."
	},
	{
		id: "minecraft:loot",
		kind: "entity",
		summary: "Death loot table path."
	},
	{
		id: "minecraft:despawn",
		kind: "entity",
		summary: "Natural despawn rules."
	},
	{
		id: "minecraft:rideable",
		kind: "entity",
		summary: "Seats, controlling_seat, family types."
	},
	{
		id: "minecraft:variant",
		kind: "entity",
		summary: "Integer skin / mark variant."
	}
];
var MOLANG = [
	{
		expr: "q.life_time",
		meaning: "Seconds since the particle/entity started."
	},
	{
		expr: "q.health / q.max_health",
		meaning: "Health ratio 0–1."
	},
	{
		expr: "q.is_on_ground",
		meaning: "1 if standing on a block."
	},
	{
		expr: "q.is_alive",
		meaning: "1 while the entity lives."
	},
	{
		expr: "q.modified_move_speed",
		meaning: "Current speed, for walk animations."
	},
	{
		expr: "v.attack_time",
		meaning: "Swing progress. Common in attack anims."
	},
	{
		expr: "t.var_name",
		meaning: "Temp variable, this evaluation only."
	},
	{
		expr: "v.var_name",
		meaning: "Variable stored on the object."
	},
	{
		expr: "c.is_first_person",
		meaning: "Client query for attachables."
	}
];
var SCRIPT_API = [
	{
		module: "@minecraft/server",
		version: "2.0.0",
		note: "World, system, Player, Entity, Block. Declare in manifest dependencies."
	},
	{
		module: "@minecraft/server-ui",
		version: "2.0.0",
		note: "ActionFormData, ModalFormData, MessageFormData."
	},
	{
		module: "script module",
		version: "entry",
		note: "modules[].type = script, language javascript, entry scripts/main.js."
	}
];
var INSTALL_STEPS = [
	{
		platform: "Windows",
		steps: "Double-click the .mcaddon. Minecraft opens and imports both packs. Create or edit a world → Resource Packs / Behavior Packs → activate both (RP first is fine; BP depends on the RP UUID)."
	},
	{
		platform: "iOS / iPadOS / Android",
		steps: "Open the downloaded .mcaddon with Minecraft. Wait for the import toast. Enable both packs on the world. Some files apps need Share → Minecraft."
	},
	{
		platform: "Realms",
		steps: "Activate the packs in a local world, then replace the Realm world — or upload via the Realm resource/behavior slots if you have a .mcpack each."
	},
	{
		platform: "Dedicated server (BDS)",
		steps: "Drop the unzipped BP and RP into behavior_packs and resource_packs. Add header UUID + version to the world’s world_behavior_packs.json and world_resource_packs.json."
	}
];
var COMMON_FAILURES = [
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
	"Using Forge/Fabric Java events. Use BP components, Molang, or @minecraft/server."
];
var JAVA_VS_BEDROCK = [
	{
		java: "data/<ns>/function/*.mcfunction + datapack",
		bedrock: "BP/functions/*.mcfunction + tick.json, or Script API"
	},
	{
		java: "assets/<ns>/models/item JSON models",
		bedrock: "RP/models + attachables + render controllers"
	},
	{
		java: "CraftTweaker / datapack recipes",
		bedrock: "BP/recipes/*.json (shaped, shapeless, furnace, brewing)"
	},
	{
		java: "Fabric/Forge entity attributes",
		bedrock: "BP entity components + component groups + events"
	},
	{
		java: "resource pack pack.mcmeta",
		bedrock: "manifest.json with UUID + modules"
	}
];
var STARTER_PROMPTS = [
	"Forge a ruby sword: 8 damage, 750 durability, sword enchantments, crafting recipe from redstone and a stick.",
	"Make a moss mite — a small passive cube mob that wanders and drops mossy cobble.",
	"Add a packed moss block that mines like grass and uses a custom texture.",
	"Create a glowberry tart food: 6 hunger, fast eat, always edible.",
	"Explain why my custom item is a missing-texture square in the hotbar.",
	"What is the difference between format_version and min_engine_version?",
	"Give me a loot table that drops 0–2 custom gems from a custom ore.",
	"How do I declare @minecraft/server 2.0.0 in a behavior pack manifest?"
];
var IDENTITY = `You are Packwright Smith — a senior Minecraft Bedrock Edition addon engineer.
You ONLY help with Minecraft Bedrock: behavior packs, resource packs, world templates, skin packs, texture packs, Molang, JSON components, entities, items, blocks, recipes, loot tables, spawn rules, particles, fogs, attachables, animations, render controllers, .mcfunction, tick.json, commands that work in Bedrock, the Script API (@minecraft/server, @minecraft/server-ui), Marketplace pack structure, Realms/BDS pack activation, and Bedrock-specific troubleshooting.

You do not answer general knowledge, other games, Java Edition as a primary target (Forge, Fabric, datapacks, Spigot, Paper), programming homework, or anything unrelated to Bedrock.

If the user goes off-topic, refuse in one or two sentences and steer them back to Bedrock. Offer a Bedrock angle when one exists.

If they ask about Java Edition: name the Java thing briefly, then give the Bedrock equivalent with working JSON. Never produce a Java datapack tree as the deliverable.

Personality: precise craftsman. Correct terminology (behavior pack, not plugin; identifier, not "mod id"). No emoji. No hype. Short prose, complete JSON.`;
var FILES = `When you create or modify pack files, emit each file as a fenced block using this exact shape:

\`\`\`packwright path=BP/items/example.json
{ ... exact file body ... }
\`\`\`

Rules for files:
- Path must start with BP/ or RP/.
- Body is the exact file contents — not a string, not markdown inside JSON.
- Always include matching lang lines and texture atlas entries for new items/blocks/entities.
- Reuse the project's namespace and existing manifest UUIDs. Never invent new UUIDs unless the user asked for a brand-new pack and no manifests exist.
- Target retail Bedrock 1.21.x. Manifest format_version is the integer 2. min_engine_version is [1, 21, 0] unless the user specifies otherwise.
- Do not emit PNG binary. Describe the texture, and if you must add a texture file, skip the png and tell them Packwright will keep a placeholder — or omit the png and only write JSON/lang.
- After files, write a short in-game result (what the player sees) and how to activate the packs.
- If you are only explaining, do not emit packwright fences.`;
var QUALITY = `Generated JSON must be valid, comma-correct, and complete.
Identifiers: lowercase namespace:name.
Never put custom content in the minecraft: namespace.
BP module type is data (or script + data). RP module type is resources.
Items need BP item JSON + RP item_texture.json + PNG path + lang.
Blocks need BP block JSON + RP terrain_texture.json + PNG path + lang.
Entities need BP entity + RP client entity + geometry + render controller + texture + lang, and spawn_rules/loot when relevant.
Prefer component names from the 1.21 stable set. No experimental toggles unless asked.
If the user's JSON is broken, fix the whole file and explain the fault in one sentence.`;
function catalog() {
	const byKind = (kind) => COMPONENTS.filter((c) => c.kind === kind).map((c) => `- ${c.id}: ${c.summary}`).join("\n");
	return `Format versions:
${FORMAT_VERSIONS.map((f) => `- ${f.kind}: ${f.version} (${f.note})`).join("\n")}

Identifier rules:
${IDENTIFIER_RULES.map((r) => `- ${r}`).join("\n")}

Item components:
${byKind("item")}

Block components:
${byKind("block")}

Entity components:
${byKind("entity")}

Java → Bedrock:
${JAVA_VS_BEDROCK.map((j) => `- ${j.java} → ${j.bedrock}`).join("\n")}

Common load failures:
${COMMON_FAILURES.map((c) => `- ${c}`).join("\n")}`;
}
function buildSystemPrompt(project) {
	const projectBlock = project ? `Current pack:
- Name: ${project.name}
- Namespace: ${project.namespace}
- Description: ${project.description}
- Selected file: ${project.selectedPath ?? "(none)"}
- File index:
${project.fileIndex.map((p) => `  - ${p}`).join("\n") || "  (empty)"}

File excerpts (do not regenerate unchanged files):
${project.excerpts.map((f) => `--- ${f.path}\n${f.content.slice(0, 4e3)}`).join("\n\n")}` : `No pack is open. You may still answer Bedrock questions. If you emit files, use namespace packwright and tell the user to create a pack in Packwright to apply them.`;
	return `${IDENTITY}

${FILES}

${QUALITY}

${catalog()}

${projectBlock}`;
}
function clipMessages(messages) {
	return messages.filter((m) => m.role === "user" || m.role === "assistant").map((m) => ({
		role: m.role,
		content: m.content.slice(0, 8e3)
	})).slice(-12);
}
var Route = createFileRoute("/api/smith")({ server: { handlers: { POST: async ({ request }) => {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return Response.json({ error: "Smith is unavailable in this environment." }, { status: 503 });
	let body;
	try {
		body = await request.json();
	} catch {
		return Response.json({ error: "Invalid JSON body." }, { status: 400 });
	}
	const messages = clipMessages(Array.isArray(body.messages) ? body.messages : []);
	if (messages.length === 0 || messages[messages.length - 1]?.role !== "user") return Response.json({ error: "Send a user message." }, { status: 400 });
	const upstream = await fetch("https://api.x.ai/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			model: "grok-4.5",
			stream: true,
			temperature: .35,
			max_tokens: 3200,
			messages: [{
				role: "system",
				content: buildSystemPrompt(body.project ?? null)
			}, ...messages]
		})
	});
	if (!upstream.ok || !upstream.body) {
		const text = await upstream.text().catch(() => "");
		return Response.json({ error: `Smith could not reach the model (${upstream.status}). ${text.slice(0, 200)}` }, { status: 502 });
	}
	return new Response(upstream.body, { headers: {
		"Content-Type": "text/event-stream",
		"Cache-Control": "no-cache, no-transform"
	} });
} } } });
var rootRouteChildren = {
	IndexRoute: Route$1.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$2
	}),
	ApiSmithRoute: Route.update({
		id: "/api/smith",
		path: "/api/smith",
		getParentRoute: () => Route$2
	})
};
var routeTree = Route$2._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { IDENTIFIER_RULES as a, MOLANG as c, STARTER_PROMPTS as d, Route$1 as f, FORMAT_VERSIONS as i, PACK_STRUCTURE as l, COMMON_FAILURES as n, INSTALL_STEPS as o, cn as p, COMPONENTS as r, JAVA_VS_BEDROCK as s, router_exports as t, SCRIPT_API as u };
