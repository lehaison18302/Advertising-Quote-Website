const express = require("express");
const mysql = require("mysql2");
const fixroute = require("express").Router();
const authenticateToken = require('/Thuc Tap VCC/week3/middleware/auth');
const checkRole = require('/Thuc Tap VCC/week3/middleware/checkRole');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'advertising-price',
    port: 3307,
  });

fixroute.get('/fix', authenticateToken, (req, res) => {
    res.json({ success: true, message: 'Token is valid, you can proceed.' });
});

fixroute.get('/fixdt/:id', (req,res) =>{
    const id = req.params.id; 

    const query = 'SELECT * FROM bang_gia1_1 WHERE id = ?';
    connection.query(query, [id], function(error, results, fields) {
        if (error) {
            res.status(500).json({ error: 'Lỗi khi truy vấn cơ sở dữ liệu.' });
        } else {
            if (results.length > 0) {
                const data = results[0];
                res.json(data);
            }
        }
    });
});

fixroute.get('/fix/:id', (req,res) =>{
    try{
        res.render('fix.ejs');
    }
    catch(err) {
        res.status(500).json(err);
    }
})


fixroute.put('/update/:id', async (req, res) => {
    const id = req.params.id; 
    const { website, position, dimension, platform, demo, buying_method, homePage, cross_site, ctr, estTraffic } = req.body;

    const sql = `UPDATE bang_gia1_1 SET  website=?, position=?, dimension=?, platform=?, demo=?, buying_method=?, homepage=?, cross_site=?, ctr=?, estTraffic=? WHERE id=?`;
    const values = [ website, position, dimension, platform, demo, buying_method, homePage, cross_site, ctr, estTraffic, id];

    connection.query(sql, values, (err, updateResult) => {
        if (err) {
            console.error('Lỗi khi cập nhật dữ liệu trong cơ sở dữ liệu:', err);
            res.status(500).send('Đã xảy ra lỗi khi cập nhật dữ liệu.');
            return;
        }

        if (updateResult.affectedRows === 0) {
            res.status(404).send({ message: 'Không tìm thấy hàng để cập nhật.' });
            return;
        }
        res.status(200).send({ message: 'Dữ liệu đã được cập nhật thành công!', updatedRowId: id });
    });
});

module.exports = fixroute;

