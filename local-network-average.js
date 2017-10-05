var http = require('http'),
    url = require('url'),
    fs = require('fs');
const MongoUtil = require("./mongo-utility.js");
const liveFlowmanager = require('./flow-network-manager.js');
const liveHeartStats = require('./heart-network-statistics.js');

var liveMongo = new MongoUtil();
var liveFlow = new liveFlowmanager();
var liveHstats = new liveHeartStats();

var genesisTime = '';//new Date("2017-10-04T00:00:01+0000");
var secondsinDay = 8640;//0000;
var startTIMECSC;
var cleandata;
var fullpath;
var response;
var origin;
var callBackIN;

var LKNtime = '';
// simulate LKN CSC
setInterval(totalCode, secondsinDay);

function totalCode (){

  var networkCollect = [];

  function getDatalocal(callBack){

    var genesisTime = new Date("2017-10-04T00:00:01+0000");
    var annonID = 'james'
    var fullpath = [0,0,0,'james','last'];
    liveFlow.LKNtime(genesisTime);
    liveMongo.retrieve24hrcollection(callBack, genesisTime, annonID, cleandata, fullpath,  response, origin);

    var annonID = 'andrew'
    var fullpath = [0,0,0,'andrew','last'];
    liveFlow.LKNtime(genesisTime);
    liveMongo.retrieve24hrcollection(callBack, genesisTime, annonID, cleandata, fullpath,  response, origin);

  };

  getDatalocal(function(cleanData, annonID){

    networkCollect.push(cleanData[0]);

    if(networkCollect.length == 2)
    {
      liveFlow.dayBatch(networkCollect, annonID);
    }

  });

};
