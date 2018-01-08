var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var chart_engine = require('./js/chart_engine.js')

app.use(express.static(__dirname + '/static'));

// set up handlebars view engine
var handlebars = require('express3-handlebars')
 .create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);
        
app.get('/', function(req, res) {
 res.render('home',{context : {"time":"10:30:00"}});
});
        
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});


setInterval(chart_engine.period_event, 1500, io);
        
// custom 404 page
app.use(function(req, res){
 res.type('text/plain');
 res.status(404);
 res.send('404 - Not Found');
});      
        
// custom 500 page
app.use(function(err, req, res, next){
 console.error(err.stack);
 res.type('text/plain');
 res.status(500);
 res.send('500 - Server Error');
});

http.listen(app.get('port'), function(){
 console.log( 'Express started on http://localhost:' +
 app.get('port') + '; press Ctrl-C to terminate.' );
});