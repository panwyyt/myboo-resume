# Playwright

End-to-end web UI and API testing with TypeScript

## Capabilities

- Run UI and API testing in a single tool, within the same test and CI job
- Use auto-waiting and web-first assertions (e.g. expect(locator).toBeVisible()) that auto-retry to reduce flakiness
- Select elements with user-facing locators (role, text, label, test-id) following best practice
- Bootstrap scripts fast with Codegen, and structure with the Page Object Model (POM) plus data-driven testing
- Test complex UI: radio buttons, date tables, file upload, and cascading dropdowns
- Run three engines from one API (Chromium, Firefox, WebKit) and emulate mobile devices
- Test full CRUD APIs with the built-in request / APIRequestContext, no browser required
- Intercept network and mock requests (page.route)
- Run in parallel with isolated browser contexts and shard across CI machines
- Use the Trace Viewer (screenshots, video, step-by-step DOM snapshots) and reuse auth state with storageState
- Visual / screenshot-comparison regression testing

**Stack:** Playwright v1.58.2, TypeScript, Node.js
