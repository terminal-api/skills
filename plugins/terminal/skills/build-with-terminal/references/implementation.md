# Integration considerations

## Connection onboarding

Use Terminal Link for end-user connection onboarding unless the current documentation describes a more appropriate flow. Treat public-token exchange as a server-side operation and associate the resulting connection with the authenticated application tenant.

## Reading fleet data

- Confirm the common model and endpoint in the current API reference.
- Include the correct connection scope.
- Implement cursor pagination when the endpoint is paginated.
- Preserve Terminal IDs for joins and follow-up requests.
- Treat optional and provider-dependent fields as optional.

The provider explorer is the source for current provider/model capability differences:

https://docs.withterminal.com/providers/explorer

## Webhooks

Follow the current webhook documentation for event types, signature verification, retry behavior, and payload schemas:

https://docs.withterminal.com/terminal-platform/webhooks

Verify signatures against the raw request body before parsing when the documented algorithm requires it. Make handlers idempotent because delivery may be retried. Acknowledge successful processing according to the documented timing requirements.

## Verification

Use Terminal's sandbox for integration tests when possible. Cover invalid credentials, wrong environment, missing connection scope, pagination, optional fields, rate limits, and webhook retries when relevant to the requested change.
