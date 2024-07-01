// React Imports
import { useEffect, useState } from "react";

// Storage S3
import { getUrl } from "aws-amplify/storage";

// Dynamo DB imports
import { generateClient } from "aws-amplify/api";
import * as queries from "../graphql/queries";

// Custom Imports
import Map from "../data/map/Map";
//import MapCategories from "../data/map/MapGategories";

const useMaps = (creatorEmail: string, category: string, shared: boolean) => {
  const [maps, setMaps] = useState<Map[]>([]);
  //const [mapError, setMapError] = useState();

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

  const listMaps = async () => {
    const listMapVariables = getListVariables(creatorEmail, category, shared);
    const graphqlClient = generateClient();
    const response = await graphqlClient.graphql({
      query: queries.listMaps,
      variables: listMapVariables,
    });
    const mapList = response.data.listMaps.items;

    mapList.forEach(async (map) => {
      const mapPicPath = map.mapPicPath;
      const getUrlResult = await getUrl({
        path: mapPicPath!,
        options: {
          expiresIn: 900,
        },
      });
      const mapPicS3Url = getUrlResult.url.toString();
      map.mapPicS3Url = mapPicS3Url;
    });

    mapList.sort((a, b) => a.name.localeCompare(b.name));
    console.log(mapList);
    setMaps(mapList);
  };

  useEffect(() => {
    listMaps();
  }, [creatorEmail, category, shared]);

  return { maps };
};

export default useMaps;
