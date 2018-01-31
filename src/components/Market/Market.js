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

  getData() {
    axios
      .get(`${this.state.baseUrl}/markets/prices/?datasource=tranquility`)
      .then(results => {
        console.log("SUCCESS!");
        this.setState({
          items: results.data
        });
        console.log(this.state.items[0].type_id);
      })
      .catch(console.log);
  }

  apiLoop() {
    if (this.state.apiPulls === 0) {
      this.getData();
      this.setState({
        apiPulls: 1
      });
    }
    // let arr = this.state.items;
    // return arr.map((obj, index) => {
    //   let type = obj.type_id;
    //   let avg = obj.average_price;
    //   let adj = obj.adjusted_price;
    //   <MarketObj id={type} avg={avg} adj={adj} />;
    // });
    //   console.log("apiLoop started");
    //   for (let i = 0; i < arr.length; i++) {
    //     console.log(`LOOP ${i + 1} / ${arr.length}`);
    //     let type = arr[i].type_id;
    //     let avg = arr[i].average_price;
    //     let adj = arr[i].adjusted_price;

    //     <MarketObj id={type} avg={avg} adj={adj} />;
    //   }
    //   console.log("apiLoop completed");
  }

  render() {
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
