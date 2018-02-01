import React, { Component } from "react";
import "./MarketObj.css";

class MarketObj extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorite: false,
      itemName: "",
      typeID: "",
      avgPrice: "",
      adjPrice: "",
      stateUp: 0
    };
  }

  updateState() {
    this.setState({
      itemName: this.props.id,
      typeID: this.props.id,
      avgPrice: this.props.avg,
      adjPrice: this.props.adj
    });
    let x = this.state.stateUp;
    x++;
  }

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
            <p>{this.props.id}</p>
          </li>
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
