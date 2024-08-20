const express = require("express");
const mysql = require("mysql2");
const Userroute = require("express").Router();
const authenticateToken = require('/Thuc Tap VCC/week3/middleware/auth');
const checkRole = require('/Thuc Tap VCC/week3/middleware/checkRole');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'advertising-price',
    port: 3307,
  });

Userroute.get('/check-admin', authenticateToken,checkRole, (req, res) => {
    
    res.json({ success: true, message: 'Token is valid, you can proceed.' });
});

Userroute.get('/user', (req,res) =>{
  try{
    connection.query('SELECT * FROM user', (error, user) => {
      if (error) throw error;
      res.render('user.ejs', { user: user });
    })
  }
  catch(err){
    res.status(500).json(err);
  }
});

Userroute.post('/addUser', async(req,res) =>{
    const {username, password, email} = req.body;
    const sql = `INSERT INTO user (username, password, email) VALUES(?,?,?)`;
    const User = [username, password, email];
    console.log(User);

    connection.query(sql, User, (err, userValue) =>{
      if(err) {
        console.error('Lỗi khi thêm dữ liệu vào cơ sở dữ liệu:', err);
        res.status(500).send('Đã xảy ra lỗi khi thêm dữ liệu.');
        return;
      }
      res.status(200).send({ message: 'Dữ liệu đã được thêm thành công!', userValue: userValue });
    });
});


Userroute.delete('/deleteUser/:id', (req,res) =>{
  const id = req.params.id;
  console.log(id);

  connection.query('DELETE FROM user WHERE id = ?', [id], (error) =>{
    if(error){
      console.error('Lỗi khi xóa người dùng này: ', error);
      res.status(500).send('Xảy ra lỗi khi xóa người dùng!');
    } else{
      res.status(200).send('Xóa người dùng thành công');
    }
  });
});

module.exports = Userroute;