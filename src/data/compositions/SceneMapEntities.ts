import Entity from "../entity/Entity";

interface SceneMapEntities {
  id: string;
  name: string;
  creatorEmail: string;
  creatorId: string;
  description?: string | null | undefined;
  adventureId?: string;
  adventureName?: string | null | undefined;
  mapId?: string;
  mapName?: string | null | undefined;
  mapPicPath?: string | null | undefined;
  mapPicS3Url?: string | null | undefined;
  entityIds?: (string | null)[] | null | undefined;
  entities?: (Entity | null)[] | null | undefined;
}

export default SceneMapEntities;
