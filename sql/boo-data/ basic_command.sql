-- ลบตารางเก่าออกก่อนถ้ามี (เพื่อเริ่มใหม่)
DROP TABLE IF EXISTS members;

-- สร้างตารางสมาชิก
CREATE TABLE members (
    id SERIAL PRIMARY KEY
    fullname TEXT NOT NULL,
    department TEXT,
    salary NUMERIC(10, 2),
    join_date DATE DEFAULT CURRENT_DATE
);

-- ใส่ข้อมูล Mock Data ภาษาไทย (10 รายชื่อ)
INSERT INTO members (fullname, department, salary, join_date) VALUES
('สมชาย รักษ์ดี', 'IT', 45000.00, '2023-01-15'),
('มณีรัตน์ ขยันงาน', 'บัญชี', 38000.00, '2023-02-20'),
('กิตติพงษ์ สดใส', 'การตลาด', 32000.00, '2023-03-05'),
('พรพรรณ ใจบุญ', 'HR', 29000.00, '2023-05-12'),
('ธนพล ยิ่งรวย', 'IT', 52000.00, '2023-06-01'),
('วิภาวดี มีสุข', 'ขาย', 25000.00, '2023-08-19'),
('ประเสริฐ เลิศล้ำ', 'การตลาด', 31000.00, '2023-09-25'),
('อรอนงค์ วงศ์ไทย', 'บัญชี', 40000.00, '2023-10-10'),
('เฉลิมพล ลาภมาก', 'IT', 48000.00, '2023-11-15'),
('จันทรา ดารากุล', 'HR', 30000.00, '2023-12-01');

-- ลองเลือกข้อมูลทั้งหมด
select * from members;

-- เลือกเฉพาะชื่อเต็มและเงินเดือนที่มากกว่าหรือเท่ากับ 35000
select fullname, salary from members where salary >= 35000

-- เลือกสมาชิกที่เข้าร่วมงานในปี 2023
select fullname, join_date from members where EXTRACT(YEAR FROM join_date) = 2023;

-- ลบตารางที่ชื่อว่า "test_thai" ถ้ามี
DROP TABLE IF EXISTS test_thai;

-- เพิ่มพนักงานใหม่เข้าไปในตาราง members
INSERT INTO members (fullname, department, salary, join_date) VALUES
('นันทนา ใจดี', 'ขาย',null, '2023-01-10'),
('สุทธิพงษ์ รักษา', 'บัญชี', 35000.00, '2023-02-28');

-- อัปเดตเงินเดือนของพนักงานที่ชื่อ "นันทนา ใจดี" เป็น 36000
UPDATE members SET salary = 36000.00 WHERE id = 11;

-- ลบพนักงานที่ id=1 ออกจากตาราง
DELETE FROM members WHERE id = 1;

-- เปลี่ยน id ของพนักงานที่ id=11 เป็น 1
UPDATE members SET id = 1 WHERE id = 11;

-- แสดงข้อมูลทั้งหมดในตาราง members โดยเรียงตาม id จากน้อยไปมาก
select * from members order by id asc;