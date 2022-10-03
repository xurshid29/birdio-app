import React from "react";
import { User } from "../types";
import { gql, useQuery } from "@apollo/client";

type ProfileResult = {
  profile: User | undefined;
  loading: boolean;
};

const Profile = React.createContext<ProfileResult>({
  profile: undefined,
  loading: true,
});

const GET_PROFILE = gql`
  query GetProfile {
    profile {
      id
      email
    }
  }
`;

const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { loading, data } = useQuery<{ profile: User }>(GET_PROFILE);

  return (
    <Profile.Provider value={{ loading, profile: data?.profile }}>
      {children}
    </Profile.Provider>
  );
};

const useProfile = () => React.useContext<ProfileResult>(Profile);

export { ProfileProvider, useProfile };
