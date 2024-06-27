// React Imports
import { useEffect, useState } from "react";

// Dynamo DB imports
import { generateClient } from "aws-amplify/api";
import {
  getScene,
  getMap,
  getEntity,
  listEntityPositions,
} from "../graphql/queries";

// Storage S3
import { getUrl } from "aws-amplify/storage";

// Custom Imports
import { isAppSyncError, AppSyncError } from "../errors/AppSyncError";
import Scene from "../data/Scene";
import Map from "../data/Map";
import Entity from "../data/Entity";
import EntityComposition from "../data/EntityComposition";
import SceneComposition from "../data/SceneComposition";
import EntityPosition from "../data/EntityPosition";

const useSceneForEditor = (sceneId: string | undefined | null) => {
  const [sceneIdInternal, setSceneIdInternal] = useState("");
  const [sceneComposition, setSceneComposition] = useState<SceneComposition>();
  const [isLoadingScene, setIsLoadingScene] = useState(false);
  const [isCompositionValid, setIsCompositionValid] = useState(false);

  let scene: Scene;
  let map: Map;
  let entityCompositionArray: EntityComposition[] = [];

  const loadScene = async () => {
    setIsLoadingScene(true);
    //console.log("sceneIdInternal: ", sceneIdInternal);

    const graphqlClient = generateClient();
    // read the Scene
    try {
      const oneScene = await graphqlClient.graphql({
        query: getScene,
        variables: { id: sceneIdInternal },
      });

      if (oneScene.data.getScene) {
        scene = oneScene.data.getScene;
      }
    } catch (error) {
      if (isAppSyncError(error)) {
        let appSyncError: AppSyncError = error;
        console.error("Error reading scene with id: ", sceneIdInternal);
        console.error(" - Error Type: ", appSyncError.errors[0].errorType);
        console.error(" - Error Message: ", appSyncError.errors[0].message);
      }
      return;
    }

    // iterate over the entity ids and collect the information.
    if (scene.entityIds) {

      for (const entityId of scene.entityIds) {
        if (entityId) {
          let entity: Entity;

          try {
            const oneEntity = await graphqlClient.graphql({
              query: getEntity,
              variables: { id: entityId },
            });

            if (oneEntity.data.getEntity) {
              entity = oneEntity.data.getEntity;
            }
          } catch (error) {
            if (isAppSyncError(error)) {
              let appSyncError: AppSyncError = error;
              console.error("Error reading Entity with id: ", entityId);
              console.error(
                " - Error Type: ",
                appSyncError.errors[0].errorType
              );
              console.error(
                " - Error Message: ",
                appSyncError.errors[0].message
              );
            }
            return;
          }

          // read the TokenS3 Url
          const tokenPicPath = entity!.tokenPicPath;
          const getUrlResult = await getUrl({
            path: tokenPicPath!,
            options: {
              expiresIn: 900,
            },
          });

          const tokenPicS3Url = getUrlResult.url.toString();
          entity!.tokenPicS3Url = tokenPicS3Url;

          // read the entityposition for the entity
          const filters = {
            filter: {
              entityId: {
                eq: entity!.id,
              },
            },
          };

          const entityPositions = await graphqlClient.graphql({
            query: listEntityPositions,
            variables: filters,
          });

          if (entityPositions.data.listEntityPositions.items.length > 0) {
            let entityComposition: EntityComposition = {
              entity: entity!,
              entityPosition: entityPositions.data.listEntityPositions.items[0],
            };
            entityCompositionArray.push(entityComposition);
          } else {
            let entityComposition: EntityComposition = {
              entity: entity!,
              entityPosition: null,
            };
            entityCompositionArray.push(entityComposition);
          }
        }
      }
    }

    // read the Map
    try {
      const oneMap = await graphqlClient.graphql({
        query: getMap,
        variables: { id: scene.mapId },
      });

      if (oneMap.data.getMap) {
        map = oneMap.data.getMap;
        //console.log("Map: ", map)
      }
    } catch (error) {
      if (isAppSyncError(error)) {
        let appSyncError: AppSyncError = error;
        console.error("Error reading map with id: ", scene.mapId);
        console.error(" - Error Type: ", appSyncError.errors[0].errorType);
        console.error(" - Error Message: ", appSyncError.errors[0].message);
      }
    }

    // read the MapS3 Url
    const mapPicPath = map.mapPicPath;
    const getUrlResult = await getUrl({
      path: mapPicPath!,
      options: {
        expiresIn: 900,
      },
    });

    const mapPicS3Url = getUrlResult.url.toString();
    map.mapPicS3Url = mapPicS3Url;

    //console.log("Map with S3Url: ", map);

    const sceneComposition: SceneComposition = {
      scene: scene,
      map: map,
      entityCompositions: entityCompositionArray,
    };

    //console.log("Composition: ", sceneComposition);

    setSceneComposition(sceneComposition);
    setIsCompositionValid(true);
    setIsLoadingScene(false);
  };

  const setEntityPosition = (position: EntityPosition) => {
    console.log("Set Position: ", position);
  };

  useEffect(() => {
    if (sceneId != undefined && sceneId != null) {
      //console.log("useEffect: ", sceneId);
      setSceneIdInternal(sceneId);
    }
  }, [sceneId]);

  useEffect(() => {
    if (sceneIdInternal != "") {
      //console.log("Get scene for ID: ", sceneIdInternal);
      loadScene();
    } else {
      //console.log("SceneIdInternal is not set");
    }
  }, [sceneIdInternal]);

  return { setEntityPosition, sceneComposition, isCompositionValid, isLoadingScene };
};

export default useSceneForEditor;
