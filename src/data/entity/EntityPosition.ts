interface EntityPosition {
  id: string;
  entityId: string;
  xPosition?: number | null | undefined;
  yPosition?: number | null | undefined;
  xScale?: number | null | undefined;
  yScale?: number | null | undefined;
  rotation?: number | null | undefined;
}

export default EntityPosition;