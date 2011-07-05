// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults


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

$(document).ready(function() {
  $.jPlayer.timeFormat.padMin = false;

  $('#player').delegate("#player-header", "click", function() {
    window.location = "/";
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

  $("#main-section-frame").delegate(".song-list-item", "click", function() {
    $("#player #player-title p").html($(this).attr("songTitle"));
    $("#player #player-artist p").html($(this).attr("artist"));
    $("#player #player-description p").html($(this).attr("desc"));
    songId = $(this).attr("id");
    songTitle = $(this).attr("songtitle");
    $("#jquery_jplayer_1").jPlayer("setMedia", {
      mp3: $(this).attr("loc")
    });
    $("#jquery_jplayer_1").jPlayer("play");
    resetFeedbackForm();
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
      console.log(feedback);
      $.ajax({
        type: "POST",
        url: "/songs/feedback",
        data: "vocals="+vocals+"&songwriting="+songwriting+"&musicianship="+musicianship+"&creativity="+creativity+"&production="+production+"&overall="+overall+"&comments="+comments+"&songId="+songId,
        success: function(data, status, jqXHR){
          if (data.indexOf("dupe") != -1){
            $("#darkener").css("opacity", .5).show();
            $("#duplicate-review").show();
          }
          else {
            $("#darkener-click").css("opacity", .5).show();
            $("#review-submitted").show();
          }
        },
        error: function(data){
          showError("There was an error submitting your feedback. Please try again.");
        }
      });
    }
  });

  $("#duplicate-review").delegate("#no", "click", function() {
    $("#darkener").css("opacity", .5).hide();
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
      },
      error: function(data){
        showError("There was an error submitting your feedback. Please try again.");
      }
    });
  });

  $("#review-submitted").delegate("#no", "click", function() {
    $("#darkener-click").css("opacity", .5).hide();
    $("#review-submitted").hide();
  });

  $("#review-submitted").delegate("#yes", "click", function() {
    $("#review-submitted").hide();
    $.ajax({
      type: "GET",
      url: "/songs/current_stats",
      data: "songId="+songId,
      success: function(data, status, jqXHR){
        $("#darkener-click").css("opacity", .5).show();
        $("#darkener").css("opacity", .5).hide();
        $("#current-song-stats").show();
        $("#current-song-stats-show").html(data);
      },
      error: function(data){
        $("#darkener-click").css("opacity", .5).show();
        $("#darkener").css("opacity", .5).hide();
        $("#current-song-stats").show();
        $("#current-song-stats-show").html("An error occurred retrieving this songs data");
      }
    });

  });

  $("#current-song-stats").delegate("#no", "click", function() {
    $("#darkener-click").css("opacity", .5).hide();
    $("#current-song-stats").hide();
  });

  $("body").delegate("#darkener-click", "click", function() {
    $("#darkener-click").css("opacity", .5).hide();
    $("#current-song-stats").hide();
    $("#review-submitted").hide();
    $("#error-message").hide();
  });

  $("#error-message").delegate("#no", "click", function() {
    $("#darkener-click").css("opacity", .5).hide();
    $("#error-message").hide();
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
    showError("You can't submit feedback without selecting a song first");
    return false;
  }
  else if (vocals == null || creativity == null || songwriting == null || musicianship == null || production == null || overall == null){
    showError("You need to give a rating in every category");
    return false;
  }
  else
    return true
}

function showError(message){
  $("#darkener-click").css("opacity", .5).show();
  $("#error-message").show();
  $("#error-message-text").html(message);
}
