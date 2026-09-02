# Repository guide

This repository publishes Terminal's public agent plugin and Agent Skills.

## Source of truth

- `plugins/terminal/skills/` contains the canonical skill content.
- `plugins/terminal/plugin.json` contains the canonical plugin name and version.
- Host-specific manifests are adapters and must use the same plugin name and version.
- Terminal API operations, arguments, and schemas are not copied into skills. Retrieve current documentation or inspect the installed CLI and MCP tool schemas.

## Authoring

- Keep skill descriptions precise enough to prevent overlap.
- Put durable workflow guidance in `SKILL.md`; put conditional detail in `references/`.
- Do not add credentials, customer data, internal URLs, or employee-only workflows.
- Default fleet-data workflows to read-only behavior. Require explicit user intent for mutations.
- Run `npm run check` before opening a pull request.

## Releases

Use semantic versions for the plugin. A skill-only change still requires a plugin version bump so marketplace clients can detect the update.
