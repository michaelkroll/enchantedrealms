// React Imports
import { useEffect, useState } from "react";

// Dynamo DB imports
import { generateClient } from "aws-amplify/api";
import { listScenes } from "../graphql/queries";

// Custom Imports
import Scene from "../data/Scene";

const useScenes = (creatorEmail: string, adventureId: string) => {

  const [scenes, setScenes] = useState<Scene[]>([]);
  const [scenesError, setScenesError] = useState();

  useEffect(() => {
    const graphqlClient = generateClient();

    const filters = {
      filter: {
        and: [
          {
            creatorEmail: {
              eq: creatorEmail,
            },
          },
          {
            adventureId: {
              eq: adventureId,
            },
          },
        ],
      },
    };

    graphqlClient
      .graphql({
        query: listScenes,
        variables: filters,
      })
      .then((response) => {
        const scenesList = response.data.listScenes.items;
        scenesList.sort((a, b) => a.name.localeCompare(b.name));
        setScenes(scenesList!);
      })
      .catch((error) => {
        setScenesError(error);
      });
  }, []);

  return {scenes, scenesError};
}

export default useScenes;