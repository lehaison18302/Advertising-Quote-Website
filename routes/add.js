const express = require("express");
const mysql = require("mysql2");
const addroute = require("express").Router();
const authenticateToken = require('/Thuc Tap VCC/week3/middleware/auth');
const checkRole = require('/Thuc Tap VCC/week3/middleware/checkRole');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'advertising-price',
    port: 3307,
  });



// Endpoint xác thực
addroute.get('/validate-token', authenticateToken, (req, res) => {
    res.json({ success: true, message: 'Token is valid, you can proceed.' });
});

// Endpoint render form.ejs
addroute.get('/add', (req, res) => {
    const sql = 'SELECT * FROM web';

    // Thực thi câu lệnh SQL và xử lý kết quả
    connection.query(sql, (error, results, fields) => {
        if (error) {
            console.error('Lỗi khi thực thi câu lệnh:', error);
            return;
        }
        // Truyền kết quả như một đối tượng vào phương thức render
        res.render('form.ejs', { results: results });
    });
});

addroute.get('/add/names', (req, res) => {
    connection.query('SELECT name FROM web', (error, names) => {
        if (error) throw error;
        res.json(names);  
    }); 
});

addroute.post('/addvalue',authenticateToken,async(req,res) => {
    const { stt, website, position, dimension, platform, demo, buying_method, homePage, cross_site, ctr, estTraffic } = req.body;
    const sql = `INSERT INTO bang_gia1_1 (stt, website, position, dimension, platform, demo, buying_method, homepage, cross_site, ctr, estTraffic) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [stt, website, position, dimension, platform, demo, buying_method, homePage, cross_site, ctr, estTraffic];
    console.log(values);

    connection.query(sql, values, (err, addvalue) => {
        if (err) {
            console.error('Lỗi khi thêm dữ liệu vào cơ sở dữ liệu:', err);
            res.status(500).send('Đã xảy ra lỗi khi thêm dữ liệu.');
            return;
        }
        res.status(200).send({ message: 'Dữ liệu đã được thêm thành công!', newRowId: addvalue.insertId });
    });
});

module.exports = addroute;