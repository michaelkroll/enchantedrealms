interface Scene {
  id: string;
  name: string;
  creatorEmail: string;
  creatorId: string;
  description?: string | null | undefined;
  adventureId: string;
  adventureName: string;
  mapId: string;
  mapName: string;
  entityIds?: (string | null)[] | null | undefined;
}

export default Scene;