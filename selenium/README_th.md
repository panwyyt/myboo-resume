# Selenium

Web UI Automation ด้วย Robot Framework และ SeleniumLibrary

## สิ่งที่ทำได้

- เขียนเทสแบบ keyword-driven ด้วย Robot Framework และ SeleniumLibrary (Python) ควบคุม Selenium WebDriver
- ออกแบบโครงสร้างแบบ Page Object Model (POM) ด้วย user keywords และ resource files เพื่อให้ดูแลและขยายต่อง่าย
- ใช้ locator ได้หลายแบบ: id, name, XPath, CSS, link, class
- ทำงานกับ element ครบทุกชนิด: text field, dropdown, checkbox/radio, file upload และ date-picker
- จัดการ alert, iframe และ dynamic element พร้อมใช้ explicit/implicit wait เพื่อลดปัญหา flaky test (เช่น แก้ date-picker ที่ค้างด้วยการเขียนทับค่า)
- ทำ data-driven testing ด้วย Test Template และข้อมูลจากภายนอก
- รันแบบ cross-browser (Chrome, Firefox, Edge) และตั้งค่า headless ได้
- รองรับการรันขนานและกระจายงานด้วย Selenium Grid และ Pabot
- อ่าน report.html / log.html ที่มี screenshot ตอน fail และต่อเข้ากับ CI/CD (Jenkins, GitHub Actions)

**Stack:** Robot Framework, SeleniumLibrary, Python
**ใบรับรอง:** Automation Test (Basic), Automation Test (Advanced)
