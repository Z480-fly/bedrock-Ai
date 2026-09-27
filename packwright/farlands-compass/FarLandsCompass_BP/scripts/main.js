import { world, system, ItemStack } from "@minecraft/server";

const OVERWORLD_TARGET = { x: 16777216, z: 0 };
const NETHER_TARGET = { x: 2097152, z: 0 };
const ARRIVE_DISTANCE = 32;
const TICK_INTERVAL = 5;

const OW_ITEM = "farlands:overworld_compass";
const NETHER_ITEM = "farlands:nether_compass";

function getHeldItemId(player) {
  try {
    const inv = player.getComponent("minecraft:inventory");
    if (!inv || !inv.container) return null;
    const slot = player.selectedSlotIndex;
    const item = inv.container.getItem(slot);
    return item ? item.typeId : null;
  } catch {
    return null;
  }
}

function getDimensionId(player) {
  try {
    return player.dimension.id;
  } catch {
    return "";
  }
}

/**
 * Minecraft yaw: 0 = south (+Z), 90 = west (-X), -90 = east (+X), 180/-180 = north (-Z)
 * Returns bearing degrees from player to target, same convention as yaw.
 */
function bearingToTarget(px, pz, tx, tz) {
  const dx = tx - px;
  const dz = tz - pz;
  // atan2(-dx, dz) gives angle where 0 is +Z (south), positive toward west
  let deg = (Math.atan2(-dx, dz) * 180) / Math.PI;
  return deg;
}

function normalizeAngle(a) {
  while (a > 180) a -= 360;
  while (a < -180) a += 360;
  return a;
}

function distanceXZ(px, pz, tx, tz) {
  const dx = tx - px;
  const dz = tz - pz;
  return Math.sqrt(dx * dx + dz * dz);
}

/**
 * Relative instruction based on difference between target bearing and player yaw.
 */
function directionHint(rel) {
  const a = Math.abs(rel);
  if (a <= 15) return "\u2191 Straight";
  if (a <= 45) return rel > 0 ? "\u2196 Slight left" : "\u2197 Slight right";
  if (a <= 100) return rel > 0 ? "\u2190 Turn left" : "\u2192 Turn right";
  if (a <= 150) return rel > 0 ? "\u2199 Hard left" : "\u2198 Hard right";
  return "\u2193 Turn around";
}

function formatDistance(d) {
  if (d >= 1000) return (d / 1000).toFixed(1) + "k";
  return Math.round(d).toString();
}

function updatePlayer(player) {
  const held = getHeldItemId(player);
  if (held !== OW_ITEM && held !== NETHER_ITEM) return;

  const dim = getDimensionId(player);
  const isOw = held === OW_ITEM;
  const correctDim = isOw
    ? dim === "minecraft:overworld"
    : dim === "minecraft:nether";

  if (!correctDim) {
    player.onScreenDisplay.setActionBar("\u00a7cWrong Dimension");
    return;
  }

  const target = isOw ? OVERWORLD_TARGET : NETHER_TARGET;
  const loc = player.location;
  const dist = distanceXZ(loc.x, loc.z, target.x, target.z);

  if (dist <= ARRIVE_DISTANCE) {
    player.onScreenDisplay.setActionBar(
      "\u00a7a\u00a7lFar Lands reached  \u00a77(" + Math.round(dist) + "m)"
    );
    return;
  }

  const bearing = bearingToTarget(loc.x, loc.z, target.x, target.z);
  let yaw = 0;
  try {
    yaw = player.getRotation().y;
  } catch {
    yaw = 0;
  }

  const rel = normalizeAngle(bearing - yaw);
  const hint = directionHint(rel);
  const label = isOw ? "OW Far Lands" : "Nether Far Lands";

  player.onScreenDisplay.setActionBar(
    "\u00a7b" + label + "  \u00a7f" + hint + "  \u00a77" + formatDistance(dist) + "m"
  );
}

system.runInterval(() => {
  for (const player of world.getAllPlayers()) {
    try {
      updatePlayer(player);
    } catch (e) {
      // ignore per-player errors so one bad state does not stop the loop
    }
  }
}, TICK_INTERVAL);

// Give items via command for convenience (optional)
world.beforeEvents.chatSend.subscribe((ev) => {
  const msg = ev.message.trim().toLowerCase();
  if (msg === "!farlands" || msg === "!fl") {
    ev.cancel = true;
    const p = ev.sender;
    try {
      const inv = p.getComponent("minecraft:inventory");
      if (inv && inv.container) {
        inv.container.addItem(new ItemStack(OW_ITEM, 1));
        inv.container.addItem(new ItemStack(NETHER_ITEM, 1));
        p.sendMessage("\u00a7aFar Lands compasses added to inventory.");
      }
    } catch {
      p.sendMessage("\u00a7cCould not add items. Use /give.");
    }
  }
});
