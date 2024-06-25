import Entity from "./Entity";
import EntityPosition from "./EntityPosition";

interface EntityComposition {
  entity: Entity;
  entityPosition?: EntityPosition | null | undefined;
}

export default EntityComposition;
