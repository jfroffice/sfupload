# Simple File Upload JS API

Simple File Upload jQuery Plugin

## Getting Started
Download the [production version][min] or the [development version][max].

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

})
</script>
```

## Documentation
_(Coming soon)_

## Examples
_(Coming soon)_

## Release History
_(Nothing yet)_
