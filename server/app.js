// server/app.js
const express = require('express');
const morgan = require('morgan');
const bodyParser = require("body-parser");
const path = require('path');
const fs = require('fs');
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

app.post('/updateFile', function(req, res) {
    console.log(req.body);

    var output = {
        original: {},
        updated: {},
        reg: {},
        success: false
    };

    for(var i = 0, j = req.body.data.length; i < j; i++) {
        //the need to have a sync between the loop and the async method. A module that passes the index as the i
        (function (index) {
            var fileinfo = req.body.data[index];
            Manager.ReadFile(req.body.path + fileinfo.url).then(function (data) {
                var update = Manager.UpdateFile(fileinfo.fieldToUpdate, fileinfo.oldValue, fileinfo.newValue, data);

                //Path creation
                var path = __dirname + "\\output" + fileinfo.url;
                var strict_path = path.substring(0, path.lastIndexOf("/"));
                if(!fs.existsSync(strict_path)) {
                    fs.mkdirSync(strict_path)
                }
                Manager.WriteFile(path, update.data.updated).then(function (){
                    //console.log("-->", "Done", update);
                    res.json(update);
                });
            });
        })(i);
    }
});

module.exports = app;