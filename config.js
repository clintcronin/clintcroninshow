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
		clintandkashUserId : "19879795",
		accessToken : "3253713869.1677ed0.aacfb82ed1d145f3a3286ce7a5804931",
		maxImagesCount : 20
	},
	youtube : {
		channelId : "UC9QmyXvXURA64MWn3UR32XQ",
		apiKey : "AIzaSyD3jq-m-yGEp9vLtVb90ed23Nc3Z6Qbm7c",
		maxResults : 10
	},
	rssFeed : {
		url : "http://clintcronin.libsyn.com/rss"
	}
};
