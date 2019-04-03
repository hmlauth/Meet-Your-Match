// A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.
// A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.

// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of the survey result information.
// ===============================================================================

var friendsData = require("../data/friends.js");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------

    app.get("/api/friends", function (req, res) {
        res.json(friendsData);
    });

    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // When a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // (ex. User fills out a reservation request... this data is then sent to the server...
    // Then the server saves the data to the tableData array)
    // ---------------------------------------------------------------------------

    app.post("/api/friends", function (req, res) {
        console.log("Req.body", req.body);

        var userData = req.body;
        var userScores = userData.scores;
        console.log("userScores", userScores);
        var bestMatch = 0;
        var leastDifferent = -Infinity;

        // iterate over length of current json object "arr"
        for (var i = 0; i < friendsData.length; i++) {
            // For each comparison set totalDifference to 0 to start
            var totalDifference = 0;

            // iterate over current user's scores.length, "reqBody"
            for (var j = 0; j < friendsData[i].scores.length; j++) {
                totalDifference += Math.abs(parseInt(userScores[j] - parseInt(friendsData[i].scores[j])))

                if (leastDifferent != -Infinity || totalDifference < leastDifferent) {
                    leastDifferent = totalDifference;
                    bestMatch = i;
                }

                bestMatchObj = {
                    name: friendsData[bestMatch].name,
                    photo: friendsData[bestMatch].photo
                }

                res.json(bestMatchObj);

                friendsData.push(userData);
            }
        }


    });

    app.post("/api/clear", function (req, res) {
        // Empty out the arrays of data
        friendsData.length = [];

        res.json({ ok: true });
    });

};
