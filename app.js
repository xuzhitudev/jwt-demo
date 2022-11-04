// 引入express框架
const express = require("express");
// 引入jsonwebtoken框架
const jwt = require("jsonwebtoken");
const app = express();

//解析JSON数据
app.use(express.json());

//板顶并侦听端口
app.listen(3100, () => {
  console.log("连接成功", jwt);
});
