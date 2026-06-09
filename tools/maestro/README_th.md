# Maestro

Mobile UI Automation แบบ YAML ทั้ง Android และ iOS

## สิ่งที่ทำได้

- เขียน Flow แบบ declarative YAML ที่รันได้ทั้ง Android และ iOS โดยไม่ต้องแก้โค้ด
- ใช้คำสั่งหลัก: launchApp, tapOn, inputText, assertVisible/assertNotVisible, scrollUntilVisible
- อาศัย auto-wait และ flakiness tolerance ในตัว (รอ UI และ animation นิ่งเอง ไม่ต้องใส่ sleep)
- inspect element และเขียน flow แบบสดด้วย Maestro Studio
- แยกขั้นตอนซ้ำเป็น subflow ด้วย runFlow (เช่น routine ปิด popup)
- ทำ conditional flow ด้วย when เพื่อแตกเงื่อนไขตามการมองเห็นหรือแพลตฟอร์ม
- ใช้ relative selector (rightOf, below, leftOf, above) ให้ทนต่อ layout ที่เปลี่ยน
- จัดการ element ที่ query ไม่ได้ด้วย swipe จากพิกัด X/Y (เช่น date scrollwheel บน iOS)
- ใส่ logic ด้วย JavaScript (evalScript) เพื่อ copy/compare ค่า หรือสร้างและแปลงข้อมูลเทส
- ใช้ environment variables และ tags (include/exclude) เลือกรันเฉพาะชุด รวมถึงรันบน Maestro Cloud (ขนาน + วิดีโอ debug) ต่อ CI/CD

