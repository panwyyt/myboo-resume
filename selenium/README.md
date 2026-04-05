# 🤖 Automation Journey: Robot Framework & Selenium Library

Hello! 👋 Welcome to the automation side of my portfolio. 

Have you ever wished you had a personal assistant to do all the boring, repetitive tasks on a website for you? That’s exactly what I’ve built here. Let me take you on a journey through how I turned manual clicking into a rock-solid automated process.

---

## 🧐 Meet My "Digital Assistant"

Before we jump into the code, let's talk about the tools that make the magic happen:

-   **Robot Framework (The Brain):** An open-source framework that lets us write tests in plain English. No messy code—just clear, readable "keywords."
-   **Selenium Library (The Hands):** The tool that actually reaches out and interacts with the browser—clicking buttons, typing text, and uploading files exactly like a human would, but much faster!

---

## 📂 The Mission: Taming the Tricky Form

The project featured here is a `form-filling` automation. I chose a form designed to be a "QA obstacle course"—full of text boxes, dropdowns, checkboxes, and even a tricky date picker.

### Step 1: Evaluating the Playground
To a normal user, it’s just a registration page. To me, it’s a series of elements that need to be identified and handled with precision.

![The Testing Form UI](form-filling-page/other-data/testing-form-ui.png)

### Step 2: Writing the Instructions
Using Robot Framework, I scripted the test to read like a simple checklist. It’s clean, professional, and easy for anyone on the team to understand.

![Test Script Code](form-filling-page/other-data/test-writing-code.png)

### Step 3: Deployment & Action!
When the script runs, it’s satisfyng to watch the browser move on its own, filling out the entire form in seconds without a single mistake.

![Test Execution Demo](form-filling-page/other-data/test-execution-demo.gif)

---

## 💡 The "Aha!" Moment: Solving the Date-Picker Bug

Automation isn't just about following steps; it's about solving problems. During this project, I hit a snag: **The Date-Picker field.**

I found a bug where "clearing" the default date caused the entire page to go blank. **My fix?** I told the bot to "Select All" (`Ctrl+A`) and immediately type over the text. This bypassed the crash and successfully completed the form. 

**It was a great reminder that a good tester needs to think outside the box!**

---

## 🧩 Behind the Scenes: Keeping it Clean (POM)

I believe that good code should be as organized as a library. I used the **Page Object Model (POM)** structure:

1.  🗺️ **Locators:** A "map" of where everything is on the page.
2.  ⚙️ **Keywords:** A "dictionary" of actions (like "Sign In" or "Upload Photo").
3.  📝 **Test Cases:** The final "blueprint" that uses the map and dictionary to run the test.

---

## ✅ The Results: 100% Success

The framework generates beautiful reports that show exactly what happened. In this run, we achieved a **100% Pass Rate!**

![Test Report Shows 100% Success](form-filling-page/other-data/test-report-success.png)

-   🟢 [**Open the Full Report**](https://github.com/panwyyt/myboo-resume/blob/main/selenium/form-filling-page/report.html)
-   🟢 [**View Detailed Step-by-Step Log**](https://github.com/panwyyt/myboo-resume/blob/main/selenium/form-filling-page/log.html)

---

## 🏆 Proof of Skill

My foundational knowledge is backed by a professional certification in Automation Testing.

![Selenium Basic Certification](Certificate%20Automation%20Test%20(Basic)%20-%20%20Panthawit%20Chumthong%20(Boo).png)

---

## 🛠️ For the Technical Minds

Want to run this yourself? Here is the tech stack and how to get started:

**Stack:** Robot Framework, SeleniumLibrary, Python.

1.  **Install:** `pip install robotframework robotframework-seleniumlibrary`
2.  **Driver:** Ensure `chromedriver` is in your system PATH.
3.  **Run:** 
    ```bash
    cd form-filling-page
    robot test_case.robot
    ```

---

*Thank you for exploring my automation journey! I hope this gives you a glimpse into how I combine technical logic with creative problem-solving.*
