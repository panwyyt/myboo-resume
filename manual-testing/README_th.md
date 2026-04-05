# 🕵️‍♀️ พอร์ตโฟลิโอ ด้าน Manual Testing

## 👋 บทนำ: Manual Testing คืออะไร?

**การทดสอบระบบแบบแมนนวล (Manual Testing)** คือกระบวนการทดสอบซอฟต์แวร์ที่ฝั่ง QA จะสวมบทบาทเป็นผู้ใช้งานจริง (End-user) เพื่อลองใช้งานระบบตาม Test Case และตรวจสอบพฤติกรรมต่างๆ ของแอปพลิเคชัน แทนที่จะพึ่งพาสคริปต์อัตโนมัติหรือเครื่องมือต่างๆ QA แบบแมนนวลจะออกสำรวจซอฟต์แวร์ด้วยตัวเองเพื่อตามหาจุดบกพร่อง (Defects) ข้อผิดพลาดทางตรรกะ และพฤติกรรมแปลกๆ ที่ไม่คาดคิด ก่อนที่แอปพลิเคชันนั้นจะตกไปถึงมือลูกค้าครับ

พูดง่ายๆ คือการสวมรองเท้าของคนที่ใช้งานจริงๆ ผสมผสานเอาความเข้าใจในตัวผลิตภัณฑ์เข้ากับสัญชาตญาณความเป็นมนุษย์ โลจิก และเทคนิคการทดสอบ เพื่อให้มั่นใจได้ว่าตัวซอฟต์แวร์นั้นทำงานได้สมบูรณ์แบบ ใช้งานง่าย และมีคุณภาพในระดับสูงสุดครับ

---

## 🛠️ ศักยภาพของผมในฐานะ Software Tester

ในฐานะนักทดสอบซอฟต์แวร์ โฟกัสของผมไม่ได้จบแค่การ "จับบั๊ก" เท่านั้นครับ แต่ผมยังมีแพสชันในการป้องกันปัญหาตั้งแต่ต้นตอ และชอบการทำงานร่วมกับทีมอย่างใกล้ชิดเพื่อยกระดับคุณภาพชีวิตของตัวโปรดักต์โดยรวมขึ้นไปอีกขั้นด้วยครับ

---

## 📝 สถานการณ์ทดสอบ (Test Scenarios)

**Test Scenario** คือเอกสารระดับภาพรวมที่บ่งบอกว่ามีฟังก์ชันไหน หรือระบบอะไรบ้างที่พร้อมทำการทดสอบ มันคือเอกสารที่เอาไว้ตอบคำถามที่ว่า *"เราต้องเทสต์อะไรบ้าง?"* ครับ

ตัวอย่างเช่น ผมได้ลองออกแบบ Manual Test Scenarios ที่ครอบคลุมแพลตฟอร์มระดับโลกจริงๆ อย่าง **Facebook** และ **Shopee** เพื่อให้ครอบคลุมการใช้งานจริง (Happy paths) ตลอดจนเคสสุดโต่ง (Edge cases) ในระดับภาพกว้างครับ

👉 **[คลิกที่นี่เพื่อดู Spreadsheet ของ Facebook & Shopee Test Scenarios](https://docs.google.com/spreadsheets/d/e/2PACX-1vTOp_3bO7NPoGAcIENB0GW57Oqk09TYd4_fbdeod5ZB_Ks_UE4QqD8geZDOc4zt0x0bPc5ueseOrEYG/pubhtml?gid=648465421&single=true)**

<div align="center">
  <a href="https://docs.google.com/spreadsheets/d/e/2PACX-1vTOp_3bO7NPoGAcIENB0GW57Oqk09TYd4_fbdeod5ZB_Ks_UE4QqD8geZDOc4zt0x0bPc5ueseOrEYG/pubhtml?gid=648465421&single=true" target="_blank">
    <img src="test_scenarios_example.png" alt="Test Scenarios Example - Facebook and Shopee" width="100%">
  </a>
</div>

---

## 🔬 โปรเจกต์ออกแบบเคสทดสอบ (Test Case Design)

จาก Scenarios ด้านบน เราจะนำมาแตกย่อยเป็น **Test Cases (เคสทดสอบ)** ที่ละเอียดมากยิ่งขึ้น ซึ่งจะบอกขั้นตอนการทำงานแบบเจาะลึก 1-2-3-4 เพื่อตอบคำถามที่ว่า *"เราจะเทสต์มันยังไง?"* — มั่นใจได้เลยว่าทุกโฟลว์จะถูกตรวจเช็คอย่างรัดกุม 

ด้านล่างนี้คือผลงานที่ผมได้งัดเอาทักษะการคิดวิเคราะห์ มาหั่นย่อย Requirement ที่ซับซ้อนให้กลายเป็นส่วนๆ ที่สามารถทดสอบได้จริงครับ

### 📌 โปรเจกต์ 1: การจำลองการทดสอบหน้า Login (Mockup Testing)

สำหรับโปรเจกต์นี้ ผมได้สร้าง Test Cases ที่แสนจะละเอียดจากภาพดีไซน์จอด้านหน้า (Static UI Mockup) ของระบบ Login เพียวๆ แม้ว่าจะไม่มีระบบจริงให้ลองกดเล่น แต่ผมก็สามารถถอด Requirement และระบุเคสที่จะเกิดปัญหาและจุดพลิกแพลงทั้งหมดได้ โดยดูจากแค่ดีไซน์ที่ได้รับมาครับ!

**ความต้องการของระบบ (Requirement Mockup):**

<div align="center">
  <img src="login_mockup_req.png" alt="Login Page Mockup Requirement" width="60%">
</div>

**ผลลัพธ์ของ Test Cases:**
เนื่องจากถาพตัวอย่างข้างล่างมันอาจจะตัวเล็กไปหน่อย ผมแนะนำให้คลิกเข้าไปดูในลิงก์เอกสารฉบับเต็มได้เลยครับจัดเต็มมาก!
👉 **[คลิกที่นี่เพื่อดู Spreadsheet ของ Login Test Cases ฉบับเต็ม](https://docs.google.com/spreadsheets/d/e/2PACX-1vTOp_3bO7NPoGAcIENB0GW57Oqk09TYd4_fbdeod5ZB_Ks_UE4QqD8geZDOc4zt0x0bPc5ueseOrEYG/pubhtml?gid=1095342547&single=true)**

<div align="center">
  <a href="https://docs.google.com/spreadsheets/d/e/2PACX-1vTOp_3bO7NPoGAcIENB0GW57Oqk09TYd4_fbdeod5ZB_Ks_UE4QqD8geZDOc4zt0x0bPc5ueseOrEYG/pubhtml?gid=1095342547&single=true" target="_blank">
    <img src="test-case-pj1.gif" alt="Test Cases Example - Login Mockup" width="100%">
  </a>
</div>

### 📌 โปรเจกต์ 2: เว็บ Kru P'Beam - การทดสอบหน้าค้นหาและตัวกรอง (Search & Filter Page)

โปรเจกต์นี้โฟกัสไปที่หน้า **Search and Filter Page** ของระบบ "ครูพี่บีม" ซึ่งมีการทำงานคล้ายๆ กับเว็บไซต์รีวิวร้านอาหารหรือแนะนำสถานที่ท่องเที่ยวครับ ผมออกแบบ Test Case อย่างละเอียดเพื่อตรวจความแม่นยำของอัลกอริทึมการค้นหา การแสดงผลลัพธ์ ตลอดจนกรณีต่างๆ ที่ข้อมูลตัวกรองถูกใช้งานร่วมกันหลายส่วน

👉 **[คลิกที่นี่เพื่อดู Spreadsheet ของ Search & Filter Page Test Cases](https://docs.google.com/spreadsheets/d/e/2PACX-1vTOp_3bO7NPoGAcIENB0GW57Oqk09TYd4_fbdeod5ZB_Ks_UE4QqD8geZDOc4zt0x0bPc5ueseOrEYG/pubhtml?gid=63326685&single=true)**

<div align="center">
  <a href="https://docs.google.com/spreadsheets/d/e/2PACX-1vTOp_3bO7NPoGAcIENB0GW57Oqk09TYd4_fbdeod5ZB_Ks_UE4QqD8geZDOc4zt0x0bPc5ueseOrEYG/pubhtml?gid=1305237897&single=true" target="_blank">
    <img src="test-case-pj2.gif" alt="Test Cases Example - Kru P'Beam Web Search & Filter Page" width="100%">
  </a>
</div>

### 📌 โปรเจกต์ 3: เว็บ Kru P'Beam - การทดสอบแบบฟอร์มลงทะเบียน (Register Form)

สำหรับโปรเจกต์นี้ ผมลงลึกไปกับการทดสอบฟอร์มในส่วนของ **หน้าสมัครสมาชิก (Registration Page)** เน้นไปที่ความรัดกุมของการตรวจสอบช่องกรอกข้อมูล การรับมือกับ Error เงื่อนไขรหัสผ่าน ไปจนถึงการตรวจโฟลว์สมัครสมาชิกตั้งแต่หน้าแรกยันหน้าสุดท้ายครับ

👉 **[คลิกที่นี่เพื่อดู Spreadsheet ของ Register Page Test Cases](https://docs.google.com/spreadsheets/d/e/2PACX-1vTOp_3bO7NPoGAcIENB0GW57Oqk09TYd4_fbdeod5ZB_Ks_UE4QqD8geZDOc4zt0x0bPc5ueseOrEYG/pubhtml?gid=1305237897&single=true)**

*(💡 หมายเหตุ: ลิงก์ด้านบนอาจจะแท็บเดียวกับ Project 2 นะครับ ถ้าคุณแบ่งไฟล์ไว้ แนะนำให้แก้ตัวเลขด้านหลัง `gid=` ตรง URL ได้เลย!)*

<div align="center">
  <a href="https://docs.google.com/spreadsheets/d/e/2PACX-1vTOp_3bO7NPoGAcIENB0GW57Oqk09TYd4_fbdeod5ZB_Ks_UE4QqD8geZDOc4zt0x0bPc5ueseOrEYG/pubhtml?gid=1305237897&single=true" target="_blank">
    <img src="test-case-pj3.gif" alt="Test Cases Example - Kru P'Beam Web Register Form" width="100%">
  </a>
</div>

---

## 🐛 การแจ้งบั๊กและทำรายงานเจอบั๊ก (Defect Logging)

การเจอบั๊กเป็นเพียงแค่ครึ่งทางของการเทสต์เท่านั้นครับ เพราะการเขียนรายงานว่าบั๊กนั้นเกิดยังไง มีความสำคัญกว่าการเจอเสียอีก! ผมสั่งสมประสบการณ์ในการเขียน Bug Report ที่ชัดเจน จัดการง่าย และลงลึกถึงรายละเอียด ซึ่งช่วยให้ทางทีมฝั่ง Developer สามารถจำลองตามหาบั๊กเจอและรีบอุดรูรั่วได้อย่างรวดเร็ว

Defect log ที่ดีจะต้องมี ขั้นตอนการเกิดบั๊กครบถ้วน, ผลที่คาดหวังเทียบกับสิ่งที่เจอจริง, การประเมินความฉุกเฉิน/ความสำคัญ และมีภาพสกรีนช็อตหรือวิดีโอยืนยันชัดเจนเสมอ

ดูตัวอย่างวิธีการจัดการ Defect ของผมด้านล่างนี้ได้เลยคับ:

👉 **[คลิกที่นี่เพื่อดู Spreadsheet ของ Defect Logging ฉบับเต็ม](https://docs.google.com/spreadsheets/d/e/2PACX-1vSXxP0PToKwjsIauY9rEcxZQP8VS57FG3BZCIPCDk0OIwjvus4trSvVIcivXy5VmHyRy7d9SPhgNJyE/pubhtml)**

<div align="center">
  <a href="https://docs.google.com/spreadsheets/d/e/2PACX-1vSXxP0PToKwjsIauY9rEcxZQP8VS57FG3BZCIPCDk0OIwjvus4trSvVIcivXy5VmHyRy7d9SPhgNJyE/pubhtml" target="_blank">
    <img src="log-defect.png" alt="Defect Logging Example" width="100%">
  </a>
</div>

---

## 📊 การออกเอกสารรีพอร์ตและการนำเสนอข้อมูล (Test Reporting & Data Visualization)

การเขียนเทสต์และแจ้งบั๊กคือสิ่งที่สำคัญก็จริง แต่การที่เราจัดเรียงผลลัพธ์ทั้งหมดอวดต่อสายตาของคนในทีมนี่แหละครับคือสิ่งที่ผลักดันให้เกิดการตัดสินใจที่ถูกต้อง ด้วยประสบการณ์สายตรงจากการคลุกคลีอยู่บนหน้า Spreadsheet บวกกับสกิลติดตัวใบเซอร์ **Professional Data Analyst** ขอบอกเลยว่า ผมถนัดมากในการแปลงข้อมูลที่ดูเละเทะ ให้กลายเป็นกราฟรีพอร์ตที่สบายตาที่สุดครับ

รายงานของผมมักแสดงศักยภาพรวมของแอปทันที เพื่อให้เห็นอัตราส่วนสอบผ่าน/สอบตก และความสุขภาพของโครงสร้างซอฟต์แวร์ เพื่อดึงให้ทางโปรดักต์โอนเนอร์และผู้พัฒนา จับจุดภาพรวมสเตตัสในขณะนั้นได้ทันที

<div align="center">
  <img src="test-report.png" alt="Test Report and Data Visualization Example" width="100%">
</div>

---

## 🎓 ใบประกาศนียบัตร (Certifications)

เกณฑ์ชี้วัดมาตรฐานทางคุณภาพด้าน QA และการวิเคราะห์ข้อมูลของผม การันตีคุณภาพระดับมือทองด้วยใบเซอร์พวกนี้เลยครับ:

### 1. Manual Testing

ผมจบหลักสูตรทดสอบซอฟต์แวร์ระดับมืออาชีพ **Manual Testing** อย่างสมบูรณ์จากคลาส **Software Testing By P'Beam** ซึ่งจะเป็นเครื่องช่วยพิสูจน์ได้ว่าพื้นฐานกระบวนการ QA ของผม การออกแบบโมเดล Test Case, การจัดการกับบั๊ก (Defects) ไปจนถึงมาตรฐานระบบงานระดับสากลมันแน่นแค่ไหน!

<div align="center">
  <img src="certificate.png" alt="Manual Testing Certificate - Panthawit Chumthong" width="80%">
</div>
<br>

### 2. Certified Professional Data Analyst

ใบประกาศใบนี้ช่วยยืนยันความแข็งแกร่งของทักษะการคิดวิเคราะห์ เพื่อช่วยในการจัดเตรียมข้อมูลเทสต์อย่างมีระบบ การแกะรอยหาจุดเชื่อมโยงของบั๊กที่เกิดได้ และจัดการสร้างแผนภูมิการรายงาน (Visualizations report) ระดับมืออาชีพครับ

<div align="center">
  <img src="CertifiedProfessionalDataAnalyst.png" alt="Certified Professional Data Analyst - Panthawit Chumthong" width="80%">
</div>

---

## 🤖 ทำไมวงการ Manual Testing ถึงไม่มีวันตาย

ในยุคปัจจุบันที่มีการพูดถึงการทำ **Automated Testing** หรือการทดสอบแบบอัตโนมัติกันอย่างล้นหลาม บทบาทของการนำหุ่นยนต์มารับภาระงานน่าเบื่อๆ ออกไปเพื่อเพิ่มความไวในการรับมือ ทุกคนเลยพากันสงสัยกันหมดว่า... *"เห้ย หรือในท้ายที่สุดแล้วพนักงานจำพวก Manual Testing เค้าจะตกงานกันหมดป่าววะ?"*

คำตอบจากใจผมเลยก็คือ: **"ไม่ตกแน่นอนครับ ร้อยเปอร์เซ็นต์"**

การทดสอบผ่านระบบออโต้ล้วนแข็งแกร่งมากในการ *เช็คข้อมูลที่ถูกเตรียมเอาไว้ล่วงหน้าอย่างหุ่นยนต์*—แต่มันไม่สามารถเข้าถึงอรรถรสในมุมมองของ **ประสบการณ์ผู้ใช้งาน หรือ UX (User Experience)** ได้เลย! คอมพิวเตอร์มันประเมินความยากง่ายในการเปิดใช้งานเมนูไม่ได้ เข้าใจอารมณ์มนุษย์และความเอาแต่ใจไม่ได้ และไม่สามารถตีความระบบโลจิกเชิงธุรกิจอันลึกล้ำได้เฉียบขาดเท่ากับสมองของคนครับ

Manual Testing (การทดสอบด้วยคน) นั้นไม่ใช่วัฒนธรรมที่ล้าหลังนะครับ แต่ในความเป็นจริงมันคือ **เสาหลักค้ำยันของกรอบการทำงานวิชาชีพ Quality Assurance** เลยต่างหาก! ยิ่งพวกเราเข้าใจระบบและมองภาพการทำ Manual เคสขาดมากเท่าไหร่... ไอ้ระบบ Automated test ของทีมที่เราจะเตรียมเอาไว้ใช้ครอบจักรวาลมันก็จะยิ่งแกร่งขึ้นเท่านั้นครับ!
