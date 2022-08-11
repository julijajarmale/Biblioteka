const express = require("express");
const app = express();
const port = 3003;
const cors = require("cors");
app.use(express.json({ limit: "10mb" }));
app.use(cors());
const mysql = require("mysql");
const md5 = require('js-md5');
const uuid = require('uuid');


app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "biblioteka",
});


// LOGINAI IR ROLES
const doAuth = function(req, res, next) {
  if (0 === req.url.indexOf('/admin')) { // admin
      const sql = `
      SELECT
      name, role
      FROM users
      WHERE session = ?
  `;
      con.query(
          sql, [req.headers['authorization'] || ''],
          (err, results) => {
              if (err) throw err;
              if (!results.length || results[0].role !== 'admin') {
                  res.status(401).send({});
                  req.connection.destroy();
              } else {
                  next();
              }
          }
      );
  } else if (0 === req.url.indexOf('/login-check') || 0 === req.url.indexOf('/login')) {
      next();
  } else { // fron
      const sql = `
      SELECT
      name, role
      FROM users
      WHERE session = ?
  `;
      con.query(
          sql, [req.headers['authorization'] || ''],
          (err, results) => {
              if (err) throw err;
              if (!results.length) {
                  res.status(401).send({});
                  req.connection.destroy();
              } else {
                  next();
              }
          }
      );
  }
}
app.use(doAuth)

// AUTH
app.get("/login-check", (req, res) => {
  let sql;
  let requests;
  if (req.query.role === 'admin') {
      sql = `
      SELECT
      name
      FROM users
      WHERE session = ? AND role = ?
      `;
      requests = [req.headers['authorization'] || '', req.query.role];
  } else {
      sql = `
      SELECT
      name
      FROM users
      WHERE session = ?
      `;
      requests = [req.headers['authorization'] || ''];
  }
  con.query(sql, requests, (err, result) => {
      if (err) throw err;
      if (!result.length) {
          res.send({ msg: 'error' });
      } else {
          res.send({ msg: 'ok' });
      }
  });
});


app.post("/login", (req, res) => {
  const key = uuid.v4();
  const sql = `
  UPDATE users
  SET session = ?
  WHERE name = ? AND pass = ?
`;
  con.query(sql, [key, req.body.user, md5(req.body.pass)], (err, result) => {
      if (err) throw err;
      if (!result.affectedRows) {
          res.send({ msg: 'error', key: '' });
      } else {
          res.send({ msg: 'ok', key });
      }
  });
});


//READ BOOKS
app.get("/admin/books", (req, res) => {
    const sql = `
  SELECT *
  
  FROM books 

  `;
    con.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  });


  //CREATE BOOKS
app.post("/admin/books", (req, res) => {
    const sql = `
    INSERT INTO books
    (title, author, photo)
    VALUES (?, ?, ?)
    `;
    con.query(
      sql,
      [
        req.body.title,
        req.body.author,
        req.body.photo,
       
        
      ],
      (err, result) => {
        if (err) throw err;
        res.send({
          result,
          msg: { text: "OK, new and shiny product was created", type: "success" },
        });
      }
    );
  });



  //DELETE BOOKS
app.delete("/admin/books/:id", (req, res) => {
    const sql = `
    DELETE FROM books
    WHERE id = ?
    `;
    con.query(sql, [req.params.id], (err, result) => {
      if (err) throw err;
      res.send({ result, msg: { text: "OK, Product gone", type: "success" } });
    });
  });
  
  //EDIT BOOKS
  
  app.put("/admin/books/:id", (req, res) => {
    const sql = `
    UPDATE books
    
    SET title = ?, author = ?, photo = ?
    WHERE id = ?
    `;
    con.query(
      sql,
      [
        req.body.title,
        req.body.author,
        req.body.photo,
        req.params.id,
      ],
      (err, result) => {
        if (err) throw err;
        res.send({
          result,
          msg: { text: "OK, Cat updated. Now it is as new", type: "success" },
        });
      }
    );
  });
  
  //READ FRONT BOOKS
app.get("/books", (req, res) => {
    const sql = `
  SELECT *
  FROM books
  ORDER BY title
  `;
    con.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Portas ${port} klauso!`)
})
