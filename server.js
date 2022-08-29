const express = require("express");
const mysql = require("mysql");
const PORT = process.env.PORT || 4000;
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodemysql",
});

db.connect((err) => {
  if (err) {
    console.log(`error connecting ${err.stack}`);
    return;
  }
  console.log(`db connected as id ${db.threadId}`);
});
const app = express();

app.get("/create-db", (req, res) => {
  let sql = "CREATE DATABASE nodemysql";
  db.query(sql, (err, result) => {
    if (err) {
      console.log(`there was an error creating your bd, ${db.threadId}`);
    }
    console.log(result);
    res.send("Database created...");
  });
});

// create table
app.get("/createposttable", (req, res) => {
  let sql =
    "CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))";

  db.query(sql, (err, result) => {
    if (err) {
      console.log(`there was an error creating table, ${err}`);
    }
    console.log(result);
    res.send("Post table created ...");
  });
});

// insert post 1
app.get("/addpost1", (req, res) => {
  let post = {
    title: "this is my first mysql post",
    body: "Lets see how ths flow goes on from here",
  };
  let sql = "INSERT INTO posts SET ?";
  let query = db.query(sql, post, (err, result) => {
    if (err) {
      console.log(`there was an error creating table, ${err}`);
    }
    console.log(result);
    res.status(201).json({ success: "first post added successfully ...", data: post });
  });
});
// insert post 2
app.get("/addpost2", (req, res) => {
  let post = {
    title: "POST TWO",
    body: "THIS IS MY SECOND POST",
  };
  let sql = "INSERT INTO posts SET ?";
  let query = db.query(sql, post, (err, result) => {
    if (err) {
      console.log(`there was an error creating table, ${err}`);
    }
    console.log(result);
    res.status(201).json({ success: "SECOND post added successfully ...", data: post });
  });
});

// SELECT all  post
app.get("/getpost", (req, res) => {
  let sql = "SELECT * FROM posts";
  let query = db.query(sql, (err, result) => {
    if (err) {
      console.log(`there was an error creating table, ${err}`);
    }
    console.log(result);
    res.status(201).json({ success: "all posts werre fetched successfully ...", data: result });
  });
});

// SELECT an individual  post
app.get("/getpost/:id", (req, res) => {
  let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) {
      console.log(`there was an fetching your single post, ${err}`);
    }
    console.log(result);
    res
      .status(201)
      .json({ success: "the post you requested for was fetched successfully ...", data: result });
  });
});

// UPDATE an individual  post
app.get("/updatepost/:id", (req, res) => {
  let newTitle = "This is our new title";
  let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) {
      console.log(`there was an error updating your post, ${err}`);
    }
    console.log(result);
    res.status(201).json({ success: "your post was updated successfully ...", data: result });
  });
});

// UPDATE an individual  post
app.get("/deletepost/:id", (req, res) => {
  let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) {
      console.log(`there was an error deletign your post, ${err}`);
    }
    console.log(result);
    res.status(201).json({ success: "your post was dleted successfully ..." });
  });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
