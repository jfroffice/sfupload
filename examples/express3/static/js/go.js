$(function() {
    var $container = $('#container'),
        $speed = $('#speed'),
        $timeRest = $('#timeRest'),
        $fileinfo = $('#fileinfo'),
        $filesize = $('#filesize'),
        $progress = $('#progress'),
        $bar = $progress.find('.bar'),
        factor = ($progress.width() - 4) / 100;

    $('.btn').click(function() {
         $('#files').click();
    });

    $('#files').sfupload({
        url: 'upload',
        allowdrop: true,
        onstart: function() {
            $bar.css('width', '0');
            $container.fadeIn();
        },
        onsuccess: function() {

            $bar.css('width', $progress.width() - 4)
            $container.fadeOut();
            $speed.html('');
            $timeRest.html('');
        },
        onprogress: function(data) {

            $fileinfo.html(data.file.name);
            $filesize.html(Math.round(data.file.size / 1024) + ' KB');

            $speed.html(data.speed);
            $timeRest.html(data.timeRest);
            console.log(data);

            $bar.animate({ width:  data.progress * factor }, 200);
        }
    });
});
