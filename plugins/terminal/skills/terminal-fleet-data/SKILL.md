---
name: terminal-fleet-data
description: Query and analyze fleet data through Terminal MCP or the Terminal CLI. Use for operational questions about connections, vehicles, drivers, locations, trips, safety events, HOS, IFTA, or diagnostics; not for implementing Terminal in an application.
license: MIT
---

# Terminal fleet data

Use Terminal's normalized telematics data to answer the user's operational question. Prefer the authenticated Terminal MCP server when its tools are available; use the Terminal CLI when the user requests it or MCP is unavailable.

## Choose a transport

- **Terminal MCP available:** Read [references/mcp.md](references/mcp.md). Use the live MCP tool descriptions as the source of truth for operations and arguments.
- **Terminal CLI requested or MCP unavailable:** Read [references/cli.md](references/cli.md). Discover commands and flags from the installed CLI rather than memory.
- **Neither is ready:** Explain the two options. Prefer MCP for interactive use because it authenticates through Terminal OAuth; use the CLI for shells and automation.

Do not ask the user to paste a secret key, connection token, or OAuth token into chat.

## Query workflow

1. Establish the intended Terminal application or profile, fleet connection, entity, and time range. Do not infer a connection from a similar customer or fleet name.
2. Convert relative dates to explicit boundaries and state the timezone. Prefer half-open time ranges when the operation supports them.
3. Resolve names such as a driver or vehicle to Terminal IDs before querying detail. If multiple records match, present safe identifying fields and ask the user to choose.
4. Inspect the live MCP schema or CLI help before the first call. Narrow the request with server-side filters when available.
5. Retrieve every page only when the answer requires the complete result set. Treat an empty response as “no matching records returned,” not proof that an event never occurred.
6. Calculate or join only what the question requires. Report the relevant records or aggregate, the explicit scope, material assumptions, and identifiers useful for follow-up.

Before accessing sensitive fleet data or changing state, follow [references/data-safety.md](references/data-safety.md).

The task is complete when the answer is traceable to returned Terminal data and its connection, time, filtering, and pagination assumptions are clear.
