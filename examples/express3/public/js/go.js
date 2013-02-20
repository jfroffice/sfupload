$(function() {
    var $progress = $('#progress'),
        $speed = $('#speed'),
        $timeRest = $('#timeRest'),
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
            $progress.fadeIn();
        },
        onsuccess: function() {
            console.log('onsuccess');
            $progress.fadeOut();
            $speed.html('');
            $timeRest.html('');
        },
        onprogress: function(data) {

            $speed.html(data.speed);
            $timeRest.html(data.timeRest);
            console.log(data);

            $bar.animate({ width:  data.progress * factor }, 200);
        }
    });
});
