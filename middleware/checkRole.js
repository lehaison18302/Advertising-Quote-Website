const jwt = require('jsonwebtoken');

const checkRole = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

    if (!token) {
        return res.status(401).send('Không tìm thấy token, không có quyền truy cập.');
    }

    // Giải mã token để kiểm tra vai trò của người dùng
    jwt.verify(token, 'mysecret', (err, decoded) => {
        if (err) {
            return res.status(403).send('Token không hợp lệ, không có quyền truy cập.');
        }
        if (decoded.isAdmin === 1) {
            next();
        } else {
            return res.status(403).send('Không có quyền truy cập.');
        }
    });
};

module.exports = checkRole;

