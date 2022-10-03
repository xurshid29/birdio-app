import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./components/app";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
import { ApiProvider } from "./contexts/api";
import { ProfileProvider } from "./contexts/profile";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MantineProvider
        theme={{
          fontFamily: "Roboto",
          primaryColor: "violet",
        }}
      >
        <ModalsProvider>
          <NotificationsProvider
            position="top-center"
            zIndex={9999}
            containerWidth={400}
          >
            <ApiProvider>
              <ProfileProvider>
                <App />
              </ProfileProvider>
            </ApiProvider>
          </NotificationsProvider>
        </ModalsProvider>
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
