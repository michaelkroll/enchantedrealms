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

import {
  createEntityPosition,
  updateEntityPosition,
} from "../graphql/mutations";

import * as mutations from "../graphql/mutations";

// Storage S3
import { getUrl } from "aws-amplify/storage";

// Custom Imports
import { isAppSyncError, AppSyncError } from "../errors/AppSyncError";
import Scene from "../data/Scene";
import Map from "../data/map/Map";
import Entity from "../data/entity/Entity";
import EntityComposition from "../data/compositions/EntityComposition";
import SceneComposition from "../data/compositions/SceneComposition";
import EntityPosition from "../data/entity/EntityPosition";

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

    const graphqlClient = generateClient();

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

    const sceneComposition: SceneComposition = {
      scene: scene,
      map: map,
      entityCompositions: entityCompositionArray,
    };

    setSceneComposition(sceneComposition);
    setIsCompositionValid(true);
    setIsLoadingScene(false);
  };

  const deleteEntityPosition = async (position: EntityPosition) => {
    const client = generateClient();

    const positionDetails = {
      id: position.id,
    };

    await client.graphql({
      query: mutations.deleteEntityPosition,
      variables: { input: positionDetails },
    });
  };

  const storeEntityPosition = (position: EntityPosition) => {
    const entityComposition = sceneComposition!.entityCompositions?.find(
      (entityComposition) => entityComposition!.entity.id == position.entityId
    );

    const graphqlClient = generateClient();

    if (entityComposition?.entityPosition) {
      // if there is an entry, then update it!
      graphqlClient
        .graphql({
          query: updateEntityPosition,
          variables: { input: position },
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
    } else {
      // there is no position entry yet, so create one.
      graphqlClient
        .graphql({
          query: createEntityPosition,
          variables: { input: position },
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
    }
  };

  useEffect(() => {
    if (sceneId != undefined && sceneId != null) {
      setSceneIdInternal(sceneId);
    }
  }, [sceneId]);

  useEffect(() => {
    if (sceneIdInternal != "") {
      loadScene();
    }
  }, [sceneIdInternal]);

  return {
    storeEntityPosition,
    deleteEntityPosition,
    sceneComposition,
    isCompositionValid,
    isLoadingScene,
  };
};

export default useSceneForEditor;
