import React, { Component } from "react";
import axios from "axios";
import("./MarketNotes.css");

class MarketNotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      note: []
    };
  }

  render() {
    return (
      <div className="notes">
        <h2>Notes will be here</h2>
      </div>
    );
  }
}

export default MarketNotes;
