#Node Server

This application is a simple node js server to handle api calls

##The server
The entire server is coded within the server.js file
The server has an extra dependency of formidable to handle forms

To run this application simply runt he following command
  `node server.js`
 If successful, it will print a message saying `server listening on port 4100`
 
 This is a very basic server and only handle a few methods
 POST - will always return wherever was sent with an added id
 GET - Will always return an array of languages