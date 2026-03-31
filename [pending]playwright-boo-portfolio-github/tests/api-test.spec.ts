import { test, expect } from '@playwright/test';

// 1. ใช้ test.describe เพื่อรวมกลุ่มของเทสต์ที่เกี่ยวข้องกัน
test.describe('ระบบ JSONPlaceholder)', () => {

  // 2. ใช้ fixture { request } แทน { page }
  test('ดึงข้อมูลผู้ใช้งานคนที่ 2 (GET)', async ({ request }) => {
    
    // 3. สั่งยิง API ด้วยคำสั่ง request.get
    const response = await request.get('https://reqres.in/api/users/2');

    // 4. ตรวจสอบ Status Code (เบื้องต้นใช้ .ok() เพื่อเช็คว่าอยู่ช่วง 200-299)
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    // 5. แปลงผลลัพธ์เป็น JSON เพื่อนำมา Assert ข้อมูลข้างใน
    const body = await response.json();
    
    // ตรวจสอบความถูกต้องของข้อมูล (Data Validation)
    expect(body.data.id).toBe(2);
    expect(body.data.first_name).toBe('Janet');
  });

  test('สร้างผู้ใช้งานใหม่ (POST)', async ({ request }) => {
    
    // 6. ส่งคำสั่ง POST พร้อมแนบ JSON Body ผ่าน property "data"
    const response = await request.post('https://reqres.in/api/users', {
      data: {
        name: "Boo",
        job: "Software Tester"
      }
    });

    // ตรวจสอบว่าสร้างสำเร็จ (มักจะได้ Status 201)
    expect(response.status()).toBe(201);
    
    const body = await response.json();
    expect(body.name).toBe('Boo');
    expect(body.job).toBe('Software Tester');
    expect(body).toHaveProperty('id'); // เช็คว่ามี id งอกออกมาไหม
  });
});