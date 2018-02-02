import React, { Component } from "react";
import "./MarketObj.css";
import axios from "axios";

class MarketObj extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorite: false, // determines if item has been favorite or not
      itemName: "", // told by Market.js
      typeID: "", // told by Market.js
      sell: [], // dump of sell orders api
      buy: [], // dump of buy orders api
      lowSell: "", // found by finding lowest sell from sell
      highBuy: "", // found by finding highest buy from buy
      profit: "", // provided by a method that gets the profit margin
      history: [], // dump of history api
      dailyAvg: "", // CALCULATION using volume && avgPrice to get Daily ISK in Jita for item
      volume: "", // Daily Volume in Jita for item
      avgPrice: "", // Daily average price used with volume to find daily moving average gotten from history
      // BELOW THIS IS API/STATE TRACKING
      stateUp: 0, // counts the amount of state updates
      histApi: 0, // limits the history call to 1 pull (the initial pull)
      buyApi: 0, // limits the buy order call to 1 pull (the initial pull)
      sellApi: 0, // limits the sell order call to 1 pull (the initial pull)
      runApi: false, // limits the initial run of all API
      profitCalc: false // limits to one calculation
    };
  }

  // WITHOUT THIS EVERYTHING BREAKS
  componentDidMount() {
    this.updateState();
    this.getHistory();
    this.getBuyOrders();
    this.getSellOrders();
  }

  //updates state for items that are not being directly imported into this component
  updateState() {
    if (this.state.stateUp === 0) {
      this.setState({
        itemName: this.props.typeName,
        typeID: this.props.id,
        stateUp: 1
      });
    }
  }

  // call for market history of provided type id
  getHistory() {
    if (this.state.histApi === 0) {
      axios
        .get(
          `http://127.0.0.1:3005/api/eve/markets/history/${this.state.typeID}`
        )
        .then(results => {
          this.setState({
            history: results.data,
            histApi: 1, // stops getHistory from making a second call
            volume: results.data[results.data.length - 1].volume,
            avgPrice: results.data[results.data.length - 1].average
          });
          // call method to get the Daily ISK
          this.calcDailyAvg();
        })
        .catch(console.log);
    }
  }

  // call for buy orders of provided type id
  getBuyOrders() {
    if (this.state.buyApi === 0) {
      axios
        .get(`http://127.0.0.1:3005/api/eve/markets/buy/${this.state.typeID}`)
        .then(results => {
          this.setState({
            buy: results.data,
            buyApi: 1 // stops getBuyOrders from making a second call
          });
          // call method to calculate high passing in the array of objects we just got
          this.findHighestBuy(this.state.buy);
        })
        .catch(console.log);
    }
  }

  // call for sell orders of provided type id
  getSellOrders() {
    if (this.state.sellApi === 0) {
      axios
        .get(`http://127.0.0.1:3005/api/eve/markets/sell/${this.state.typeID}`)
        .then(results => {
          this.setState({
            sell: results.data,
            sellApi: 1 // stops getSellOrders from making a second call
          });
          // call method to calculate low passing in the array of objects we just got
          this.findLowestSell(this.state.sell);
        })
        .catch(console.log);
    }
  }

  // calculates daily moving average (amount of ISK through that market)
  calcDailyAvg() {
    let tempVar = 0;
    tempVar =
      parseInt(this.state.volume, 10) * parseInt(this.state.avgPrice, 10);
    // makes number a string with commas in correct places
    tempVar = tempVar.toLocaleString();
    this.setState({
      histApi: 1,
      dailyAvg: tempVar
    });
  }

  // finds the lowest price using a (x < y) check and assigning x to a temp variable if it is lower than the current temp
  findLowestSell(arr) {
    let lowTemp = 0; // will always be an integer
    for (let i = 0; i < arr.length; i++) {
      // if first number were looping over assign to temp
      if (lowTemp === 0) {
        lowTemp = arr[i].price;
        // check to see if newest number is > current temp
      } else if (arr[i].price < lowTemp) {
        lowTemp = arr[i].price;
      }
    }
    // makes number a string with commas in correct places
    lowTemp = lowTemp.toLocaleString();
    this.setState({
      sellApi: 1,
      lowSell: lowTemp
    });
  }

  // find the highest price using a (x > y) check and assigning x to a temp variable if it is higher than the current temp
  findHighestBuy(arr) {
    let highTemp = 0; // will always be an integer
    for (let i = 0; i < arr.length; i++) {
      // if first number were looping over assign to temp
      if (highTemp === 0) {
        highTemp = arr[i].price;
        // check to see if newest number is > current temp
      } else if (arr[i].price > highTemp) {
        highTemp = arr[i].price;
      }
    }
    // makes number a string with commas in correct places
    highTemp = highTemp.toLocaleString();
    this.setState({
      buyApi: 1, // double checking that we are blocking the recall of api data
      highBuy: highTemp
    });
  }

  calcProfitMargin(sell, buy) {
    if (
      this.state.lowSell !== "" &&
      this.state.highBuy !== "" &&
      this.state.profitCalc === false
    ) {
      let sellInt = parseInt(sell, 10);
      let buyInt = parseInt(buy, 10);
      let profit = sellInt - buyInt;
      console.log(profit);
      let margin = profit / sell * 100;
      console.log(margin);
      this.setState({ profit: margin });
    }
  }

  // Once the object enters the render phase it will check if it needs to pull data yet by matching the following criteria
  // WITHOUT THIS EVERYTHING BREAKS
  onRender() {
    this.state.typeID !== "" && this.state.runApi === false
      ? this.runGets()
      : false;
  }

  // If the ternary comes back true the following methods will run which will gather data and update state completely
  runGets() {
    this.getBuyOrders();
    this.getHistory();
    this.getSellOrders();
    this.setState({
      runApi: true
    });
    this.calcProfitMargin(this.state.lowSell, this.state.highBuy);
  }

  render() {
    this.onRender();
    return (
      <div className="market-obj">
        <ul>
          <li>
            <h2>ITEM NAME</h2>
            <p>{this.props.typeName}</p>
          </li>
          <li>
            <h2>TYPEID</h2>
            <p>{this.props.id}</p>
          </li>
          <li>
            <h2>DAILY MOVING AVERAGE</h2>
            <p>{`${this.state.dailyAvg} ISK`}</p>
          </li>
          <li>
            <h2>LOWEST SELL</h2>
            <p>{`${this.state.lowSell} ISK`}</p>
          </li>
          <li>
            <h2>HIGHEST BUY</h2>
            <p>{`${this.state.highBuy} ISK`}</p>
          </li>
          <li>
            <h2>PROFIT MARGIN</h2>
            <p>{this.state.profit}</p>
          </li>
        </ul>
      </div>
    );
  }
}

export default MarketObj;
