#  ESP32 IoT Control System using AWS Cloud

##  Overview

This project demonstrates a **complete IoT system** where an ESP32 device is controlled from a web interface hosted on AWS.

The system enables **bi-directional communication**:

*  ESP32 → AWS (send data)
*  AWS → ESP32 (control device like LED)

---

##  Architecture

S3 Website (Frontend) → API Gateway → AWS Lambda → AWS IoT Core → ESP32

---

##  Flow Explanation

1. User interacts with a web interface hosted on **Amazon S3**
2. The frontend sends a request to **API Gateway**
3. API Gateway triggers an **AWS Lambda function**
4. Lambda publishes a message to **AWS IoT Core (MQTT)**
5. ESP32 (subscribed to topic) receives the message
6. ESP32 performs action (e.g., LED ON/OFF)

---

##  Technologies Used

* ESP32 (Arduino IDE)
* AWS IoT Core
* AWS Lambda
* Amazon API Gateway
* Amazon S3 (Static Website Hosting)
* Node.js
* HTML/CSS/JavaScript

---

##  Setup Steps

### 1. AWS IoT Setup

* Create Thing
* Generate certificates
* Attach policy
* Get IoT endpoint

---

### 2. ESP32 Setup

* Configure WiFi
* Add certificates (Root CA, Device Cert, Private Key)
* Connect to AWS IoT via MQTT
* Subscribe to topic:

  ```
  esp32/command
  ```

---

### 3. Lambda Setup

* Create Lambda function
* Add environment variable:

  ```
  AWS_IOT_ENDPOINT
  ```
* Add IAM permission:

  ```
  iot:Publish
  ```

---

### 4. API Gateway Setup

* Create HTTP API
* Add route:

  ```
  POST /send
  ```
* Integrate with Lambda
* Enable CORS
* Deploy API

---

### 5. Frontend (S3 Hosting)

* Create S3 bucket
* Enable static website hosting
* Upload HTML file
* Call API Gateway endpoint using `fetch()`

---

##  Testing

### Send Command:

```json
POST /send
{
  "cmd": "ON"
}
```

### MQTT Topic:

```
esp32/command
```

### Expected Result:

* LED ON when `ON`
* LED OFF when `OFF`

---

##  Project Structure

```
ESP32_ON_OFF_LED/
 ├── lambda_function/
 ├── frontend/
 │    └── index.html
 └── README.md
```

---

##  Common Issues

| Issue                | Solution                             |
| -------------------- | ------------------------------------ |
| CORS Error           | Enable CORS in API Gateway           |
| rc = -2              | Check TLS / certificates / time sync |
| API not working      | Verify route + deployment            |
| ESP32 not responding | Check topic & subscription           |

---


This project demonstrates a **real-world IoT architecture** using AWS services with secure and scalable design.
