// React imports
import { useEffect, useRef } from "react";

// React Router imports
import { useNavigate, useParams } from "react-router-dom";

// Chakra UI imports
import {
  IconButton,
  Text,
  Tooltip,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";

// React Icon imports
import { TbDoorExit } from "react-icons/tb";

// Konva JS imports
import { Layer, Stage, Transformer } from "react-konva";
import Konva from "konva";

// Cuustom imports
import CloseSceneEditorConfirmationAlert from "./CloseSceneEditorConfirmationAlert";
import useScene from "../../hooks/useScene";
//import Map from "../../data/Map";

interface Props {
  email: string;
}

const SceneEditor = ({ email }: Props) => {
  const params = useParams();
  const sceneId: string = params.sceneId!;

  console.log("Scene Editor Params email: ", email, " sceneId: ", sceneId);

  const buttonBackground = useColorModeValue("gray.200", "gray.700");

  const stageRef = useRef<Konva.Stage>(null);
  const transformerRef = useRef<Konva.Transformer>(null);

  const navigate = useNavigate();

  const { scene, map, error } = useScene(sceneId);

  // Leave Adventure Alert related
  const {
    isOpen: isExitEditorConfirmAlertOpen,
    onOpen: onExitEditorConfirmAlertOpen,
    onClose: onExitEditorConfirmAlertClose,
  } = useDisclosure();

  const leaveSceneEditor = () => {
    localStorage.setItem(
      "comingBackFromSceneEditorAdventureId",
      scene?.adventureId!
    );
    navigate("/scenes");
  };

  const fitStageIntoWindow = () => {
    const size = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    stageRef.current?.setSize(size);
  };

  window.addEventListener("resize", fitStageIntoWindow);

  useEffect(() => {
    if (scene != null && map != null) {
      console.log("Scene: ", scene);
      console.log("Map: ", map);
    }
  }, [scene, map]);

  return (
    <>
      <Stage
        ref={stageRef}
        width={window.innerWidth}
        height={window.innerHeight}
        // onPointerDown={onPointerDown}
        // onPointerMove={onPointerMove}
        // onPointerUp={onPointerUp}
      >
        <Layer>
          <Transformer ref={transformerRef} />
        </Layer>
      </Stage>
      {error && <Text> </Text>}
      <Tooltip
        hasArrow
        placement="right"
        label="Leave the adventure"
        bg="gray.300"
        color="black"
        openDelay={1000}
      >
        <IconButton
          position="absolute"
          bg={buttonBackground}
          top="5px"
          left="5px"
          size="lg"
          aria-label="Leave Adventure"
          icon={<TbDoorExit />}
          onClick={() => {
            onExitEditorConfirmAlertOpen();
          }}
        />
      </Tooltip>

      <CloseSceneEditorConfirmationAlert
        isOpen={isExitEditorConfirmAlertOpen}
        onClose={onExitEditorConfirmAlertClose}
        onLeave={leaveSceneEditor}
      />
    </>
  );
};

export default SceneEditor;
