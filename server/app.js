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


// ///////////////DO AUTH////////////
const doAuth = function (req, res, next) {
  if (0 === req.url.indexOf('/admin')) {
    // admin
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
  } else {
    // Front
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

//Auth
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

app.post("/register", (req, res) => {
  const key = uuid.v4();
  const sql = `
  INSERT INTO users
  (name, email, pass, session)
  VALUES (?, ?, ?, ?)
`;
  con.query(sql, [req.body.user, req.body.email, md5(req.body.pass), key], (err, result) => {
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
    SELECT books.id, books.title, books.author, books.photo
  FROM books
  ORDER BY title
  `;
    con.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  });

  //READ RESERVATION
app.get("/reservation", (req, res) => {
    const sql = `
  SELECT reservation.id, reservation.name,  reservation.date, reservation.date_end, reservation.book_id, books.title AS title, books.author AS author, books.photo AS photo, approved, next_date, reservation.rate
  FROM reservation
  LEFT JOIN books
  ON books.id = reservation.book_id 
  ORDER BY name
  `;
    con.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  });
  
  //CREATE Reservation
  app.post("/reservation", (req, res) => {
    const sql = `
    INSERT INTO reservation
    (name, date, date_end, next_date, book_id)
    VALUES (?, ?, ?, ?, ?)
    `;
    con.query(
      sql,
      [
        req.body.name,
        req.body.date,
        req.body.endDate,
        req.body.next_date,
        req.body.book
        
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


  //READ BACK RESERVATIONS
app.get("/admin/reservations", (req, res) => {
    const sql = `
    SELECT reservation.id, reservation.name,  reservation.date, reservation.date_end, reservation.book_id, books.title AS title, books.author AS author, books.photo AS photo, approved, next_date 
    FROM reservation
    LEFT JOIN books
    ON books.id = reservation.book_id 
    ORDER BY name
  

  `;
    con.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  });


   //DELETE RESERVATION
app.delete("/admin/reservations/:id", (req, res) => {
    const sql = `
    DELETE FROM reservation
    WHERE id = ?
    `;
    con.query(sql, [req.params.id], (err, result) => {
      if (err) throw err;
      res.send({ result, msg: { text: "OK, Product gone", type: "success" } });
    });
  });


  //EDIT RESERVATIONS
  
  app.put("/admin/reservations/:id", (req, res) => {
    const sql = `
    UPDATE reservation
    
    SET approved = ?
    WHERE id = ?
    `;
    con.query(
      sql,
      [
        req.body.approved,
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

  //EDIT RESERVATIONS
  app.put("/admin/reservations/:id", (req, res) => {
    const sql = `
    UPDATE reservation
    
    SET next_date = ?
    WHERE id = ?
    `;
    con.query(
      sql,
      [
        req.body.nextDate,
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

//create rating
  app.put("/reservation/:id", (req, res) => {
    const sql = `
          UPDATE reservation
          SET rate = ?
          WHERE id = ?
      `;
    con.query(sql, [req.body.rate, req.params.id], (err, result) => {
      if (err) throw err;
      res.send({ result, msg: { text: "Tu prabalsavai", type: "danger" } });
    });
  });

  

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Portas ${port} klauso!`)
})
