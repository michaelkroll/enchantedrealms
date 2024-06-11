// Imports from React
import { useState } from "react";

// Imports the Amplify library from 'aws-amplify' package. This is used to configure your app to interact with AWS services.
import { Amplify } from "aws-amplify";
import { useAuthenticator } from "@aws-amplify/ui-react";

import "@aws-amplify/ui-react/styles.css";
import "./App.css";
import {
  Grid,
  GridItem,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";

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

// Configures the Amplify library with the settings from aws-exports.js, which includes all the AWS service configurations for this project.
Amplify.configure(awsExports);

function App() {
  const { signOut } = useAuthenticator((context) => [context.user]);
  const [adventures, setAdventures] = useState<Adventure[]>([]);
  const [email, setEmail] = useState("");
  const [sub, setSub] = useState("");


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
    console.log("The Adventures are updated: ", adventures);
    setAdventures(adventures);
  }

  return (
    <Authenticator>
      <Grid templateAreas={{ base: `"nav" "main"` }}>
        <GridItem area="nav">
          <NavBar
            onLogout={signOut}
            onFetchUserProperties={handleFetchUserProperties}
            email={email}
            sub={sub}
          />
        </GridItem>
        <GridItem area="main">
          <Tabs size="md" variant="line" colorScheme="blue" w="100%">
            <TabList>
              <Tab
                fontSize={{
                  base: "sm",
                  sm: "sm",
                  md: "sm",
                  lg: "lg",
                  xl: "lg",
                  "2xl": "lg",
                }}
              >
                Adventures
              </Tab>
              <Tab
                fontSize={{
                  base: "sm",
                  sm: "sm",
                  md: "sm",
                  lg: "lg",
                  xl: "lg",
                  "2xl": "lg",
                }}
              >
                Maps
              </Tab>
              <Tab
                fontSize={{
                  base: "sm",
                  sm: "sm",
                  md: "sm",
                  lg: "lg",
                  xl: "lg",
                  "2xl": "lg",
                }}
              >
                Tokens
              </Tab>
              <Tab
                fontSize={{
                  base: "sm",
                  sm: "sm",
                  md: "sm",
                  lg: "lg",
                  xl: "lg",
                  "2xl": "lg",
                }}
              >
                Entities
              </Tab>
              <Tab
                fontSize={{
                  base: "sm",
                  sm: "sm",
                  md: "sm",
                  lg: "lg",
                  xl: "lg",
                  "2xl": "lg",
                }}
              >
                Scenes
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <AdventureGrid email={email} sub={sub} onAdventuresUpdated={onAdventuresUpdated}/>
              </TabPanel>
              <TabPanel>
                <MapGrid email={email} sub={sub} />
              </TabPanel>
              <TabPanel>
                <TokenGrid email={email} sub={sub} />
              </TabPanel>
              <TabPanel>
                <EntityGrid email={email} sub={sub} />
              </TabPanel>
              <TabPanel>
                <SceneGrid email={email} sub={sub} adventures={adventures}/>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </GridItem>
      </Grid>
    </Authenticator>
  );
}

export default App;
