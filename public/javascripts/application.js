// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults


//HOVER DELEGATES

$(document).ready(function() {
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
    $("#jquery_jplayer_1").jPlayer("setMedia", {
      mp3: $(this).attr("loc")
    });
    $("#jquery_jplayer_1").jPlayer("play");

  });


  $("#jquery_jplayer_1").jPlayer({
    ready: function() {
      $.jPlayer.timeFormat.padMin = false;
    },
    swfPath: "/javascripts",
    supplied: "mp3",
    cssSelector: {
      play: "#play-button",
      pause: "#pause-button"
    }
  });



});
