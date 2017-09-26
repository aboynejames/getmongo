var http = require('http'),
    url = require('url'),
    fs = require('fs');
const liveHeartStats = require('./heart-statistics.js');

var liveHstats = new liveHeartStats();
var oneHR = {};
oneHR.timestamp = "2017-08-18T12:50:36+0100";
oneHR.heartrate = 72;
//liveHstats.dayBatch([oneHR]);

    var opts = {
        host: '',
        port: 8881,
        method: 'GET',
        path: '/heartdata/******',
        headers: {}
      };

      var res_data = '';
	// JSON encoding
opts.headers['Content-Type'] = 'application/json';
data = JSON.stringify({"device": "mio", "hr": "76"});//JSON.stringify(req.data);
opts.headers['Content-Length'] = data.length;
res_data = '';
//console.log(opts);

	var req = http.request(opts, function(response) {
    var chunk = '';
    var res_data = '';
		response.on('data', function(chunk) {
//console.log(chunk);
		res_data += chunk;
	});

	response.on('end', function() {
console.log('any response data?');
console.log(res_data.length);
        var cleanData = JSON.parse(res_data);
        var chunkOne = cleanData.slice(0, 10000);
        liveHstats.dayBatch(chunkOne);
		});

  });

	req.on('error', function(e) {
console.log(e);
console.log("Got error: " + e.message);
	});

// write the data
if (opts.method == 'GET') {
console.log('get has been sent');
  req.write(data);
}
//console.log(data);
req.end();
//console.log(req);
