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
  mapPicPath?: string | null | undefined;
  mapPicS3Url?: string | null | undefined;
  entityIds?: (string | null)[] | null | undefined;
}

export default Scene;