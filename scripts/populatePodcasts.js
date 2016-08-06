var podcastsMiddleware = require('./../middleware/podcasts.js');

podcastsMiddleware.populatePodcasts(function(){
	process.exit();
});