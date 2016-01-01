/**
 * Created by awaseem on 15-11-21.
 */

var express = require("express");
var fs = require("fs");
var https = require("https");

var app = express();

app.use("/node_modules",express.static(__dirname + "/node_modules"));
app.use("/semantic",express.static(__dirname + "/semantic"));
app.use("/dist",express.static(__dirname + "/dist"));


app.get('*', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(3000);
