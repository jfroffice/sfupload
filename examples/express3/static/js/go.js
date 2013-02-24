$(function() {
    var $container = $('#container'),
        $speed = $('#speed'),
        $timeRest = $('#timeRest'),
        $fileinfo = $('#fileinfo'),
        $filesize = $('#filesize'),
        $progress = $('#progress'),
        $bar = $progress.find('.bar'),
        OFFSET = 4,
        factor = ($progress.width() - OFFSET) / 100;

    $('.btn').click(function() {
         $('#files').click();
    });

    $('#files').sfupload({
        url: 'upload',
        onstart: function() {
            $bar.css('width', '0');
            $container.fadeIn();
        },
        onsuccess: function(file) {
            $container.fadeOut();
            $bar.css('width', $progress.width() - OFFSET)
            $speed.html('');
            $timeRest.html('');
        },
        onprogress: function(data) {

            $fileinfo.html(data.file.name);
            $filesize.html(Math.round(data.file.size / 1024) + ' KB');

            $speed.html(data.speed);
            $timeRest.html(data.timeRest);

            $bar.animate({ width:  data.progress * factor }, 200);
        }
    });
});
