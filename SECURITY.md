# Security policy

## Reporting a vulnerability

Do not open a public issue for a vulnerability involving credentials, authorization, prompt injection, unsafe command execution, or Terminal customer data. Email [security@withterminal.com](mailto:security@withterminal.com) with a description and reproduction steps.

For ordinary documentation or skill-quality issues, open a GitHub issue.

## Trust model

This repository contains instructions that agents may follow and configurations that connect agents to Terminal's MCP server. Review changes with the same care as executable code.

- Never commit Terminal keys, connection tokens, OAuth tokens, or customer data.
- Keep MCP authentication client-managed; do not add credentials to plugin manifests.
- Avoid shell scripts when instructions or existing tools are sufficient.
- Pin third-party dependencies in CI and review changes before updating them.
