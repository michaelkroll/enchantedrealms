// React Imports
import { useEffect, useState } from "react";

// Dynamo DB imports
import { generateClient } from "aws-amplify/api";
import { getScene, getMap } from "../graphql/queries";

// Storage S3
import { getUrl } from "aws-amplify/storage";

// Custom Imports
import Scene from "../data/Scene";
import Map from "../data/Map";

const useScene = (sceneId: string) => {

  const [scene, setScene] = useState<Scene>();
  const [map, setMap] = useState<Map>();
  const [error, setError] = useState("");

  const loadScene = async () => {
    const graphqlClient = generateClient();
    const oneScene = await graphqlClient.graphql({
      query: getScene,
      variables: { id: sceneId }
    });
    if (oneScene.data.getScene) {
      setScene(oneScene.data.getScene);
    }
    else {
      setError("Error loading Scene.");
    }
  };

  const loadMap = async () => { 
    const graphqlClient = generateClient();
    const oneMap = await graphqlClient.graphql({
      query: getMap,
      variables: { id: scene!.mapId }
    });
    if (oneMap.data.getMap) {
      const mapPicPath = oneMap.data.getMap.mapPicPath;
      const getUrlResult = await getUrl({
        path: mapPicPath!,
        options: {
          expiresIn: 900,
        },
      });

      const mapCoverImage = getUrlResult.url.toString();
      oneMap.data.getMap.mapPicS3Url = mapCoverImage;
      setMap(oneMap.data.getMap);
    }
    else {
      setError("Error loading Map.");
    }
  };

  useEffect(() => {
    console.log("Get the scene for: ", sceneId);
    loadScene();
  }, [sceneId]);

  useEffect(() => {
    if (scene != null) {
      console.log("Get the map for: ", scene?.mapId);
      loadMap();
    }
  }, [scene]);

  return {scene, map, error};
}

export default useScene;