# 🚀 JMeter Showcases Portfolio

## 🧐 What is Apache JMeter?

**Apache JMeter** is a top-tier Open Source tool designed specifically for **Performance Testing** and **Load Testing**.

**How does JMeter differ from Postman and Playwright?**

- **Postman:** Excels at API Functional Testing, features an easy-to-use interface suitable for development and verifying functionality of individual APIs. It is great for sending single requests or running sequential automated flows.
- **Playwright:** Built for End-to-End (E2E) UI Testing by simulating actual web browser user behaviors.
- **JMeter:** The "king of load simulation." Its core strength is simulating massive amounts of Virtual Users (Threads)—ranging from hundreds to hundreds of thousands—to concurrently blast requests at a server. It helps determine if the system will crash, what throughput it can handle, and where the hidden bottlenecks are!

---

## 🐾 The Petstore API Project

This project uses the **Swagger Petstore API** to simulate load testing scenarios. A special thanks to this public API provided for aspiring testers at [https://petstore.swagger.io/#/](https://petstore.swagger.io/#/) which gave us a great playground to practice.

The story of this project covers everything from structuring the script to deep-level debugging when facing a massive "Data Collision" under heavy load!

---

## 🛠 Workflow and Skills Demonstrated

### 1. Rapid Scripting via cURL Import

Instead of manually crafting each HTTP Request one by one, I utilized the cURL Import feature. This drastically reduced the time required to build baseline requests, which saves immense time especially with complex APIs.

![Importing cURL](petstore-api-performance/import-curl.png)

### 2. HTTP Header Management

Managing headers like Authentication Keys, Content-Type, and Accepts is handled via the **HTTP Header Manager**. This ensures that every simulated request formats the data exactly like real users in a production environment.

![Managing Headers](petstore-api-performance/manage-header-keys.png)

### 3. Dynamic Variable Extraction & Chaining

I used Post-Processors (such as the JSON Extractor) to pull critical data out of the server's responses and store it into variables. These variables are then passed to subsequent requests (e.g., retrieving an ID after creating a pet, and passing that ID to update/delete it).

![Storing Variables](petstore-api-performance/store-variables.png)

### 4. Data Parameterization & Randomization

To combat data collision during concurrent user load, I implemented JMeter's native functions such as `${__Random()}` and integrated them into the **User Defined Variables (UDV)**. Later, to prevent static caching, I built **"On-the-fly" Variables** (e.g., `${CURRENT_PET_ID}`) that dynamically refresh the pet ID for every single Thread, ensuring a completely realistic simulation of independent users.

### 5. Test Execution (GUI vs. Non-GUI)

I primarily use the GUI mode for verification, script building, and debugging to assure the flow structure is correct.

![Running Execution](petstore-api-performance/running-execution.gif)

However, during actual load execution, using the GUI consumes massive amounts of local memory. Therefore, I run tests via **Non-GUI (CLI) mode** to maintain accuracy. This also allowed me to extract the interactive HTML Dashboard Reports straight from the terminal.

![Terminal Report Generation](petstore-api-performance/terminal-report-generation.png)

---

## 🎬 Case Study: The Petstore Project's 404 Wall Breaker Mission

If we look at these 3 rounds of execution as a story for a QA/Tech professional, it turns into a highly visual and fun Case Study of performance problem-solving!

### Chapter 1: The Initial Raid and the Chaos (Run #1)

After perfectly structuring the CRUD (Create, Read, Update, Delete) script, we decided to test the system's endurance by simulating 100 concurrent users firing rapid requests, totaling 2,500 requests.

**The Outcome:** The results graph was painted red! We encountered an error rate creeping up to nearly 20% (498 failures)—all tied to `404 Not Found` response codes.

**The Investigation:** We triggered a classic **"Data Collision"**. Because we mapped the Pet ID and Username as static values, once 100 users rushed the system concurrently, the very first user successfully ran the flow and fired a "DELETE". When users 2-100 arrived slightly later and attempted to Read or Delete that same pet, the system naturally responded: *"I can't find it! It’s already been deleted!"*

**The Round 1 Fix:** We countered this by introducing Parameterization using the `${__Random()}` function inside the **User Defined Variables (UDV)** table, hoping this would assign a unique ID to every virtual user.

---

### Chapter 2: The Randomizer Trap and the Remaining Mystery (Run #2)

We executed the second round with confidence. The overall error rate plummeted to just 9.68%! The POST, GET, and PUT requests turned 100% green and ran flawlessly.

**The Outcome:** But wait... The `04_DELETE` request was still failing miserably with nearly a 50% Error Rate (242 failures).

**The Investigation:** We fell into a JMeter trap! Placing a randomized function at the very top UDV table instructs JMeter to run it **"only once upon test startup."** It generated a single random number (e.g., 55555) and then distributed that identical number to all 100 users! We had just recreated our problem: the fastest user deleted 55555, and the rest were left searching for a ghost.

**The Round 2 Fix:** Now it was time to deploy a Senior-level tactic: creating an **"On-the-fly Variable."** We relocated the randomize function into the timing of the "Create Pet (03_POST)" request. It generated a fresh number right at that moment and stored it instantly into a `${CURRENT_PET_ID}` variable. This forced all 100 users to continuously redraw a new ID every time they created data.

---

### Chapter 3: Flawless Victory (Run #3)

We wiped the old result files and executed the test via Terminal for the third time...

**The Outcome:** 0.00% Error Rate! The test sliced through a staggering 25,000 requests without a single `404 Not Found`. The dashboard graph lit up with a beautiful 100% PASS rate 🎉.

![Test Results Summary](petstore-api-performance/test-results.gif)

**System Conclusion:** Not only did we eliminate the errors, but this fully debugged data-collision script effectively allowed us to extract the true capabilities and limits of the system.

### 📊 Deep Dive Insights: The Evolution of Runs

By tracking the terminal reports across our 3 iterations, we can clearly see how resolving the data collision and variable caching drastically improved the system's test outcome:

| Metric | Run #1 (Baseline) | Run #2 (Variable Tuning) | Run #3 (Final Production) |
|---|---|---|---|
| **Total Samples** | 2,500 Requests | 2,500 Requests | 25,000 Requests |
| **Total Errors** | 498 `(19.92%)` ❌ | 242 `(9.68%)` ⚠️ | 0 `(0.00%)` ✅ |
| **Overall Throughput** | 142.41 Requests/sec | 142.38 Requests/sec | 433.53 Requests/sec 🚀 |
| **Mean Response Time** | 308.89 ms | 312.10 ms | 311.88 ms ⚡ |
| **Max Response Time** | 1,450 ms | 2,039 ms | 1,359 ms |
| **Received Bandwidth** | 56.45 KB/sec | 58.26 KB/sec | 181.37 KB/sec |

> 🔗 **Explore:** [View Full Interactive HTML Report](petstore-api-performance/report_output/index.html)

### 💡 Conclusion & Lessons Learned

What started as a basic script that failed due to data concurrency was iteratively upgraded and debugged into a true **Production-Ready Script** capable of running hundreds of users without a single collision. This is the real workflow, story, and value behind proper Performance Testing! 🚀
