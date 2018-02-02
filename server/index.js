const express = require("express");
const { json } = require("body-parser");
const axios = require("axios");
const {
  readPrice,
  pullIdNames,
  readBuyOrders,
  readHistory,
  readSellOrders
} = require("./controllers/eve_controller.js");

const app = express();

app.use(json());

// pulls type names and type ids JSON file (all items ~3.5k)
app.get("/api/eve/types", pullIdNames);

// pulls fresh market prices
app.get("/api/eve/markets/prices", readPrice);

// pulls history api to be able to see todays information
app.get("/api/eve/markets/history/:id", readHistory);

// pulls current buy orders api to help calculate highest buy order
app.get("/api/eve/markets/buy/:id", readBuyOrders);

// pulls current sell orders api to help calculate lowest sell order
app.get("/api/eve/markets/sell/:id", readSellOrders);

// when accessing with localhost user http://localhost:3005 followed by api link
const port = 3005;
app.listen(port, () => console.log(`Server is listening on port: ${port}`));
