import { test, expect } from '@playwright/test';

test.describe('ฝึกเทส API กับ JSONPlaceholder', () => {
  const baseURL = 'https://jsonplaceholder.typicode.com';

  // 1. GET
  test('GET ตรวจสอบการดึงข้อมูล', async ({ request }) => {
    const response = await request.get(`${baseURL}/posts/1`);
    const body = await response.json();
    console.log('GET Body:', body);
    expect(response.status()).toBe(200);
    expect(body.id).toBe(1);
  });

  // 2. POST
  test('POST ตรวจสอบการสร้างยูสเซอร์ใหม่', async ({ request }) => {
    const response = await request.post(`${baseURL}/posts`, {
      data: { title: 'Miss Boo', body: 'QA Test', userId: 1 }
    });
    const body = await response.json();
    console.log('POST Body:', body);
    expect(response.status()).toBe(201);
    expect(body.title).toBe('Miss Boo');
  });

  // 3. PUT
  test('PUT ตรวจสอบการแก้ไขข้อมูลทั้งก้อน', async ({ request }) => {
    const response = await request.put(`${baseURL}/posts/1`, {
      data: { id: 1, title: 'Updated Title', body: 'Updated Content', userId: 1 }
    });
    const body = await response.json();
    console.log('PUT Body:', body);
    expect(response.status()).toBe(200);
    expect(body.title).toBe('Updated Title');
  });

  // 4. ตรวจสอบการลบโพสต์ด้วยไอดี
  test('DELETE - ลบข้อมูล', async ({ request }) => {
    const response = await request.delete(`${baseURL}/posts/1`);
    console.log('DELETE Status:', response.status());
    // หมายเหตุ: เว็บนี้ลบสำเร็จจะคืนค่า 200 ครับ
    expect(response.status()).toBe(200);
  });
});