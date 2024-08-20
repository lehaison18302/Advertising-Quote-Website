const express = require("express");
const mysql = require("mysql2");
const admin = require("express").Router();
const authenticateToken = require('/Thuc Tap VCC/week3/middleware/auth');
const checkRole = require('/Thuc Tap VCC/week3/middleware/checkRole');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'advertising-price',
    port: 3307,
});

admin.get('/admin',function(req,res){
    let name = [
        "Cafef.vn",
        "Cafebiz.vn",
        "nld.com.vn",
        "vtv.vn",
        "Kenh14.vn",
        "Soha.vn",
        "Afamily.vn",
        "HOUSENHOME",
        "PHUNUVIETNAM",
        "Giadinh.suckhoedoisong.vn",
        "Gamek.vn",
        "Autopro.com.vn",
        "Thanhnien.vn",
        "tuoitre.vn",
        "Vneconomy.vn",
        "Toquoc.vn",
        "suckhoedoisong.vn"
    ];
    connection.query('SELECT * FROM bang_gia1_1', (error, results) => {
        if (error) throw error;
        res.render('index.ejs', { results: results ,  name: name });
    });
});

module.exports = admin;