# World export and procedural map patterns

This is a Bedrock pattern guide for projects that build a `.mcworld` or a custom terrain map rather than a normal add-on pack.

## Pattern
- The project uses a deterministic world generator or data extraction pipeline.
- The output is a `.mcworld` archive with `level.dat` and `db/` LevelDB payloads.
- The world is built to match a specific footprint, spawn point, landmark layout, or custom biome mood.
- Block validation matters: every palette entry must be valid for the target Bedrock version.

## Key files
- `src/world/*.ts`
- `src/bedrock/*.ts`
- `dist/*.mcworld`
- `docs/map-preview.jpg`
- `level.dat` structure plus chunk and subchunk serializers

## Lessons
- A world export is not just a texture pack; it is a real Bedrock world archive.
- Keep chunk payloads compact and deterministic.
- Subchunk palettes must be validated against the target Bedrock version.
- Spawn points, daylight settings, world generation metadata, and chunk finalization states matter.
- Performance on mobile is driven by compact world data and minimal extra ticking or entities.

## Caveats
- A `.mcworld` can fail on devices if chunk metadata or subchunk versions are wrong.
- A world export can look good in generator logic but still fail if Bedrock reading or serialization is mismatched.
- Block palettes must be checked against actual Bedrock states, not guessed from Java patterns.

## Recommended Smith behavior
When a user asks for a map or world export:
- describe the world as a Bedrock archive problem, not a normal pack problem
- discuss `level.dat`, `db/`, chunk layout, and block states when relevant
- advise validation against the target Bedrock version
- keep the world deterministic and compact
