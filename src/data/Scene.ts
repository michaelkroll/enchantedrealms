interface Scene {
  id: string;
  name: string;
  creatorEmail: string;
  creatorId: string;
  description?: string | null | undefined;
}

export default Scene;