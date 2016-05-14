/**
 * surveys (Simple online surveys application)
 *
 * Copyright 2015 IBM Corp. All Rights Reserved
 *
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

// app.js

'use strict';

var fs = require('fs');
var io = require('socket.io');
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// setup middleware
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

//app.use(express.errorHandler());
app.use(express.static(__dirname + '/public')); //setup static public directory
app.use('/reports', express.static(__dirname + '/reports'));

// The IP address of the Cloud Foundry DEA (Droplet Execution Agent) that hosts this application:
var host = (process.env.VCAP_APP_HOST || 'localhost');
// The port on the DEA for communication with the application:
var port = (process.env.VCAP_APP_PORT || 3000);
// Start server
var server = app.listen(port, host);
console.log('App started on port ' + port);

// Establish a web socker connection.
var socket = io.listen(server);

var data = JSON.parse(fs.readFileSync('question.json'));

app.get('/api/question', function(req, res) {
    fs.createReadStream('question.json').pipe(res);
});

app.post('/api/question', function(req, res) {
    var updates = [];
    for (var i = 0; i < data.choices.length; i++) {
        // Get the choice that has been voted and increment the number of votes.
        if (data.choices[i].id === req.body.answer) {
            data.choices[i].votes += 1;
        }
        updates.push([data.choices[i].name, data.choices[i].votes]);
    }
    // Send a status update via web sockets.
    socket.emit('status', updates);

    res.status(200).send('ok');
});

app.get('/api/status', function(req, res) {
    
    var updates = [], voters = 0;
    data.choices.forEach(function(choice) {
        updates.push([choice.name, choice.votes]);
        voters += choice.votes;
    });
    res.status(200).json({
        question: {title: data.title, subtitle: data.subtitle},
        totalVoters: voters,
        data: updates
    });
});