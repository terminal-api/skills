# Terminal agent skills

Official agent skills and plugin definitions for working with [Terminal](https://withterminal.com), the unified API for fleet and telematics data.

The repository contains one installable `terminal` plugin and three portable [Agent Skills](https://agentskills.io):

- `terminal-fleet-data` — answer operational questions about fleet data through Terminal MCP or the Terminal CLI.
- `terminal-cli` — install, configure, and troubleshoot the Terminal CLI.
- `build-with-terminal` — build product integrations using Terminal APIs, Link, and webhooks.

## Install skills

Install every skill into a supported agent:

```bash
npx skills add terminal-api/skills
```

Or install one skill:

```bash
npx skills add terminal-api/skills --skill terminal-fleet-data
```

The installer supports Claude Code, Codex, Cursor, GitHub Copilot, OpenCode, and other Agent Skills clients.

## Install the plugin

The complete plugin adds the skills and configures Terminal's OAuth-enabled remote MCP server at `https://mcp.withterminal.com/mcp`.

### Claude Code

```text
/plugin marketplace add terminal-api/skills
/plugin install terminal@terminal
```

### ChatGPT and Codex workspaces

Workspace administrators can import `https://github.com/terminal-api/skills` from **Workspace settings → Plugins → Import marketplace**. Codex users can also install the standalone skills with `npx skills add`.

The first release declares the MCP server directly, so OpenAI surfaces may label the full plugin Desktop only until Terminal is also available as an approved connected app.

### Cursor

Until the plugin is listed in the public Cursor Marketplace, install the skills with `npx skills add` or import this repository into a Cursor team marketplace.

### Other Agent Plugins clients

The portable plugin is in [`plugins/terminal`](plugins/terminal). It follows the [Agent Plugins 1.0 specification](https://agent-plugins.org).

## Authentication

- **MCP:** Your client opens Terminal's OAuth flow. Access matches your Terminal Dashboard user and active organization.
- **CLI:** Install `@terminal-api/cli` and configure a Terminal secret key locally. Never paste a secret key or connection token into a chat.

See the [Terminal agents guide](https://docs.withterminal.com/guides/agents) for current setup details.

## Development

```bash
npm ci
npm run check
```

The plugin has its own version. It is intentionally independent from Terminal CLI and MCP server release versions.

Contributions are welcome. See [`CONTRIBUTING.md`](CONTRIBUTING.md) for authoring, validation, and versioning guidance.

## Security

Skills are executable instructions. Review their contents before installation and report concerns according to [`SECURITY.md`](SECURITY.md).

## License

MIT
