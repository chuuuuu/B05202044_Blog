//RESET

// DROP DATABASE HornBlog;
// CREATE DATABASE HornBlog CHARACTER SET 'utf8' COLLATE 'utf8_general_ci';
// USE HornBlog;

// CREATE TABLE users(ID INT(20) PRIMARY KEY, Name VARCHAR(255));

// CREATE TABLE posts(TITLE VARCHAR(255), PHOTO VARCHAR(255), CONTENT VARCHAR(10000), ID INT(20));


var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "j;3xj4zj6j4",
  database: "HornBlog",
});

con.connect();


var sql = "INSERT IGNORE users (ID, NAME) VALUES ('" + 123 + "', '" + 456 + "');";
con.query(sql, function (err, result) {
  if (err) throw err;
});

sql = "SELECT NAME FROM users WHERE ID = 2147483647"
con.query(sql, (err, result, fields)=>{
  console.log(result);
})