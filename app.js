const express = require('express');
const path = require('path');
const mysql = require('mysql');
const http = require('http');
const app = express();


app.use(express.static(path.join(__dirname, 'public')));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'fahmi12345ndewa',
  database: 'list_app'
});

connection.connect((err) => {
    if (err) {
      console.log('error connecting: ' + err.stack);
      return;
    }
    console.log('success');
  });

  app.get('/', (req, res) => {
    res.render('top.ejs');
  });

  app.get('/index', (req, res) => {
    connection.query(
      'SELECT * FROM users',
      (error, results) => {
        res.render('index.ejs', {items: results});
      }
    );
  });
  
  app.get('/new', (req, res) => {
    res.render('new.ejs');
  });
  
  app.post('/create', (req, res) => {
    connection.query(
      'INSERT INTO users (name) VALUES (?)',
      [req.body.itemName],
      (error, results) => {
        res.redirect('/index');
      }
    );
  });
  
  app.post('/delete/:id', (req, res) => {
    connection.query(
      'DELETE FROM items WHERE id = ?',
      [req.params.id],
      (error, results) => {
        res.redirect('/index');
      }
    );
  });
  
  app.get('/edit/:id', (req, res) => {
    connection.query(
      'SELECT * FROM items WHERE id = ?',
      [req.params.id],
      (error, results) => {
        res.render('edit.ejs', {item: results[0]});
      }
    );
  });
  
  app.post('/update/:id', (req, res) => {
    // Ketik code untuk memperbarui item yang dipilih
    connection.query(
      'UPDATE items SET name = ? WHERE id = ?',
      [req.body.itemName, req.params.id],
      (error, results) => {
        res.redirect('/index');
      }
    );
    // Hapus code dibawah ini yang redirect ke halaman Daftar Belanjaan
   
  });
  
  app.listen(3000);