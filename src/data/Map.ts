interface Map {
  id: string;
  creatorEmail: string;
  creatorId: string;
  name: string;
  shared?: boolean | null | undefined;
  description?: string | null | undefined;
  category: string;
  gridded?: boolean | null | undefined;
  mapThumbPicPath?: string | null | undefined;
  mapThumbPicS3Url?: string | null | undefined;
  mapPicPath?: string | null | undefined;
  mapPicS3Url?: string | null | undefined;
}

export default Map;
