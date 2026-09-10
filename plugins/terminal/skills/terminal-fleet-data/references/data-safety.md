# Fleet-data safety

Use this reference before retrieving sensitive records or performing a mutation.

## Data minimization

- Query only the application, connection, entities, fields, and time range needed for the request.
- Prefer aggregates or a concise subset over reproducing raw location histories, HOS records, camera metadata, or driver data.
- Do not save returned customer data to repository files unless the user explicitly requests an artifact and the location is appropriate.
- Redact credentials and tokens from commands, logs, errors, and answers.

## Mutations

Default to read-only operations. Creating, updating, deleting, disconnecting, resolving, retrying, cancelling, or otherwise changing Terminal state requires explicit user intent for that exact change.

Before a mutation:

1. Verify the active organization, application, and connection.
2. Resolve and restate the target resource.
3. Confirm the operation and arguments from the live tool schema or CLI help.
4. If the user's request did not already authorize that exact mutation, stop and ask for confirmation.

Afterward, report the resulting state without exposing secrets or unnecessary customer data.
