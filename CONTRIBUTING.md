# Contributing

Thanks for helping improve Terminal's agent skills and plugin.

## Before you start

- Search existing issues and pull requests before proposing a duplicate change.
- Open an issue first for new skills, breaking changes, or changes to the plugin's trust model.
- Never include credentials, customer data, private Terminal URLs, or internal-only workflows.

## Development

This repository requires Node.js 24 or later. It has no runtime dependencies.

1. Fork and clone the repository.
2. Create a focused branch from `main`.
3. Make your changes in `plugins/terminal/`.
4. Add or update routing cases in `evals/routing.json` when skill selection changes.
5. Run the checks:

   ```bash
   npm run check
   npx --yes skills add . --list
   ```

## Skill guidelines

- Give each skill one clear responsibility and a precise description.
- Keep `SKILL.md` concise; move conditional or detailed guidance into `references/`.
- Prefer current tool schemas, CLI help, and Terminal documentation over copied API details.
- Default fleet-data workflows to read-only behavior and data minimization.
- Require explicit user intent before instructions mutate data or configuration.
- Use relative links for files within a skill and verify every referenced file exists.

## Plugin versioning

The plugin follows semantic versioning. Update the version consistently in the portable plugin manifest, host-specific manifests, marketplace manifests, `package.json`, and `CHANGELOG.md`. The validation script checks version consistency.

## Pull requests

Keep pull requests focused and explain what changes for an agent or user. Include the validation commands you ran. By contributing, you agree that your contribution is licensed under the repository's MIT License.

Security vulnerabilities should be reported privately according to [SECURITY.md](SECURITY.md), not through a public issue.
