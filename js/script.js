$(document).ready(function() {
  var $window = $(window);
  var $page = $('.page');
  var $miniMap = $('.minimap_main');
  var $miniMapIntro = $('.minimap_intro');
  var $minimapWindow = $('.minimap__window');
  var offsetX = window.pageXOffset;
  var viewportHeight;
  var viewportWidth;
  var scrollPosition;

  var dragScroll = function(event, ui) {
    var miniMapScale = event.target.offsetLeft / $miniMap.width();
    var pageScale = MAX_X_OFFSET - MINIMAP_MARGIN;

    scrollPosition = MINIMAP_MARGIN + miniMapScale * pageScale;

    // prevent dragging disabling
    if (scrollPosition === MINIMAP_MARGIN) {
      scrollPosition = MINIMAP_MARGIN + 1;
    }

    window.scrollTo(scrollPosition, window.pageYOffset);
  }

  //transform vertical scrolling to horizontal one
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
  var MAX_X_OFFSET = $page.width();
  var MINIMAP_MARGIN = $miniMapIntro.width();

  function toggleMinimapFixed() {
    if (offsetX <= MINIMAP_MARGIN) {
      if (isMinimapFixed)  {
        $miniMapIntro.css('display', 'flex');
        isMinimapFixed = false;

        $minimapWindow.draggable({ disabled: true });
        $minimapWindow.removeClass('minimap__window_draggable');
      }
    } else {
      if (!isMinimapFixed) {
        $miniMap.css('left', 0);
        $miniMapIntro.css('display', 'none');
        isMinimapFixed = true;

        $minimapWindow.draggable({
          disabled: false,
          axis: 'x',
          containment: 'parent',
          drag: dragScroll,
          scroll: false
        });
        $minimapWindow.addClass('minimap__window_draggable');
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
      var mainOffset = MINIMAP_MARGIN;
      var introOffset = 0;

      mainOffset = mainOffset - offsetX;
      introOffset = introOffset - offsetX;

      $miniMap.css('left', mainOffset + 'px');
      $miniMapIntro.css('left', introOffset +'px');
    } else {
      var value = isMinimapFixed ? 0 : '838px';

      $miniMap.css('left', value);
      $miniMapIntro.css('left', 0);
    }
    baseOffsetX = offsetX;

    toggleMinimapFixed();
    controlMinimapWindow(offsetX);
  });

});
