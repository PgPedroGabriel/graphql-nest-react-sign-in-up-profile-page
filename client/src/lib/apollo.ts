import { ApolloClient, InMemoryCache, from, HttpLink } from "@apollo/client";

export const httpLink = new HttpLink({ uri: process.env.SERVER_API_URL });

const appLink = from([httpLink]);

const client = new ApolloClient({
  link: appLink,
  cache: new InMemoryCache(),
});

export { client };
