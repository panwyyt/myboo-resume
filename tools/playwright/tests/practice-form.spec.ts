// ============================================================
// 🧪 Practice Form Test — แบบ POM ไฟล์เดียว
// ============================================================
// แบ่งเป็น 3 ส่วน:
//   ส่วนที่ 1 → Page Object (Locator + Action)
//   ส่วนที่ 2 → Test Data (ข้อมูลที่ใช้เทสต์)
//   ส่วนที่ 3 → Test (ตัวเทสต์จริงๆ)
// ============================================================

import { test, expect, type Page } from '@playwright/test';
import path from 'path';

// ╔══════════════════════════════════════════════════════════════╗
// ║  ส่วนที่ 1: PAGE OBJECT — รวม Locator + Action ไว้ที่เดียว  ║
// ║  ถ้า UI เปลี่ยน → แก้แค่ส่วนนี้ ไม่ต้องไปแก้ตัวเทสต์       ║
// ╚══════════════════════════════════════════════════════════════╝

class PracticeFormPage {

  constructor(private page: Page) { }

  // ---------- 🚀 เปิดหน้าเว็บ ----------
  async goto() {
    await this.page.goto('https://demoqa.com/automation-practice-form');
  }

  // ---------- ✏️ กรอกข้อมูลส่วนตัว ----------
  async fillFirstName(name: string) {
    await this.page.getByRole('textbox', { name: 'First Name' }).fill(name);
  }
  async fillLastName(name: string) {
    await this.page.getByRole('textbox', { name: 'Last Name' }).fill(name);
  }
  async fillEmail(email: string) {
    await this.page.getByRole('textbox', { name: 'name@example.com' }).fill(email);
  }
  async fillMobile(mobile: string) {
    await this.page.getByRole('textbox', { name: 'Mobile Number' }).fill(mobile);
  }
  async fillAddress(address: string) {
    await this.page.getByRole('textbox', { name: 'Current Address' }).fill(address);
  }

  // ---------- 🔘 เลือกเพศ ----------
  async selectGender(gender: 'Male' | 'Female' | 'Other') {
    await this.page.getByRole('radio', { name: gender }).check();
  }

  // ---------- 📅 เลือกวันเกิด ----------
  async selectDateOfBirth(day: number, month: string, year: string) {
    // month: '0' = Jan, '1' = Feb, ... '11' = Dec (ค่าของ <select>)
    await this.page.locator('#dateOfBirthInput').click();
    await this.page.getByRole('combobox').nth(1).selectOption(year);
    await this.page.getByRole('combobox').nth(0).selectOption(month);

    // สร้าง label เช่น "January 1st, 2000" เพื่อคลิกวันที่
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ];
    const suffixes: Record<number, string> = { 1: 'st', 2: 'nd', 3: 'rd' };
    const suffix = (day >= 11 && day <= 13) ? 'th' : (suffixes[day % 10] || 'th');

    await this.page
      .getByRole('gridcell', { name: new RegExp(`${monthNames[+month]} ${day}${suffix}, ${year}`) })
      .click();
  }

  // ---------- 📚 เพิ่มวิชา ----------
  async addSubject(letter: string, name: string) {
    // พิมพ์ตัวอักษร → เลือกจาก dropdown
    await this.page.locator('#subjectsInput').fill(letter);
    await this.page.getByRole('option', { name }).click();
  }

  // ---------- 🎮 เลือกงานอดิเรก ----------
  async checkHobby(hobby: 'Sports' | 'Reading' | 'Music') {
    await this.page.getByRole('checkbox', { name: hobby }).check();
  }

  // ---------- 📎 อัปโหลดรูป ----------
  async uploadPicture(filePath: string) {
    const absolute = path.isAbsolute(filePath) ? filePath : path.resolve(filePath);
    await this.page.getByRole('button', { name: 'Choose File' }).setInputFiles(absolute);
  }

  // ---------- 📍 เลือก State & City ----------
  async selectState(state: string) {
    await this.page.locator('#state').click();
    await this.page.getByRole('option', { name: state }).click();
  }
  async selectCity(city: string) {
    await this.page.locator('#city').click();
    await this.page.getByRole('option', { name: city }).click();
  }

  // ---------- 📤 กด Submit ----------
  async submit() {
    await this.page.getByRole('button', { name: 'Submit' }).click();
  }

  // ---------- ✅ ตรวจผลลัพธ์ ----------
  async expectSuccess() {
    await expect(this.page.getByText('Thanks for submitting the form')).toBeVisible();
  }
  async expectDateOfBirth(value: string) {
    await expect(this.page.locator('#dateOfBirthInput')).toHaveValue(value);
  }
}

// ╔══════════════════════════════════════════════════════════════╗
// ║  ส่วนที่ 2: TEST DATA — ข้อมูลที่ใช้ในเทสต์                  ║
// ║  แก้ข้อมูลตรงนี้ได้เลย ไม่ต้องไปแก้ในตัวเทสต์               ║
// ╚══════════════════════════════════════════════════════════════╝

const DATA = {
  firstName: 'Boo',
  lastName: 'Boo',
  email: 'boo@gmail.com',
  mobile: '0988889999',
  gender: 'Other' as const,
  birthDay: 1,
  birthMonth: '0',          // 0 = January
  birthYear: '2000',
  birthExpect: '01 Jan 2000',
  subjects: [
    { letter: 'e', name: 'English' },
    { letter: 'c', name: 'Chemistry' },
  ],
  hobbies: ['Sports', 'Music'] as const,
  picture: path.resolve(__dirname, '..', 'boo-data', 'img-for-test.png'),
  address: 'address test',
  state: 'NCR',
  city: 'Delhi',
};

// ╔══════════════════════════════════════════════════════════════╗
// ║  ส่วนที่ 3: TEST — ตัวเทสต์จริงๆ                             ║
// ║  อ่านทีละบรรทัดเหมือนขั้นตอนการกรอกฟอร์ม                    ║
// ╚══════════════════════════════════════════════════════════════╝

test('Practice Form — กรอกฟอร์มและ Submit สำเร็จ', async ({ page }) => {

  const form = new PracticeFormPage(page);

  // 1. เปิดหน้าเว็บ
  await form.goto();

  // 2. กรอกข้อมูลส่วนตัว
  await form.fillFirstName(DATA.firstName);
  await form.fillLastName(DATA.lastName);
  await form.fillEmail(DATA.email);
  await form.selectGender(DATA.gender);
  await form.fillMobile(DATA.mobile);

  // 3. เลือกวันเกิด + ตรวจค่า
  await form.selectDateOfBirth(DATA.birthDay, DATA.birthMonth, DATA.birthYear);
  await form.expectDateOfBirth(DATA.birthExpect);

  // 4. เลือกวิชา
  for (const s of DATA.subjects) {
    await form.addSubject(s.letter, s.name);
  }

  // 5. เลือกงานอดิเรก
  for (const h of DATA.hobbies) {
    await form.checkHobby(h);
  }

  // 6. อัปโหลดรูป
  await form.uploadPicture(DATA.picture);

  // 7. กรอกที่อยู่
  await form.fillAddress(DATA.address);

  // 8. เลือก State & City
  await form.selectState(DATA.state);
  await form.selectCity(DATA.city);

  // 9. กด Submit
  await form.submit();

  // ✅ ตรวจว่า Submit สำเร็จ
  await form.expectSuccess();
});