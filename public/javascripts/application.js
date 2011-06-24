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

$(document).ready(function() {
  $.jPlayer.timeFormat.padMin = false;

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
    validateFeedbackForm();
    console.log(feedback);
    $.ajax({
      type: "POST",
      url: "/songs/feedback",
      data: "vocals="+vocals+"&songwriting="+songwriting+"&musicianship="+musicianship+"&creativity="+creativity+"&production="+production+"&overall="+overall+"&comments="+comments+"&songId="+songId,
      success: function(msg){
        console.log("success");
      }
    });
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
  if (vocals == null){
    alert("you have to rate in every category fool!");
  }

}
