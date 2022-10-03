import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardLayout from "./dashboard/layout";
import Auth from "./auth";
import Dashboard from "./dashboard";
import Project from "./dashboard/project";
import Login from "./auth/login";
import Register from "./auth/register";
import { useProfile } from "../contexts/profile";
import { LoadingOverlay } from "@mantine/core";

const App: React.FC = () => {
  const { loading } = useProfile();

  if (loading) {
    return (
      <LoadingOverlay
        visible={loading}
        loaderProps={{ size: "xl", variant: "dots" }}
      />
    );
  }

  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="/project/:id" element={<Project />} />
      </Route>
      <Route path="/auth" element={<Auth />}>
        <Route index element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route path="*" element={<div>Not found</div>} />
    </Routes>
  );
};

export default App;
