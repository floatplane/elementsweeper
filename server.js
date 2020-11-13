// server.js
require("dotenv").config();

// init project
var express = require("express");
var app = express();

const session = require("express-session");
const SQLiteStore = require("connect-sqlite3")(session);
const sessionStore = new SQLiteStore({ dir: ".data" });

const util = require("util");
const sessionGet = util.promisify(sessionStore.get.bind(sessionStore));
const sessionSet = util.promisify(sessionStore.set.bind(sessionStore));

// This is your real test secret API key.
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
const startingLives = 1;

app.use(
  session({
    store: sessionStore,
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 }, // 1 week
  })
);

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));
app.use(express.json());

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  if (request.session.undoAttempts == null) {
    request.session.undoAttempts = startingLives;
  }
  response.sendFile(__dirname + "/app/index.html");
});

app.get("/undoAttempts", function (request, response) {
  if (request.session.undoAttempts == null) {
    request.session.undoAttempts = startingLives;
  }
  response.json({ undoAttempts: request.session.undoAttempts });
});

app.post("/undo", function (request, response) {
  if (request.session.undoAttempts == null) {
    request.session.undoAttempts = 0;
  } else {
    request.session.undoAttempts = Math.max(
      0,
      request.session.undoAttempts - 1
    );
  }
  response.json({ undoAttempts: request.session.undoAttempts });
});

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 599;
};

app.post("/create-payment-intent", async (request, response) => {
  const { items } = request.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
    metadata: {
      session_id: request.session.id,
    },
  });
  console.log(`created payment intent for session ${request.session.id}!`);
  response.send({
    clientSecret: paymentIntent.client_secret,
  });
});

// Match the raw body to content type application/json
app.post("/webhook", async (request, response) => {
  const event = request.body;

  // Handle the event
  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object;
      const sessionId = paymentIntent.metadata.session_id;
      console.log(`confirmed payment intent for session ${sessionId}!`);
      const session = await sessionGet(sessionId);
      session.undoAttempts = session.undoAttempts + 1;
      await sessionSet(sessionId, session);
      break;
    case "payment_method.attached":
      const paymentMethod = event.data.object;
      console.log("PaymentMethod was attached to a Customer!");
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.json({ received: true });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
