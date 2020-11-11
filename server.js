// server.js

// init project
var express = require("express");
var app = express();

const session = require("express-session");
const SQLiteStore = require("connect-sqlite3")(session);

app.use(
  session({
    store: new SQLiteStore({ dir: ".data" }),
    secret: "so top secret",
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 } // 1 week
  })
);

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  if (request.session.undoAttempts == null) {
    request.session.undoAttempts = 1000;
  }
  response.sendFile(__dirname + "/app/index.html");
});

app.get("/undoAttempts", function(request, response) {
  if (request.session.undoAttempts == null) {
    request.session.undoAttempts = 1000;
  }
  response.json({undoAttempts: request.session.undoAttempts});
});

app.post("/undo", function(request, response) {
  if (request.session.undoAttempts == null) {
    request.session.undoAttempts = 0;
  } else {
    request.session.undoAttempts = Math.max(0, request.session.undoAttempts - 1);
  }
  response.json({undoAttempts: request.session.undoAttempts});
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
