const express = require("express");
const mysql = require("mysql2");
const searchroute = require("express").Router();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'advertising-price',
    port: 3307,
  });

searchroute.get('/search/:searchValue', (req, res) => {
    let search = req.params.searchValue; 
    

    if (!connection || connection.state === 'disconnected') {
        res.status(500).send('Không thể kết nối với cơ sở dữ liệu.');
        return;
    }

    if (!search) {
        res.render('search.ejs', { filteredResults: [] }); 
        return; 
    }
    const queryString = 'SELECT * FROM bang_gia1_1 WHERE LOWER(id) LIKE LOWER(?) OR LOWER(stt) LIKE LOWER(?) OR LOWER(website) LIKE LOWER(?) OR LOWER(position) LIKE LOWER(?) OR LOWER(dimension) LIKE LOWER(?) OR LOWER(platform) LIKE LOWER(?) OR LOWER(demo) LIKE LOWER(?) OR LOWER(buying_method) LIKE LOWER(?) OR LOWER(homepage) LIKE LOWER(?) OR LOWER(cross_site) LIKE LOWER(?) OR LOWER(ctr) LIKE LOWER(?) OR LOWER(estTraffic) LIKE LOWER(?)';
    const params = Array(12).fill('%' + search + '%'); // Tạo một mảng chứa các giá trị tìm kiếm cho mỗi cột
    connection.query(queryString, params, (error, filteredResults) => {
        if (error) {
            console.error('Lỗi truy vấn:', error);
            res.status(500).send('Đã xảy ra lỗi khi truy vấn dữ liệu.');
            return;
        }
        res.render('search.ejs', { filteredResults: filteredResults });
    });
});
module.exports = searchroute;