import React, { Component } from "react";
import axios from "axios";
import("./MarketNotes.css");

class MarketNotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      note: ""
    };
  }

  // handles changes in the input field
  handleChange(e) {
    console.log(e);
    this.setState({
      input: e
    });
  }

  // posts note data to the server has component check if it needs to create a Note or not
  post() {
    axios.post();
  }

  // deletes note data from the server
  destroy() {
    axios.delete();
  }

  // updates note data on both server and component
  put() {
    axios.put();
  }

  render() {
    return (
      <div className="note-container">
        <input
          onChange={e => {
            this.handleChange(e.target.value);
          }}
        />
        <button onClick={this.post}>SAVE NOTE</button>
        <button onClick={this.put}>UPDATE NOTE</button>
        <button onClick={this.destroy}>DELETE NOTE</button>
        <div className="note">
          <p>{this.state.note}</p>
        </div>
      </div>
    );
  }
}

export default MarketNotes;
