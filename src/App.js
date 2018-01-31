import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Market from "./components/Market/Market";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">
            Welcome to a snapshot of Eve's Global Market Prices
          </h1>
        </header>
        <Market />
      </div>
    );
  }
}

export default App;
