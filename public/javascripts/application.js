//HOVER DELEGATES
var creativity = null;
var vocals = null;
var songwriting = null;
var musicianship = null;
var production = null;
var overall = null;
var comments = null;
var songId = null;
var songTitle = null;
var current_song = null;
var stat_change = null;

$(document).ready(function() {
  checkFirstTimer();
  updateStats();

  if (document.location.pathname.indexOf("authentication") != -1){
    $(".footer-menu-item").hide();
    $('#player').delegate("#player-header", "click", function() {
      window.location = "/";
    });
    $("#player-header").css("cursor", "pointer");
  }

  $.jPlayer.timeFormat.padMin = false;

	$.ajaxSetup({
    timeout: 20000
  });
  
  // Disable address plugin doing its own Google Analytics tracking
  $.address.tracker(null);

	ajaxPage($.address.value());

	// all links with the 'ajax' class will trigger an ajax load based on their href
  $(document).delegate('a.ajax', 'click', function(event) {
    if (event.button == 0 && !(event.metaKey == true) && !(event.ctrlKey == true)) {
      event.preventDefault();
      href = $(this).attr('href');
      href = href.replace(document.location.protocol + "//" + document.location.host, ""); // IE7 puts the domain name in href
      if (href == $.address.value()) {
      } else {
        $.address.value(href);
				ajaxPage($.address.value());
      }
    }
  });

  $.address.externalChange(function(event) {
    ajaxPage($.address.value());
  });

	$('#login').delegate("#forgot-password", "click", function() {
    $.ajax({
	    type: "GET",
	    url: "/authentication/forgot_password",
	    success: function(data, status, jqXHR){
	      $("#darkener-click").css("opacity", .5).fadeIn();
	      $("#darkener").css("opacity", .5).hide();
	      $("#get-password-popup").show();
	      $("#get-password-popup-show").html(data);
	    },
	    error: function(data){
	      showError("An error occurred");
	    }
	  });
  });

  $("#menu").delegate("#menu-songs", "mouseenter", function() {
    $("#menu-songs-list").show();
    $("#menu-songs").addClass("menu-background");
  });

  $("#menu").delegate("#menu-songs", "mouseleave", function() {
    $("#menu-songs-list").hide();
    $("#menu-songs").removeClass("menu-background");
  });

  $("#menu").delegate("#menu-songs-list ul li a", "click", function() {
    $("#menu-songs-list").hide();
    $("#menu-songs").removeClass("menu-background");
  });

  $("#menu").delegate("#menu-myfeedback", "mouseenter", function() {
    $("#menu-myfeedback-list").show();
    $("#menu-myfeedback").addClass("menu-background");
  });

  $("#menu").delegate("#menu-myfeedback", "mouseleave", function() {
    $("#menu-myfeedback-list").hide();
    $("#menu-myfeedback").removeClass("menu-background");
  });

  $("#menu").delegate("#menu-myfeedback-list ul li a", "click", function() {
    $("#menu-myfeedback-list").hide();
    $("#menu-myfeedback").removeClass("menu-background");
  });

  $("#menu").delegate(".myfeedback-logged-out", "click", function() {
    showLoginPrompt("You are not logged in. Please login or register in order to upload songs.");
  });

  $("#menu").delegate("#menu-myaccount", "mouseenter", function() {
    $("#menu-myaccount-list").show();
    $("#menu-myaccount").addClass("menu-background");
  });

  $("#menu").delegate("#menu-myaccount", "mouseleave", function() {
    $("#menu-myaccount-list").hide();
    $("#menu-myaccount").removeClass("menu-background");
  });

  $("#menu").delegate("#menu-myaccount-list ul li a", "click", function() {
    $("#menu-myaccount-list").hide();
    $("#menu-myaccount").removeClass("menu-background");
  });

  $("#menu").delegate(".myaccount-logged-out", "click", function() {
    window.location = '/authentication/login';
  });

  $("#main-section-frame").delegate(".song-list-item", "mouseenter", function() {
    $(this).children(".song-list-play-button-container").children(".song-list-play-button").show();
    $(this).children(".song-list-play-button-container").children(".song-list-index").hide();
  });

  $("#main-section-frame").delegate(".song-list-item", "mouseleave", function() {
    $(this).children(".song-list-play-button-container").children(".song-list-play-button").hide();
    $(this).children(".song-list-play-button-container").children(".song-list-index").show();
  });

  $("#main-section-frame").delegate(".all-songs-container .pick-song .pick-song-item", "click", function() {
    var statShow = $(this).attr("id");
    $(".all-songs-container .my-songs-container").hide();
    $(".all-songs-container ."+statShow).show();
    $(".all-songs-container .pick-song .pick-song-item").removeClass("current");
    $(this).addClass("current");
  });

  $(".all-songs-container .my-songs-container").first().show();
  $(".all-songs-container .pick-song .pick-song-item").first().addClass("current");

  $("#main-section-frame").delegate(".song-list-play-button", "click", function() {
    $("#player #player-title p").html($(this).parent().parent().attr("songTitle"));
    $("#player #player-artist p").html($(this).parent().parent().attr("artist"));
    $("#player #player-description p").html($(this).parent().parent().attr("desc"));
    $("#player-metadata").show();
    $(".jp-audio").show();
    songId = $(this).parent().parent().attr("id");
    songTitle = $(this).parent().parent().attr("songtitle");
    $("#jquery_jplayer_1").jPlayer("setMedia", {
      mp3: $(this).parent().parent().attr("loc")
    });
    $("#jquery_jplayer_1").jPlayer("play");
    resetFeedbackForm();
  });

  $("#player").delegate("#player-volume", "mouseenter", function(){
    $("#player-volume-container").fadeIn();
  });

  $("#player-volume-container").mouseenter(function() {
    clearTimeout($("#player-volume-container").data("idleTimeout"));
  });

  $("#player-volume-container").mouseleave(function() {
    $("#player-volume-container").data("idleTimeout", setTimeout(function() {
      $("#player-volume-container").fadeOut();
    }, 1200));
  });

  $("body").delegate("#player #player-volume-container", "mouseenter", function() {
    $("#player-slider-knob").draggable({
      axis: "y",
      containment: 'parent',
      drag: function(event, ui) {
        var slider_position_px = $("#player-slider-knob").css("top");
        var slider_position = slider_position_px.substring(0,slider_position_px.indexOf("px"));
        var slider_height = 91;
        var slider_ratio = (slider_height-slider_position)/slider_height;
        $("#jquery_jplayer_1").jPlayer("volume", slider_ratio);
      }
    });
  });

  $("#jquery_jplayer_1").jPlayer({
    ready: function() {
      $.jPlayer.timeFormat.padMin = false;
    },
    ended: function() {
      $(this).jPlayer("playHead", 100)
    },
    swfPath: "/javascripts",
    supplied: "mp3",
    cssSelector: {
      play: "#play-button",
      pause: "#pause-button"
    },
    solution:"flash, html"
  });

  $(".star-frame").delegate(".star", "mouseenter", function() {
    $(this).addClass("hover_starred").removeClass("hover_unstar");
    $(this).prevAll().addClass("hover_starred").removeClass("hover_unstar");
    $(this).nextAll().removeClass("hover_starred").addClass("hover_unstar");
  }).mouseleave(function() {
     $(this).children().removeClass("hover_starred").removeClass("hover_unstar");
  }).delegate(".star", "click", function() {
    $(this).addClass("starred");
    $(this).prevAll().addClass("starred");
    $(this).nextAll().removeClass("starred");
  });

  $("#feedback-form #vocals .star-frame .star").click(function() {
    vocals = $(this).index()+1;
  });

  $("#feedback-form #songwriting .star-frame .star").click(function() {
    songwriting = $(this).index()+1;
  });

  $("#feedback-form #musicianship .star-frame .star").click(function() {
    musicianship = $(this).index()+1;
  });

  $("#feedback-form #creativity .star-frame .star").click(function() {
    creativity = $(this).index()+1;
  });

  $("#feedback-form #production .star-frame .star").click(function() {
    production = $(this).index()+1;
  });

  $("#feedback-form #overall .star-frame .star").click(function() {
    overall = $(this).index()+1;
  });

  $("#feedback-form #comment-box").blur(function() {
    comments = $(this).attr("value");
  });

  $("#feedback-form #feedback-submit").click(function() {
    var feedback = [vocals,songwriting,musicianship,creativity,production,overall,comments];
    if (validateFeedbackForm()){
      $.ajax({
        type: "POST",
        url: "/songs/feedback",
        data: "vocals="+vocals+"&songwriting="+songwriting+"&musicianship="+musicianship+"&creativity="+creativity+"&production="+production+"&overall="+overall+"&comments="+comments+"&songId="+songId,
        success: function(data, status, jqXHR){
          if (data.indexOf("dupe") != -1){
            $("#darkener").css("opacity", .5).fadeIn();
            $("#duplicate-review").show();
          }
          if (data.indexOf("first") != -1) {
            $("#darkener-click").css("opacity", .5).fadeIn();
            $("#review-submitted").show();
            updateStats();
          }
          if (data.indexOf("logged_out") != -1) {
            showLoginPrompt("You are not logged in. Please login or register to review this song.");
          }
        },
        error: function(data){
          showError("There was an error submitting your feedback. Please try again.");
        }
      });
    }
  });

  $("#duplicate-review").delegate("#no", "click", function() {
    $("#darkener").css("opacity", .5).fadeOut();
    $("#duplicate-review").hide();
  });

  $("#duplicate-review").delegate("#yes", "click", function() {
    $.ajax({
      type: "POST",
      url: "/songs/override",
      data: "vocals="+vocals+"&songwriting="+songwriting+"&musicianship="+musicianship+"&creativity="+creativity+"&production="+production+"&overall="+overall+"&comments="+comments+"&songId="+songId,
      success: function(data, status, jqXHR){
        $("#duplicate-review").hide();
        $("#darkener").css("opacity", .5).hide();
        $("#darkener-click").css("opacity", .5).show();
        $("#review-submitted").show();
        $("#song-just-reviewed").html(songTitle);
        updateStats();
      },
      error: function(data){
        showError("There was an error submitting your feedback. Please try again.");
      }
    });
  });


  $("#comment-field-container").delegate("#submit", "click", function() {
    if (checkLogin() != null){
      comments = $("#comment-field").val();
      $.ajax({
        type: "POST",
        url: "/songs/leave_comment",
        data: "comments="+comments+"&songId="+current_song,
        success: function(data, status, jqXHR){
          getCurrentSongStats(current_song);
          $("#comment-field-container").hide();
          $("#current-song-stats #yes").show();
          stat_change = true;
        },
        error: function(data){
          showError("There was an error submitting your comment. Please try again.");
        }
      });
    }
    else{
      showLoginPrompt("You are not logged in. Please login or register to submit a comment.");
    }
  });

  $("#review-submitted").delegate("#no", "click", function() {
    $("#darkener-click").css("opacity", .5).fadeOut();
    $("#review-submitted").hide();
  });

  $("#review-submitted").delegate("#yes", "click", function() {
    $("#review-submitted").hide();
    getCurrentSongStats();
  });

  $("#main-section-frame").delegate(".song-list-data", "click", function() {
    getCurrentSongStats($(this).parent().attr("id"));
  });

  $("#current-song-stats").delegate("#no", "click", function() {
    $("#darkener-click").css("opacity", .5).fadeOut();
    $("#current-song-stats").hide();
    if (stat_change != null){
      updateStats();
      stat_change = null;
    }
  });

  $("#current-song-stats").delegate("#yes", "click", function() {
    $("#comment-field-container").show();
    $(this).hide();
  });

	$("#get-password-popup").delegate("#no", "click", function() {
    $("#darkener-click").css("opacity", .5).fadeOut();
    $("#get-password-popup").hide();
  });

  $("#get-password-popup").delegate("#yes", "click", function() {
    var email_address = $("#get-password-popup #email").val();
		$.ajax({
	    type: "GET",
	    url: "/authentication/send_reminder",
			data: "email="+email_address,
	    success: function(data, status, jqXHR){
	      showError("Your password was sent to your email address.");
	    },
	    error: function(data){
        showError("An error occurred, try again.");
	    }
	  });
    $("#get-password-popup").hide();
  });

  $("#main-section-frame").delegate("#email-submit", "click", function() {
    var email_address = $("#contact-form #email").val();
    var message = $("#contact-form #comment-box").val();
    if (message == ""){
      showError("You must enter a message.");
    }
    else if (!isEmailAddress(email_address)){
      showError("You must use a valid email address");
    }
    else{
      $.ajax({
        type: "GET",
        url: "/welcome/send_contact_message",
        data: "email="+email_address+"&message="+message,
        success: function(data, status, jqXHR){
          showError("Thank you for contacting us! We'll get back to you as soon as we can.");
        },
        error: function(data){
          showError("An error occurred, please try again.");
        }
      });
    }
  });

  $("body").delegate("#darkener-click", "click", function() {
    $("#darkener-click").css("opacity", .5).fadeOut();
    $("#current-song-stats").hide();
    $("#review-submitted").hide();
    $("#error-message").hide();
    $("#login-message").hide();
    if (stat_change != null){
      updateStats();
      stat_change = null;
    }
  });

  $("#error-message").delegate("#no", "click", function() {
    $("#darkener-click").css("opacity", .5).fadeOut();
    $("#error-message").hide();
  });

  $("#login-message").delegate("#no", "click", function() {
    window.location = '/authentication/login';
  });
  $("#login-message").delegate("#yes", "click", function() {
    window.location = '/authentication/register';
  });

  $("#player").delegate("#player-stats-button", "click", function() {
    getCurrentSongStats();
  });

  $("#onboarding-container").delegate("#no", "click", function() {
    $("#darkener-click").css("opacity", .5).fadeOut();
    $("#onboarding-container").hide();
  });
  $("#onboarding-container").delegate("#yes", "click", function() {
    $("#darkener-click").css("opacity", .5).fadeOut();
    $("#onboarding-container").hide();
  });

  $("#main-section-frame").delegate(".upload-song-button", "click", function() {
    if ($("#song_title").val() != "song title" && $("#song_title").val().match(/\S/)){
      if ($("#song_artist").val() != "artist" && $("#song_artist").val().match(/\S/)){
        if ($("#song_audio").val().match(/.mp3$/))
          return true;
        else
          showError("Your file must be in mp3 format.")
      }
      else
        showError("You need to enter an artist name.");
    }
    else
      showError("You need to enter a song title.");
    return false;
  });

  $("#main-section-frame").delegate("#welcome-message #hide-me", "click", function(){
    $("#welcome-message").hide();
  });
});

function resetFeedbackForm(){
  $(".star-frame .star").removeClass("starred");
  $("#comment-box").attr("value", "");
  creativity = null;
  vocals = null;
  songwriting = null;
  musicianship = null;
  production = null;
  overall = null;
  comments = null;
}

function validateFeedbackForm(){
  if (songId == null){
    showError("You have not selected a song to review.");
    return false;
  }
  else if (vocals == null || creativity == null || songwriting == null || musicianship == null || production == null || overall == null){
    showError("You must give a 1 to 5 star rating in each category before submitting.");
    return false;
  }
  else
    return true
}

function validateRegisterForm(){
  if (isEmailAddress($("#email").val())){
    if (noSpacesOrSpecialChars($("#username").val(), "username")){
			if (passwordsMatch($("#password").val(), $("#password-check").val())){
      	return true
			}
    }
  }
  return false
}

function noSpacesOrSpecialChars(a, field) {
  var re = /^[a-zA-Z\d]+$/;
  if(!re.test(a)) {
    showError("No special characters or spaces allowed in your "+field);
    return false
  }
  return true
}

function isEmailAddress(a) {
  var re = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  if (!a.match(re)) {
    showError("Enter a valid email address");
    return false
  } 
  return true
}

function noSpecialChars(a, field) {
  var re = /^[\w\s ]+$/;
  if(!re.test(a) && a != "") {
    showError("No special characters allowed in your "+field+".");
    return false
  }
  return true
}

function passwordsMatch(a, b) {
	if (a != b){
		showError("Your passwords do not match");
		return false
	}
	return true
}

function numbersOnly(a, field) {
  if(isNaN(a)) {
    showError("Your "+field+" must only contain numbers.");
    return false
  }
  return true
}

function stringLength(a, field, length) {
  if(a.length > length) {
    showError("Your "+field+" is too long ("+length+" character limit).");
    return false
  }
  return true
}

function showError(message){
  $("#darkener-click").css("opacity", .5).fadeIn();
  $("#error-message").show();
  $("#error-message-text").html(message);
}

function getCurrentSongStats(song){
  if (song)
    current_song = song;
  else
    current_song = songId;
  $.ajax({
    type: "GET",
    url: "/songs/current_stats",
    data: "songId="+current_song,
    success: function(data, status, jqXHR){
      $("#darkener-click").css("opacity", .5).fadeIn();
      $("#darkener").css("opacity", .5).hide();
      $("#current-song-stats").show();
      $("#current-song-stats-show").html(data);
    },
    error: function(data){
      $("#darkener-click").css("opacity", .5).fadeIn();
      $("#darkener").css("opacity", .5).hide();
      $("#current-song-stats").show();
      $("#current-song-stats-show").html("An error occurred retrieving this songs data");
    }
  });
}

function showLoginPrompt(message){
  $("#darkener-click").css("opacity", .5).fadeIn();
  $("#login-message").show();
  $("#login-message-text").html(message);
}

function checkLogin(){
  var login = $.cookie('authenticate');
  return login;
}

function checkFirstTimer(){
  var onboard = $.cookie('visit');
  if (onboard != null || checkLogin())
    hideOnboarding();
  else
    $.cookie('visit', 'true', { expires: 1000, path: '/' });
}

function hideOnboarding(){
  $("#welcome-message").hide();
}

function ajaxPage(newuri){
	if (newuri != "/"){
		$.ajax({
    	type: "GET",
    	url: newuri,
    	success: function(data, status, jqXHR){
      	$("#main-section-frame").html(data);
    	},
    	error: function(data,status,detes){
      	$("#darkener-click").css("opacity", .5).fadeIn();
      	$("#darkener").css("opacity", .5).hide();
      	$("#current-song-stats").show();
      	$("#current-song-stats-show").html(detes);
    	}
  	});
	}
}

function hidePlayer(){
  $("#feedback-frame").hide();
  $(".player-divider").hide();
  $("#player-header").css("margin-bottom", "0");
}

function updateStats(){
  $("#user-stat-container").load("/welcome/user_stats", function(){});
}
