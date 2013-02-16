$(function() {

    var $progress = $('#progressbar'),
        $bar = $progress.find('.bar'),
        factor = ($progress.width() - 4) / 100;

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
        },
        onprogress: function(data) {
            console.log(data);
            $bar.animate({ width:  data.progress * factor }, 200);
        }
    });

});
