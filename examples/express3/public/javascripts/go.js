$(function() {

    $('#files').sfupload({
        url: 'upload',
        allowdrop: true,
        onstart: function() {
            console.log('onstart');
        },
        onsuccess: function() {
            console.log('onsucess');
        },
        onprogress: function(data) {
            console.log('onprogress');
            console.log(data);
        }
    });

});
