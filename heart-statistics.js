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
heartStatistics.prototype.average = function(idIN, dayStart, dayBatch) {
//console.log('dayBatch array in');
//console.log(dayBatch);
	var localthis = this;
  //sum the frequency and divu   (realworld missing data gaps etc needs Data science)
  var sum = dayBatch.reduce(add, 0);
	function add(a,b)	{
		return a + b;
	}

	localthis.averagePrepared(idIN, sum, dayStart, dayBatch);

};

/**
*  pass data back prepared
* @method averagePrepared
*
*/
heartStatistics.prototype.averagePrepared = function(IDin, averageIN, dayStart, dayBatch) {

console.log('average');
console.log(averageIN);
	  var lengthData = dayBatch.length;
console.log('number entries per day');
console.log(lengthData);
		if(averageIN > 0 && lengthData > 0)
		{
	  var averageHRday = averageIN/lengthData;
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
		dailyHRaverage.author = IDin;
	  // save to personal decentralize crypto storage
	  this.liveMongo.insertAverageCollection(dailyHRaverage);

};

module.exports = heartStatistics;
