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

	  var lengthData = dayBatch.length;
		if(averageIN > 0 && lengthData > 0)
		{
	  var averageHRday = averageIN/lengthData;
		}
		else {
			averageHRday = 0;
		}
	  var cover = lengthData/2;
	  // build JSON object using Knowledge Transaction LKN standards
	  var dailyHRaverage = {};
	  dailyHRaverage.daystart = dayStart;
	  dailyHRaverage.nhravg = averageHRday;
	  dailyHRaverage.cover = cover;
		dailyHRaverage.author = 2;
	  // save to personal decentralize crypto storage
	  this.liveMongo.insertNetworkAverageCollection(dailyHRaverage);

};

module.exports = heartStatistics;
