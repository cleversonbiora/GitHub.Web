import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './Pages/Home'
import './App.css';
import NotFound from './Pages/NotFound';
import Repository from './Pages/Repository';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/l/:languange" component={Home}/>
          <Route path="/repository/:id" component={Repository}/>
          <Route component={NotFound}/>
        </Switch>
      </Router>
    );
  }
}
export default App;
