import React, { Component } from "react";
import "./MarketObj.css";

class MarketObj extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorite: false, // determines if item has been favorite or not
      itemName: "", // told by Market.js
      typeID: "", // told by Market.js
      lowSell: "", // pulls from orders api
      highBuy: "", // pulls from orders api
      dailyAvg: "", // pulls from history api
      volume: "", // pulls from history api
      stateUp: 0 // counts the amount of state updates
    };
  }

  // updateState() {
  //   this.setState({
  //     itemName: this.props.typeName,
  //     typeID: this.props.id
  //   });
  //   let x = this.state.stateUp;
  //   x++;
  // }

  // favorite mechanic, attach to button and it favorites the item -- needs an unfavorite also
  favorite() {
    this.setState({
      favorite: true
    });
  }

  render() {
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
          {/*<li>
            <h2>AVERAGE PRICE</h2>
           <p>{this.props.avg >= 0 ? this.props.avg : "0"}</p>
          </li>
          <li>
            <h2>ADJUSTED PRICE</h2>
           <p>{this.props.adj}</p>
         </li> */}
        </ul>
      </div>
    );
  }
}

export default MarketObj;
