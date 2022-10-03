import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useProfile } from "../../contexts/profile";
import { Container } from "@mantine/core";

const Auth: React.FC = () => {
  const { profile } = useProfile();

  if (profile != null) {
    return <Navigate to="/" />;
  }

  return (
    <Container size={420} my={40}>
      <Outlet />
    </Container>
  );
};

export default Auth;
