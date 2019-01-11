const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const config = require('../../config');

router.post('/', (req, res) => {
    const user = {
        username: req.body.username,
        password: req.body.password
    }
    User
        .find({
            username: user.username,
            password: user.password
        })
        .then((user) => {
            if (user.length != 0) {
                const token = jwt.sign({ user }, config.jwtSecret);
                res.json({ 
                    username:user.username,
                    email:user.email,
                    token:token 
                });
            } else {
                res.status(401).send("Username or password incorrect");
            }
        })
})
module.exports = router;