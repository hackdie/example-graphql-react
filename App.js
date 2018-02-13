

XMLHttpRequest = GLOBAL.originalXMLHttpRequest ?
  GLOBAL.originalXMLHttpRequest :
  GLOBAL.XMLHttpRequest;

// // fetch logger
// global._fetch = fetch;
// global.fetch = function (uri, options, ...args) {
//   return global._fetch(uri, options, ...args).then((response) => {
//     console.log('Fetch', { request: { uri, options, ...args }, response });
//     return response;
//   });
// };


import React, { Component } from 'react';

import { ApolloClient } from 'apollo-client';
import { HttpLink, createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { setContext } from 'apollo-link-context';

import Github from './src/modules'


const httpLink = createHttpLink({ uri: 'https://api.github.com/graphql' });


const middlewareLink = setContext(() => ({
  headers: {
    authorization: 'bearer b813c3e42b364b7409c894195ddaaf477b6f152f'
  }
}));

const link = middlewareLink.concat(httpLink);


const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
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
