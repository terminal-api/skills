---
name: terminal-cli
description: Install, configure, and troubleshoot the Terminal CLI, including credentials, profiles, environments, command discovery, output, and connectivity. Use for CLI setup or CLI-specific failures, not ordinary fleet questions when Terminal MCP is available.
license: MIT
---

# Terminal CLI

Prepare the `terminal` CLI for safe local use or diagnose a CLI-specific problem.

## Setup

1. Run `terminal --version`.
2. If it is missing and the user requested setup, install `@terminal-api/cli` with their available package manager. Otherwise, explain the install command before changing global packages.
3. Run `terminal config show` to identify the active profile and whether credentials are configured. This command masks stored secrets.
4. Follow [references/configuration.md](references/configuration.md) when credentials, environments, profiles, or connections need attention.
5. Follow [references/command-discovery.md](references/command-discovery.md) when selecting commands, interpreting flags, or diagnosing an unknown option.
6. Verify API-key and network access with the provider-list operation shown by `terminal --help`. For connection-scoped work, make a minimal read request against the selected connection.

Never ask the user to paste a secret into chat, print an unmasked credential, or commit credentials to source control.

Finish by reporting the CLI version, selected profile and environment, safe connection identity when relevant, and the verification result.
