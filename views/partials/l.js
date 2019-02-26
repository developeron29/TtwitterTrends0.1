var async = require('async');
var request = require('request');

async.series([
	function(callback){
		request('https://accounts.google.com/CheckAvailability?Email=adfagga',function(err,response,body){
			if(!err && response.statusCode == 200)
			{
				callback(body);
			}
		});
	},
	function(body,callback){
		console.log(body);
		callback();
	}


	]);