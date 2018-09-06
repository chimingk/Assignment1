var http = require('http'), 
    fs = require('fs'), 
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {
  var parsedUrl = url.parse(request.url);

  /*
    Your request handler should send listingData in the JSON format if a GET request 
    is sent to the '/listings' path. Otherwise, it should send a 404 error. 

    HINT: explore the request object and its properties 
    http://stackoverflow.com/questions/17251553/nodejs-request-object-documentation
   */



// GET listings
if(request.method === "GET" && parsedUrl.path === "/listings"){
    response.statusCode = 200;
    response.write(listingData);
} else {
    response.statusCode = 404;
    response.write("Bad gateway error 404");
}


response.end();


}; //End of requestHandler 





fs.readFile('listings.json', 'utf8', function(err, data) {
  /*
    This callback function should save the data in the listingData variable, 
    then start the server. 
   */


    listingData = data;

    //Create the server
    var server = http.createServer(requestHandler);

    //Listen for requests on port 8080
    server.listen(port, function(){

        //Execute this callback function after server is listening
        console.log('Server listening on http://127.0.0.1:' + port);})


});
