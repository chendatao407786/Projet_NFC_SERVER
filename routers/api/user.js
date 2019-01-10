const express = require('express');
const router = express.Router();
const User = require('../../models/User');

router.get('/', (req, res) => {
    User
        .find()
        .then(user => {
            res.json(user);
        })
        .catch(e => {
            res.json(e);
        })
})
router.post('/', (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    newUser.save().then(user => {
        res.json("Sign up successfully");
    });
});
module.exports = router;