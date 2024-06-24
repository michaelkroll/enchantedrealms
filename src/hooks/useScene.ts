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

  const [sceneObject, setSceneObject] = useState<Scene>();
  const [mapObject, setMapObject] = useState<Map>();
  const [errorString, setErrorString] = useState("");

  const loadScene = async () => {
    const graphqlClient = generateClient();
    const oneScene = await graphqlClient.graphql({
      query: getScene,
      variables: { id: sceneId }
    });
    if (oneScene.data.getScene) {
      setSceneObject(oneScene.data.getScene);
    }
    else {
      setErrorString("Error loading Scene.");
    }
  };

  const loadMap = async () => { 
    const graphqlClient = generateClient();
    const oneMap = await graphqlClient.graphql({
      query: getMap,
      variables: { id: sceneObject!.mapId }
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
      setMapObject(oneMap.data.getMap);
    }
    else {
      setErrorString("Error loading Map.");
    }
  };

  useEffect(() => {
    console.log("Get the scene for: ", sceneId);
    loadScene();
  }, [sceneId]);

  useEffect(() => {
    if (sceneObject != null) {
      console.log("Get the map for: ", sceneObject?.mapId);
      loadMap();
    }
  }, [sceneObject]);

  return {sceneObject, mapObject, errorString};
}

export default useScene;