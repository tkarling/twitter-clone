// console.log("Hello fake twitter");
$(document).ready(function(){

	var composeHeight = $(".tweet-compose").height();
	var maxCharCount = Number($("#char-count").text());
	var charCountColor = $("#char-count").css("color");
	// console.log('maxCharCount', maxCharCount);
	// console.log('charCountColor', charCountColor);

	$("button, #tweet-controls").hide();


	$(".tweet-compose").on("focus", function() {
		console.log("focus");
		$("button, #tweet-controls").show();
		$(".tweet-compose").height(2 * composeHeight);
	});

	$(".tweet-compose").on("focusout", function() {
		console.log("focusout");
		if($(this).val().length === 0) {
			$("button, #tweet-controls").hide();
			$(".tweet-compose").height(composeHeight);
		}
	});

	$(".tweet-compose").on("keyup", function() {
		var charCount = maxCharCount - $(this).val().length;
		console.log('charCount', charCount);
		$("#char-count").text(charCount);
		if(charCount < 11) {
			$("#char-count").css("color", "red");
		} else {
			$("#char-count").css("color", charCountColor);
		}
		if(charCount < 0) {
			$("button").prop('disabled', true);
		} else {
			$("button").prop('disabled', false);
		}

	});

	function setUpActionHiding() {		
		$(".tweet-actions").hide();

		$(".tweet").off("mouseenter");		
		$(".tweet").on("mouseenter", function() {
			// console.log("hovering");
			$(this).find(".tweet-actions").show();
		});

		$(".tweet").off("mouseleave");		
		$(".tweet").on("mouseleave", function() {
			// console.log("hiding");
			$(this).find(".tweet-actions").hide();
		});

	};
	setUpActionHiding();

	function setUpStatsHiding() {
		$(".stats, .reply").hide();

		$(".tweet").off("click")
		$(".tweet").on("click", function() {
			// console.log("clicking");
			$(this).find(".stats, .reply").slideToggle(400);
		});
	}
	setUpStatsHiding();

	var myUser = { 
		name: $("#profile-summary > .content > p").text(), 
		username: "@tkarling",
		img: $("#profile-summary > .content > img").attr("src")
	}

	var tweetString = function(user, tweet) {
		return '<div class="tweet"> \
					<div class="content"> \
						<img class="avatar" src="' + user.img + '" /> \
						<strong class="fullname">' + user.name + '</strong> \
						<span class="username">' + user.username + '</span> \
					<p class="tweet-text">' + tweet + '</p> \
					<div class="tweet-actions"> \
						<ul> \
							<li><span class="icon action-reply"></span> Reply</li> \
							<li><span class="icon action-retweet"></span> Retweet</li> \
							<li><span class="icon action-favorite"></span> Favorite</li> \
							<li><span class="icon action-more"></span> More</li> \
						</ul> \
					</div> \
					<div class="stats"> \
						<div class="retweets"> \
							<p class="num-retweets">0</p> \
							<p>RETWEETS</p> \
						</div> \
						<div class="favorites"> \
							<p class="num-favorites">0</p> \
							<p>FAVORITES</p> \
						</div> \
						<div class="users-interact"> \
							<div> \
							</div> \
						</div> \
						<div class="time"> \
							1:04 PM - 19 Sep 13 \
						</div> \
					</div> \
					<div class="reply"> \
						<img class="avatar" src="img/alagoon.jpg" /> \
						<textarea class="tweet-compose" placeholder="Reply to ' + user.username + '"/></textarea> \
					</div> \
				</div>';
	};

	$("button").on("click", function() {
		var tweet = $(".tweet-compose").val();
		// console.log("tweet", tweet);
		$("#stream").prepend(tweetString(myUser, tweet));
		setUpActionHiding();
		setUpStatsHiding();
	});



})