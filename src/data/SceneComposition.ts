import Scene from "./Scene";
import Map from "./Map";
import EntityComposition from "./EntityComposition";

interface SceneComposition {
  scene: Scene;
  map: Map;
  entityCompositions?: (EntityComposition | null)[] | null | undefined;
}

export default SceneComposition;
