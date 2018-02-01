const axios = require("axios");

let types = [];
let baseURL = "https://esi.tech.ccp.is/latest";

const readPrice = (req, res, next) => {
  console.log(`retrieving data`);
  axios
    .get(`${baseURL}/markets/prices/?datasource=tranquility`)
    .then(results => {
      return res.json(results.data);
    })
    .catch(err => res.status(500).json(err));
};

module.exports = {
  readPrice: readPrice
};
