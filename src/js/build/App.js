import React, { Component } from 'react';
import Csv from './Read/Csv';
import Replace from './CamelCase/CamelCase';
import logo from '../../images/logo.svg';
import '../../css/App.css';
import '../../css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


class App extends Component {
  render() {
    return (
        <Router>
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1>Welcome to React - Jekyll updater</h1>
                </div>

                <nav>
                    <Link to="/">Csv Extract</Link>
                    <Link to="/mass">Camel case</Link>
                </nav>
                <Route exact={true} path="/" component={Csv}/>
                <Route path="/index" component={Csv}/>
                <Route path="/mass" component={Replace}/>
            </div>
        </Router>
    );
  }
}

export default App;
