// ═══════════════════════════════════════════════════════════════════════
// TERRAIN DATA — feature arrays for the live game map.
// ═══════════════════════════════════════════════════════════════════════
//
// Single source of truth for the published map. Edited by the map editor
// (publish-to-game flow writes to this file). Read by terrain.js's
// calcHeight() to compute the heightmap.
//
// MUST be loaded BEFORE terrain.js in the manifest (these arrays are
// referenced at terrain.js's module-load time during initial height build).
//
// PROVIDES (all top-level const, script-scoped — accessible to other modules):
//   TERRAIN_PEAKS       — { px, pz, strength, radius, label? }
//   TERRAIN_RIDGES      — { ax, az, bx, bz, strength, width, label? }
//   TERRAIN_VALLEYS     — { cx, cz, rx, rz, strength, label? }
//   TERRAIN_BASINS      — { px, pz, depth, radius, label? }
//   DESERT_BASINS       — { cx, cz, radius, floor, strength, label? }
//   ALPINE_BENCHES      — { cx, cz, radius, h, label? }
//   LAKES               — { cx, cz, radius, depth, label? }
//   ROAD_POINTS         — { x, z }
//   PASS_ROAD_POINTS    — { x, z }
//   CREEK_POINTS        — { x, z }   (null entries = segment break — future)
//
// EDITOR INTEGRATION:
//   - Drafts saved as JSON in src/_data/maps/
//   - Publish-to-game writes a generated version of THIS FILE
//   - Auto-backup copies the prior version to src/_data/maps/_backups/

// ─────────────────────────────────────────────
// PEAKS — exported from spawn zone editor 2026-03-31 (v2)
// ─────────────────────────────────────────────
const TERRAIN_PEAKS = [
    { px: -145, pz: 480, strength: 100, radius: 110 },
    { px: -269, pz: 462, strength: 85, radius: 90 },
    { px: -114, pz: 391, strength: 30, radius: 95 },
    { px: -489, pz: 326, strength: 75, radius: 85 },
    { px: -377, pz: 469, strength: 89, radius: 80 },
    { px: -14, pz: 475, strength: 62, radius: 70 },
    { px: 19, pz: 403, strength: 35, radius: 70 },
    { px: -60, pz: 485, strength: 35, radius: 70 },
    { px: -470, pz: 431, strength: 70, radius: 85 },
    { px: -420, pz: 50, strength: 65, radius: 80 },
    { px: -400, pz: -100, strength: 60, radius: 75 },
    { px: -380, pz: -250, strength: 55, radius: 70 },
    { px: -360, pz: -380, strength: 45, radius: 65 },
    { px: -440, pz: -40, strength: 40, radius: 55 },
    { px: -220, pz: 310, strength: 40, radius: 65 },
    { px: -80, pz: 290, strength: 35, radius: 60 },
    { px: -300, pz: 260, strength: 30, radius: 55 },
    { px: 40, pz: 310, strength: 28, radius: 55 },
    { px: -170, pz: 230, strength: 25, radius: 50 },
    { px: -50, pz: 210, strength: 20, radius: 45 },
    { px: -250, pz: 150, strength: 28, radius: 55 },
    { px: -337, pz: 143, strength: 38, radius: 70 },
    { px: -100, pz: 130, strength: 18, radius: 45 },
    { px: -200, pz: 80, strength: 15, radius: 40 },
    { px: -150, pz: 30, strength: 22, radius: 50 },
    { px: -220, pz: -20, strength: 12, radius: 40 },
    { px: -90, pz: 60, strength: 10, radius: 35 },
    { px: 0, pz: 0, strength: 35, radius: 70 },
    { px: 50, pz: 50, strength: 18, radius: 55 },
    { px: 150, pz: 100, strength: 15, radius: 50 },
    { px: 80, pz: -40, strength: 14, radius: 45 },
    { px: 120, pz: -80, strength: 10, radius: 40 },
    { px: 250, pz: 50, strength: 12, radius: 50 },
    { px: 300, pz: -60, strength: 16, radius: 55 },
    { px: 200, pz: 200, strength: 20, radius: 50 },
    { px: 350, pz: 150, strength: 18, radius: 55 },
    { px: 180, pz: -30, strength: 8, radius: 35 },
    { px: -200, pz: -250, strength: 12, radius: 60 },
    { px: -50, pz: -300, strength: 10, radius: 50 },
    { px: 100, pz: -280, strength: 8, radius: 45 },
    { px: -280, pz: -150, strength: 18, radius: 50 },
    { px: -150, pz: -200, strength: 10, radius: 40 },
    { px: 50, pz: -200, strength: 8, radius: 35 },
    { px: -102, pz: -398, strength: 17, radius: 75 },
    { px: 200, pz: -350, strength: 10, radius: 45 },
    { px: -250, pz: -350, strength: 16, radius: 50 },
    { px: 300, pz: -300, strength: 8, radius: 40 },
    { px: 400, pz: 0, strength: 14, radius: 55 },
    { px: 350, pz: -250, strength: 10, radius: 45 },
    { px: 420, pz: 250, strength: 22, radius: 60 },
    // Twin knobs near (55, -185) — break up flat area, rocky peaks
    // NOTE: these are inside the desert basin (cx:30, cz:-200, r:280, str:0.75)
    // which pulls terrain to floor ~14. Strength must be high to survive the pull.
    { px: 40, pz: -175, strength: 130, radius: 40 },
    { px: 75, pz: -200, strength: 110, radius: 35 },
];

// ─────────────────────────────────────────────
// RIDGES — exported from spawn zone editor 2026-03-31 (v2)
// ─────────────────────────────────────────────
const TERRAIN_RIDGES = [
    { ax: -400, az: 350, bx: 100, bz: 400, strength: 35, width: 100 },
    { ax: -380, az: 300, bx: -350, bz: -100, strength: 28, width: 90 },
    { ax: 98, az: 437, bx: 250, bz: 200, strength: 20, width: 70 },
    { ax: -200, az: 300, bx: -170, bz: 100, strength: 15, width: 50 },
    { ax: 30, az: 80, bx: 180, bz: -50, strength: 12, width: 45 },
    { ax: -300, az: -120, bx: -150, bz: -250, strength: 10, width: 120 },
    { ax: -250, az: -340, bx: 50, bz: -380, strength: 8, width: 55 },
    { ax: -380, az: -250, bx: -350, bz: -400, strength: 18, width: 60 },
];

// ─────────────────────────────────────────────
// VALLEYS — exported from spawn zone editor 2026-03-31 (v2)
// ─────────────────────────────────────────────
const TERRAIN_VALLEYS = [
    { cx: 200, cz: -150, rx: 80, rz: 60, strength: 0.55 },
    { cx: -149, cz: -49, rx: 60, rz: 60, strength: 0.4 },
    { cx: -80, cz: -180, rx: 50, rz: 40, strength: 0.25 },
];

// ─────────────────────────────────────────────
// BASINS — inverted peaks, push terrain down
// ─────────────────────────────────────────────
const TERRAIN_BASINS = [
    { px: -200, pz: -120, depth: 8, radius: 60 },
    { px: -100, pz: -350, depth: 6, radius: 50 },
    { px: 300, pz: -150, depth: 4, radius: 45 },
];

// ─────────────────────────────────────────────
// DESERT BASINS — large shallow depressions that pull terrain toward a floor
// Different shape from TERRAIN_BASINS: pulls toward a floor height with strength
// blend, preserving local variation. Used for the big desert flats.
// ─────────────────────────────────────────────
const DESERT_BASINS = [
    { cx: 0,  cz: 50,   radius: 150, floor: 14, strength: 0.75 },  // between road bend and creek
    { cx: 30, cz: -200, radius: 280, floor: 14, strength: 0.75 },  // north of road Y, east of creek — big desert
];

// ─────────────────────────────────────────────
// ALPINE BENCHES — flat plateaus for building zones
// ─────────────────────────────────────────────
const ALPINE_BENCHES = [
    { cx: -200, cz: 200, radius: 18, h: 45 },
    { cx: 100,  cz: 100, radius: 20, h: 30 },
    { cx: -280, cz: 80, radius: 14, h: 38 },
    { cx: 60,   cz: 250, radius: 16, h: 35 },
];

// ─────────────────────────────────────────────
// LAKES — authored from map editor
// ─────────────────────────────────────────────
const LAKES = [
    { cx: -202, cz: 388, radius: 30, depth: 15 },
    { cx: -44,  cz: 414, radius: 25, depth: 13 },
];

// ─────────────────────────────────────────────
// ROADS — authored polylines from map editor
// ─────────────────────────────────────────────
const ROAD_POINTS = [
    { x: 350, z: -200 }, { x: 300, z: -180 }, { x: 250, z: -160 },
    { x: 200, z: -145 }, { x: 150, z: -130 }, { x: 100, z: -110 },
    { x: 50, z: -95 }, { x: 0, z: -85 }, { x: -30, z: -80 },
    { x: -50, z: -90 }, { x: -100, z: -120 }, { x: -160, z: -150 },
    { x: -220, z: -170 }, { x: -280, z: -180 }, { x: -340, z: -170 },
    { x: -400, z: -140 }, { x: -450, z: -100 },
];

const PASS_ROAD_POINTS = [
    { x: -40, z: -81 }, { x: -33, z: -66 }, { x: -37, z: -51 },
    { x: -41, z: 23 }, { x: -24, z: 49 }, { x: -6, z: 74 },
    { x: 21, z: 87 }, { x: 57, z: 113 }, { x: 112, z: 69 },
    { x: 140, z: 59 }, { x: 170, z: 66 }, { x: 199, z: 76 },
    { x: 240, z: 117 }, { x: 254, z: 144 }, { x: 271, z: 169 },
    { x: 293, z: 190 }, { x: 316, z: 209 }, { x: 334, z: 234 },
    { x: 352, z: 260 }, { x: 362, z: 291 }, { x: 366, z: 324 },
    { x: 370, z: 355 }, { x: 362, z: 397 }, { x: 340, z: 417 },
    { x: 310, z: 413 }, { x: 270, z: 406 }, { x: 246, z: 424 },
    { x: 214, z: 458 }, { x: 200, z: 486 },
];

// ─────────────────────────────────────────────
// CREEK — authored polyline (null entries reserved for future multi-segment support)
// ─────────────────────────────────────────────
const CREEK_POINTS = [
    // West bend — creek curves west through low ground before turning south
    { x: -280, z: 210 }, { x: -250, z: 205 }, { x: -220, z: 195 },
    { x: -190, z: 180 }, { x: -160, z: 178 }, { x: -130, z: 190 },
    { x: -105, z: 200 }, { x: -85, z: 215 }, { x: -70, z: 235 },
    // Original run south
    { x: -60, z: 250 },
    { x: -72, z: 199 }, { x: -50, z: 147 }, { x: -47, z: 93 },
    { x: -68, z: 50 }, { x: -70, z: 0 }, { x: -72, z: -30 },
    { x: -70, z: -60 }, { x: -65, z: -90 }, { x: -60, z: -120 },
    { x: -55, z: -160 }, { x: -50, z: -200 }, { x: -45, z: -250 },
    { x: -40, z: -300 }, { x: -35, z: -350 }, { x: -30, z: -400 },
];
