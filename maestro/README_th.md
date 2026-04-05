# 🎼 Maestro: ก้าวล้ำไปกับการเทส UI มือถือยุคใหม่

สวัสดีครับ! 👋 ยินดีต้อนรับสู่โลกของ Maestro ครับ ถ้าคุณเคยปวดหัวกับความยุ่งยากของการทำมือถือออโตเมชัน... ผมบอกเลยว่าคุณไม่ได้เป็นคนเดียวแน่นอน! ผมเลยลองหยิบ **Maestro** ขึ้นมาเพื่อพิสูจน์คำล่ำลือที่ว่ามันคือ "เฟรมเวิร์กที่ใช้งานง่ายที่สุด" — และผลลัพธ์ก็คือ... มันเป็นอย่างนั้นจริงๆ ครับ! 🚀

---

## 🌟 ทำไมผมถึงเพิ่ม Maestro เข้ามาในคลังอาวุธ

ผมมีพื้นฐานที่แน่นใน **Appium** อยู่แล้วครับ ซึ่งมันทรงพลังมากแต่มันก็ "หนัก" ทั้งเรื่องการเซ็ตอัปและความเร็วในการรัน ผมเลยมองหาอะไรที่โมเดิร์น ยืดหยุ่น และเบาสบายกว่าเดิมครับ

สิ่งที่ Maestro มอบให้ผมคือ:
-   **เชื่อมต่อทันใจ:** ไม่ต้องมานั่งตั้งค่า Driver ให้วุ่นวาย แค่เปิดอีมูเลเตอร์ขึ้นมา Maestro ก็โดดเข้าไปเชื่อมต่อได้ทันที!
-   **หน้าตาที่เป็นมิตร:** หน้าจอเขียนเทสต์ดูสะอาดตา แถมยังมี "เหรียญความสำเร็จ" ติดมาให้ตอนเทสต์ผ่าน—ซึ่งเป็นความรู้สึกที่ฟินแปลกๆ ครับ! 🏅

<p align="center">
  <img src="./assets/maestro-emulator-connection.png" width="48%" alt="Maestro Emulator Connection" />
  <img src="./assets/maestro-success-badges-ui.png" width="48%" alt="Maestro Success Badges UI" />
</p>
*(ติดตั้งง่ายแบบ Plug-and-play พร้อมรางวัลตอบแทนเล็กๆ น้อยๆ เมื่อเทสผ่าน)*

---

## 🏗️ ตัวโปรเจกต์: ท้าทายแอป WDIO

เพื่อให้เห็นภาพการใช้งานจริง ผมได้ลองเทสกับแอป `WDIO Native`—แอปมาตรฐานที่เขาไว้ใช้ทดลองความเจ๋งของเฟรมเวิร์กต่างๆ มาตามรอยการเดินทางของผมกันครับ:

<p align="center">
  <img src="./assets/maestro-wdio-app-home.png" width="48%" alt="App Home Screen" />
  <img src="./assets/maestro-wdio-app-form.png" width="48%" alt="App Form" />
</p>

### Step 1: ระบบ Inspector ที่เป็นดั่งเพชรเม็ดงาม
การหาพิกัดปุ่มไม่ต้องใช้การเดาอีกต่อไปครับ Maestro มี Inspector ในตัวที่แค่เราคลิกบนหน้าจอ มันก็จะบอก "ที่อยู่ (Locator)" ที่ดีที่สุดให้เราเอาไปใช้ในโค้ดได้ทันทีครับ
![Maestro Built-in Inspector](./assets/maestro-builtin-inspector.png)

### Step 2: การรับมือกับป๊อปอัพกวนใจ
แอปมือถือมักจะชอบสุ่มเด้งขอคะแนนหรือแจ้งเตือนมาขัดจังหวะเทสต์ ผมใช้ **เงื่อนไขจังหวะการไหล (`runFlow`)** เพื่อสั่งว่า: *"ถ้าเห็นป๊อปอัพขึ้นมา ให้กดปิดไปซะ ถ้าไม่เห็นก็รันงานที่เหลือต่อไปตามปกติ!"* วิธีนี้ทำให้สคริปต์รันผ่านฉลุยไม่มีสะดุดครับ
![Maestro RunFlow Conditional Logic](./assets/maestro-runflow-conditional-logic.png)

### Step 3: ระบุเป้าหมายอย่างแม่นยำด้วย Relative Locators
ในกรณีที่มีปุ่มชื่อซ้ำกันเป๊ะๆ ผมใช้ **Relative Locators** เพื่อบอก Maestro ว่า: *"หาปุ่มนี้ที่วางอยู่ 'ข้างล่าง' ของหัวข้อ A แต่อยู่ 'ข้างบน' ของปุ่ม B"* งานนี้ไม่มีการกดผิดปุ่มแน่นอนครับ!
![Maestro Relative Locators](./assets/maestro-relative-locators.png)

### Step 4: เสริม "สมอง" ด้วย JavaScript
บางครั้งแค่ YAML อย่างเดียวอาจจะไม่พอ ผมใช้ `evalScript` เพื่อใส่โค้ด JavaScript เข้าไป—ช่วยให้ผมก๊อปปี้ข้อความจากหน้าจอหนึ่ง จำใส่หน่วยความจำไว้ แล้วเอาไปเช็คเทียบกับอีหน้าจอหนึ่งได้อย่างแม่นยำครับ
![Maestro EvalScript Copy & Compare](./assets/maestro-evalscript-copy-compare.png)

---

## 🤖 โชว์ผลงาน: Android vs. iOS

### ฝั่ง Android (รันในเครื่องตัวเอง)
การเทสบนอีมูเลเตอร์แอนดรอยด์ทำได้รวดเร็วและลื่นไหลสุดๆ ครับ ด้านล่างคือภาพตอนรันงานจริงจากเครื่องตัวเอง

<p align="center">
  <img src="./assets/maestro-local-testing-execution.gif" width="48%" alt="Local Testing Execution" />
  <img src="./assets/maestro-wdio-test-execution.gif" width="48%" alt="WDIO Test Execution" />
</p>

### ฝั่ง iOS (การเอาชนะลูกกลิ้งปริศนา)
ฝั่ง iOS มีความท้าทายเฉพาะตัวครับ แม้จะมี Locator IDs ที่ดี แต่เจ้า **ลูกกลิ้งเลือกวันที่ (Scrollwheels)** ของมันคือฝันร้ายของการออโต้ เพราะมันถูกมองเป็นก้อนใหญ่ๆ เพียงก้อนเดียว

<p align="center">
  <img src="./assets/maestro-ios-locator-id.png" width="48%" alt="iOS Locator IDs" />
  <img src="./assets/maestro-ios-scrollwheel-issue.png" width="48%" alt="iOS Scrollwheel Issue" />
</p>

**ทางแก้ของผม:** ผมใช้การคำนวณ **พิกัดหน้าจอ (X/Y Coordinates)** เพื่อจำลองทิศทางการปัดหน้าจอ (Swipe) เลียนแบบนิ้วมือคนจริงๆ จนในที่สุดก็สามารถ "หมุน" วงล้อไปหาค่าที่ถูกต้องได้สำเร็จครับ!
![Maestro iOS Swipe Coordinates](./assets/maestro-ios-swipe-coordinate.png)

**ผลลัพธ์บน iOS:**
![Maestro iOS Test Execution](./assets/maestro-ios-test-execution.gif)

---

## ☁️ บอสใหญ่: Maestro Cloud

ผมยกระดับการเทสขึ้นไปอีกขั้นด้วยการรันบน **Maestro Cloud** ซึ่งเปรียบเสมือนการทำงานบนระบบ CI/CD ระดับมืออาชีพ โดยอัปโหลดไฟล์ APK และสคริปต์ขึ้นไปรันบนระบบคลาวด์โดยตรงครับ

<p align="center">
  <img src="./assets/maestro-cloud-free-trial.png" width="48%" alt="Maestro Cloud Setup" />
  <img src="./assets/maestro-cloud-upload-apk.png" width="48%" alt="Cloud APK Upload" />
</p>

**สิ่งที่ดีที่สุดคือ? การดีบั๊กผ่านวิดีโอ (Visual Debugging)** Maestro จะสร้างวิดีโอแกะขั้นตอนการเทสต์ออกมาให้ดูแบบก้าวต่อก้าว 
![Maestro Cloud Debugging Video](./assets/maestro-cloud-debugging-video.gif)

---

## 💡 ก่อนจะจากกัน

Maestro คือตัวเปลี่ยนเกมสำหรับผมเลยครับ มันพิสูจน์ให้เห็นว่าการทำออโตเมชันบนมือถือสามารถทำได้รวดเร็ว น่าเชื่อถือ และที่สำคัญคือ "เขียนแล้วสนุก" ครับ ด้วยการรวมความง่ายของ YAML เข้ากับพลังของ JavaScript ผมจึงได้ระบบเทสที่พร้อมลุยกับทุกแอปบนทุกแพลตฟอร์ม

**ขอบคุณที่ติดตามเรื่องราวการเดินทางในโลก Maestro ของผมนะครับ! 🚀**
