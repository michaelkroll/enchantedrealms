interface Entity {
  id: string;
  name: string;
  creatorEmail: string;
  creatorId: string;
  category?: string;
  description?: string | null | undefined;
  notes?: string | null | undefined;
  tokenId?: string | null | undefined;
  tokenPicPath?: string | null | undefined;
  tokenPicS3Url?: string | null | undefined;
  selected?: boolean | null | undefined;
  tags?: (string | null)[] | null | undefined;
}

export default Entity;