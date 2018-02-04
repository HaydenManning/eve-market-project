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
    this.post = this.post.bind(this);
    this.destroy = this.destroy.bind(this);
    this.put = this.put.bind(this);
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
    const { input } = this.state;
    axios
      .post("http://127.0.0.1:3005/api/newnote", { input })
      .then(results => {
        alert(results.data.message);
        if (this.state.note === "") {
          this.setState({
            note: this.state.input
          });
        }
      })
      .catch(console.log);
  }

  // deletes note data from the server
  destroy() {
    axios
      .delete("http://127.0.0.1:3005/api/notes/delete/0")
      .then(results => {
        alert(results.data.message);
        this.setState({
          note: ""
        });
      })
      .catch(console.log);
  }

  // updates note data on both server and component
  put() {
    const { input } = this.state;
    console.log(input, "hello");
    axios
      .put("http://127.0.0.1:3005/api/notes/0", { input })
      .then(results => {
        alert(results.data.message);
        this.setState({ note: this.state.input });
      })
      .catch(console.log);
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
