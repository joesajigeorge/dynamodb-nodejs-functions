'use strict';
const express = require("express");
const serverless = require("serverless-http");
const app = express();
app.get('/api', function (req, res) {
  res.status(200).json({ "status": 0, "message": "API Working" });
});
module.exports.handler = serverless(app);
