import React, { Component } from "react";
import Header from "./components/Header";

class App extends Component {
  render() {
    return (
      <div>
        <Header />

        <h2>Welcome to React</h2>
        <p>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
