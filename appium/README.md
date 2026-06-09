# Appium

Mobile automation on both Android and iOS (with Robot Framework / AppiumLibrary)

## Capabilities

- Automate native Android and iOS apps from a single suite (cross-platform)
- Use the standard drivers: UiAutomator2 (Android) and XCUITest (iOS) on the Appium 2 architecture
- Set up sessions with capabilities (platformName, automationName, app, appPackage/appActivity, bundleId)
- Provision and run on emulators/simulators: Android Studio AVD and Xcode iOS Simulator
- Inspect elements and build locators with Appium Inspector
- Use multiple locator strategies: Accessibility ID, resource id, class name, iOS predicate/class chain, and XPath
- Handle Android vs iOS locator differences in one logical flow (e.g. IMEI check on the Android dialer, Reminders app on iOS)
- Drive gestures and touch actions: tap, long press, swipe, scroll, drag-and-drop
- Use waits to keep runs stable, and read reports/logs with on-failure screenshots
- Support real devices, cloud device farms, and parallel multi-device runs, integrated into CI/CD

**Stack:** Robot Framework, Appium (UiAutomator2 / XCUITest), Android Studio, Xcode
