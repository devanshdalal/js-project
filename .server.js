var express = require('express');
var app = express();
var dateFormat = require('dateformat');
var moment = require('moment');

// app.get('/', function (req, res) {
//   res.send('Hello World!')
// })

app.get('/:NAME', function (req, res) {
  // console.warn(req);
  
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
  res.send(JSON.stringify(timestamp)+"\n");
})


app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})