import React, { Component } from "react";
import "./MarketObj.css";

class MarketObj extends Component {
  render() {
    return (
      <div className="market-obj">
        <ul>
          <li>
            <h2>TYPEID</h2>
            <p>{this.props.id}</p>
          </li>
          <li>
            <h2>AVERAGE PRICE</h2>
            <p>{this.props.avg >= 0 ? this.props.avg : "0"}</p>
          </li>
          <li>
            <h2>ADJUSTED PRICE</h2>
            <p>{this.props.adj}</p>
          </li>
        </ul>
      </div>
    );
  }
}

export default MarketObj;
