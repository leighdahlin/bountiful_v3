import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import Homepage from './components/Homepage';
import HomepageContent from './components/Homepage-Content';
import Browse from './components/Browse';

function App() {


  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Homepage />
          <HomepageContent />
        </Route>
        <Route exact path="/browse">
          <Browse />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
