# Authentication and environments

Read the current authentication reference before implementing these flows:

- https://docs.withterminal.com/api-reference/authentication
- https://docs.withterminal.com/api-reference/environments

## Durable invariants

- Publishable keys are intended for client-side Link initialization and cannot read fleet data.
- Secret keys authenticate server-side access and must never be shipped to a browser or mobile client.
- A public token is short-lived onboarding output that must be exchanged server-side.
- A connection token scopes access to a particular connected account and must be carried through tenant-scoped operations.
- Sandbox and production have separate keys, Link origins, and API origins. Keep each environment's values together.

Store secrets using the project's existing secret-management mechanism. Redact them from logs and error reporting. Persist connection tokens only where the application's authorization model prevents cross-tenant access.

Use current documentation for exact headers, URLs, request bodies, and response fields.
