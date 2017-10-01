/**
* Heart Rate Statistics
*
*
* @class heartStatistics
* @package    LKN health
* @copyright  Copyright (c) 2017 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
var util = require('util');
var events = require("events");
var MongoUtil = require("./mongo-utility.js");

var heartStatistics = function() {
console.log('heart statis live');
	events.EventEmitter.call(this);
  this.liveMongo = new MongoUtil();

};

/**
* inherits core emitter class within this class
* @method
*/
util.inherits(heartStatistics, events.EventEmitter);

/**
*  statistical average i.e. mean
* @method average
*
*/
heartStatistics.prototype.average = function(dayStart, dayBatch) {
//console.log('dayBatch array in');
//console.log(dayBatch);
  //sum the frequency and divu   (realworld missing data gaps etc needs Data science)
  var sum = dayBatch.reduce(add, 0);
	function add(a,b)	{
		return a + b;
	}
console.log('average');
console.log(sum);
  var lengthData = dayBatch.length;
console.log('number entries per day');
console.log(lengthData);
	if(sum > 0 && lengthData > 0)
	{
  var averageHRday = sum/lengthData;
	}
	else {
		averageHRday = 0;
	}
console.log('average per 24 hours');
console.log(averageHRday);
  var cover = lengthData/86400;
  // build JSON object using Knowledge Transaction LKN standards
  var dailyHRaverage = {};
  dailyHRaverage.daystart = dayStart;
  dailyHRaverage.hravg = averageHRday;
  dailyHRaverage.cover = cover;
  // save to personal decentralize crypto storage
  this.liveMongo.insertAverageCollection(dailyHRaverage);

};

/**
*  time batches of 24 hours set by UTC time base
* @method dayBatch
*
*/
heartStatistics.prototype.dayBatch = function(dataIN) {
console.log('HR DATA IN');
//console.log(dataIN);
  var localthis = this;
  var baseDay = new Date("2017-08-15T00:00:01+0000");//Date.UTC(2017, 08, 18, 0, 0, 0));    // 18 August 2018
  var daystoBatch = 50;
  var batchData = [];
  var day;

    for(day = 0; day < daystoBatch; day++) {

      var addTime = day * 86400000;
      var addTimeEnd = ((day + 1) * 86400000) - 1000;
      var startDate = new Date(baseDay.getTime() + addTime);
      var stopDate = new Date(baseDay.getTime() + addTimeEnd);
      dataIN.forEach(function(hrR){
//console.log(hrR);
      var din = new Date(hrR.timestamp);
//console.log(din);
      if(din > startDate.getTime() && din < stopDate.getTime())
      {
//console.log('yes in this 24 hour period');
					// convert to number
					var hrnumber = parseInt(hrR.hr);
          batchData.push(hrnumber);
      }
      else
      {
//console.log('not in time batch');
      }

    });

		localthis.average(startDate, batchData);
		batchData = [];
  };

};

module.exports = heartStatistics;
