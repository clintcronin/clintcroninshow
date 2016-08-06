var request = require('request');
var config = require('./../config.js');

exports.getVideos = function(callback) {
	var url = "https://www.googleapis.com/youtube/v3/search?channelId=" + config.youtube.channelId + "&part=snippet,id&order=date&maxResults=" + config.youtube.maxResults + "&key=" + config.youtube.apiKey;
	var videos = [];
	request(url, function(error, response, body) {
		if (!error && response.statusCode == 200) {
			var data = JSON.parse(body);
			data.items.forEach(function(item) {
				var video = {};
				if (item.id.kind == "youtube#video") {
					video.id = item.id.videoId;
					video.thumbnail = {};
					video.thumbnail.src = item.snippet.thumbnails.default.url;
					video.thumbnail.width = item.snippet.thumbnails.default.width;
					video.thumbnail.height = item.snippet.thumbnails.default.height;
					video.publishedAt = item.snippet.publishedAt;
					video.title = item.snippet.title;
					video.description = item.snippet.description;
					videos.push(video);
				}
			});
			callback(videos);
		}
	});
};