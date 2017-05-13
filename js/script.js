$(document).ready(function() {
  var $window = $(window);
  var $page = $('.page');

  var setViewportHeight = function () {
    var viewportHeight = $window.height();

    $page.css({
      height: viewportHeight
    });
  };

  setViewportHeight();

  $page.css({
    opacity: 0.0,
    visibility: 'visible'
  }).animate({
    opacity: 1.0
  });

  $window.resize(setViewportHeight);
});
