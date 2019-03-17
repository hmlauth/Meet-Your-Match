
// SET UP
// Install dependencies 
// ('path' dependency not required here because all paths depencies are called upon in routing/js files)
//============================================================================
const express = require("express");


// Set up Express app and define PORT
//============================================================================
var app = express();
var PORT = 3000;

// Set up Middleware so Express app knows how to handle data parsing
//============================================================================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTERS - routing takes place in routing/.js files and these are exported to be called up on this server.js file
require("./routing/apiRoutes.js")(app);
require("./routing/htmlRoutes.js")(app);

// Connect to Express app
// ===========================================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});

