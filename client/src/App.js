import './App.css';
import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/Header';
import Homepage from './pages/Homepage';
import HomepageContent from './components/Homepage-Content';
import Browse from './pages/Browse';
import MyBounty from './pages/MyBounty';
import SellerProfile from './pages/SellerProfile';
import ViewSingleItem from './pages/ViewSingleItem';

import Auth from './utils/auth';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {


  return (
    <ApolloProvider client={client}>
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Homepage />
          <HomepageContent />
        </Route>
        <Route exact path="/browse">
          {!Auth.loggedIn() ? <Redirect to="/" /> : <Browse />}
        </Route>
        <Route exact path="/dashboard/:username">
          {!Auth.loggedIn() ? <Redirect to="/" /> : <MyBounty />}
        </Route>
        <Route exact path="/profile/:username">
          {!Auth.loggedIn() ? <Redirect to="/" /> : <SellerProfile />}
        </Route>
        <Route exact path="/browse/item/:id">
          {!Auth.loggedIn() ? <Redirect to="/" /> : <ViewSingleItem />}
        </Route>
        <Route exact path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
    </ApolloProvider>
  );
}

export default App;
