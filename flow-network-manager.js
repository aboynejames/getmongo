/**
* Flow of data manager, set time from network
*
*
* @class flowManager
* @package    LKN health
* @copyright  Copyright (c) 2017 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
var util = require('util');
var events = require("events");
var MongoUtil = require("./mongo-utility.js");
const liveHeartStats = require('./heart-network-statistics.js');


var flowManager = function() {
console.log('Flow Manager live');
	events.EventEmitter.call(this);
  this.liveHstats = new liveHeartStats();
	this.baseDay = '';

};

/**
* inherits core emitter class within this class
* @method
*/
util.inherits(flowManager, events.EventEmitter);

/**
*  get base time from LKN
* @method setLKNtime
*
*/
flowManager.prototype.LKNtime = function(LKNcscTime) {

	this.baseDay = LKNcscTime;//Date.UTC(2017, 08, 18, 0, 0, 0));    // 18 August 2018

};

/**
*  time batches of 24 hours set by UTC time base
* @method dayBatch
*
*/
flowManager.prototype.dayBatch = function(dataIN, annonID) {
console.log('HR DATA IN');
//console.log(dataIN)
	var hrauthor = '';
  var localthis = this;
  var baseDay = localthis.baseDay
  var daystoBatch = 50;
  var batchData = [];
  var day;

    //for(day = 0; day < daystoBatch; day++) {

      //var addTime = day * 86400000;
      //var addTimeEnd = ((day + 1) * 86400000) - 1000;
      //var startDate = new Date(baseDay.getTime() + addTime);
      //var stopDate = new Date(baseDay.getTime() + addTimeEnd);
      dataIN.forEach(function(hrR){
//console.log(hrR);
    //  var din = new Date(hrR.timestamp);
//console.log(din);
      //if(din > startDate.getTime() && din < stopDate.getTime())
      //{
//console.log('yes in this 24 hour period');
					// convert to number
					var hrnumber = parseInt(hrR.hr);
          batchData.push(hrnumber);
					//hrauthor = hrR.author;
      //}
      //else
    //  {
//console.log('not in time batch');
      //}

    });

		localthis.liveHstats.average(annonID, localthis.baseDay, batchData);
		batchData = [];
  //};

};

module.exports = flowManager;
