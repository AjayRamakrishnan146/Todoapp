const express = require('express');
const app = new express();
const morgan = require('morgan');
app.use(morgan('dev'));
require('dotenv').config();

var cors=require('cors');
app.use(cors());

const path = require('path'); 
app.use(express.static(path.join(__dirname,'/build')));


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type ");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
})

require('./db/todoAppDb');

const api= require('./routes/todoRoute');
app.use('/api',api);

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname,'/build/index.html'));
 });

const PORT=5000;
app.listen(PORT,()=>{
    console.log(`The server is running on port ${PORT}`)
})