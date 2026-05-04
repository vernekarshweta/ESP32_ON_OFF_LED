const express = require("express");
const AWS = require("aws-sdk");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// 🔥 AWS CONFIG (Lambda uses IAM Role, no keys needed)
AWS.config.update({
  region: process.env.AWS_REGION
});

// IoT Data instance
const iotData = new AWS.IotData({
  endpoint: process.env.AWS_IOT_ENDPOINT
});

// Health check route
app.get("/", (req, res) => {
  res.json({ message: "API is running on Lambda 🚀" });
});

// API to send command
app.post("/send", async (req, res) => {
  try {
    const { cmd } = req.body;

    if (!cmd) {
      return res.status(400).json({
        success: false,
        message: "cmd is required"
      });
    }

    const params = {
      topic: "esp32/command",
      payload: JSON.stringify({ command: cmd }),
      qos: 0
    };

    await iotData.publish(params).promise();

    return res.json({
      success: true,
      message: "Command sent successfully",
      command: cmd
    });

  } catch (err) {
    console.error("ERROR:", err);

    return res.status(500).json({
      success: false,
      message: "Error sending command",
      error: err.message
    });
  }
});

// Static files (optional)
app.use(express.static("public"));

module.exports = app;