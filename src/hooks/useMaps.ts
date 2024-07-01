// React Imports
import { useEffect, useState } from "react";

// Storage S3
import { getUrl } from "aws-amplify/storage";

// Dynamo DB imports
import { generateClient } from "aws-amplify/api";
import * as queries from "../graphql/queries";

// Custom Imports
import Map from "../data/map/Map";

const useMaps = (creatorEmail: string, category: string, shared: boolean) => {
  const [maps, setMaps] = useState<Map[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [hasError, setErrorFlag] = useState(false);
  const [error, setError] = useState("");
  const [reloadTrigger, setReloadTrigger] = useState(0);

  const getListVariables = (
    creatorEmail: string,
    category: string,
    shared: boolean
  ): Object => {
    let listMapsVariables = {};
    if (category == "all") {
      listMapsVariables = {
        filter: {
          or: [
            {
              creatorEmail: {
                eq: creatorEmail,
              },
            },
            {
              shared: {
                eq: shared,
              },
            },
          ],
        },
      };
    } else {
      listMapsVariables = {
        filter: {
          and: [
            {
              or: [
                {
                  creatorEmail: {
                    eq: creatorEmail,
                  },
                },
                {
                  shared: {
                    eq: shared,
                  },
                },
              ],
            },
            {
              category: {
                eq: category,
              },
            },
          ],
        },
      };
    }
    return listMapsVariables;
  };

  const reloadMaps = () => {
    setReloadTrigger(reloadTrigger + 1);
  };

  const updateMap = (updatedMap: Map) => {
    setMaps(
      maps.map((map) =>
        map.id === updatedMap.id ? { ...map, shared: updatedMap.shared } : map
      )
    );
  };

  const deleteMap = (deletedMap: Map) => {
        const newMapArray = maps.filter((map) => map.id != deletedMap.id);
    setMaps(newMapArray);
  };

  const listMaps = async () => {
    setLoading(true);
    const listMapVariables = getListVariables(creatorEmail, category, shared);
    const graphqlClient = generateClient();
    const response = await graphqlClient.graphql({
      query: queries.listMaps,
      variables: listMapVariables,
    });
    const mapList = response.data.listMaps.items;

    mapList.forEach(async (map) => {
      // Get the S3 path to the map itself
      const mapPicPath = map.mapPicPath;
      const getUrlResultForMapPicPath = await getUrl({
        path: mapPicPath!,
        options: {
          expiresIn: 900,
        },
      });
      const mapPicS3Url = getUrlResultForMapPicPath.url.toString();
      map.mapPicS3Url = mapPicS3Url;

      // Get the S3 path to the map thumbnail
      const mapThumbPicPath = map.mapThumbPicPath;
      const getUrlResultForMapThumbPicPath = await getUrl({
        path: mapThumbPicPath!,
        options: {
          expiresIn: 900,
        },
      });
      const mapThumbPicS3Url = getUrlResultForMapThumbPicPath.url.toString();
      map.mapThumbPicS3Url = mapThumbPicS3Url;
    });

    mapList.sort((a, b) => a.name.localeCompare(b.name));
    setMaps(mapList);
    setLoading(false);
    setErrorFlag(false);
    setError("");
  };

  useEffect(() => {
    setMaps([]);
    listMaps();
  }, [creatorEmail, category, shared, reloadTrigger]);

  return { reloadMaps, maps, updateMap, deleteMap, isLoading, hasError, error };
};

export default useMaps;
