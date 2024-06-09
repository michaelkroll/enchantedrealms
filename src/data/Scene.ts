interface Scene {
  id: string;
  name: string;
  creatorEmail: string;
  creatorId: string;
  description?: string | null | undefined;
  adventureId?: string;
  mapId?: string;
}

export default Scene;