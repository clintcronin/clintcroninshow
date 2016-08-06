// Load required packages
var express = require('express');
var compression = require('compression');
var engine = require('ejs-locals');
var sanitizeHtml = require('sanitize-html');
var instagramMiddleware = require('./middleware/instagram.js');
var podcastsMiddleware = require('./middleware/podcasts.js');
var youtubeMiddleware = require('./middleware/youtube.js');
var podcastModel = require('./models/podcast.js');
var logger = require('./logger.js');

// Create our Express application
var app = express();

// Add content compression middleware
app.use(compression());

// Add static middleware
var oneDay = 86400000;
app.use(express.static(__dirname + '/public', { maxAge: oneDay}));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

// set the view engine to ejs
app.engine('ejs', engine);
app.set('view engine', 'ejs');

app.locals.sanitizeHtml = sanitizeHtml;

// Create our Express router
var router = express.Router();

router.get('/rssFeed', function(req, res) {
  logger.debug("Called rssFeed");
  podcastsMiddleware.getRssFeed(function(items){
    res.json({"items" : items});
  });
});

router.get('/repopulatePodcasts', function(req, res) {
  podcastsMiddleware.populatePodcasts(function() {
    console.log("podcasts populated");
    res.status(200).end();
  });
});

router.get('/', function(req, res) {
  podcastModel.findAll(function(result){
    if(result.data) {
      res.render('podcasts', {active : "podcasts", items : result.data});
    } else {
      logger.error("Error getting podcasts data from database. Error %s", result.error);
    }
  });
});

//FIX ME: id should be a path param not a query param
router.get('/episodes', function(req, res){
  podcastModel.findById(req.query.id, function(result){
    if(result.data) {
      res.render('episode', {active : "podcasts", episode : result.data});
    } else {
      logger.error("Error getting episode data from database. Error %s", result.error);
    }
  });
});


router.get('/gallery', function(req, res) {
	var maxId = req.param('maxId');
	var lastCount = req.param('lastCount') || 0;

  instagramMiddleware.getInstagramPictures(maxId, function(allMedia, nextMaxId){
    if (req.xhr) {
      res.render('partials/galleryMedia', {media : allMedia, lastCount : lastCount}, function(err, html) {
        if (!err) {
          res.send({
            html : html,
            lastCount : parseInt(lastCount) + allMedia.length,
            nextMaxId : nextMaxId
          });
        }
      })
    } else {
      res.render('gallery', {active : "gallery", media : allMedia, nextMaxId : nextMaxId, lastCount : lastCount});
    }
  });
});

router.get('/videos', function(req, res) {
  youtubeMiddleware.getVideos(function(videos) {
    res.render('videos', {active : "videos", videos : videos});
  });
});

router.get('/about', function(req, res) {
	res.render('about', {active : "about"});
});

// Register all our routes
app.use(router);

// set the port of our application
// process.env.PORT lets the port be set externally
var port = process.env.PORT || 3000;

// Start the server
app.listen(port);
