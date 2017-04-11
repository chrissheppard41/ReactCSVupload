import React, { Component } from 'react';
import ReadFile from './ReadFile';
import logo from '../../images/logo.svg';
import '../../css/App.css';
import '../../css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Welcome to React - Jekyll updater</h1>
        </div>
        <p className="App-intro">
          Updates the specific front matter variables based on the input from a CSV formatted file.
        </p>
          <ReadFile />
      </div>
    );
  }
}

export default App;
