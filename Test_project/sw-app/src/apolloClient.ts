import { ApolloClient, InMemoryCache } from "@apollo/client";

// @ts-ignore
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

export const link = createUploadLink({
  uri: "http://localhost:3000/api/graphql",
  credentials: "include",
  headers: { "Apollo-Require-Preflight": "true" },
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
 link

});
