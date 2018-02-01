const axios = require("axios");
const types = require("./../../itemNames.json");

let regionID = "10000002";
let baseURL = "https://esi.tech.ccp.is/latest";
let urlEND = "/?datasource=tranquility";
let urlType = "&type_id=";
let urlSellOrder = "&order_type=sell&page=1";
let urlBuyOrder = "&order_type=buy&page=1";

// provides a cross reference file for type names/ids
const pullIdNames = (req, res, next) => {
  console.log(`Providing TypeId's & Type Names information`);
  res.json(types);
};

// pulls fresh market data
const readPrice = (req, res, next) => {
  console.log(`Retrieving fresh /prices information`);
  axios
    .get(`${baseURL}/markets/prices${urlEND}`)
    .then(results => {
      return res.json(results.data);
    })
    .catch(err => res.status(500).json(err));
};

// pulls history api to be able to see todays information
const readHistory = (req, res, next) => {
  const id = req.params.id;
  console.log(`Retrieving Market History for ${id}`);
  axios
    .get(`${baseURL}/markets/${regionID}/history${urlEND}${urlType}${id}`)
    .then(results => {
      return res.json(results.data);
    })
    .catch(console.log);
};

// pulls current buy orders api to help calculate profit margin based on highest buy/lowest sell
const readBuyOrders = (req, res, next) => {
  const id = req.params.id;
  console.log(`Retrieving Buy Orders for ${id}`);
  axios
    .get(
      `${baseURL}/markets/${regionID}/orders${urlEND}${urlBuyOrder}${urlType}${id}`
    )
    .then(results => {
      return res.json(results.data);
    })
    .catch(console.log);
};

// pulls current sell orders api to help calculate profit margin based on highest buy/lowest sell
const readSellOrders = (req, res, next) => {
  const id = req.params.id;
  console.log(`Retrieving Sell Orders for ${id}`);
  axios
    .get(
      `${baseURL}/markets/${regionID}/orders${urlEND}${urlSellOrder}${urlType}${id}`
    )
    .then(results => {
      return res.json(results.data);
    })
    .catch(console.log);
};

module.exports = {
  pullIdNames,
  readPrice,
  readHistory,
  readBuyOrders,
  readSellOrders
};
