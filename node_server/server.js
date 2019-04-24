var http = require('http');
var formidable = require('formidable');
var util = require('util');


var server = http.createServer(function (req, res) {
  //set CORS to be able to be contacted from different ports on the network
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method.toLowerCase() == 'post'){
    processForm(req, res);
    return;
  }
  res.end(); //end the response
});

//this function will be used if a post method is sent through. The idea is to parse and validate a form
function processForm(req, res){
  var form = new formidable.IncomingForm();

  //parse form
  form.parse(req, function (err, fields){
    res.writeHead(400, {
      'content-type' : 'text/plain'
    });

    var data = JSON.stringify({
      fields: fields
    });

    res.end(data);

    console.log('posted fields :\n');

    console.log('The data as string ', data);
    console.log('The data as Json ', util.inspect({
      fields: fields
    }));
  });
}

var port = 4100;
server.listen(port);
console.log("server listening on port " + port);
