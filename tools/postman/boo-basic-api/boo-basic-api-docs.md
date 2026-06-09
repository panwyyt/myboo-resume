# 📖 Basic API Documentation (`boo-basic-api`)

This document visually represents the API structures, endpoints, and automated assertions implemented in the `boo-basic-api.postman_collection.json`. The endpoints tested belong to the public [JSONPlaceholder](https://jsonplaceholder.typicode.com/) mock service.

---

## 🌍 Environment Setup
- **Base URL Variable (`{{base_basic_url}}`)**: `https://jsonplaceholder.typicode.com`

---

## 📡 Endpoints

### 1. Get All Posts
Fetches all available posts and verifies performance and payload schema.
- **Method:** `GET`
- **URL:** `{{base_basic_url}}/posts`

**✅ Tests Implemented:**
```javascript
// Check that status code is 200 (OK)
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

// Enforce strict response SLA (under 900ms)
pm.test("Response time is less than 900ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(900);
});

// Validate schema structure is an array with entries
pm.test("Response is an array and not empty", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData).to.be.an('array');
    pm.expect(jsonData.length).to.be.at.least(1);
});
```

---

### 2. Create New Post
Creates a new resource payload mapping checking API acceptance response.
- **Method:** `POST`
- **URL:** `{{base_basic_url}}/posts`
- **Body (JSON):**
```json
{
    "title": "My First API Test",
    "body": "This is a test content for my portfolio project.",
    "userId": 1
}
```

**✅ Tests Implemented:**
```javascript
pm.test("สร้างโพสต์สำเร็จ - Status code is 201", function () {
    pm.response.to.have.status(201);
});

pm.test("มีเลข ID ส่งกลับมา", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('id');
    pm.expect(jsonData.id).to.equal(101); // JSONPlaceholder uses a static 101 creation ID
});
```

---

### 3. Update Existing Post (PUT)
Replaces the entire entity based on the specific ID payload mapping.
- **Method:** `PUT`
- **URL:** `{{base_basic_url}}/posts/1`
- **Body (JSON):**
```json
{
    "id": 1,
    "title": "หัวข้อใหม่ที่แก้ไขแล้ว",
    "body": "เนื้อหาใหม่ที่อัปเดตผ่าน PUT",
    "userId": 3
}
```

**✅ Tests Implemented:**
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("ตรวจสอบข้อมูลที่แก้ไขแล้ว", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData.title).to.eql("หัวข้อใหม่ที่แก้ไขแล้ว");
    pm.expect(jsonData.userId).to.eql(3);
});

pm.test("เช็คประเภทข้อมูลที่ส่งกลับมา", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData.id).to.be.a('number');
    pm.expect(jsonData.title).to.be.a('string');
});
```

---

### 4. Target Specific Field Update (PATCH)
Modifies a singular target object attribute while asserting other object attributes do not alter.
- **Method:** `PATCH`
- **URL:** `{{base_basic_url}}/posts/1`
- **Body (JSON):**
```json
{
    "title": "แก้เฉพาะหัวข้อด้วย PATCH"
}
```

**✅ Tests Implemented:**
```javascript
pm.test("PATCH สำเร็จ - Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("หัวข้อถูกเปลี่ยนตามที่ระบุ", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData.title).to.eql("แก้เฉพาะหัวข้อด้วย PATCH");
});

// Assert that untargeted components remain unaffected
pm.test("ข้อมูลส่วนอื่นยังอยู่ครบ", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('body');
    pm.expect(jsonData).to.have.property('userId');
});
```

---

### 5. Validate Deletion Processing
Ensures API gracefully accepts deletion requests.
- **Method:** `DELETE`
- **URL:** `{{base_basic_url}}/posts/1`

**✅ Tests Implemented:**
```javascript
pm.test("ลบข้อมูลสำเร็จ - Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response body ว่างเปล่า", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData).to.be.an('object');
    pm.expect(Object.keys(jsonData).length).to.eql(0);
});
```

---

### 6. Verify Server Headers Payload Format
Ensures data returned responds effectively without transmitting data body (Head technique to verify payload components vs network impact).
- **Method:** `HEAD`
- **URL:** `{{base_basic_url}}/posts/1`

**✅ Tests Implemented:**
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("มี Content-Type ส่งกลับมา", function () {
    pm.expect(pm.response.headers.get('Content-Type')).to.include('application/json');
});

pm.test("ไม่มี Body ส่งมา (ประหยัด Bandwidth)", function () {
    pm.expect(pm.response.text()).to.be.empty;
});
```

---

### 7. Determine Application CORS Operations
Determines HTTP Methods approved for communications on specific endpoints.
- **Method:** `OPTIONS`
- **URL:** `{{base_basic_url}}/posts`

**✅ Tests Implemented:**
```javascript
pm.test("Status code is 200 or 204", function () {
    pm.expect(pm.response.code).to.be.oneOf([200, 204]);
});

pm.test("มี Header ระบุ Method ที่อนุญาต (Allow Header)", function () {
    const allowHeader = pm.response.headers.get('Allow') || pm.response.headers.get('Access-Control-Allow-Methods');
    pm.expect(allowHeader).to.not.be.null;
    console.log("Allowed Methods: " + allowHeader);
});
```
