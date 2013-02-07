/*! Simple File Upload JS API - v0.1.0 - 2013-02-07
* https://github.com/jfroffice/sfupload
* Copyright (c) 2013 John Fischer; Licensed MIT */

(function($) {

  // Collection method.
  $.fn.awesome = function() {
    return this.each(function() {
      $(this).html('awesome');
    });
  };

  // Static method.
  $.awesome = function() {
    return 'awesome';
  };

  // Custom selector.
  $.expr[':'].awesome = function(elem) {
    return elem.textContent.indexOf('awesome') >= 0;
  };

}(jQuery));
