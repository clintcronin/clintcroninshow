var FeedParser = require('feedparser');
var request = require('request');
var config = require('./../config.js');
var logger = require('./../logger.js');
var podcastModel = require('./../models/podcast.js');

exports.getRssFeed = function(callback) {
	var feedparser = new FeedParser();
	var feedRequest = request(config.rssFeed.url);
  	var items = [];
  	feedRequest.on('error', function(err) {
  		logger.error("Error fetching rssFeed. Error = %s", err);
  	});
  	feedRequest.on('response', function (res) {
  		var stream = this;
		if (res.statusCode != 200) {
			logger.error("Error fetching rssFeed. Status = %s", res.statusCode);
		}
		stream.pipe(feedparser);
  	});
  	feedparser.on('error', function(err){
  		logger.Error("No readable feed %s", err);
  	});
  	feedparser.on('readable', function() {
		var stream = this;
		var item;

		while (item = stream.read()) {
	    	items.push(item);
		}
    });
  	feedparser.on('end', function(){
  		var podcasts = [];
  		items.forEach(function(item){
			var podcast = {
				"guid" : item.guid,
				"title" : item.title,
				"pubDate" : item.pubDate,
				"imageSrc" : item.image.url,
				"description" : item.description,
				"author" : item.author,
				"link" : item.link,
				"enclosures" : item.enclosures,
				"updatedAt" : Date.now()
			};
			podcasts.push(podcast);
		});
  		callback(podcasts);
  	});
};

exports.populatePodcasts = function(callback){
	exports.getRssFeed(function(data){
		podcastModel.upsertAll(data, function(){
			console.log("Podcasts data added to database");
			if(callback) callback();
		});
	});
};