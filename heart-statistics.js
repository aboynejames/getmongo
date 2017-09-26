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

var heartStatistics = function() {
console.log('heart statis live');
	events.EventEmitter.call(this);


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
heartStatistics.prototype.average = function(dayBatch) {

  //sum the frequency and div   (realworld missing data gaps etc needs Data science)
  var sum = dayBatch.reduce((a, b) => a + b, 0);
console.log('average');
console.log(sum);
  var lengthData = dayBatch.length;
console.log('number entries per day');
console.log(lengthData);
  var averageHRday = sum/lengthData;
console.log('average per 24 hours');
console.log(averageHRday);
  // save to personal decentralize crypto storage


};

/**
*  time batches of 24 hours set by UTC time base
* @method dayBatch
*
*/
heartStatistics.prototype.dayBatch = function(dataIN) {
console.log('HR DATA IN');
console.log(dataIN);
  var localthis = this;
  var baseDay = new Date("2017-08-18T00:00:01+0000");//Date.UTC(2017, 08, 18, 0, 0, 0));    // 18 August 2018
  var daystoBatch = 60;
  var batchData = [];
  var day;

    for(day = 0; day < daystoBatch; day++) {

      var addTime = day * 86400000;
      var addTimeEnd = ((day + 1) * 86400000) - 1000;
      var startDate = new Date(baseDay.getTime() + addTime);
      var stopDate = new Date(baseDay.getTime() + addTimeEnd);
      dataIN.forEach(function(hrR){

      var din = new Date(hrR.timestamp);
console.log(din);
      if(din > startDate.getTime() && din < stopDate.getTime())
      {
console.log('yes in this 24 hour period');
          batchData.push(hrR.heartrate);
      }
      else
      {
console.log('not in time batch');
      }
       localthis.average(batchData);
       batchData = [];
    });
  };

};


module.exports = heartStatistics;
