import Entity from "../entity/Entity";

interface EntityKonvaImageComposition {
  entity: Entity;
  imageElement: HTMLImageElement;
  xPos: number | undefined;
  yPos: number | undefined;
  xScale: number | null | undefined;
  yScale: number | null | undefined;
  rotation: number | null | undefined;
}

export default EntityKonvaImageComposition;
