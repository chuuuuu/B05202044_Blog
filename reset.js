var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "j;3xj4zj6j4",
  database: "HornBlog",
  multipleStatements: true,
});

con.connect();

let sql;

sql = "DROP DATABASE HornBlog;"

sql += "CREATE DATABASE HornBlog CHARACTER SET 'utf8' COLLATE 'utf8_general_ci';"

sql += "USE HornBlog;"

sql += "CREATE TABLE users(ID BIGINT PRIMARY KEY, Name VARCHAR(255));"

sql += "CREATE TABLE posts(PHOTO VARCHAR(255), CONTENT VARCHAR(10000), Name VARCHAR(255), ID BIGINT, PID BIGINT AUTO_INCREMENT NOT NULL, primary key(PID));"

con.query(sql, ()=>{
  process.exit();
});
