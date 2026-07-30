# Map Editor — Drafts & Backups

This directory stores map editor drafts and pre-publish backups of `src/_core/terrain_data.js`. Read alongside `design/sov_map_editor_design.md`.

## Layout

```
src/_data/maps/
    *.json              # Editor drafts. Each is a complete map state.
    _backups/           # Pre-publish snapshots of terrain_data.js (gitignored).
        terrain_data_*.js
```

## Drafts (`*.json`)

Each draft is a JSON file with this shape:

```json
{
  "schema_version": 1,
  "name": "main_v1",
  "saved_at": "2026-04-17T06:18:02.178Z",
  "description": "Optional human-readable description",
  "TERRAIN_PEAKS": [...],
  "TERRAIN_RIDGES": [...],
  "TERRAIN_VALLEYS": [...],
  "TERRAIN_BASINS": [...],
  "DESERT_BASINS": [...],
  "ALPINE_BENCHES": [...],
  "LAKES": [...],
  "ROAD_POINTS": [...],
  "PASS_ROAD_POINTS": [...],
  "CREEK_POINTS": [...]
}
```

**Schema rules:**
- All 10 arrays required (validated by the dev server on save and publish).
- `name` must match `[a-zA-Z0-9_-]+` (no path separators, no dots).
- `saved_at` set automatically by the server on each save.
- `description` is optional; shown in the editor UI.

**Files in this folder are tracked in git** — drafts are part of the project history.

## Backups (`_backups/`)

The dev server automatically copies `src/_core/terrain_data.js` to this folder before:
- Every publish (filename: `terrain_data_<TIMESTAMP>.js`)
- Every rollback (filename: `terrain_data_pre_rollback_<TIMESTAMP>.js`)

Timestamps are ISO 8601 with `:` replaced by `-` and milliseconds dropped.

**The `_backups/` folder is gitignored** — backups are local-only safety nets. The dev server auto-creates the folder on first use.

## Endpoints

The dev server exposes these endpoints (see `server/dev-server.js`):

| Method | Path | Body | Returns |
|--------|------|------|---------|
| `GET`  | `/map_editor/list` | — | `{ drafts: [...], current: "name"|null }` |
| `GET`  | `/map_editor/load?name=X` | — | `{ name, data }` |
| `POST` | `/map_editor/save` | `{ name, description?, data }` | `{ ok, name, saved_at }` |
| `POST` | `/map_editor/publish` | `{ name }` | `{ ok, published, backup }` |
| `POST` | `/map_editor/rollback` | `{ name }` (backup name without `.js`) | `{ ok, restored, pre_rollback_backup }` |
| `GET`  | `/map_editor/backups` | — | `{ backups: [...] }` |

`current` in the list endpoint is the draft whose contents match the currently-published `terrain_data.js` (ignoring the generation timestamp). It's `null` if the published file is hand-edited or if no draft matches.
