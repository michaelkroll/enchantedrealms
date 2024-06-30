import Entity from "../entity/Entity";

interface EntityKonvaImageComposition {
  entity: Entity;
  imageElement: HTMLImageElement;
  xPos: number | undefined;
  yPos: number | undefined;
}

export default EntityKonvaImageComposition;
