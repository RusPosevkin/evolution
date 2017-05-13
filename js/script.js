$(document).ready(function() {
  // calculate and set height of viewport
  var $window = $(window);
  var $page = $('.page');

  var setViewportHeight = function () {
    var viewportHeight = $window.height();

    $page.css({
      height: viewportHeight
    });
  };

  setViewportHeight();

  // fading animation during initial render
  // to hiding change of viewport's height
  $page.css({
    opacity: 0.0,
    visibility: 'visible'
  }).animate({
    opacity: 1.0
  });

  // recalculate and set height of viewport
  // after each window resize
  $window.resize(setViewportHeight);

  // toggle miniMap fixed (sticky)
  // after 800px (16 columns) horizontal offset scrolling
  var $miniMap = $('.minimap_main');
  var isMinimapFixed = false;

  var toggleMinimapFixed = function () {
    if (window.pageXOffset <= 800) {
      if (isMinimapFixed)  {
        $miniMap.removeClass('minimap_fixed');
        isMinimapFixed = false;
      }
    } else {
      if (!isMinimapFixed) {
        $miniMap.addClass('minimap_fixed');
        isMinimapFixed = true;
      }
    }
  };

  // initial calculation
  // it needs if we scroll and reload the page
  toggleMinimapFixed();

  // recalculate during scrolling
  $window.scroll(toggleMinimapFixed);
});
