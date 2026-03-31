# 🤖 Software QA Automation Portfolio: Panthawit Chumthong

Hello and welcome to my Automation Testing Portfolio! 👋

If you are a recruiter, an HR professional, or someone without a deep technical background, you've come to the right place. Let me walk you through a story of what happens here and why it's so valuable for ensuring high-quality software.

---

## 🌟 What Are We Doing Here?

Imagine you have a complex website with a long registration form. Every time developers update the site, someone has to manually open the browser, type in fake names, select birthdates, upload files, and click "Submit" to ensure it's still working. Doing this manually for dozens of scenarios is tedious, slow, and prone to human error.

That's where **Automation Testing** comes in!

Instead of doing it by hand, I use a framework called **Robot Framework** along with **Selenium** to write a "script"—a set of instructions that tells the computer exactly how to interact with the website automatically. It perfectly simulates a real human user, but operates much faster and with 100% precision.

---

## 📂 The Project: Complex Form Filling

In this repository, you'll find a project folder called `form-filling-page`. This project targets a complex web form filled with various challenging elements: text boxes, dropdown menus, checkboxes, dynamic date pickers, and file uploads.

### 1. The Target Form

This is the beautiful webpage my script interacts with. To a human, it's just a form, but to an automated tester, it's a playground of different web elements to handle!

![The Testing Form UI](form-filling-page/other-data/testing-form-ui.png)

### 2. Seeing it in Action!

When I run my automation script, my code takes over the browser. It types, clicks, and selects everything perfectly. Take a look at this quick demonstration:

![Test Execution Demo](form-filling-page/other-data/test-execution-demo.gif)

### 3. A Proud Problem-Solving Moment 💡

Automation isn't always straightforward. During this project, I encountered a particularly tricky challenge with the **Date-picker field**.

It wasn't a standard web element. Usually, to enter a new date, you would just tell the bot to "clear" the existing text and type a new one. However, I discovered a strange behavior: if the default date was completely deleted, the entire webpage would crash and turn completely blank!

Since I had never encountered an issue like this before, I spent a good amount of time brainstorming workarounds. Finally, I came up with a creative solution: instead of using the standard clear command, I instructed the bot to simulate pressing **`Command/Ctrl + A`** (Select All) and then immediately type the new date over it, replacing the text without ever leaving the field empty.

This workaround successfully bypassed the bug and worked perfectly! It was a great learning experience that required outside-the-box thinking, and I am very proud of figuring it out.

---

## 🧩 How Does The Code Work?

To make the code easy to read, maintain, and update in the future, I don't just put everything in one giant file. Instead, I use a professional structure called the **Page Object Model (POM)**. I split the project into three distinct parts:

1. 🗺️ **The Map (`locators.resource`)**:
   Before the computer can click a button, it needs to know *where* it is. This file stores the exact "addresses" (like HTML IDs or XPaths) of every button, text box, and dropdown on the webpage. If the website's design changes later, I only have to update this one file!
2. ⚙️ **The Actions (`keywords.resource`)**:
   This file acts as a dictionary of actions. Instead of writing complex computer code every time I want to type a name, I create a reusable action command here like `Fill In First Name`. It hides the complex technical details, making everything else clean.
3. 📝 **The Blueprint (`test_case.robot`)**:
   This is the actual test script. Because of how I've set up the other two files, this file reads almost like plain English. It simply lists the steps: open the browser, fill the form, submit, and verify success. Anyone can read it and understand exactly what is being tested!

---

## ✅ The Results

Once the computer finishes speeding through the form, how do we know it worked? The automation framework automatically generates a beautiful, detailed report. It logs every single step it took, how much time it took, and whether it Passed or Failed.

![Test Report Shows 100% Success](form-filling-page/other-data/test-report-success.png)

I have pre-run this test, and it achieved a **100% Pass Rate**.

You don't even need to run the code to see the results. You can view the live, passing execution reports directly in your browser by clicking the links below:

- 🟢 <a href="https://raw.githack.com/panwyyt/robotframework-selenium-portfolio/main/form-filling-page/report.html" target="_blank">**View The Full Test Report**</a>
- 🟢 <a href="https://raw.githack.com/panwyyt/robotframework-selenium-portfolio/main/form-filling-page/log.html" target="_blank">**View The Detailed Step-by-Step Log**</a>

*(💡 Ctrl/Cmd + Click to open in a new tab)*

---

## 🛠️ For The Technical Reviewers

If you'd like to dive into the code yourself, here are the technical details.

### Technology Stack

- **Robot Framework**: Core automation framework
- **SeleniumLibrary**: Web manipulation library
- **Python**: Core scripting engine

### How to Run Locally

1. Ensure Python is installed.
2. Install the necessary libraries:

```bash
pip install robotframework
pip install robotframework-seleniumlibrary
```

3. Make sure you have the compatible browser drivers (e.g. `chromedriver`) in your system PATH.
4. Execute the tests:

```bash
cd form-filling-page
robot test_case.robot
```

The test results (`log.html` and `report.html`) will be generated inside the project folder.

---

_Thank you for visiting my portfolio. Feel free to explore the code to see my structural approach to UI test automation!_
