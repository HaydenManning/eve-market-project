const express = require("express");
const { json } = require("body-parser");
const axios = require("axios");
const { readPrice } = require("./controllers/eve_controller.js");
const app = express();

app.use(json());

app.get("/api/eve/markets/prices", readPrice);

const port = 3005;
app.listen(port, () => console.log(`Server is listening on port: ${port}`));
