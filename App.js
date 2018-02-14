

XMLHttpRequest = GLOBAL.originalXMLHttpRequest ?
  GLOBAL.originalXMLHttpRequest :
  GLOBAL.XMLHttpRequest;


import React, { Component } from 'react';

import { ApolloClient } from 'apollo-client';
import { HttpLink, createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { setContext } from 'apollo-link-context';
import { withClientState } from 'apollo-link-state';
import { ApolloLink } from 'apollo-link';

import favorites from './src/resolvers/favorites';

import Github from './src/modules'


const httpLink = createHttpLink({ uri: 'https://api.github.com/graphql' });
const cache = new InMemoryCache()


const stateLink = withClientState({
  cache,
  ...favorites, //User merge for more than one
});


const middlewareLink = setContext(() => ({
  headers: {
    authorization: 'bearer HERE_YOUR_TOKEN_ID'
  }
}));

console.error("Replace your personal token: Line 35 and remove this line")

const link = middlewareLink.concat(httpLink);


const client = new ApolloClient({
  link: ApolloLink.from([
    stateLink,
    link
  ]),
  cache
});



export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Github />
      </ApolloProvider>
    );
  }
}
