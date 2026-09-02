# Querying through Terminal MCP

Use this reference when Terminal MCP tools are available.

## Connection

The official endpoint is:

```text
https://mcp.withterminal.com/mcp
```

It uses Streamable HTTP and OAuth. Authentication is handled by the MCP client through a Terminal Dashboard sign-in. Never add bearer tokens, API keys, or connection tokens to plugin configuration.

Access matches the signed-in Dashboard user, including their active organization, applications, and readable connections. Do not imply that MCP access exceeds those permissions.

## Discovery

Tool names and schemas may change while the service is in beta. Inspect the tools exposed in the current session and follow their descriptions.

Typical discovery proceeds from organization context to application, connection, and finally the requested fleet resource. Use list or lookup tools to resolve identifiers instead of inventing IDs. Supply an application ID and connection token only when the live tool schema requests them.

If authorization fails, ask the user to reconnect Terminal through their client's MCP or connector settings. Do not fall back to collecting credentials in chat.

Current setup documentation: https://docs.withterminal.com/guides/agents
