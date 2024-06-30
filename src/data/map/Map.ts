interface Map {
  id: string;
  creatorEmail: string;
  creatorId: string;
  name: string;
  shared?: boolean | null | undefined;
  description?: string | null | undefined;
  category: string;
  gridded?: boolean | null | undefined;
  drawGrid?: boolean | null | undefined;
  gridHtmlColor?: string | null | undefined;
  gridOffsetX?: number | null | undefined;
  gridOffsetY?: number | null | undefined;
  gridColumns?: number | null | undefined;
  gridRows?: number | null | undefined;
  gridCellWidth?: number | null | undefined;
  gridCellHeight?: number | null | undefined;
  mapThumbPicPath?: string | null | undefined;
  mapThumbPicS3Url?: string | null | undefined;
  mapPicPath?: string | null | undefined;
  mapPicS3Url?: string | null | undefined;
  selected?: boolean | null | undefined;
  tags?: (string | null)[] | null | undefined;
}

export default Map;
