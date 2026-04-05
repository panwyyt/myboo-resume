# 🚀 JMeter: The King of Load Simulation

Welcome to the Performance division of my portfolio! 🌪️

While functional testing ensures a feature works for *one* person, **Performance Testing** ensures it doesn't crash when *everyone* uses it at once. In this project, I use **Apache JMeter** to simulate hundreds of concurrent users to find system bottlenecks and stress points.

---

## 🧐 Why JMeter?

If Postman is for checking if a door opens, and Playwright is for walking through the house, **JMeter** is for seeing if the floor collapses when 1,000 people dance on it at the same time.

---

## 🏗️ The Journey: My Performance Workflow

I’ve optimized my JMeter workflow to be fast, accurate, and production-ready.

### Step 1: Rapid Scripting (cURL Import)
Building complex requests from scratch is slow. I use the **cURL Import** feature to instantly set up baseline requests, focusing my time on the actual logic.
![Importing cURL](petstore-api-performance/import-curl.png)

### Step 2: Dynamic Data & Variable Chaining
A realistic simulation needs dynamic data. I use **JSON Extractors** to pull IDs from server responses and pass them to subsequent requests (Variable Chaining).
<p align="center">
  <img src="petstore-api-performance/manage-header-keys.png" width="48%" alt="Managing Headers" />
  <img src="petstore-api-performance/store-variables.png" width="48%" alt="Storing Variables" />
</p>
*(Managing security headers and capturing dynamic IDs for seamless flows)*

### Step 3: From GUI Debugging to CLI Battle
I use the GUI for script building and debugging, but for actual load tests, I switch to **Non-GUI (CLI) Mode**. This saves system memory and provides the most accurate raw data.
<p align="center">
  <img src="petstore-api-performance/running-execution.gif" width="48%" alt="GUI Debugging" />
  <img src="petstore-api-performance/terminal-report-generation.png" width="48%" alt="CLI Generation" />
</p>
*(Switching from visual debugging to high-performance terminal execution)*

---

## 🎬 Case Study: The "404 Wall Breaker" Mission

This is the story of how I debugged a massive data-collision issue during a 100-user load test.

### Chapter 1: The Initial Raid (Chaos)
My first run resulted in a **20% Error Rate**. Why? Multiple users were trying to delete the same data at the same time. **Data Collision!**

### Chapter 2: The Randomizer Trap
I tried to fix it with a simple randomizer, but fell into a JMeter trap: the random number was only generated *once* at startup. All 100 users were still fighting over the same ID!

### Chapter 3: Flawless Victory
I deployed a "Senior-level" tactic: an **On-the-fly Variable.** I forced every user to redraw a fresh ID every single time they created data.
**The result? 0.00% Error Rate across 25,000 requests!** 🎉
![Test Results Summary](petstore-api-performance/test-results.gif)

---

## 📊 The Evolution of Runs

By tracking metrics across my 3 iterations, we can see exactly how the script matured from a "broken" baseline to a **Production-Ready** power-house.

| Metric | Run #1 (Baseline) | Run #2 (Tuning) | Run #3 (Final) |
|---|---|---|---|
| **Total Errors** | 19.92% ❌ | 9.68% ⚠️ | **0.00% ✅** |
| **Throughput** | 142 req/sec | 142 req/sec | **433 req/sec 🚀** |
| **Mean Response** | 308 ms | 312 ms | **311 ms ⚡** |

> 🔗 **[View Full Interactive HTML Report](petstore-api-performance/report_output/index.html)**

---

## 💡 Conclusion

Performance testing is about more than just clicking 'Run'. It's about understanding how data collides under pressure and building resilient scripts that can handle the heat.

**I’m ready to stress-test your systems and ensure they stay standing when the crowd arrives!** 🚀
