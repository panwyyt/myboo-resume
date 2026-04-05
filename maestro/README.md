# Maestro: The Fun, Fast, and Easy Mobile UI Testing Framework

If you’ve ever felt overwhelmed by the steep learning curve of mobile UI testing tools, it might be time to meet your new best friend. Let me introduce you to **Maestro**—a modern end-to-end testing framework for iOS and Android that’s changing the game.

Why is it so good? Because it was built from the ground up to solve the biggest pain points of mobile testing: flakiness, complex setup, and slow execution. Let's dive in and see what makes Maestro an absolute joy to use.

---

### 1. Seamless Setup and Connection

Forget about spending hours configuring drivers and dealing with environment variables. With Maestro, getting started is practically instantaneous.

![Maestro Emulator Connection](./assets/maestro-emulator-connection.png)

If you already have Android Studio or Xcode installed, Maestro connects to your open emulator or simulator right away. It's incredibly smooth—you jump in, connect, and you are immediately ready to start validating your app.

### 2. A User Interface That Makes Testing Fun

![Maestro Success Badges UI](./assets/maestro-success-badges-ui.png)

Testing tools often have intimidating, terminal-heavy interfaces, but Maestro takes a different approach. The interface is incredibly clean and intuitive. When your tests pass, you even get rewarding little success badges! It honestly feels like an educational app designed to be as friendly as possible. It turns the often-tedious task of writing UI tests into a surprisingly fun experience.

### 3. The Built-in Inspector is a Lifesaver

![Maestro Built-in Inspector](./assets/maestro-builtin-inspector.png)

Writing tests means finding the right elements on the screen. Maestro comes packaged with a fantastic built-in Inspector. You simply click around your app, and the tool automatically recommends the best locators to use in your test scripts. From what I’ve experienced, its suggestions cover almost everything you need. Even if it misses something, the built-in search functionality makes it easy to find elements manually.

### 4. Handling Unpredictable Pop-ups with Ease

![Maestro RunFlow Conditional Logic](./assets/maestro-runflow-conditional-logic.png)

Mobile apps are notorious for erratic pop-ups—whether it's a rating request, a newsletter prompt, or an update notification. When testing the Wikipedia app, I encountered these unpredictable interruptions.

Maestro handles this beautifully. You can easily insert conditional logic using `runFlow` (essentially an `if-else` statement). You can tell the script: *"If you detect this pop-up, dismiss it; if not, just proceed to the next step."* This makes tests much more resilient and less prone to random failures.

### 5. Running on the Cloud vs. Local Environment

If you are working with an older computer or simply don't have the processing power to run heavy emulators smoothly alongside your background tasks, Maestro's Cloud option is a lifesaver.

![Maestro Cloud Free Trial](./assets/maestro-cloud-free-trial.png)

While the cloud service isn't entirely free forever, they do offer a generous free trial to let you get the feel of it—and the best part is, you don’t even need to link a credit card to try it out!

![Maestro Cloud Upload APK](./assets/maestro-cloud-upload-apk.png)

Executing tests on the cloud is incredibly streamlined. Once you click 'run', Maestro automatically uploads your `.apk` file and your test scripts for you. No manual CI/CD pipeline configuration is needed for a simple run.

### 6. Next-Level Debugging Outputs

![Maestro Cloud Debugging Video](./assets/maestro-cloud-debugging-video.gif)

Here is where the magic really happens. This is the output you get after a test finishes running on the cloud. The platform records a video of the execution and breaks it down step-by-step. If a test fails, you can see *exactly* what happened visually without having to dig through massive text logs. It's incredibly convenient—dare I say, it feels even better and more intuitive than debugging in Playwright!

### 7. Free and Fast Local Testing

![Maestro Local Testing Execution](./assets/maestro-local-testing-execution.gif)

Of course, if you have the hardware for it, running tests locally on your own machine is 100% free and extremely convenient. The local runner interacts directly with your emulator, executing commands flawlessly in real-time, as shown in the example above.

### 8. Let's Build a Mini-Project!

For this project, we'll be using `android.wdio.native.app.v2.2.0.apk`. This app was primarily designed for testing the Appium library, but we'll borrow it to demonstrate Maestro's capabilities. Here are what the app's home screen and the form we'll be filling out look like:

<p align="center">
  <img src="./assets/maestro-wdio-app-home.png" width="48%" alt="App Home Screen" />
  <img src="./assets/maestro-wdio-app-form.png" width="48%" alt="App Form" />
</p>

Most of the flow is very straightforward and utilizes standard Maestro commands. However, in one particular step, we want to copy a specific text, store it in memory, and then compare it later to check if it matches another element. For advanced logic like this, we use `evalScript`, which is a powerful command that let us execute **JavaScript code** directly within our Maestro test script!

![Maestro EvalScript Copy & Compare](./assets/maestro-evalscript-copy-compare.png)

Another feature I absolutely love is how we can locate elements purely by their visible text. But what if multiple elements on the screen have the exact same text? The chances of duplication are quite high. To prevent the system from getting confused and grabbing the wrong element, we can use *relative locators*. For example, we can specify: "Find this text, but ensure it is positioned directly below *this* element and above *that* element." It’s a brilliant way to ensure accuracy.

![Maestro Relative Locators](./assets/maestro-relative-locators.png)

Setup complete! Now let’s see it run in action:

![Maestro WDIO Test Execution](./assets/maestro-wdio-test-execution.gif)

### 9. Trying it out on iOS

Next, let's try it out on iOS. We will use the exact same app. Let's see if we can just copy and paste the entire test flow. 

Spoiler alert: we can't! This is because the app ID and package names are different. However, the major difference is that iOS has much better locator IDs. Almost every element has a dedicated ID, meaning we no longer have to rely heavily on matching text. We can directly match IDs, which saves a lot of hassle.

![Maestro iOS Locator ID](./assets/maestro-ios-locator-id.png)

However, here comes the frustrating part. In iOS, dropdowns are implemented as native scrollwheels. Because they are rendered as a single cohesive box, we cannot simply extract text or individual IDs from the options. To interact with it, we have to simulate a swipe or tap by specifying precise X/Y screen coordinates. Honestly, this took me quite a while to figure out since it was my first time encountering this issue!

![Maestro iOS Scrollwheel Issue](./assets/maestro-ios-scrollwheel-issue.png)

![Maestro iOS Swipe Coordinates](./assets/maestro-ios-swipe-coordinate.png)

Everything else is pretty straightforward, using a flow very similar to the Android version. Let's take a look at the execution result:

![Maestro iOS Test Execution](./assets/maestro-ios-test-execution.gif)

### Conclusion

Overall, Maestro is fantastic and I honestly prefer it over Appium. It operates largely bug-free—for example, when using Appium, the server disconnects frequently, but I experienced none of that here. It truly feels like a genuine low-code/no-code platform; you just click, select, and you're done. While it might be slightly limited when dealing with highly complex UI elements requiring intricate configurations, I believe it covers the vast majority of testing scenarios perfectly.
