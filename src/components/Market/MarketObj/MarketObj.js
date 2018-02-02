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
      history: [], // dump of history api
      dailyAvg: "", // CALCULATION Daily ISK in Jita for item
      volume: "", // Daily Volume in Jita for item
      avgPrice: "", // Daily average price used with volume to find daily moving average gotten from history
      stateUp: 0, // counts the amount of state updates
      histApi: 0 // limits the history call to 1 pull (the initial pull)
    };
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

  // favorite mechanic, attach to button and it favorites the item -- needs an unfavorite also
  // favorite() {
  //   this.setState({
  //     favorite: true
  //   });
  // }

  // call for market history of specific type id
  getHistory() {
    if (this.state.histApi === 0) {
      axios
        .get(
          `http://127.0.0.1:3005/api/eve/markets/history/${this.state.typeID}`
        )
        .then(results => {
          this.setState({
            history: results.data,
            histApi: 1,
            volume: results.data[results.data.length - 1].volume,
            avgPrice: results.data[results.data.length - 1].average
          });
          this.calcDailyAvg();
        })
        .catch(console.log);
    }
  }

  calcDailyAvg() {
    let tempVar = 0;
    tempVar =
      parseInt(this.state.volume, 10) * parseInt(this.state.avgPrice, 10);
    tempVar = tempVar.toLocaleString();
    this.setState({
      dailyAvg: tempVar
    });
  }

  render() {
    this.updateState();
    this.getHistory();
    return (
      <div className="market-obj">
        <ul>
          <li>
            <button>FAVORITE</button>
          </li>
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
          {/*<li>
            <h2>ADJUSTED PRICE</h2>
           <p>{this.props.adj}</p>
         </li> */}
        </ul>
      </div>
    );
  }
}

export default MarketObj;
