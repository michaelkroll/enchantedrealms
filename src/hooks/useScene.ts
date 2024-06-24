// React Imports
import { useEffect, useState } from "react";

// Dynamo DB imports
import { generateClient } from "aws-amplify/api";
import { getScene } from "../graphql/queries";

// Custom Imports
import Scene from "../data/Scene";

const useScene = (sceneId: string) => {

  const [scene, setScene] = useState<Scene>();
  const [sceneError, setSceneError] = useState();

  useEffect(() => {
    const graphqlClient = generateClient();

    graphqlClient
      .graphql({
        query: getScene,
        variables: {id: sceneId},
      })
      .then((response) => {
        const scene = response.data.getScene;
        setScene(scene!);
      })
      .catch((error) => {
        setSceneError(error);
      });
  }, []);

  return {scene, sceneError};
}

export default useScene;