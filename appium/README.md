# 📱 Mobile Automation: Taking Testing on the Go

Welcome to the Mobile branch of my Automation journey! 🚀

After mastering Web automation with Selenium, I decided to take on a bigger challenge: **Mobile Applications.** Whether it's an app from the App Store or Google Play, testing on a tiny screen requires a whole different set of "superpowers."

---

## 🌟 The Prequel: From Web to Mobile

If Robot Framework is the "Brain," then **Appium** is the "Driver" that knows how to navigate the complex roads of iOS and Android. The best part? Because I already scale with Robot Framework, I can bring my logic over—I just had to learn how to handle the "mobile beast."

---

## 🧩 The Challenge: Why is Mobile Harder?

Testing a mobile app is like performing surgery compared to web testing. Here’s why it’s a level up:

1.  **Virtual Worlds:** We don't just open a browser. We have to run an entire **Virtual Phone** (Emulator for Android, Simulator for iOS) inside our computer!
2.  **The X-Ray Vision:** You can't just "Right-Click > Inspect" on a phone. I use **Appium Inspector**—a tool that acts like an X-ray, letting me see the hidden "bones" (locators) of the app so I know exactly where to click.

---

## 🤖 Mission 1: Android Automation (The IMEI Check)

In this mission, I automated the process of opening the phone dialer and checking the device's IMEI number. 

### Step 1: Deep Inspection
I used Appium Inspector to "see" through the Android UI and find the exact coordinates for the keypad.
![Android Inspector](android/running_test.png)

### Step 2: The Action
Watch the script move at lightning speed, interacting with the dialer exactly like a human user would.
![Android Test Execution](android/automation_evidence.gif)

### Step 3: Verified Success
Robot Framework generates a clean report confirming that the IMEI was checked successfully.
![Android Test Report](android/test-report.png)

*(Tech Note: Check the script here: [`android/test_mobile.robot`](android/test_mobile.robot))*

---

## 🍏 Mission 2: iOS Automation (The Reminders App)

iOS is a different world with its own rules. I tackled the built-in **Reminders app** to demonstrate cross-platform capability.

### Step 1: Simulator Setup
I configured the **Xcode iOS Simulator** to host the test environment. Finding locators on iOS requires a different analytical skill set than Android!
![iOS Inspector](ios/running_test.png)

### Step 2: Flawless Execution
The automated script opens the Reminders app and navigates through its functions smoothly.
![iOS Test Execution](ios/automation_evidence.gif)

### Step 3: Final Validation
Another successful mission confirmed by a detailed test report.
![iOS Test Report](ios/test-report.png)

*(Tech Note: Check the script here: [`ios/ios_basic_test.robot`](ios/ios_basic_test.robot))*

---

## 💡 The Takeaway

This project proves that I can handle the heavy-duty configuration required for mobile testing—from setting up **Android Studio** and **Xcode** to mastering **Appium Inspector.** 

**I am ready to build automated, cross-platform tests that ensure quality on every device!**

---

*Thank you for following my mobile automation story. Feel free to explore the code in this repository!*
