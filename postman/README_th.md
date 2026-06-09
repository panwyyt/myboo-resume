# Postman

API Testing

## สิ่งที่ทำได้

- ทดสอบ REST API ครบ CRUD (GET/POST/PUT/PATCH/DELETE) พร้อม assertion: status code, response time, body และ schema
- เขียน test script ด้วย pm.test() และ pm.expect() (Chai) รวมถึง pre-request script สำหรับสร้างข้อมูล, timestamp และลงนามคำขอ
- ตรวจ response ด้วย JSON Schema validation
- ใช้ตัวแปรระดับ environment / global / collection เพื่อยิงเทสข้าม dev/staging/prod
- สกัด token แล้วทำ authentication chaining (Bearer / OAuth 2.0) ส่งต่อระหว่าง request
- จัดระเบียบ request เป็น collection, folder และ workspace ให้ดูแลง่าย
- รันชุดเทสอัตโนมัติด้วย Collection Runner (วนรอบ + delay) และทำ data-driven ด้วยไฟล์ CSV/JSON
- import จาก Swagger/OpenAPI และแปลง cURL เป็น request
- รันแบบ headless ด้วย Newman CLI และต่อเข้ากับ CI/CD
- ใช้ mock server และ monitor สำหรับจำลอง response และตรวจสุขภาพ API

**ใบรับรอง:** API Testing with Postman (Basic)
