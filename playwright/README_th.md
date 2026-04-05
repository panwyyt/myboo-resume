# 🎭 Playwright Testing Portfolio

สวัสดีครับ! 👋 นี่คือ Playwright portfolio ของผม — เป็นโปรเจกต์ที่สร้างขึ้นเพื่อฝึกฝนและนำเสนอทักษะการทำ Automated Testing ทั้งแบบ Web UI และ API ให้อยู่รวมกันใน codebase เดียว

---

## 🌟 ทำไมผมถึงเลือก Playwright

ก่อนหน้านี้ผมใช้งาน **Selenium** สำหรับทำ UI testing และใช้ **Postman** สำหรับทดสอบ API — ซึ่งมันกลายเป็น 2 เครื่องมือ กับ 2 เวิร์กโฟลว์ที่แยกกัน ทั้งคู่ทำงานได้ดีนะครับ แต่พอลองใช้ **Playwright** ผมก็ค้นพบว่ามันสะดวกกว่ามากในการรวมทุกอย่างให้มาจบอยู่ในโปรเจกต์เดียว

**เปรียบเทียบกับ Selenium** — Playwright มีระบบ auto-wait ในตัวทำให้ผมไม่ต้องเขียน explicit wait, ทำงานเร็วกว่าด้วยโหมด headless และการรันแบบขนาน (parallelism) ในตัว, ติดตั้งบราวเซอร์ทุกตัวเสร็จได้ในคำสั่งเดียว, มี HTML report ให้พร้อมสรรพ ทั้งภาพหน้าจอ วิดีโอ และ trace, แถมยังมี Codegen ที่สามารถช่วยเขียนโค้ดทดสอบให้เพียงแค่กดคลิกบนเว็บเบราว์เซอร์

**เปรียบเทียบกับ Postman** — ไฟล์เทสต์เป็นเพียงไฟล์ `.ts` ธรรมดาที่ใช้งานเข้ากับ Git ได้อย่างเนียนๆ ทำให้รีวิวโค้ดได้ง่าย, นำไปรันตรงใน CI/CD pipeline ได้เลยโดยไม่ต้องการ Newman, และที่สำคัญทั้งหมดนี้เป็น open-source ที่ใช้งานฟรี 100%

**อย่างไรก็ตาม** — Playwright เป็นระบบที่ต้องอาศัยการเขียนโค้ด ผมจึงจำเป็นต้องรู้ TypeScript หรือ JavaScript (มันไม่ได้ง่ายแค่เพียงปุ่มกดๆ แบบใน Postman) แต่ฮีโร่ที่ช่วยชีวิตเรื่องนี้เอาไว้ก็คือ **Codegen** (`npx playwright codegen`) — มันช่วยเปิดเบราว์เซอร์ให้ ผมก็แค่คลิกๆ เล่นๆ ไป Playwright ก็จะพิมพ์โค้ดให้ผมโดยอัตโนมัติ ซึ่งมันช่วยลดเวลาที่เสียไปกับการเขียนโครงสร้างเทสต์ในช่วงต้นไปได้มหาศาล

![Using Playwright Codegen to auto-generate test code](using-codegen.gif)
*(การใช้งาน Codegen — ผมแค่เล่นไปบนหน้าเว็บต่างๆ แล้ว Playwright จัดการพิมพ์โค้ดให้แบบ real-time)*

---

## 🧪 ชุดการทดสอบทั้ง 3 ชุด

### 📌 Test 1: ชุดการล็อกอิน — Positive & Negative Testing

**เป้าหมาย:** [Practice Test Automation — Login Page](https://practicetestautomation.com/practice-test-login/)

การเทสต์ในส่วนนี้ประกอบด้วย 2 กรณีเคสทดสอบ — เคสแรกจะเป็นแบบ **Negative test** ที่ผมจงใจใส่ข้อมูลที่ไม่ถูกต้อง และตรวจสอบว่ามี error message แจ้งเตือนขึ้นมารึเปล่า โดยใช้ข้อความ `"Your username is invalid!"` เคสที่ 2 เป็น **Positive test** โดยผมจะกรอกพาสเวิร์ดถูกต้องเพื่อล็อกอิน และตรวจยืนยันความสำเร็จผ่านกล่องข้อความที่มีตัวอักษรเป็นเฮดเดอร์ว่า `"Logged In Successfully"`

เรียบง่าย แต่ก็เป็นสิ่งพื้นฐานที่ขาดไม่ได้ — ระบบที่ดีควรที่จะมีทั้ง "เปิดรับคนที่ใช่ให้เข้าถึง" และ "กันคนที่พยายามเจาะเข้ามาไว้ด้านนอก" 

### 📌 Test 2: ฟอร์มแบบฝึกหัด — การทำ UI แบบซับซ้อนด้วย POM

**เป้าหมาย:** [DemoQA — Automation Practice Form](https://demoqa.com/automation-practice-form)

อันนี้นับเป็นการเทสต์ที่ซับซ้อนที่สุดในพอร์ตนี้เลย ผมเปลี่ยนการลงทะเบียนนักศึกษาบนแบบฟอร์มให้เป็นโปรแกรมอัตโนมัติรันเอง ครอบคลุมไปจนถึง UI element ที่คนใช้บ่อยที่สุด — input, ปุ่ม radio, date picker ที่ต้องการการเลือกสวิปเดือนและปี, คอลัมน์ที่ dropdown, กล่อง checkbox, ปุ่มอัปโหลดไฟล์แนบ, dropdown แบบต่อเนื่อง (อย่าง State → City), และท้ายสุดก็กด submit ฟอร์มเพื่อลุ้นผลลัพธ์การตรวจเช็ค

ผมจัดการโครงสร้างใหม่มาในรูปแบบของ **Page Object Model (POM)** — พวก locator และ action อาศัยรวมอยู่ในคลาสที่สามารถเรียกซ้ำไปซ้ำมาได้ ในขณะที่ข้อมูลเทสต์ก็จะถูกคัดลอกและแยกดึงไปสู่ออบเจ็กต์อีกตัวนึง ทำให้โค้ดการทำเทสเป็นขั้นตอนอ่านง่ายและสบายตา ต่อให้ระบบ UI ต้องมีการเปลี่ยนไป ก็แก้ไขได้ที่ตำแหน่งเดียว

![POM-structured code in the test file](pom-code-structure.gif)
*(ภาพโค้ดเบื้องหลัง — เราจะเห็นส่วนของ locators, data และ test logic อยู่ห่างกันอย่างชัดเจน)*

### 📌 Test 3: การเทสหน้า API — รวม CRUD ร่วมกับ JSONPlaceholder

**เป้าหมาย:** [JSONPlaceholder API](https://jsonplaceholder.typicode.com/)

ในส่วนนี้ผมเทสต์ผ่าน HTTP methods ทั้งสี่แบบครบเลย — **GET** เพื่อจับข้อมูล post ลำดับ #1 ออกมาเช็คความสำเร็จ (status `200`) และตรงตัวกับ `id`, **POST** เพื่อจำลองทำ post ใหม่แล้วดูตอบกลับ (status `201`), **PUT** คือจัดการเขียนทับตัวใหม่ลงไปเลยแล้วเช็คการเปลี่ยนแปลงบน Title และ **DELETE** เพื่อเคลียร์การโพสต์นั้นๆ และรอรับความสำเร็จการจบเป็น (status `200`)

ทุกอย่างสามารถยิงสั่งได้ตรงผ่าน Playwright ในตัวของ `request` โดยที่ไม่จำเป็นต้องเสาะหาตัวโหลด HTTP หน้าอื่นมาเลย

![API test code in VS Code](api-testing.png)
*(หน้าตาโค้ดเทสของผมในการทำ API — พร้อมกับมีคำอธิบายคอมเมนต์ภาษาไทยประกอบกำกับอยู่ในแต่ล่ะจุด สำหรับการทำงานของ CRUD ในแต่ละคำสั่ง)*

---

## ✅ ผลลัพธ์ — 7/7 Tests Passed

ไฟล์ทดสอบของทั้ง 3 ไฟล์นั้น รันเทสต์บนเคสไปได้ทั้งหมด **7 เคส 0 รอบพลาด (failures)** รวมใช้เวลาเพียง 21 วินาทีเท่านั้น

![All 7 tests passed — 100% success rate](all-tests-passed.png)
*(หน้าต่าง Playwright HTML Report — 7/7 ผ่านรอบตลอด 0 failed และ 0 flaky)*

ตัว Report ยังมากับบรรดา **Screenshots** รูปที่สั่งถ่ายตามทุกการประมวลผลการเทส แถมมีไฟล์อัดวิดีโอ **Videos** แปะมาด้วย แล้วยังมีไฟล์จับแบบ **Traces** ที่ส่งให้เราใช้ร่วมกับแอ็กชันเป็นสเต็ปคำสั่งผ่านทาง `npx playwright show-trace` 

![All tests running in real-time](running-all-tests.gif)
*(ชมจากรันจริงๆดู — ยิงหน้าตาเว็บอัตโนมัติแล้วก็ทำงานให้ร่วมไปถึงฝั่ง API แบบขนานกัน)*

---

## 🧩 สิ่งและทักษะที่ได้รับจาก Project นี้

ในการจัดการกับตัวโปรเจกต์นี้ ทำให้ผมได้มีโอกาสฝึกทำและสามารถประยุกต์ทักษะผ่านทางนี้ในหลากด้านเลย:

**Architecture (สถาปัตยกรรม)** — ผมใช้งาน Pattern อย่าง Page Object Model มาแยกตัว locators ออกมาเลย ไม่ให้มันปนไปกับตัวเทสต์ ทำไปสู่ฝั่ง Data-Driven Testing ก็แบ่งแยกหมวดหมู่ตัวเทสต์แล้วส่งเทสต์ออกไปเป็นเป็น group ย่อยผ่านรูปแบบของ `test.describe`

**Web UI Interactions** — การเติมหน้าแบบฟอร์ม ปุ่มตัวเลือก radio ปุ่มติ๊กเลือก checkbox เลื่อนตารางวันแบบคลิ๊กเปลี่ยนเดินหน้าถอยปี ปรุงรายการที่เรียงมาเป็นคอลัมน์ dropdown รวมถึงการป้อนและทำระบบโหลดตัวอัปโหลดไฟล์ผ่านการให้ค่าตัวอักษรที่ `setInputFiles` 

**API Testing** — เติมคำสั่งของการรันครอบคลุมที่ CRUD (GET, POST, PUT, DELETE) สั่งดู status code ว่าเป็นยังไง หรือเช็คสภาพหน้าของ response เผื่อเกิดการเรียกตัวหน้าของ body โดยอิงไปจากระบบตัว `request` เลยจากของตัว Playwright

**Configuration** — การตั้งค่าการเริ่มที่ `playwright.config.ts` ให้ครบวงจร ทำระบบ screenshot ของหน้า ให้บันทึกอัตโนมัติที่วิดิโอ สั่งเก็บบันทึกรอย traces ระบบไฟล์ผลตรวจแบบ HTML ทำระบบจัดการรันแบบขนานเพื่อแยกทำหลายเบราเซอร์

![Playwright Config — screenshot, video, and trace settings](playwright-config-settings.png)
*(ตัวของหน้า playwright.config.ts — เก็บทำเป็น screenshots ทำบันทึก videos หรือเกาะ traces ไว้สำหรับตอนที่จะตามเข้าไปใช้ตอนพบมีปัญหา)*

---

## 🛠️ ลองเล่นดูสิ

**Tech Stack:** Playwright `v1.58.2` + TypeScript + Node.js

```
playwright/
├── tests/
│   ├── practice-login-page.spec.ts   ← Login positive/negative tests
│   ├── practice-form.spec.ts         ← Complex form with POM pattern
│   └── api-test.spec.ts              ← CRUD API testing
├── boo-data/
│   └── img-for-test.png              ← Test asset for file upload
├── playwright.config.ts              ← Fully documented configuration
└── package.json
```

```bash
# ลงคำสั่งเครื่องติดตั้งไว้
npm install
npx playwright install

# สำหรับสั่งทำการทดสอบ
npx playwright test

# วิธีเรียกดูหน้ารายงาน
npx playwright show-report
```

---

_ขอบคุณมากที่แวะเข้ามาดูพอร์ตของผม — ลองแวะเข้าไปสำรวจโค้ดได้เลยนะครับ!_
