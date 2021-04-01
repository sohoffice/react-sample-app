import React from 'react';
import logo from './logo.svg';
import {Counter} from './features/counter/Counter';
import './App.css';
import {ShowRest} from "./features/rest/ShowRest";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Switch>
            <Route path="/counter">
              <img src={logo} className="App-logo" alt="logo"/>
              <Counter/>
            </Route>
            <Route path="/rest">
              <ShowRest/>
            </Route>
          </Switch>
          <span className={"mt-3"}>
            <p>
              Switch to sample:
              <Link to="/counter">Counter</Link>
              |
              <Link to="/rest">Rest</Link>
            </p>
            <p>
              <span>Learn </span>
              <a
                className="App-link"
                href="https://reactjs.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                React
              </a>
              <span>, </span>
              <a
                className="App-link"
                href="https://redux.js.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Redux
              </a>
              <span>, </span>
              <a
                className="App-link"
                href="https://redux-toolkit.js.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Redux Toolkit
              </a>
              ,<span> and </span>
              <a
                className="App-link"
                href="https://react-redux.js.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                React Redux
              </a>
            </p>
          </span>
        </Router>
      </header>
    </div>
  );
}

export default App;
