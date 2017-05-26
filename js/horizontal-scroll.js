$(document).ready((function() {
    function scrollHorizontally(e) {
        e = window.event || e;
        var delta = Math.max(-1, Math.min(1, (e.deltaY || -e.detail)));
        document.documentElement.scrollLeft += (delta*30);
        document.body.scrollLeft += (delta*30);
        e.preventDefault();
    }
    // TODO: check browser support
    window.addEventListener("wheel", scrollHorizontally, false);
}));
