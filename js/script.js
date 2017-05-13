$(document).ready(function() {
  var viewportHeight = $(window).height();

  $('.page').css({
    height: viewportHeight
  });

  $('.page').css({
    opacity: 0.0,
    visibility: 'visible'
  }).animate({
    opacity: 1.0
  });
});
