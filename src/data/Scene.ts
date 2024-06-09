import Adventure from "./Adventure";

interface Scene {
  id: string;
  name: string;
  creatorEmail: string;
  creatorId: string;
  description?: string | null | undefined;
  adventure?: Adventure | null;
}

export default Scene;