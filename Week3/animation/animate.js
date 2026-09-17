$(document).ready(function () {
    const $box = $('#box');
    const $container = $('#container');

    if (!$box.length || !$container.length) {
        console.error('Missing #box or #container element.');
        return;
    }

    $box.css({
        position: 'absolute',
        top: 0,
        left: 0
    });

    const rightPosition = $container.width() - $box.outerWidth();
    const bottomPosition = $container.height() - $box.outerHeight();

    $('button').on('click', function () {
        $box.stop(true, false)
            .css({ backgroundColor: 'yellow' })
            .animate({ top: bottomPosition, left: 0 }, 1000)
            .queue(function (next) {
                $(this).css('background-color', 'blue');
                next();
            })
            .animate({ top: bottomPosition, left: rightPosition }, 1000)
            .queue(function (next) {
                $(this).css('background-color', 'red');
                next();
            })
            .animate({ top: 0, left: rightPosition }, 1000)
            .queue(function (next) {
                $(this).css('background-color', 'green');
                next();
            })
            .animate({ top: 0, left: 0 }, 1000)
            .queue(function (next) {
                $(this).css('background-color', 'yellow');
                next();
            });
    });
});