import React, { Component } from "react";
import axios from "axios";
import MarketObj from "./MarketObj/MarketObj";
import MarketNotes from "./MarketNotes/MarketNotes";
import("./Market.css");

class Market extends Component {
  constructor(props) {
    super(props);
    this.state = {
      types: [],
      apiPulls: 0
    };
    this.getData = this.getData.bind(this);
  }

  // initial data pull to get list of TypeID & Type Name
  getData() {
    axios
      .get(`http://127.0.0.1:3005/api/eve/types`)
      .then(results => {
        console.log("SUCCESS!");
        this.setState({ types: results.data });
        console.log(this.state.types.length);
      })
      .catch(console.log);
  }

  // safe pull of api makes sure not to pull getData more than once per application load
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
    let arr = this.state.types;
    let typeID;
    let typeName;
    return (
      <div className="market-parent">
        <div className="market-header">
          <div className="header-text">
            <h1>Items with values missing is the result of API call errors</h1>
          </div>
          <div className="notes">
            <MarketNotes />
          </div>
        </div>
        <div className="market-obj">
          {arr.map((obj, index) => {
            typeID = obj.TYPEID;
            typeName = obj.TYPENAME;
            return <MarketObj id={typeID} typeName={typeName} />;
          })}
        </div>
      </div>
    );
  }
}

export default Market;
