# AI Agent Instructions

<!-- DevMap Instruction Block -->
## DevMap Context

Before working in this repository, read `DEVMAP.md` for project metadata and available commands.

### Navigation

1. Read `.devmap/index.json`.
2. Pick the relevant feature by name or keywords.
3. Open the matching `.devmap/features/*.json` map.
4. Inspect only files listed in `sourcePriority` first.
5. Fall back to `.devmap/snapshot.json` only when index and feature maps are insufficient.

Do not scan the whole repository. Open source files only when:
- the snapshot is missing or stale
- the snapshot lacks enough detail for the task
- the task requires edit, debug, or refactor
- the user explicitly asks for code changes

When source inspection is needed, inspect the smallest relevant set first.

### Maintenance

- If `.devmap/index.json` is missing, run `devmap analyze`.
- If the snapshot may be stale, run `devmap analyze --fresh`.
- Use `--json` when calling DevMap programmatically.
- Do not edit files inside `.devmap/`.
- Never commit API keys or provider credentials.
<!-- End DevMap Instruction Block -->
