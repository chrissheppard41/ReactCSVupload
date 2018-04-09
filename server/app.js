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
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit:50000 }));
app.use(bodyParser.json({limit: "50mb"}));
// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// Set the acceptable headers
app.use(function(req, res, next) {
    //res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Cache-Control, Content-Type, Accept");

    next();
});

app.post('/updateFile', function (req, res, next) {
    var output = Array();

    //Delete the files and folders before the creation of new content
    Manager.DeleteOutput("");

    //create the new files based on the request
    for(var i = 0, j = req.body.data.length; i < j; i++) {
        try {
            var fileinfo = req.body.data[i];
            var response = Manager.CreateFile(req.body.path + fileinfo.url, fileinfo);
            output.push(response);
        } catch(exception) {
            console.log(exception);
        }
    }

    //output the response
    res.json(output);
    res.end();
});


app.post('/updateCamelCase', function (req, res, next) {

    var fileList = Manager.ReadDir(req.body.path);

    fileList.forEach((file) => {
        try {
            Manager.RemoveCamelCase(req.body.field, file);
        } catch(err) {
            console.log(err);
        }
    });


    res.json("{'done': true}");
    res.end();


});

module.exports = app;