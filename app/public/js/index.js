$(document).ready(function(){
	//Function to show and hide share buttons on podcast page
	$("div#share-buttons img#share-btn").click(function() {
		$("div#share-buttons img#share-btn").not(this).closest("div#share-buttons").find("img[id!='share-btn']").hide();
		$(this).closest("div#share-buttons").find("img[id!='share-btn']").toggle();
	});
	//Functions to auto play and pause videos on gallery page
	$("#gallery img.thumb").click(function() {
		var parentTarget = $(this).closest("a").attr("href");
		$(parentTarget + " > video").get(0).play();
	});
	$("#gallery a.btn-close").click(function() {
		pauseAllVideos();
	});
	$("#gallery a.btn-prev, #gallery a.btn-next").click(function() {
		pauseAllVideos();
		var target = $(this).attr("href");
		$(target + " > video").get(0).play();
	});
	var pauseAllVideos = function() {
		$("#gallery video").each(function() {
			$(this).get(0).pause();
		});
	};
	//Functions to load more images on gallery page
	$("#more-gallery a").click(function() {
		var nextMaxId = $(this).attr("data-nextMaxId");
		var lastCount = $(this).attr("data-lastCount");
		var req = "/gallery?maxId=" + nextMaxId + "&lastCount=" + lastCount;
		$.get(req , function(data) {
			//FIX ME : Check for errors before appending
			$("div#gallery").append(data.html);
			console.log(data.nextMaxId);
			if (data.nextMaxId == null) {
				$("#more-gallery").hide();
			} else {
				$("#more-gallery a").attr("data-nextMaxId", data.nextMaxId);
				$("#more-gallery a").attr("data-lastCount", data.lastCount);
			}
		});
	})
});