import { ApolloClient, InMemoryCache } from "@apollo/client";
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

import { HttpLink } from '@apollo/client';

// const httpLink = new HttpLink({
//   uri: process.env.REACT_APP_URI,
//   // 'http://localhost:7000/graphql'
//   // Additional options
// });

const link = new GraphQLWsLink(createClient({
  // url: 'ws://localhost:7000/graphql',
  url: process.env.REACT_APP_SUBSCRIPTION_URI,
}));
// const link = new GraphQLWsLink(httpLink);

export const client = new ApolloClient({
    link, //websocket link
    uri: process.env.REACT_APP_URI, //connect to server
    cache: new InMemoryCache(),
});
