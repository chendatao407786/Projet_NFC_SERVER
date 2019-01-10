const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const config = require('../../config');

function validationSignIn(user){
    if(user.lenght === 0 ){
        return false;
    }else{
        return true;
    }
}
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
                res.json({ token });
            } else {
                res.status(401).send("Username or password incorrect");
            }
        })
})
module.exports = router;