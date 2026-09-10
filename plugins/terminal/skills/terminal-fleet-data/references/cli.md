# Querying through the Terminal CLI

Use this reference when the user requests the CLI or Terminal MCP is unavailable.

## Verify and discover

```bash
terminal --version
terminal config show
terminal --help
terminal <command> --help
terminal <command> schema
```

The CLI is generated from Terminal's OpenAPI description and may change. Treat installed help as authoritative for command names, required flags, filters, enums, and response schemas.

Prefer JSON when analyzing results:

```bash
terminal <command> [options] --format json
```

- Resolve user-facing names with the relevant list command before detail queries.
- Use `--limit` for a small lookup when documented.
- Use `--all` only when the answer requires all pages.
- Never reproduce `--api-key` or `--connection-token` values in reported commands.
- If configuration is incomplete, use the separate `terminal-cli` skill.

Current CLI documentation: https://github.com/terminal-api/terminal-cli
