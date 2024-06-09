interface Adventure {
  id: string;
  name: string;
  creatorEmail: string;
  creatorId: string;
  players?: (string | null)[] | null | undefined;
  description?: string | null | undefined
  adventurePicPath?: string | null | undefined;
  adventurePicS3Url?: string | null | undefined;
  selected?: boolean | null | undefined;
}

export default Adventure;