var express = require('express'),
    http = require('http'),
    path = require('path'),
    app = express();

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.limit('2mb'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'static')));
});

app.configure('development', function(){
    app.use(express.errorHandler());
});

http.createServer(app).listen(app.get('port'), function(){
    console.log("listening on port " + app.get('port'));
});


app.get('/', function(req, res) {
    res.render('main', { title: 'SFUpload.js' });
});

app.post('/upload', function(req, res) {
    res.send(req.files);
});

