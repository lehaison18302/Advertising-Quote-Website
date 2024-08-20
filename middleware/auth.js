// middleware/auth.js
const mysql = require("mysql2");
const jwt = require('jsonwebtoken');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'advertising-price',
    port: 3307,
  });

const authenticateToken = (req, res, next) => {
    // Lấy token từ headers
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // 'Bearer TOKEN'
    console.log('Received token:', token);

    if (!token) {
        return res.sendStatus(401); // Không có token
    }

    jwt.verify(token, 'mysecret', (err, user) => {
        if (err) {
            return res.sendStatus(403); // Token không hợp lệ
        }
        
        connection.query('SELECT * FROM user', (error, users) => {
            if (error) {
                throw error;
            }
    
            // Tìm kiếm đối tượng người dùng trong mảng users có thuộc tính trùng khớp với user được giải mã
            const matchedUser = users.find(dbUser => dbUser.username === user.username);
    
            if (matchedUser) {
                // Người dùng tồn tại trong cơ sở dữ liệu
                console.log('User found:', matchedUser);
                req.user = matchedUser; 
                next(); 
            } else {
                // Người dùng không tồn tại trong cơ sở dữ liệu
                return res.sendStatus(403); // Hoặc thực hiện xử lý khác tùy vào yêu cầu của bạn
            }
        });
    });
    
};



module.exports = authenticateToken;
