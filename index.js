var dateFormat = require('dateformat');
var path = require('path');
var moment = require('moment');
var express = require('express');
var app = express();


app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

app.get('/', function(req, res) {
  var fileName = path.join(__dirname, 'index.html');
  res.sendFile(fileName, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      console.log('Sent:', fileName);
    }
  });
});


app.get('/:NAME', function (req, res) {
  var timestamp={
    unix:null,
    natural:null
  };
  
  var date_format="mmmm d, yyyy";
  
  var value=req.params.NAME;
  console.warn(value);
  
  if( value.match(/^[0-9]+$/) != null ){
    var d = new Date(value*1000);
    timestamp.unix=value;
    timestamp.natural=dateFormat(d,date_format);
  }else if( moment(value, "LL" , true).isValid() ){
    timestamp.natural=value;
    timestamp.unix =  new Date(value).getTime() / 1000;
    moment();
  }else{
    
  }
  res.send(timestamp);
})


