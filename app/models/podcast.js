var mongo = require('./mongo');

Array.prototype.diff = function(a) {
    return this.filter(function(i) {return !(a.indexOf(i) > -1);});
};

var enclosure = new mongo.mongoose.Schema({
	url : String,
    type : String,
    length : Number
});

var schema = new mongo.mongoose.Schema({
	guid : String,
    title : String,
    pubDate : Date,
    imageSrc : String,
    description : String,
    author : String,
    link : String,
    enclosures : [enclosure],
    updatedAt: Date
});

exports.createAll = function(podcasts){
	var db = mongo.mongoose.model('Podcast', schema);
	db.collection.insertMany(podcasts, function(err){
		if(err) {
			console.log(err);
            response = {"message" : "Error adding podcasts data"};
        } else {
            response = {"message" : "Podcasts Data added"};
        }
        console.log(response);
	});
};

exports.updateAll = function(podcasts){
    var db = mongo.mongoose.model('Podcast', schema);
    podcasts.forEach(function(podcast) {
        db.update({guid : podcast.guid}, podcast);
    });
};

exports.findAll = function(callback){
	var db = mongo.mongoose.model('Podcast', schema);
    db.find().sort({ pubDate: -1 }).exec(function(err,data){
        if(err) {
            response = {"error" : err};
        } else {
            response = {"data" : data};
        }
        callback(response);
    })
};

exports.upsertAll = function(podcasts, callback) {
    var db = mongo.mongoose.model('Podcast', schema);
    var existingIds = [];
    var toBeCreated = [];
    var toBeUpdated = [];
    var toBeCreatedIds = [];
    var toBeUpdatedIds = [];
    db.find({}, {'guid':1, '_id':0}, function(err, data) {
        data.forEach(function(guid){
            existingIds.push(guid.guid);
        });
        podcasts.forEach(function(item){
            if(existingIds.indexOf(item.guid) != -1) {
                toBeUpdated.push(item);
                toBeUpdatedIds.push(item.guid);
            } else {
                toBeCreated.push(item);
                toBeCreatedIds.push(item.guid);
            }
        });
        exports.deleteAll(existingIds.diff(toBeUpdatedIds));
        if (toBeUpdated.length > 0) {
            exports.updateAll(toBeUpdated);
        }
        if (toBeCreated.length > 0) {
            exports.createAll(toBeCreated);
        }
        callback();
    });
};

exports.findById = function(id, callback){
	var db = mongo.mongoose.model('Podcast', schema);
	db.findOne({'guid' : id},function(err, data){
        if(err) {
            response = {"error" : err};
        } else {
            response = {"data" : data};
        }
        callback(response);
    });
};

exports.findLatest = function(callback) {
    var db = mongo.mongoose.model('Podcast', schema);
    db.findOne({}, function(err, data){
        if(err) {
            response = {"error" : err};
        } else {
            response = {"data" : data};
        }
        callback(response);
    });
}

exports.deleteAll = function(guids){
    var db = mongo.mongoose.model('Podcast', schema);
    guids.forEach(function(guid){
        db.remove({'guid' : guid}, function(err) {
            if (err) console.log(err);
        });
    });
};