# Appium

Mobile Automation ทั้ง Android และ iOS (ด้วย Robot Framework / AppiumLibrary)

## สิ่งที่ทำได้

- ทำ automation บนแอป native ทั้ง Android และ iOS จาก suite เดียว (cross-platform)
- ใช้ driver มาตรฐาน: UiAutomator2 (Android) และ XCUITest (iOS) บนสถาปัตยกรรม Appium 2
- ตั้ง session ด้วย capabilities (platformName, automationName, app, appPackage/appActivity, bundleId)
- เตรียมและรันบน emulator/simulator: Android Studio AVD และ Xcode iOS Simulator
- หา element และสร้าง locator ด้วย Appium Inspector
- ใช้ locator หลายกลยุทธ์: Accessibility ID, resource id, class name, iOS predicate/class chain และ XPath
- จัดการความต่างของ locator ระหว่าง Android และ iOS ในโฟลว์เดียวกัน (เช่น ตรวจ IMEI บน dialer ของ Android, แอป Reminders บน iOS)
- สั่ง gesture และ touch action: tap, long press, swipe, scroll, drag-and-drop
- ใช้ wait เพื่อ sync การทำงานให้เสถียร และอ่าน report/log พร้อม screenshot ตอน fail
- รองรับการรันบน real device, cloud device farm และการรันขนานหลายเครื่อง ต่อเข้า CI/CD ได้

**Stack:** Robot Framework, Appium (UiAutomator2 / XCUITest), Android Studio, Xcode
