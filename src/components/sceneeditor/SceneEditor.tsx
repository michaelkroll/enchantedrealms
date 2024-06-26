// React imports
import { useEffect, useRef, useState } from "react";

// React Router imports
import { useNavigate, useParams } from "react-router-dom";

// Chakra UI imports
import {
  Box,
  Center,
  IconButton,
  Stack,
  Tooltip,
  Text,
  useColorMode,
  useDisclosure,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";

// React Icon imports
import { TbDoorExit } from "react-icons/tb";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";

// Konva JS imports
import { Layer, Stage, Transformer, Image, Rect } from "react-konva";
import Konva from "konva";
import useImage from "use-image";

// Cuustom imports
import CloseSceneEditorConfirmationAlert from "./CloseSceneEditorConfirmationAlert";
import Map from "../../data/Map";
import Scene from "../../data/Scene";
import { KonvaEventObject } from "konva/lib/Node";
import FunctionMenu from "./FunctionMenu";
import useSceneForEditor from "../../hooks/useSceneForEditor";
import SceneEditorEntityCard from "./SceneEditorEntityCard";
import IsLoadingIndicator from "../IsLoadingIndicator";
import { Carousel } from "../carousel/Carousel";
import { Context, Provider } from "../carousel/Provider";
import { LeftButton } from "../carousel/LeftButton";
import { RightButton } from "../carousel/RightButton";

interface Props {
  email: string;
}

const SceneEditor = ({ email }: Props) => {
  const params = useParams();
  const sceneId: string = params.sceneId!;

  console.log("Scene Editor Params email: ", email, " sceneId: ", sceneId);

  // Konva JS references
  const stageRef = useRef<Konva.Stage>(null);
  const backgroundRef = useRef<Konva.Rect>(null);
  const mapRef = useRef<Konva.Image>(null);
  const transformerRef = useRef<Konva.Transformer>(null);

  const [scene, setScene] = useState<Scene>();
  const [map, setMap] = useState<Map>();
  const { colorMode } = useColorMode();
  const carouselBackgroundColor = useColorModeValue("gray.300", "gray.600");

  const [isLoadingScene, setIsLoadingScene] = useState(false);

  const navigate = useNavigate();
  const [selectedSceneId, setSelectedSceneId] = useState<string>("");
  const { sceneComposition, isCompositionValid } =
    useSceneForEditor(selectedSceneId);
  const [mapImage] = useImage(map?.mapPicS3Url!);

  // The Scalefactor of the Map
  let scaleFactor = { x: 1.0, y: 1.0 };

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
    if (stageRef.current) {
      stageRef.current.setSize(size);
    }
    if (backgroundRef.current) {
      backgroundRef.current.setSize(size);
    }
  };

  window.addEventListener("resize", fitStageIntoWindow);

  useEffect(() => {
    console.log("Loading scene...");
    setIsLoadingScene(true);
    setSelectedSceneId(sceneId);
  }, []);

  useEffect(() => {
    if (sceneComposition != null) {
      setScene(sceneComposition.scene);
      setMap(sceneComposition.map);
      setIsLoadingScene(false);
    }
  }, [sceneComposition]);

  const onPointerDown = (event: KonvaEventObject<PointerEvent>) => {
    event;
    // console.log("Event: ", event);
  };

  const onPointerMove = (event: KonvaEventObject<PointerEvent>) => {
    event;
    // console.log("Event: ", event);
  };

  const onPointerUp = (event: KonvaEventObject<PointerEvent>) => {
    event;
    // console.log("Event: ", event);
  };

  const onWheel = (event: KonvaEventObject<WheelEvent>) => {
    event.evt.preventDefault();

    const map = mapRef.current!;
    var oldScale = map.scaleX();
    var scaleBy = 1.05;

    // how to scale? Zoom in? Or zoom out?
    // if direction == 1 > make map bigger
    // if direction == -1 < make map smaller
    let direction = event.evt.deltaY > 0 ? 1 : -1;

    var newScaleFactor =
      direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;

    const oldPositionX = map.getPosition().x;
    const oldPositionY = map.getPosition().y;
    const oldWidth = map.getWidth();
    const oldHeight = map.getHeight();

    const newScale = { x: newScaleFactor, y: newScaleFactor };

    map.scale(newScale);
    console.log("oldScale = ", oldScale, " newScale = ", newScale.x);

    scaleFactor = newScale;

    const newWidth = map.getWidth() * scaleFactor.x;
    const newHeight = map.getHeight() * scaleFactor.y;

    var newPosition = {
      x: oldPositionX - (oldWidth - newWidth),
      y: oldPositionY - (oldHeight - newHeight),
    };
    map.setPosition(newPosition);
    centerMap();
  };

  const onFunctionSelected = (functionName: string) => {
    console.log("Function Selected: ", functionName);
    if (functionName === "Center") {
      centerMap();
    } else if (functionName === "Original Size 100%") {
      const map = mapRef.current!;
      const scale100 = { x: 1, y: 1 };
      scaleFactor = scale100;
      map.scale(scale100);
      centerMap();
    } else if (functionName === "Scale 75%") {
      const map = mapRef.current!;
      const scale75 = { x: 0.75, y: 0.75 };
      scaleFactor = scale75;
      map.scale(scale75);
      centerMap();
    } else if (functionName === "Scale 50%") {
      const map = mapRef.current!;
      const scale50 = { x: 0.5, y: 0.5 };
      scaleFactor = scale50;
      map.scale(scale50);
      centerMap();
    } else if (functionName === "Scale 25%") {
      const map = mapRef.current!;
      const scale25 = { x: 0.25, y: 0.25 };
      scaleFactor = scale25;
      map.scale(scale25);
      centerMap();
    } else if (functionName === "Fit to Screen") {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const map = mapRef.current!;
      console.log(
        "Window w/h: ",
        windowWidth,
        "/",
        windowHeight,
        ", Map w/h: ",
        map.getWidth(),
        "/",
        map.getHeight()
      );
      const scaleX = windowWidth / map.getWidth();
      const scaleY = windowHeight / map.getHeight();

      console.log("scale x/y ", scaleX, "/", scaleY);
      let sc = 0;
      if (windowWidth > windowHeight) {
        sc = scaleY;
      } else {
        sc = scaleX;
      }

      const scale = { x: sc, y: sc };
      scaleFactor = scale;
      map.scale(scale);
      centerMap();
    }
  };

  const centerMap = () => {
    const map = mapRef.current!;
    const newPosition = {
      x: window.innerWidth / 2 - (map.getWidth() * scaleFactor.x) / 2,
      y: window.innerHeight / 2 - (map.getHeight() * scaleFactor.y) / 2,
    };
    map.setPosition(newPosition);
  };

  return (
    <>
      <Stage
        ref={stageRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onWheel={onWheel}
      >
        <Layer>
          <Rect
            ref={backgroundRef}
            x={0}
            y={0}
            height={window.innerHeight}
            width={window.innerWidth}
            fill={colorMode == "dark" ? "#000000" : "#ffffff"}
            id="bg"
          />
          <Image ref={mapRef} image={mapImage} draggable={true} />
          <Transformer ref={transformerRef} />
        </Layer>
      </Stage>

      <FunctionMenu
        positionTop={"5px"}
        positionRight={"5px"}
        direction={"column"}
        handleFunctionSelected={onFunctionSelected}
      />

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
          colorScheme="blue"
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

      {isCompositionValid && (
        <Center>
          <Box
            paddingLeft={1}
            paddingRight={1}
            width="500px"
            height="220px"
            display="flex"
            position="absolute"
            bottom="5px"
            bg={carouselBackgroundColor}
            mt={4}
            rounded="md"
            gap={1}
          >
            <Provider>
              <Stack width="100%" height="215px">
                <Carousel gap={5}>
                  {sceneComposition!.entityCompositions!.map((composition) => (
                    <SceneEditorEntityCard entity={composition!.entity} />
                  ))}
                </Carousel>
                <HStack justify="space-between">
                  <LeftButton height="24px " customIcon={<FaArrowLeftLong />} />

                  <Context.Consumer>
                    {(value) => (
                      <Text>
                        Showing {value?.activeItem! + 1} -{" "}
                        {value?.activeItem! + value?.constraint!} out of{" "}
                        {sceneComposition!.entityCompositions!.length} entities
                      </Text>
                    )}
                  </Context.Consumer>

                  <RightButton
                    height="24px"
                    customIcon={<FaArrowRightLong />}
                  />
                </HStack>
              </Stack>
            </Provider>
          </Box>
        </Center>
      )}

      {isLoadingScene && (
        <Center>
          <Stack mt={2} position="absolute" top="100px">
            <IsLoadingIndicator loadingLabel={"Loading Scene Assets ..."} />
          </Stack>
        </Center>
      )}

      <CloseSceneEditorConfirmationAlert
        isOpen={isExitEditorConfirmAlertOpen}
        onClose={onExitEditorConfirmAlertClose}
        onLeave={leaveSceneEditor}
      />
    </>
  );
};

export default SceneEditor;
