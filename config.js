module.exports = {
	env : process.env.environment || "development",
	mongoUri : process.env.MONGODB_URI || "mongodb://localhost:27017/clintcroninshow",
	development : {
		loadDBInterval : 3600*1000,
		logger : {
			appenders: [
				{
					type: "console",
			      	category: "development"
			    }
			]
		}
	},
	production : {
		loadDBInterval : 24*3600*1000,
		logger : {
			appenders: [
				{
					type: "console",
			      	category: "development"
			    }
			]
		}
	},
	instagram : {
		clintcroninUserId : "19879795",
		accessToken : "19879795.1677ed0.f49f3412f1d846e48cc71cad3aca6ab8",
		maxImagesCount : 20
	},
	youtube : {
		channelId : "UCtxTrESrkTrTymukyeRcMyw",
		apiKey : "AIzaSyCNdiyWynSBz8jXvH7q8VN-wdikpaXhrko",
		maxResults : 10
	},
	rssFeed : {
		url : "http://clintcronin.libsyn.com/rss"
	}
};
