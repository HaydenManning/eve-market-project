import React, { Component } from "react";
import("./Header.css");

// this is my stateless component
class Header extends Component {
  render() {
    return (
      <div className="header">
        <h1 className="title">Welcome to Eve Ships - Market Edition!</h1>
      </div>
    );
  }
}

export default Header;
