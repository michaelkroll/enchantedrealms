// Imports from React
import { useState } from "react";

// Imports the Amplify library from 'aws-amplify' package. This is used to configure your app to interact with AWS services.
import { Amplify } from "aws-amplify";
import { useAuthenticator } from "@aws-amplify/ui-react";

import "@aws-amplify/ui-react/styles.css";
import "./App.css";

// Imports the awsExports configuration file generated by the Amplify CLI. This file contains the AWS service configurations (like Cognito, AppSync, etc.) specific to your project.
import awsExports from "./aws-exports";

// Aplify Auth Imports
import { fetchUserAttributes } from "@aws-amplify/auth";

// Imports of custom components
import Authenticator from "./components/auth/Authenticator";
import NavBar from "./components/navigation/NavBar";
import AdventureGrid from "./components/adventures/AdventureGrid";
import MapGrid from "./components/maps/MapGrid";
import TokenGrid from "./components/tokens/TokenGrid";
import EntityGrid from "./components/entities/EntityGrid";
import SceneGrid from "./components/scenes/SceneGrid";
import Adventure from "./data/Adventure";
import { Route, Routes, useLocation } from "react-router-dom";
import Room from "./components/room/Room";

// Configures the Amplify library with the settings from aws-exports.js, which includes all the AWS service configurations for this project.
Amplify.configure(awsExports);

function App() {
  const { signOut } = useAuthenticator((context) => [context.user]);
  const [adventures, setAdventures] = useState<Adventure[]>([]);
  const [email, setEmail] = useState("");
  const [sub, setSub] = useState("");

  const location = useLocation();
  const excludedRoute = "/room";

  const handleFetchUserProperties = () => {
    readUserAttributes();
  };

  const readUserAttributes = async () => {
    try {
      const userAttributes = await fetchUserAttributes();
      if (userAttributes.email) setEmail(userAttributes.email);
      if (userAttributes.sub) setSub(userAttributes.sub);
    } catch (error) {
      console.log("Error fetching the user attributes:", error);
    }
  };

  const onAdventuresUpdated = (adventures: Adventure[]) => {
    setAdventures(adventures);
  };

  return (
    <Authenticator>
      {!location.pathname.startsWith(excludedRoute) && (
        <NavBar
          onLogout={signOut}
          onFetchUserProperties={handleFetchUserProperties}
          email={email}
          sub={sub}
        />
      )}

      <Routes>
        <Route
          path="*"
          element={
            <AdventureGrid
              email={email}
              sub={sub}
              onAdventuresUpdated={onAdventuresUpdated}
            />
          }
        />
        <Route
          path="/adventures"
          element={
            <AdventureGrid
              email={email}
              sub={sub}
              onAdventuresUpdated={onAdventuresUpdated}
            />
          }
        />
        <Route path="/maps" element={<MapGrid email={email} sub={sub} />} />
        <Route path="/tokens" element={<TokenGrid email={email} sub={sub} />} />
        <Route
          path="/entities"
          element={<EntityGrid email={email} sub={sub} />}
        />
        <Route
          path="/scenes"
          element={
            <SceneGrid email={email} sub={sub} adventures={adventures} />
          }
        />
        <Route
          path="/room/:adventureId"
          element={<Room email={email} sub={sub} />}
        />
      </Routes>
    </Authenticator>
  );
}

export default App;
