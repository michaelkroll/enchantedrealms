// React Imports
import { useEffect, useState } from "react";

// Dynamo DB imports
import { generateClient } from "aws-amplify/api";
import { getAdventure } from "../graphql/queries";

// Custom Imports
import Adventure from "../data/Adventure";

const useAdventure = (adventureId: string) => {

  const [adventure, setAdventure] = useState<Adventure>();
  const [adventureError, setAdventureError] = useState();

  useEffect(() => {
    const graphqlClient = generateClient();

    graphqlClient
      .graphql({
        query: getAdventure,
        variables: {id: adventureId},
      })
      .then((response) => {
        const adventure = response.data.getAdventure;
        setAdventure(adventure!);
      })
      .catch((error) => {
        setAdventureError(error);
      });
  }, []);

  return {adventure, adventureError};
}

export default useAdventure;