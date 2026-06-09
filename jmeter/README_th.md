# JMeter

Performance และ Load Testing ด้วย Apache JMeter

## สิ่งที่ทำได้

- ออกแบบ load test ด้วย Thread Group จำลอง virtual user จำนวนมาก กำหนด ramp-up และ loop count ได้
- สร้าง HTTP request ได้เร็วด้วย cURL import และตั้งค่า sampler
- พารามิเตอร์ข้อมูลด้วย CSV Data Set Config ให้แต่ละ thread ใช้ข้อมูลไม่ซ้ำกัน
- ทำ correlation และ variable chaining ด้วย JSON Extractor และ Regular Expression Extractor
- ใส่ assertion (Response, JSON, Duration) เพื่อกัน false positive
- ใช้ timer (Constant, Uniform Random, Constant Throughput) จำลอง think time ให้สมจริง
- ใช้ GUI สำหรับสร้างและ debug แล้วสลับไป Non-GUI (CLI) สำหรับยิงโหลดจริงเพื่อผลที่แม่นยำ
- อ่าน metric ครบ: response time, throughput, latency, error rate และ percentile (90/95/99)
- วิเคราะห์และแก้ bottleneck เช่น แก้ data collision จนลด error rate จาก 19.92% เหลือ 0.00% (จาก 25,000 requests) และเพิ่ม throughput จาก 142 เป็น 433 req/s
- สร้าง HTML dashboard report และรองรับ distributed testing ต่อเข้ากับ CI/CD

