'use strict';

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const PORT = process.env.port || 8008;
const DB = "mongodb://localhost/meanfullstack";
const apiRouter = require('./routes/api');
const mainRouter = require('./routes/main');

let app = express();
let server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use('/', mainRouter);
app.use('/api', apiRouter);
app.set('views', path.join(__dirname, './client/views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, './client')))

mongoose.connect(DB, (err) => {
    if(err) {
        throw err
    }
    console.log('Successful connect to ' + DB);
});

server.listen(PORT, () => {
    console.log('Server is running at port : ' + PORT);
})