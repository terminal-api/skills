# Terminal CLI command discovery

The CLI is generated from Terminal's OpenAPI description. Do not maintain or rely on a copied command catalog.

```bash
terminal --help
terminal <command> --help
terminal <command> schema
```

- Root help lists the available API operations and built-in command groups.
- Command help defines required options, filters, enum values, and global overrides.
- The `schema` subcommand describes the expected response without making the API request.

Prefer `--format json` for analysis and `--format table` for quick human inspection when the installed help supports them.

For pagination, narrow with documented filters first. Use a small limit for lookup and `--all` only when a complete result set is necessary.

When a command fails, report the CLI version, redacted command, exit status, and error. Re-run current help before concluding that the API operation is unavailable.
