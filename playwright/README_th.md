# Playwright

End-to-End Web UI และ API Testing ด้วย TypeScript

## สิ่งที่ทำได้

- ทำ UI และ API testing รวมในเครื่องมือเดียว อยู่ในเทสและ CI job เดียวกันได้
- ใช้ auto-wait และ web-first assertion (เช่น expect(locator).toBeVisible()) ที่ retry ให้เอง ช่วยลด flaky
- เลือก element ด้วย user-facing locator (role, text, label, test-id) ตาม best practice
- สร้างสคริปต์เริ่มต้นได้เร็วด้วย Codegen และจัดโครงสร้างแบบ Page Object Model (POM) ร่วมกับ data-driven
- ทดสอบ UI ที่ซับซ้อน: radio button, ตารางเลือกวันที่, file upload และ cascading dropdown
- รันได้ 3 เอนจินจาก API เดียว: Chromium, Firefox, WebKit และจำลอง mobile device ได้
- ทดสอบ API ครบ CRUD ด้วย request / APIRequestContext ที่มีในตัว โดยไม่ต้องเปิดเบราว์เซอร์
- ทำ network interception และ request mocking (page.route)
- รันขนานด้วย isolated browser context และ shard ข้ามเครื่องใน CI
- ใช้ Trace Viewer (screenshot, video, DOM snapshot ทีละ step) และ reuse auth state ด้วย storageState
- ทำ visual / screenshot-comparison regression testing ได้

**Stack:** Playwright v1.58.2, TypeScript, Node.js
