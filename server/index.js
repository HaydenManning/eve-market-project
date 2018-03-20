const express = require("express");
const { json } = require("body-parser");
const axios = require("axios");
const cors = require("cors");
const {
  readPrice,
  pullIdNames,
  readBuyOrders,
  readHistory,
  readSellOrders
} = require("./controllers/eve_controller.js");
const {
  readNote,
  postNote,
  putNote,
  deleteNote
} = require("./controllers/note_controller.js");

const app = express();

// serving production files
app.use(express.static(`${__dirname}/../build/`));
app.use(json());
app.use(cors());

// pulls type names and type ids JSON file (all items ~3.5k)
app.get("/api/eve/types", pullIdNames);

// pulls fresh market prices --- No longer needed using orders to get a more accurate price number
app.get("/api/eve/markets/prices", readPrice);

// pulls history api to be able to see todays information
app.get("/api/eve/markets/history/:id", readHistory);

// pulls current buy orders api to help calculate highest buy order
app.get("/api/eve/markets/buy/:id", readBuyOrders);

// pulls current sell orders api to help calculate lowest sell order
app.get("/api/eve/markets/sell/:id", readSellOrders);

// pulls notes
app.get("/api/notes", readNote);

// creates a note NEEDS WORK
app.post("/api/newnote", postNote);

// updates a note
app.put("/api/notes/:id", putNote);

// deletes a note
app.delete("/api/notes/delete/:id", deleteNote);

// sending production files
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

// when accessing with localhost use http://localhost:3005 or http://127.0.0.1:3005 followed by api link
const port = 3005;
app.listen(port, () => console.log(`Server is listening on port: ${port}`));
