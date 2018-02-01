import React, { Component } from "react";
import axios from "axios";
import MarketObj from "./MarketObj/MarketObj";

class Market extends Component {
  constructor(props) {
    super(props);
    this.state = {
      baseUrl: "https://esi.tech.ccp.is/latest",
      items: [],
      apiPulls: 0
    };
    this.getData = this.getData.bind(this);
  }

  // initial data pull (needs to be getting typeID and typeName and sending to MarketObj components for them to do individual pulls) ** NEEDS WORK **
  getData() {
    axios
      .get(`${this.state.baseUrl}/markets/prices/?datasource=tranquility`)
      .then(results => {
        console.log("SUCCESS!");
        this.setState({
          items: results.data
        });
        console.log(this.state.items.length);
      })
      .catch(console.log);
  }

  // safe single pull of api
  apiLoop() {
    if (this.state.apiPulls === 0) {
      this.getData();
      this.setState({
        apiPulls: 1
      });
    }
  }

  render() {
    // need to rework all of this to match to new style of this application
    this.apiLoop();
    let arr = this.state.items;
    let type;
    let avg;
    let adj;
    return (
      <div className="market-parent">
        <div className="market-header">
          <h1>Items with 0 as price are out of stock or not recorded</h1>
        </div>
        <div className="market-obj">
          {arr.map((obj, index) => {
            type = obj.type_id;
            avg = obj.average_price;
            adj = obj.adjusted_price;
            return <MarketObj id={type} avg={avg} adj={adj} />;
          })}
        </div>
      </div>
    );
  }
}

export default Market;
