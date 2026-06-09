// ============================================================
// 📦 Import: นำเข้าฟังก์ชันและค่าที่จำเป็นจาก Playwright
// ============================================================
// - defineConfig  : ฟังก์ชันช่วยสร้าง config object พร้อม auto-complete (IntelliSense)
// - devices       : รายชื่ออุปกรณ์สำเร็จรูป เช่น Desktop Chrome, iPhone 12 ฯลฯ
//                   ใช้เพื่อจำลองขนาดหน้าจอ + User-Agent ของอุปกรณ์ต่างๆ
import { defineConfig, devices } from '@playwright/test';

// ============================================================
// 🔐 Environment Variables (ปิดไว้ — เปิดใช้เมื่อต้องการ)
// ============================================================
// ถ้าโปรเจกต์มีไฟล์ .env สำหรับเก็บค่า เช่น BASE_URL, USERNAME, PASSWORD
// ให้เปิดคอมเมนต์ 3 บรรทัดด้านล่างนี้เพื่อโหลดค่าจากไฟล์ .env เข้า process.env
//
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

// ============================================================
// ⚙️ Playwright Configuration
// ============================================================
// เอกสารเพิ่มเติม: https://playwright.dev/docs/test-configuration
export default defineConfig({

  // ----------------------------------------------------------
  // 📁 testDir — โฟลเดอร์ที่เก็บไฟล์เทสต์
  // ----------------------------------------------------------
  // Playwright จะค้นหาไฟล์ *.spec.ts / *.test.ts ภายในโฟลเดอร์นี้
  testDir: './tests',

  // ----------------------------------------------------------
  // ⚡ fullyParallel — รันเทสต์แบบขนาน (Parallel)
  // ----------------------------------------------------------
  // true  = ทุกไฟล์เทสต์จะรันพร้อมกัน → เร็วขึ้น
  // false = รันทีละไฟล์ตามลำดับ
  fullyParallel: true,

  // ----------------------------------------------------------
  // 🚫 forbidOnly — ป้องกัน test.only หลุดเข้า CI
  // ----------------------------------------------------------
  // ถ้ารันบน CI (process.env.CI เป็น true):
  //   → จะ "fail build" ทันทีถ้ามี test.only() ค้างอยู่ในโค้ด
  // ถ้ารันบนเครื่องตัวเอง (local):
  //   → อนุญาตให้ใช้ test.only() ได้ตามปกติ (สำหรับ debug)
  forbidOnly: !!process.env.CI,

  // ----------------------------------------------------------
  // 🔁 retries — จำนวนครั้งที่จะลองรันเทสต์ซ้ำเมื่อ Fail
  // ----------------------------------------------------------
  // CI  = ลองซ้ำ 2 ครั้ง (ป้องกัน flaky test)
  // Local = ไม่ลองซ้ำ (0 ครั้ง) เพื่อเห็นผลทันที
  retries: process.env.CI ? 2 : 0,

  // ----------------------------------------------------------
  // 👷 workers — จำนวน worker (process) ที่รันเทสต์พร้อมกัน
  // ----------------------------------------------------------
  // CI  = ใช้ 1 worker (ลดภาระเครื่อง CI)
  // Local = undefined → Playwright จะเลือกจำนวนอัตโนมัติตาม CPU
  workers: process.env.CI ? 1 : undefined,

  // ----------------------------------------------------------
  // 📊 reporter — รูปแบบรายงานผลเทสต์
  // ----------------------------------------------------------
  // 'html' = สร้างรายงาน HTML สวยๆ ดูผ่านเบราว์เซอร์ได้
  // ตัวเลือกอื่น: 'list', 'dot', 'json', 'junit'
  // เอกสาร: https://playwright.dev/docs/test-reporters
  reporter: [['html', { open: 'always' }]],

  // ----------------------------------------------------------
  // 🌐 use — ค่าตั้งต้นที่ใช้ร่วมกันทุก project
  // ----------------------------------------------------------
  // เอกสาร: https://playwright.dev/docs/api/class-testoptions
  use: {

    // 📸 screenshot — จับภาพหน้าจอหลังเทสต์จบ
    // 'on'             = ถ่ายทุกเทสต์ (ทั้ง Pass และ Fail) → แนบในรีพอร์ต
    // 'only-on-failure' = ถ่ายเฉพาะเมื่อ Fail
    // 'off'            = ไม่ถ่าย
    screenshot: 'on',

    // 🎥 video — บันทึกวิดีโอหน้าจอขณะรันเทสต์
    // 'on'             = บันทึกทุกเทสต์ → แนบในรีพอร์ต
    // 'on-first-retry' = บันทึกเฉพาะตอน retry
    // 'off'            = ไม่บันทึก
    video: 'on',

    // 🔗 baseURL — URL ฐานสำหรับ page.goto('')
    // ตั้งค่าไว้จะเรียก page.goto('/login') แทน page.goto('http://localhost:3000/login')
    // baseURL: 'http://localhost:3000',

    // 🔍 trace — บันทึก Trace สำหรับ debug (ดูทุก action, network, DOM ย้อนหลัง)
    // 'on'             = บันทึกทุกครั้ง → แนบในรีพอร์ต
    // 'on-first-retry' = บันทึกเฉพาะตอน retry (ประหยัดพื้นที่)
    // 'off'            = ไม่บันทึก
    // เปิดดู Trace ด้วย: npx playwright show-trace
    // เอกสาร: https://playwright.dev/docs/trace-viewer
    trace: 'on',
  },

  // ----------------------------------------------------------
  // 🖥️ projects — กำหนดเบราว์เซอร์/อุปกรณ์ที่จะรันเทสต์
  // ----------------------------------------------------------
  // แต่ละ project = 1 ชุดการตั้งค่าเบราว์เซอร์
  // Playwright จะรันเทสต์ซ้ำกับทุก project ที่เปิดใช้
  projects: [

    // ✅ Chromium (เปิดใช้งาน)
    // เบราว์เซอร์ตระกูล Chrome/Edge — ครอบคลุมผู้ใช้ส่วนใหญ่
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // ❌ Firefox (ปิดไว้ — เปิดคอมเมนต์เพื่อใช้งาน)
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // ❌ WebKit (ปิดไว้ — เปิดคอมเมนต์เพื่อใช้งาน)
    // เบราว์เซอร์ตระกูล Safari
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    // ❌ Mobile Chrome (ปิดไว้)
    // จำลองหน้าจอ Pixel 5
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },

    // ❌ Mobile Safari (ปิดไว้)
    // จำลองหน้าจอ iPhone 12
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    // ❌ Microsoft Edge (ปิดไว้)
    // ใช้ Chromium engine แต่เป็นตัว Edge จริงๆ
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },

    // ❌ Google Chrome (ปิดไว้)
    // ใช้ Chrome ตัวจริงแทน Chromium
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  // ----------------------------------------------------------
  // 🖧 webServer — สั่งเปิด dev server อัตโนมัติก่อนรันเทสต์
  // ----------------------------------------------------------
  // เหมาะสำหรับเทสต์เว็บแอปที่ต้องรัน server ก่อน
  // Playwright จะรอจนกว่า URL ที่กำหนดจะพร้อมใช้งาน แล้วค่อยเริ่มเทสต์
  //
  // webServer: {
  //   command: 'npm run start',                  // คำสั่งเปิด server
  //   url: 'http://localhost:3000',               // URL ที่ต้องรอให้พร้อม
  //   reuseExistingServer: !process.env.CI,       // Local: ใช้ server ที่เปิดอยู่แล้วได้
  //                                               // CI: เปิดใหม่ทุกครั้ง
  // },
});
