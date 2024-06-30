import Entity from "../entity/Entity";
import EntityPosition from "../entity/EntityPosition";

interface EntityComposition {
  entity: Entity;
  entityPosition?: EntityPosition | null | undefined;
}

export default EntityComposition;
