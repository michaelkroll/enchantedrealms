import Entity from "./Entity";

interface SceneMapEntities {
  id: string;
  name: string;
  creatorEmail: string;
  creatorId: string;
  description?: string | null | undefined;
  adventureName?: string | null | undefined;
  mapName?: string | null | undefined;
  mapPicPath?: string | null | undefined;
  mapPicS3Url?: string | null | undefined;
  entities?: (Entity | null)[] | null | undefined;
}

export default SceneMapEntities;