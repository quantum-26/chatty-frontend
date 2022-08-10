import { ApolloClient, InMemoryCache } from "@apollo/client";
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

const link = new GraphQLWsLink(createClient({
  url: process.env.REACT_APP_URI,
}));

export const client = new ApolloClient({
    link, //websocket link
    uri: process.env.REACT_APP_URI, //connect to server
    cache: new InMemoryCache(),
});
