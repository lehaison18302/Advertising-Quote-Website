const express = require("express");
const mysql = require("mysql2");
const deleteroute = require("express").Router();
const authenticateToken = require('/Thuc Tap VCC/week3/middleware/auth');
const checkRole = require('/Thuc Tap VCC/week3/middleware/checkRole');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'advertising-price',
    port: 3307,
  });

deleteroute.delete('/delete/:id',authenticateToken, (req, res) => {
    const id = req.params.id; 
    
    connection.query('DELETE FROM bang_gia1_1 WHERE id = ?', [id], (error, result) => {
        if (error) {
            console.error('Lỗi khi xóa dòng:', error);
            res.status(500).send('Đã xảy ra lỗi khi xóa dòng.');
        } else {
            res.status(200).send('Xóa dòng thành công.');
        }
    });
});

module.exports = deleteroute;