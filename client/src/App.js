import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './pages/Header';
import Homepage from './pages/Homepage';
import HomepageContent from './pages/Homepage-Content';
import Browse from './pages/Browse';
import MyBounty from './pages/MyBounty';
import SellerProfile from './pages/SellerProfile';


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
        <Route exact path="/dashboard">
          <MyBounty />
        </Route>
        <Route exact path="/profile">
          <SellerProfile />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
