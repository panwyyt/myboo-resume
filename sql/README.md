# 🗄️ Behind the Scenes: My SQL & Database Journey

Welcome to the data-driven side of my portfolio! 🚀

As a QA, I quickly learned that just checking the front-end isn't enough. If I click "Submit" and see a success message, my job is only half done. I need to know: **"Where did that data actually go?"** This curiosity led me to master SQL, the language that lets me verify truth at the database level.

---

## 🚀 The Mission: From Basics to Analytics

To prove my skills, I challenged myself with a real-world dataset: **"Adoptions by Breed and Date"** from the Bloomington Animal Shelter (10,000+ records). I’ve divided my journey into two clear projects.

### Step 1: The Foundation (CRUD)
Before running, you must walk. I started by mastering table creation, schema design, and basic data manipulation (CRUD). I used independent mock data to ensure my foundational commands were rock-solid.
*(Source: [`boo-data/basic_command.sql`](./boo-data/%20basic_command.sql))*

### Step 2: Advanced Analytics & Window Functions
I then took it to the next level using the 10,000+ animal adoption records. I wrote complex queries using **CTEs**, **Window Functions** (RANK, LEAD, LAG), and **Conditional Logic** (CASE WHEN) to find deep insights in the data.
*(Source: [`boo-data/advanced_commnd.sql`](./boo-data/advanced_commnd.sql))*

---

## 📸 Proof of Concept: Tools of the Trade

I am comfortable using professional database tools to verify my test results. Whether it's a sleek IDE or a dedicated database manager, I know my way around the data.

<p align="center">
  <img src="./boo-data/ภาพประกอบ_ใช้งานPostgresในVSCode.png" width="48%" alt="Querying via VSCode" />
  <img src="./boo-data/ภาพประกอบ_ใช้งานPostgresในphAdmin4.png" width="48%" alt="Querying via pgAdmin4" />
</p>
*(Running PostgreSQL queries via VSCode Database Tools and pgAdmin4)*

---

## 💡 The "Aha!" Moment: Why Architecture Matters

My understanding of databases clicked when I studied the **Shopping Cart** architecture. I realized that an e-commerce system needs more than just "Customer" and "Order" tables—it needs an **Order Header** to group multiple items into one receipt. 

Learning how to read **Entity-Relationship (ER) Diagrams** and understanding **1:N (One-to-Many)** relationships changed how I approach QA. Now, I catch structural bugs in the database design before they ever become front-end issues!

---

## 🏆 Official Validation

To ensure my skills are up to industry standards, I completed a specialized Database Testing course.

<p align="center">
  <img src="./boo-data/Certification%20SQL%20-%20Panthawit%20Chumthong%20(Boo).png" width="80%" alt="SQL Certification" />
</p>

---

## 🛠️ Want to see the code? 

Take a peek at my actual query files and documentation:
- 📜 [**Basic CRUD Script**](./boo-data/%20basic_command.sql) 
- 📜 [**Advanced Analytics Script**](./boo-data/advanced_commnd.sql)
- 📊 [**Raw Animal Dataset (CSV)**](./boo-data/animal-data-1.csv)

---

*Thank you for exploring my data journey! Understanding the "why" and "where" of data is what makes a great tester.* 🗄️✨
