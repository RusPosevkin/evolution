$(document).ready(function() {
  // calculate and set height of viewport
  var $window = $(window);
  var $minimapWindow = $('.minimap__window');
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

  var MAX_X_OFFSET = 8083;
  var MINIMAP_MARGIN = 800;

  var toggleMinimapFixed = function (pageXOffset) {
    var offset = pageXOffset || window.pageXOffset;

    if (window.pageXOffset <= MINIMAP_MARGIN) {
      if (isMinimapFixed)  {
        $miniMap.removeClass('minimap_fixed');
        isMinimapFixed = false;
        $minimapWindow.css('left', MINIMAP_MARGIN + 'px');
      }
    } else {
      if (!isMinimapFixed) {
        $miniMap.addClass('minimap_fixed');
        isMinimapFixed = true;
      }
    }
  };

  var setMinimapWindowPosition = function (pageXOffset) {
    var offset = pageXOffset || window.pageXOffset;

    if (offset <= MINIMAP_MARGIN) {
      return;
    }

    var position = (offset - MINIMAP_MARGIN) / MAX_X_OFFSET * 100;
    $minimapWindow.css('left', position + '%');
  };

  // initial calculation
  // it needs if we scroll and reload the page
  toggleMinimapFixed();
  setMinimapWindowPosition();

  // recalculate during scrolling
  $window.scroll(function () {
    var pageXOffset = window.pageXOffset;

    toggleMinimapFixed(pageXOffset);
    setMinimapWindowPosition(pageXOffset);
  });
});
