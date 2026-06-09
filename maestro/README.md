# Maestro

YAML-based mobile UI automation for Android and iOS

## Capabilities

- Write declarative YAML Flows that run on both Android and iOS with no code changes
- Use core commands: launchApp, tapOn, inputText, assertVisible/assertNotVisible, scrollUntilVisible
- Rely on built-in auto-wait and flakiness tolerance (waits for UI and animations to settle, no manual sleeps)
- Inspect elements and author flows live with Maestro Studio
- Modularize repeated steps into subflows with runFlow (e.g. dismiss-popup routines)
- Branch with conditional flows (when) based on visibility or platform
- Use relative selectors (rightOf, below, leftOf, above) for layout-resilient targeting
- Handle non-queryable elements with coordinate-based swipes (e.g. the iOS date scrollwheel via X/Y)
- Add logic with JavaScript (evalScript) to copy/compare values or generate and transform test data
- Use environment variables and tags (include/exclude) to run targeted subsets, and run on Maestro Cloud (parallel runs with video debugging) in CI/CD
