// 引入express框架
const express = require("express");
// 引入jsonwebtoken框架
const jwt = require("jsonwebtoken");
const app = express();
// 此文件用来生成随机字符串
const crypto = require("./crypto");
//生成私钥
const jwtKey = crypto(30);

//解析JSON数据
app.use(express.json());

//数据库用户
const database = { username: "一只特立独行的飞猪", password: "123456" };

//登录生成token
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log("----jwtKey", jwtKey);
  if (username === database.username && password === database.password) {
    jwt.sign(
      { username },
      jwtKey,
      {
        expiresIn: "30s", //过期时间，设置30s
      },
      (err, token) => {
        res.json({ username, message: "登陆成功", token });
      }
    );
  } else {
    console.log("登录失败，用户给不存在！");
  }
});

//登录后访问页面
app.get("/home", (req, res) => {
  console.log(req);
  const headers = req.headers;
  const token = headers["authorization"].split(" ")[1];
  jwt.verify(token, jwtKey, (err, payload) => {
    if (err) res.sendStatus(403);
    res.json({ message: "认证成功", payload });
  });
  // get the decoded payload ignoring signature, no secretOrPrivateKey needed
  var decoded = jwt.decode(token);

  // get the decoded payload and header
  var decoded = jwt.decode(token, { complete: true });
  console.log(decoded.header);
  console.log(decoded.payload);
});

//绑定并侦听端口
app.listen(3100, () => {
  console.log("连接成功", jwtKey);
});
