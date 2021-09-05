import './App.css';
import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Homepage from './pages/Homepage';
import HomepageContent from './components/Homepage-Content';
import Browse from './pages/Browse';
import MyBounty from './pages/MyBounty';
import SellerProfile from './pages/SellerProfile';
import ViewSingleItem from './pages/ViewSingleItem';

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
          <Browse />
        </Route>
        <Route exact path="/dashboard/:username">
          <MyBounty />
        </Route>
        <Route exact path="/profile">
          <SellerProfile />
        </Route>
        <Route exact path="/browse/item">
          <ViewSingleItem />
        </Route>
      </Switch>
    </Router>
    </ApolloProvider>
  );
}

export default App;
