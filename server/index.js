const express = require("express");
const { json } = require("body-parser");
const baseURL = "";
const axios = require("axios");

const newData = require("./../newData.json");

const { read } = require("./controllers/eve_controller.js");

const app = express();

app.use(json());

app.get("/api/itemname", read);

const port = 3005;
app.listen(port, () => console.log(`Server is listening on port: ${port}`));

console.log(newData.length);
