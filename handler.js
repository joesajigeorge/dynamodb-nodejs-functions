'use strict';
const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient({region: "us-east-1"});
const express = require("express");
const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));
app.get('/api', function (req, res) {
  res.status(200).json({ "status": 1, "message": "API Working" });
});

//put item API
app.post('/api/createuser', function (req, res){
  var body = req.body;
  console.log(req);
  var params = {
    TableName:"dynamodb-example-node",
    Item:{
        "user_id": body.user_id,
        "username": body.username,
        "user_age": body.age
    }
  };
  docClient.put(params,function (err, data) {
  if (err) {
    console.log(err);
  }
  else {
    console.log(data);
    res.status(200).json({ "status": 1, "message": "User added"});
  }
  });
});

module.exports.handler = serverless(app);
