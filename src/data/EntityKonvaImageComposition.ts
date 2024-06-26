import Entity from "./Entity";

interface EntityKonvaImageComposition {
  entity: Entity;
  imageElement: HTMLImageElement;
  xPos: number | undefined;
  yPos: number | undefined;
}

export default EntityKonvaImageComposition;
