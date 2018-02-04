import React, { Component } from "react";
import("./Header.css");

// this is my stateless component
class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="header-left">
          <h1 className="title">Welcome to Eve Ships - Market Edition!</h1>
        </div>
        <div className="header-right">
          <a href="http://github.com/HaydenManning" target="_blank">
            <i class="fab fa-3x fa-github" id="github" />
          </a>
          <a href="mailto:thaydenmanning@gmail.com" target="_blank">
            <i class="fas fa-3x fa-envelope" id="email" />
          </a>
        </div>
      </div>
    );
  }
}

export default Header;
