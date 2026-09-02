---
name: build-with-terminal
description: Design or implement an application integration with Terminal's unified telematics API, Link, webhooks, environments, and common models. Use for product-development work involving Terminal; not for querying a fleet's operational data.
license: MIT
---

# Build with Terminal

Implement Terminal using the project's existing architecture and the current Terminal documentation.

Terminal APIs and supported provider capabilities evolve. Start from `https://docs.withterminal.com/llms.txt`, locate the relevant current pages, and inspect the API reference or OpenAPI schema before writing request types, paths, fields, or enum values. Do not substitute remembered or copied schemas.

## Workflow

1. Identify whether the request concerns onboarding a connection, reading normalized data, receiving lifecycle events, managing connection health, or another documented product surface.
2. Inspect the project's runtime, existing HTTP client, secret management, persistence, webhook conventions, and tests before choosing an implementation.
3. Read [references/authentication-and-environments.md](references/authentication-and-environments.md) before handling keys, tokens, Link, or environment selection.
4. Read [references/implementation.md](references/implementation.md) for request, pagination, webhook, and provider-capability considerations.
5. Retrieve the exact current Terminal documentation and schema relevant to the requested endpoints.
6. Implement the smallest change that follows the project's conventions. Exercise sandbox paths and failure behavior in proportion to the change.

Do not expose secret keys in client code, logs, examples, or generated artifacts. Do not assume every provider supports every model or field.

The task is complete when authentication and tenant scope are correct, environment-specific values remain paired, provider variability is handled, and the relevant behavior is verified.
