interface Token {
  id: string;
  name: string;
  shared?: boolean | null | undefined;
  systemProvided?: boolean | null | undefined;
  creatorEmail: string;
  creatorId: string;
  description?: string | null | undefined
  category: string;
  tokenPicPath?: string | null | undefined;
  tokenPicS3Url?: string | null | undefined;
  selected?: boolean | null | undefined;
  tags?: (string | null)[] | null | undefined;
}

export default Token;