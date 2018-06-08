const express = require("express");

const path = require("path");

const mysql = require('mysql');

const formidable = require("formidable");

const im = require("imagemagick")

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "j;3xj4zj6j4",
  database: "HornBlog",
});

const fs = require("fs");

const app = express();

const bodyParser = require("body-parser");

const form = new formidable.IncomingForm({
  uploadDir: __dirname + "/client/photos",
  keepExtensions: true,
});

class Users {
  constructor(){
  }
  login(user){
    var sql = "INSERT IGNORE users (ID, NAME) VALUES ('" + user.id + "', '" + user.name + "');";
    con.query(sql, function (err, result) {
      if (err) throw err;
    });
  }
  getHomeImgs(){
    return new Promise((resolve) => {
      let sql = "SELECT PHOTO, PID FROM posts";
      con.query(sql, (err, result) => {
        if (err) throw err;
        let urls = result.map((photo) => {
          return {
            photo: photo.PHOTO,
            pid: photo.PID,
          }
        });
        resolve(urls.reverse());
      })
    });
  }
  getProfileImgs(id){
    return new Promise((resolve) => {
      let sql = "SELECT PHOTO, PID FROM posts WHERE ID = " + id;
      con.query(sql, (err, result) => {
        if (err) throw err;
        let urls = result.map((photo)=>{
          return {
            photo: photo.PHOTO,
            pid: photo.PID,
          }
        });
        resolve(urls.reverse());
      })
    });
  }
  getImgText(pid){
    return new Promise((resolve)=>{
      let sql = "SELECT CONTENT, ID FROM posts WHERE PID = " + pid;
      con.query(sql, async (err, result)=>{
        if(err) throw err;
        let content = result[0].CONTENT;
        let id = result[0].ID;
        let name = await this.getName(id);
        resolve({
          content: content,
          id: id,
          name: name,
        });
      })
    });
  }
  getName(id){
    return new Promise((resolve)=>{
      let sql = "SELECT NAME FROM users WHERE ID = " + id;
      con.query(sql, (err, result) => {
        if (err) throw err;
        resolve(result[0].NAME);
      })
    });
  }
  post(id, imgPath, content){
    return new Promise((resolve) => {
      let sql = "INSERT posts (PHOTO, CONTENT, ID) VALUES ('" + imgPath + "', '" + content + "', " + id + ")";
      con.query(sql, (err, result) => {
        if (err) throw err;
        resolve(result.insertId);
      })
    })
  }  
  resize(path){
    console.log(path);
    return new Promise((resolve) => {
      im.resize({
        srcPath: "client/"+path,
        dstPath: "./client/small/"+path,
        height: 400,
      }, function (err, stdout, stderr) {
        if (err) throw err;
        resolve();
      });
    })
  }
}

let users = new Users();

app.use(bodyParser.json());

app.use(express.static(__dirname + "/client"));

app.get("/api/img", (req, res, next) => {
  res.send({})
})

app.post("/api/login", (req, res, next)=>{
  console.log(req.body.user.id+" login");
  users.login(req.body.user);
})

app.get("/api/home", async (req, res, next) => {
  console.log("request home data");
  let imgs = await users.getHomeImgs();
  res.send({ imgs });
  // res.send(users.getHomeImgs());
})

app.get("/api/profile/:id", async (req, res, next) => {
  console.log("request profile of", req.params.id);
  let id = req.params.id;
  let name = await users.getName(id);
  let imgs = await users.getProfileImgs(id);
  res.send({imgs, name});
})

app.post("/api/upload/:id", (req, res, next) => {
  console.log("someone post something");
  form.parse(req, async (err, fields, files)=>{
    let id = req.params.id;
    let imgPath = path.relative(__dirname + "/client", files.photo.path);
    let content = fields.content;
    await users.resize(imgPath);
    let pid = await users.post(id, imgPath, content);
    res.send({pid, imgPath});
  })
})

app.get("/api/photo/:pid", async (req, res, next) => {
  console.log("someone click the photo");
  let data = await users.getImgText(req.params.pid);
  res.send(data);
})

app.listen(3002, () => {
  console.log("listening to port 3002")
})