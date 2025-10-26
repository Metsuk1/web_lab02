(function () {
    var $lazyImgs = $('img.lazy');
    var PRELOAD = 200; // px

    function isInView($el, preload) {
        if (!$el.length) return false;
        var elTop = $el.offset().top;
        var elBottom = elTop + $el.outerHeight();
        var vpTop = $(window).scrollTop();
        var vpBottom = vpTop + $(window).height();
        return (elTop <= (vpBottom + preload)) && (elBottom >= (vpTop - preload));
    }

    function loadImg($img) {
        if (!$img.length || $img.data('loaded')) return;

        var src = $img.attr('data-src');
        if (!src) {
            $img.data('loaded', true);
            return;
        }

        $img.attr('src', src)
            .one('load.lazy', function () {
                $img.addClass('lazy-loaded');
                $img.data('loaded', true);
            })
            .one('error.lazy', function () {
                $img.addClass('lazy-loaded');
                $img.data('loaded', true);
            });

        // remove attribute to avoid reprocessing
        $img.removeAttr('data-src');
    }

    function checkLazy() {
        // refresh selection in case DOM changed
        $lazyImgs = $('img.lazy');

        $lazyImgs.each(function () {
            var $this = $(this);
            if ($this.data('loaded')) return;
            if (isInView($this, PRELOAD)) loadImg($this);
        });

        // if all loaded -> unbind namespaced events
        var left = $lazyImgs.filter(function () { return !$(this).data('loaded'); }).length;
        if (left === 0) {
            $(window).off('.lazyload');
        }
    }

    // throttle wrapper
    var throttleTimer = null;
    function throttled() {
        if (throttleTimer) return;
        throttleTimer = setTimeout(function () {
            throttleTimer = null;
            checkLazy();
        }, 120);
    }

    // bind events
    $(window).on('scroll.lazyload resize.lazyload load.lazyload', throttled);

    // initial run
    checkLazy();
})();