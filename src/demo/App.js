import React, { Component } from "react";
import { AnalyticsService } from "../lib";

class App extends Component {
  componentDidMount() {
    let a = new AnalyticsService();
    a.dummyFunc();
  }

  render() {
    return (
     <div>Works!</div>
    );
  }
}

export default App;
