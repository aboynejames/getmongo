var http = require('http'),
    url = require('url'),
    fs = require('fs');
const MongoUtil = require("./mongo-utility.js");
const liveFlowmanager = require('./flow-manager.js');
const liveHeartStats = require('./heart-statistics.js');

var liveMongo = new MongoUtil();
var liveFlow = new liveFlowmanager();
var liveHstats = new liveHeartStats();

var genesisTime = new Date("2017-08-15T00:00:01+0000");
var secondsinDay = 86400000;
var startTIMECSC;
var cleandata;
var fullpath;
var response;
var origin;
var callBackIN;

var LKNtime = '';
// simulate LKN CSC
setInterval(totalCode, 8640);

function totalCode (){

  function getDatalocal(callBack){

    var genesisTime = new Date();
    var annonID = 'andrew'
    liveFlow.LKNtime(genesisTime);
    liveMongo.retrieveCollection(callBack, genesisTime, annonID, cleandata, fullpath,  response, origin);

  };

  getDatalocal(function(cleanData){

    liveFlow.dayBatch(cleanData);

  });

};
