const express = require("express");
const mysql = require("mysql2");
const jwt = require('jsonwebtoken');
const loginroute = express.Router();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'advertising-price',
    port: 3307,
});

loginroute.get('/', (req, res) => {
  try {
    res.render('login.ejs');
  } catch (err) {
      res.status(500).json(err);
  }
});


loginroute.post('/login',(req, res) => {
    const userName = req.body.username;
    const password = req.body.password;
    console.log(userName, password);

    connection.query('SELECT * FROM user WHERE username = ?', [userName], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Internal Server Error');
        }

        if (results.length === 0) {
            return res.status(401).send('Username does not exist');
        }

        const user = results[0];

        if (password === user.password) {

            console.log(user);
            const accessToken = jwt.sign({ 
                id: user.id, 
                username: user.username, 
                isAdmin: user.isAdmin 
            }, 
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30m' }); 
            
            res.json({ accessToken });
        } else {
            return res.status(401).send('Incorrect password');
        }
    });
});


module.exports = loginroute;
