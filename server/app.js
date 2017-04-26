// server/app.js
const express = require('express');
const morgan = require('morgan');
const bodyParser = require("body-parser");
const fs = require('fs');
const path = require('path');
const Manager = require('./File/Manager');
const app = express();

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Set up the middle man to pick up the body response
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// Set the acceptable headers
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Methods", "POST");
    res.header("Access-Control-Allow-Headers", "Origin, Cache-Control, Content-Type");

    next();
});

app.post('/updateFile', function (req, res) {
    var output = Array();

    //Delete the files and folders before the creation of new content
    Manager.DeleteOutput("");

    //create the new files based on the request
    for(var i = 0, j = req.body.data.length; i < j; i++) {
        var fileinfo = req.body.data[i];
        var response = Manager.CreateFile(req.body.path + fileinfo.url, fileinfo);
        output.push(response);
    }

    //output the response
    res.json(output);
    res.end();
});

module.exports = app;