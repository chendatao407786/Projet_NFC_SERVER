const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const db_url = 'mongodb://localhost:27017/easycommand';
const user = require('./routers/api/user');
const auth = require('./routers/api/auth');
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
    next();
});

mongoose
    .connect(db_url)
    .then(() => console.log('connected'))
    .catch(err => console.log(err));

app.use('/api/user',user);
app.use('/api/auth',auth);
const port = process.env.PORT || 8080;
app.listen(port, () => console.log('server started at ' + port));