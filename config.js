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
		accessToken : "0c8ed86b7ec7490db1384be4c0ea9663",
		maxImagesCount : 20
	},
	youtube : {
		channelId : "UCtxTrESrkTrTymukyeRcMyw",
		apiKey : "AIzaSyD3jq-m-yGEp9vLtVb90ed23Nc3Z6Qbm7c",
		maxResults : 10
	},
	rssFeed : {
		url : "http://clintcronin.libsyn.com/rss"
	}
};
