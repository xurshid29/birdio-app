import React from "react";
import { ApolloProvider } from "@apollo/client";
import { useLocalStorage } from "@mantine/hooks";
import getClient from "../api";

const ApiProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [token] = useLocalStorage<string | undefined>({
    key: "AUTH_TOKEN",
  });

  return <ApolloProvider client={getClient(token)}>{children}</ApolloProvider>;
};

export { ApiProvider };
