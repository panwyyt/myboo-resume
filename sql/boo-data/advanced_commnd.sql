/* 1.สร้างตารางชื่อ 'animals' เพื่อเก็บข้อมูลสัตว์ในศูนย์พักพิง โดยมีคอลัมน์ต่างๆ
เช่น วันที่รับเข้า, เหตุผลที่รับมา, สถานะการย้าย, รหัสศูนย์, เลขไมโครชิป, ชื่อสัตว์ และสายพันธุ์ */
CREATE TABLE IF NOT EXISTS animals (
    index INT,
    id INT,
    intakedate TIMESTAMP,
    intakereason TEXT,
    istransfer INT,
    sheltercode TEXT,
    identichipnumber TEXT,
    animalname TEXT,
    breedname TEXT,
    basecolour TEXT,
    speciesname TEXT,
    animalage TEXT,
    sexname TEXT,
    location TEXT,
    movementdate TIMESTAMP,
    movementtype TEXT,
    istrial FLOAT,
    returndate TIMESTAMP,
    returnedreason TEXT,
    deceaseddate TIMESTAMP,
    deceasedreason TEXT,
    diedoffshelter INT,
    puttosleep INT,
    isdoa INT
);

-- 2.นำข้อมูลจากไฟล์ CSV เข้าสู่ตาราง 'animals' โดยใช้คำสั่ง COPY
COPY animals
FROM '/Users/tocilic/Documents/sql-boo-portfolio-github/boo-data/animal-data-1.csv'
DELIMITER ',' 
CSV HEADER;
-- นับจำนวนข้อมูลทั้งหมดในตาราง 'animals' เพื่อยืนยันว่าข้อมูลถูกนำเข้าอย่างถูกต้อง
SELECT COUNT(*) FROM animals;

-- 3.เพิ่มคอลัมน์ 'index' เป็น PRIMARY KEY เพื่อให้แน่ใจว่าแต่ละแถวมีค่าเฉพาะและไม่ซ้ำกัน
ALTER TABLE animals ADD PRIMARY KEY (index);

-- 4.หาสัตว์ที่ใช้เวลานานที่สุดในศูนย์พักพิงก่อนที่จะถูกรับเลี้ยง โดยคำนวณจากวันที่รับเข้าและวันที่ย้ายออก
SELECT animalname, speciesname, movementdate - intakedate AS days_in_shelter
FROM animals
WHERE movementtype = 'Adoption' -- ดูเฉพาะตัวที่ถูกรับเลี้ยงไปแล้ว
ORDER BY days_in_shelter DESC
LIMIT 10;

-- 5.จัดกลุ่มตามช่วงอายุ
SELECT animalname, 
       animalage,
       CASE 
           WHEN animalage LIKE '%years%' OR animalage LIKE '%year%' THEN -- เช็กว่า "มีคำว่าปี" หรือไม่
                CASE 
                    WHEN animalage LIKE '1 %' OR animalage LIKE '2 %' THEN 'Young Adult' -- ถ้ามีปี เช็กต่อว่าเป็น 1-2 ปี หรือมากกว่านั้น
                    ELSE 'Senior'
                END 
           WHEN animalage LIKE '%month%' OR animalage LIKE '%weeks%' THEN 'Baby/Kitten' -- ถ้าไม่มีปี ให้เช็กว่าเป็น "เดือน" หรือ "สัปดาห์" หรือไม่
           ELSE 'Adult' -- ถ้าไม่ใช่ทั้งสองแบบข้างต้น ให้จัดเป็น "ผู้ใหญ่"
       END AS age_group
FROM animals
LIMIT 20;

-- 6.หาสัตว์ที่มีอายุมากที่สุดในแต่ละสายพันธุ์ โดยใช้ฟังก์ชัน RANK() เพื่อจัดอันดับอายุภายในแต่ละสายพันธุ์
SELECT speciesname, animalname, animalage,
       RANK() OVER(PARTITION BY speciesname ORDER BY animalage DESC) as age_rank
FROM animals
WHERE animalname != ''
ORDER BY speciesname, age_rank
LIMIT 30;

-- 7.ใช้ฟังก์ชัน LEAD() เพื่อดูสายพันธุ์ของสัตว์ตัวถัดไปในลำดับวันที่รับเข้า โดยจัดเรียงตามวันที่รับเข้า
SELECT animalname, speciesname,
    LEAD(speciesname) OVER(ORDER BY intakedate) as next_animal_species
FROM animals
ORDER BY intakedate
LIMIT 20;

-- 8.จัดกลุ่มตามสายพันธุ์และนับจำนวนสัตว์ในแต่ละสายพันธุ์ โดยใช้ GROUP BY และ COUNT() เพื่อดูว่ามีสัตว์แต่ละสายพันธุ์กี่ตัวในศูนย์พักพิง
SELECT speciesname, COUNT(*) as total_count
FROM animals
GROUP BY speciesname
HAVING COUNT(*) > 500; -- คัดเฉพาะที่มีจำนวนมากกว่า 500 ตัว

-- 9.หาช่วงเวลาที่สัตว์ถูกนำเข้าสู่ศูนย์พักพิงมากที่สุด
SELECT 
    animalname, 
    intakedate,
    -- คำนวณ: (เวลาปัจจุบัน) ลบด้วย (เวลาของแถวก่อนหน้า)
    intakedate - LAG(intakedate) OVER(ORDER BY intakedate) as time_since_last_intake
FROM animals
ORDER BY intakedate
LIMIT 15;

-- 10.หาสัตว์ที่มีอายุน้อยที่สุดในแต่ละสายพันธุ์ เพื่อจัดอันดับอายุภายในแต่ละสายพันธุ์ และดึงข้อมูลเฉพาะที่มีอันดับ 1-3 เท่านั้น
WITH SortedAnimals AS (                     -- WITH คือการสร้าง "ตารางเสมือน" มาเก็บไว้ก่อน เพื่อให้สามารถเรียกใช้ในคำสั่งหลักได้
    SELECT speciesname, animalname, animalage,
           ROW_NUMBER() OVER(PARTITION BY speciesname ORDER BY animalage ASC) as row_num        -- ใช้ ROW_NUMBER() เพื่อรันเลข 1, 2, 3 แบบไม่มีอันดับร่วม ต่างจาก RANK() ที่อายุที่เท่ากันจะได้อันดับเดียวกัน
    FROM animals
    WHERE animalname != ''
)
SELECT speciesname, animalname, animalage, row_num
FROM SortedAnimals
WHERE row_num <= 3
ORDER BY speciesname, row_num;