$(document).ready(function() {
  var $window = $(window);
  var $page = $('.page');
  var $miniMap = $('.minimap_main');
  var $minimapWindow = $('.minimap__window');
  var offsetX = window.pageXOffset;
  var viewportHeight;
  var viewportWidth;

  // transform vertical scrolling to horizontal one
  // scrollConverter.activate();

  // Calculate and set viewport dimensions
  function setViewportHeight() {
    viewportHeight = $window.height();
    viewportWidth = $window.width();

  if (viewportHeight <= 690) {
      $page.css({
        height: 690
      });
   } else {
       $page.css({
         height: viewportHeight
       });
   }
  };

  setViewportHeight();

  // Render is animated via CSS transition
  // to hide viewport height change
  $page.css({
    opacity: 1.0,
  });

  // Recalculate and set viewport height
  // after each window resize
  $window.resize(setViewportHeight);

  // Toggle miniMap fixed (sticky)
  // after intro offset
  var isMinimapFixed = false;
  var MAX_X_OFFSET = parseInt($page.css('width'));
  var MINIMAP_MARGIN = parseInt($('.minimap_intro').css('width'));

  function toggleMinimapFixed() {
    if (offsetX <= MINIMAP_MARGIN) {
      if (isMinimapFixed)  {
        // $miniMap.removeClass('minimap_fixed');
        $('.minimap_intro').css('display', 'flex');
        isMinimapFixed = false;
      }
    } else {
      if (!isMinimapFixed) {
        // $miniMap.addClass('minimap_fixed');
        $miniMap.css('left', 0);
        $('.minimap_intro').css('display', 'none');
        isMinimapFixed = true;
      }
    }
  };

  // Set window size and position
  function controlMinimapWindow(offset) {
    var position = (offset - MINIMAP_MARGIN) / (MAX_X_OFFSET - MINIMAP_MARGIN) * 100;
    var width = viewportWidth / (MAX_X_OFFSET - MINIMAP_MARGIN) * 100;

    if (offset <= MINIMAP_MARGIN) {
      position = 0;
    };
    $minimapWindow.css('left', position + '%');
    $minimapWindow.css('width', width + '%');
  };

  // Calculate initial size and position
  // it needs if we scroll and reload the page

  toggleMinimapFixed();
  controlMinimapWindow(offsetX);

  var baseOffsetX = window.pageXOffset;

  // Recalculate during scrolling
  $window.scroll(function() {
    offsetX = window.pageXOffset;

    if ((offsetX !== baseOffsetX) && (offsetX <= MINIMAP_MARGIN)) {
      // $('.minimap_intro').css('position', 'absolute');
      // var mainOffset = parseInt($('.minimap_main').css('left'));
      var mainOffset = MINIMAP_MARGIN;
      // var introOffset = parseInt($('.minimap_intro').css('left'));
      var introOffset = 0;
      mainOffset = mainOffset - offsetX;
      introOffset = introOffset - offsetX;
      $('.minimap_main').css('left', mainOffset + 'px');
      $('.minimap_intro').css('left', introOffset +'px');
    } else {
      // $('.minimap_intro').css('position', 'fixed');
      var value = isMinimapFixed ? 0: '838px';
      $('.minimap_main').css('left', value);
      $('.minimap_intro').css('left', 0);
    }
    baseOffsetX = offsetX;
    toggleMinimapFixed();
    controlMinimapWindow(offsetX);
  });
});
