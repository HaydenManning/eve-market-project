const axios = require("axios");

let regionID = "10000002";
let baseURL = "https://esi.tech.ccp.is/latest";
let urlEND = "/?datasource=tranquility";

const readPrice = (req, res, next) => {
  console.log(`retrieving data`);
  axios
    .get(`${baseURL}/markets/prices${urlEND}`)
    .then(results => {
      return res.json(results.data);
    })
    .catch(err => res.status(500).json(err));
};

module.exports = {
  readPrice: readPrice
};
