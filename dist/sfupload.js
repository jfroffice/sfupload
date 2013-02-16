/*! Simple File Upload JS API - v0.1.0 - 2013-02-16
* https://github.com/jfroffice/sfupload
* Copyright (c) 2013 John Fischer; Licensed MIT */

;(function(global, $, undefined) {

    var _onstart,
        _onfinish,
        _onprogress,
        _onsuccess,
        _xhr;

    function getHumanSize(size) {
        var type = "o";

        if (size > 1024) {
            size = size >> 10;
            type = "Ko";
        }

        if (size > 1024) {
            size = size >> 10;
            type = "Mo";
        }

        return size.toFixed(1).toString().replace('.0', '') + " " + type;
    }

    function getUri(e) {
        var uri = e.target.baseURI;
        var index = uri.indexOf('#', 0);
        if (index !== -1) {
            uri = uri.slice(0, index);
        }

        return uri;
    }

    function updateProgress(e) {

        if (e.lengthComputable) {

            if (!e.target.file) {
                return;
            }

            var file = e.target.file,
                curTime = new Date(),
                speed = (e.loaded - e.target.loaded) / ((curTime - e.target.time) * 1.024), // speed in Ko / s (1000/1024)
                meanSpeed = Math.floor((speed + e.target.speed) / 2),
                bytesToLoad = (file.size - e.target.loaded) / 1024,
                timeRest = ((bytesToLoad / meanSpeed) + 0.7 * e.target.timeRest) / 1.7,
                timeRestDisplay,
                info = e.target.cur + '/' + e.target.max;

            if (e.target.max === 1) {
                info = '';
            }

            if (timeRest < 60) {
                timeRestDisplay = timeRest.toFixed(0) + ' s';
            } else {
                timeRestDisplay = (timeRest / 60).toFixed(0) + ' min';
            }

            if (meanSpeed < 1024) {
                meanSpeed += ' Ko/s';
            } else {
                meanSpeed = (meanSpeed / 1024).toFixed(1).toString().replace('.0', '') + ' Mo/s';
            }

            e.target.timeRest = timeRest;
            e.target.time = curTime;
            e.target.loaded = e.loaded;
            e.target.speed = speed;

            file.type = file.type.replace("/", "_");

            _onprogress({
                file: file,
                meanSpeed: meanSpeed,
                progress: Math.floor((e.loaded / e.total) * 1000) / 10,
                timeRest: timeRestDisplay,
                size: getHumanSize(file.size),
                info: info
            });
        }
    }

    function uploadFiles(root, files) {

        function ajaxDL(root, files, i) {

            if (i === files.length) {
                if (_onfinish) {
                    _onfinish();
                }
                return;
            }

            var file = files[i],
                formData = new global.FormData();

            formData.append("file", file);

            if (_xhr) {
                _xhr.abort();
            }

            _xhr = new global.XMLHttpRequest();
            _xhr.upload.file = file;
            _xhr.upload.time = new Date();
            _xhr.upload.loaded = _xhr.upload.speed = _xhr.upload.timeRest = 0;
            _xhr.upload.cur = i+1;
            _xhr.upload.max = files.length;

            if (_xhr.upload.addEventListener) {
                _xhr.upload.addEventListener("progress", updateProgress, false);
            } else if (_xhr.upload.attachEvent) {
                _xhr.upload.attachEvent("progress", updateProgress);
            }

            _xhr.open("POST", root);
            _xhr.send(formData);

            if (_onstart) {
                _onstart();
            }

            _xhr.onreadystatechange = function() {

                if (_xhr.readyState === 4 && _xhr.status === 200) {

                    if (_xhr.responseText !== '') {

                        var resp = JSON.parse(_xhr.responseText);

                        resp.name = file.name;
                        resp.type = file.type;
                        resp.size = file.size;

                        _onsuccess(resp);
                    }

                    ajaxDL(root, files, i+1);
                }
            };
        }

        ajaxDL(root, files, 0);
    }

    $.fn.sfupload = function(options) {

        var self = this;

        if (global.File && global.FileReader && global.FileList && global.Blob) {

            self.options = {
                progress: '#status',
                url: 'upload',
                onstart: null,
                onfinish: null,
                onprogress: function() {
                    throw new Error("You should defined onprogress: function(data) { file, meanSpeed, progress, size, timeRest }");
                },
                onsuccess: function () {
                    throw new Error("You should defined onsuccess: function(file) { name, type, size, data }");
                },
                allowdrop: false
            };

            for (var key in options) {
                self.options[key] = options[key];
            }

            // Starting the job
            $(this).on("change", function(e) {
                uploadFiles(self.options.url, e.target.files);
            });

            // Bind for the drag & drop stuff !
            if (self.options.allowdrop) {

                var nopEvent = function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                };

                var dropEvent = function(e) {
                    nopEvent(e);
                    uploadFiles(getUri(e) + self.options.url, e.dataTransfer.files);
                };

                global.document.addEventListener("dragenter", nopEvent, false);
                global.document.addEventListener("dragover", nopEvent, false);
                global.document.addEventListener("drop", dropEvent, false);
            }

            _onstart = self.options.onstart;
            _onfinish = self.options.onfinish;
            _onprogress = self.options.onprogress;
            _onsuccess = self.options.onsuccess;
        }

        /*        cancel: function() {
         if (_xhr && _xhr.readyState !== 4) {
         _xhr.abort();
         }
         },
         reset: function() {
         var self = this;
         $(self.options.input).val('');
         }*/
    };

}(this, jQuery));
