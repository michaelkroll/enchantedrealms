// React Imports
import { useEffect, useState } from "react";

// Dynamo DB imports
import { generateClient } from "aws-amplify/api";
import { getMap } from "../graphql/queries";

// Custom Imports
import Map from "../data/map/Map";

const useMap = (mapId: string) => {
  const [map, setMap] = useState<Map>();
  const [mapError, setMapError] = useState();

  useEffect(() => {
    const graphqlClient = generateClient();

    graphqlClient
      .graphql({
        query: getMap,
        variables: { id: mapId },
      })
      .then((response) => {
        const map = response.data.getMap;
        setMap(map!);
      })
      .catch((error) => {
        setMapError(error);
      });
  }, []);

  return { map, mapError };
};

export default useMap;
