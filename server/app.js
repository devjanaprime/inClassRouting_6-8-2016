var express=require('express');
var app=express();
var path=require('path');
var bodyParser=require('body-parser');
var urlencodedParser = bodyParser.urlencoded( { extended: false } );

var testFoamerInputModule=require('../modules/testFoamerInputModule.js');

// set up server
var server=app.listen( 8080, 'localhost', function(){
// sniff out the port on which our server is running
  var port = server.address().port;
  console.log( 'server is on ' + port );
});

// base URL
app.get( '/', function( req, res ){
  console.log( 'base url received a hit' );
  // write text
  res.write( "Chewie... WE'RE HOME!!!!" );
  // end if using write or it won't display
  res.end();
});

// forms route
app.get( '/form', function( req, res ){
  res.sendFile( path.resolve( 'views/testForms.html' ) );
});

// get route for get form output
app.get('/pathGet', function( req, res ){
  res.write( 'RECEIVED SOMETHING: ' + req.query.inputName );
  res.end();
});

app.post('/pathPost', urlencodedParser, function( req, res ){
  var fromModule = testFoamerInputModule( req.body.inputColor );
  res.write( "post received something: " + fromModule );
  res.end();
});
