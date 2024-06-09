import Adventure from "./Adventure";

interface Scene {
  id: string;
  name: string;
  creatorEmail: string;
  creatorId: string;
  description?: string | null | undefined;
  adventureId?: string;
  adventure?: Adventure | null;
}

export default Scene;