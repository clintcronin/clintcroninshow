var instagram = require('@wrapi/instagram');
var config = require('./../config.js');

var igClient = new instagram(config.instagram.accessToken);
var maxImagesPerReq = config.instagram.maxImagesCount;
var userId = config.instagram.clintandkashUserId;

exports.getInstagramPictures = function(maxId, callback) {
	igClient.users.media.recent(userId, {count : maxImagesPerReq, max_id : maxId}, function(err, data) {
  		if (!err) {
  			var igData = data.data
  			var allMedia = [];
  			var nextMaxId = data.pagination.length == 0 ? null : data.pagination.next_max_id;
  			var currentMaxId = igData[0].id;
    		for (var i=0; i<igData.length; i++) {
    			var mediaData = {};
    			if (igData[i].type == "image") {
					mediaData.thumbnail = igData[i].images.thumbnail;
    				mediaData.image = igData[i].images.standard_resolution;					
    				mediaData.type = "image";
				} else {
					mediaData.type = "video";
					mediaData.thumbnail = igData[i].images.thumbnail;
					mediaData.image = igData[i].videos.standard_resolution;
				}
    			mediaData.caption = igData[i].caption == null ? "" : igData[i].caption.text;
    			allMedia.push(mediaData);
    		}
    		callback(allMedia, nextMaxId);
  		}	
	});
};