import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useProfile } from "../../contexts/profile";
import {
  AppShell,
  Group,
  Header,
  Navbar,
  ThemeIcon,
  Text,
} from "@mantine/core";
import styled from "styled-components";
import ProjectsList from "./_projects-list";
import { Asterisk } from "react-bootstrap-icons";

const StyledAppSell = styled(AppShell)`
  main {
    min-height: 100%;
  }
`;

const DashboardLayout: React.FC = () => {
  const { profile } = useProfile();

  if (!profile) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <StyledAppSell
      navbar={
        <Navbar width={{ sm: 200, lg: 300 }} className="h-full bg-slate-700">
          <ProjectsList />
        </Navbar>
      }
      header={
        <Header height={70} p="md">
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <Group sx={{ height: "100%" }} px={20} position="apart">
              <Group sx={{ height: "100%" }} position="apart">
                <ThemeIcon
                  size={30}
                  variant="outline"
                  className="cursor-pointer"
                  onClick={() => {
                    console.log("asd");
                  }}
                >
                  <Asterisk />
                </ThemeIcon>

                <Text weight="bold">Lorem</Text>
              </Group>
            </Group>
          </div>
        </Header>
      }
    >
      <Outlet />
    </StyledAppSell>
  );
};

export default DashboardLayout;
