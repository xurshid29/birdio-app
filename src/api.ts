import { split, HttpLink, ApolloClient, InMemoryCache } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { unionBy } from "lodash";

const getClient = (token?: string) => {
  const httpLink = new HttpLink({
    uri: process.env.REACT_APP_GRAPHQL_URL,
    headers: token != null ? { Authorization: `Bearer ${token}` } : {},
  });

  const wsLink = new GraphQLWsLink(
    createClient({
      url: String(process.env.REACT_APP_SUBSCRIPTIONS_URL),
      connectionParams: token != null ? { token } : {},
    }),
  );

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    httpLink,
  );

  return new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            scheduledTasks: {
              keyArgs: false,
              merge(existing = [], incoming) {
                return unionBy(existing, incoming, "__ref");
              },
            },
          },
        },
      },
    }),
  });
};

export default getClient;
