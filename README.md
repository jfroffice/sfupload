# Simple File Upload JS API

Simple File Upload jQuery Plugin

## Getting Started
[min]: https://raw.github.com/jfroffice/sfupload/master/dist/sfupload.min.js
[max]: https://raw.github.com/jfroffice/sfupload/master/dist/sfupload.js

In your web page:

```html
<script src="jquery.js"></script>
<script src="dist/sfupload.min.js"></script>
<script>
$(function() {

    $('#files').sfupload({
        url: 'upload',
        dragndrop: true,
        onstart: function() {
            console.log('onstart');
        },
        onsuccess: function(file) {
            console.log('onsuccess');
        },
        onprogress: function(data) {
            console.log('onprogress');
            console.log(data);
        }
    });

})
</script>
```

## Documentation
[Demo](http://sfupload.jfroffice.me)

## Release History
0.1.0 : initial revision

