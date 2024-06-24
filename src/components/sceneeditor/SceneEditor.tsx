// React imports
import { useRef } from "react";

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

interface Props {
  email: string;
}

const SceneEditor = ({ email }: Props) => {
  const params = useParams();
  const sceneId: string = params.sceneId!;

  console.log("Params: ", email, sceneId);

  const buttonBackground = useColorModeValue("gray.200", "gray.700");

  const stageRef = useRef<Konva.Stage>(null);
  const transformerRef = useRef<Konva.Transformer>(null);

  const navigate = useNavigate();

  const { scene, sceneError } = useScene(sceneId);

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
      {sceneError && <Text> </Text>}
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
