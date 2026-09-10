# Terminal CLI configuration

## Install

Use one package manager already available to the user:

```bash
npm install -g @terminal-api/cli
# or: pnpm add -g @terminal-api/cli
# or: bun install -g @terminal-api/cli
```

## Credential sources

The CLI accepts stored configuration, profiles, environment variables, and per-command overrides. Inspect the current version's help before relying on precedence details.

Common local configuration:

```bash
terminal config set api-key sk_prod_xxx
terminal config set connection-token con_tkn_xxx
terminal config show
terminal config path
```

Environment variables are preferable for automation:

```bash
export TERMINAL_API_KEY="sk_prod_xxx"
export TERMINAL_CONNECTION_TOKEN="con_tkn_xxx"
export TERMINAL_ENVIRONMENT="prod"
export TERMINAL_PROFILE="prod"
```

Never place real values in source files, examples, plugin manifests, or shared shell transcripts.

## Environments and profiles

Production and sandbox use different credentials and API origins. Do not mix a sandbox key with the production origin or the reverse.

Use profiles to separate environments or recurring connection contexts. Discover the current profile commands with `terminal profile --help` and configuration commands with `terminal config --help`.

Before changing the default profile or stored connection, confirm which environment and fleet the user intends to use.

## Connection selection

An API key identifies a Terminal application. A connection token scopes most fleet-resource requests to a connected account.

Use the live help to find the connection-list operation. When more than one connection matches, show non-secret identifying fields and let the user select one. Never infer a connection solely from a similar display name.
