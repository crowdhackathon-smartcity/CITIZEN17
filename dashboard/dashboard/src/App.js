import React, { Component } from 'react';

import Header from "./Header"
import Consumption from "./Consumption"

import http from "http"

class App extends Component {
  render() {
    return (
      <div className="Dashboard">
        <Header />
        <Consumption />
      </div>
    );
  }
}

export default App;
