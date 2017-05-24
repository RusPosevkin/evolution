$(document).ready((function() {
    function scrollHorizontally(e) {
        e = window.event || e;
        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
        document.documentElement.scrollLeft -= (delta*10);
        document.body.scrollLeft -= (delta*10);
        e.preventDefault();
    }
    // TODO: check browser support
    window.addEventListener("wheel", scrollHorizontally, false);
}));
