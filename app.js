require('dotenv').config();
const express = require("express");
const mysql = require("mysql2");
const path = require("path");
const bodyParser = require('body-parser');
const app = express();
const port = 3005;
const rootRouter = require("./routes");
const jwt = require('jsonwebtoken');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'advertising-price',
    port: 3307,
  });

connection.connect((error) => {
    if (error) {
        console.error('Error connecting to MySQL database:', error);
        return;
    }
    console.log('Connected to MySQL database successfully!');
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.json());




app.use("/", rootRouter);


/*
app.get('/search/:searchValue', (req, res) => {
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




//delete
app.delete('/delete/:id', (req, res) => {
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

app.get('/form', (req,res) =>{
    try{
        res.render('form.ejs');
    }
    catch(err) {
        res.status(500).json(err);
    }
});


// add
app.post('/add',async(req,res) => {
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
})


//fix
app.get('/fixdt/:id', (req,res) =>{
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

app.get('/fix/:id',(req,res) =>{
    try{
        res.render('fix.ejs');
    }
    catch(err) {
        res.status(500).json(err);
    }
})


app.put('/update/:id', async (req, res) => {
    const id = req.params.id; 
    const { stt, website, position, dimension, platform, demo, buying_method, homePage, cross_site, ctr, estTraffic } = req.body;

    const sql = `UPDATE bang_gia1_1 SET stt=?, website=?, position=?, dimension=?, platform=?, demo=?, buying_method=?, homepage=?, cross_site=?, ctr=?, estTraffic=? WHERE id=?`;
    const values = [stt, website, position, dimension, platform, demo, buying_method, homePage, cross_site, ctr, estTraffic, id];

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
*/

app.listen(3005,()=>{
    console.log('Example app listening on port');
})


