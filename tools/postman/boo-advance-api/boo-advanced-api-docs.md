# 📖 Advanced API Documentation (`boo-advance-api`)

This document visually represents the API structures, endpoints, dynamic data flow, and workflow automation implemented in the `boo-advanced-Restful-Booker-Env.postman_collection.json`. The endpoints tested simulate the robust real-world API infrastructure offered by the [Restful-Booker](https://restful-booker.herokuapp.com/) service payload scenarios.

---

## 🌍 Environment Setup Constraints
- **Base URL Variable (`{{base_url}}`)**: `https://restful-booker.herokuapp.com`
- **Security Protocols & Data Chaining Strategy**: This project specifically relies extensively on **Pre-request Security Handling** to fetch Token Authorizations behind the scenes. It also heavily enforces Variable extractions.

---

## 🛠️ Collection-Level Configurations (Top Secret Magic)

At the folder level, a **Pre-request Script** automatically retrieves the session token immediately before protected tests are fired. It uses `pm.sendRequest` internally to log in manually fetching credentials preventing duplication on sub-child requests.

```javascript
const authRequest = {                                      
    url: pm.environment.get("base_url") + "/auth",   
    method: 'POST', 
    header: { 'Content-Type': 'application/json' },
    body: {                                         
        mode: 'raw',
        raw: JSON.stringify({                       
            "username": "admin",                     
            "password": "password123"                 
        })
    }
};

pm.sendRequest(authRequest, (error, response) => {      
    if (!error && response.code === 200) {
        const result = response.json();                    
        // Saving to Env Variable to use automatically in cookies
        pm.environment.set("token", result.token);              
    }
});
```

---

## 📡 Endpoints Flow

### [Public Actions]

#### 1. Create Booking By Guest Info
Constructs guest entities and utilizes `Math.random` Arrays mimicking diverse input creation scenarios randomly.

- **Method:** `POST`
- **URL:** `{{base_url}}/booking`
- **Pre-request Script (Data Generation):**
```javascript
const firstnames = ["Somsak", "Wichai", "Ananda", "Lisa", "Boo"];
const lastnames = ["Deepak", "Rambo", "Blackpink", "Advanced", "Testing"];
pm.variables.set("random_firstname", firstnames[Math.floor(Math.random() * firstnames.length)]);
pm.variables.set("random_lastname", lastnames[Math.floor(Math.random() * lastnames.length)]);
pm.variables.set("random_price", Math.floor(Math.random() * 5000) + 1000);
```

- **Body (JSON):**
```json
{
    "firstname" : "{{random_firstname}}",
    "lastname" : "{{random_lastname}}",
    "totalprice" : {{random_price}},
    "depositpaid" : true,
    "bookingdates" : {
        "checkin" : "2026-01-01",
        "checkout" : "2026-01-05"
    },
    "additionalneeds" : "Breakfast"
}
```

- **✅ Tests Implemented (Request Chaining Variable Setup):**
```javascript
pm.test("Status code is 200 - Create Success", function () {
    pm.response.to.have.status(200);
});

// Chaining Strategy: Store booking for specific manipulation later!
const jsonData = pm.response.json();
const bookingId = jsonData.bookingid;
pm.environment.set("latest_booking_id", bookingId);
```

---

### [Administrative Protected Actions]

#### 2. Modify Target Record - Remove Additional Needs (PATCH)
Ensures security integrity passing generated token in authentication headers. Uses dynamic string referencing `{{latest_booking_id}}`.

- **Method:** `PATCH`
- **URL:** `{{base_url}}/booking/{{latest_booking_id}}`
- **Headers Needed:** `Cookie: token={{token}}`
- **Body (JSON):**
```json
{
    "additionalneeds": ""
}
```

- **✅ Tests Implemented:**
```javascript
pm.test("PATCH ผ่านฉลุย! (200 OK)", function () {
    pm.response.to.have.status(200);
});

const responseData = pm.response.json();
pm.test("ล้างข้อมูล additionalneeds เรียบร้อยแล้ว", function () {
    pm.expect(responseData.additionalneeds).to.equal("");
});
```

#### 3. Data Integrity Cleanup - Delete By Target Booking ID
Removes tested database components mitigating clutter on the third-party framework servers simulating clean test cycle environments.

- **Method:** `DELETE`
- **URL:** `{{base_url}}/booking/{{latest_booking_id}}`
- **Headers Needed:** `Cookie: token={{token}}`

- **✅ Tests Implemented (Tear-down execution process):**
```javascript
pm.test("ลบข้อมูลสำเร็จ! (201 Created)", function () {
    pm.response.to.have.status(201); // Special service responds 201 when complete deletion process clears
});

// Tear Down Framework Logic execution
pm.environment.unset("latest_booking_id");
```
