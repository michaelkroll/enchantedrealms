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
  useDisclosure,
  HStack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";

// React Icon imports
import { TbDoorExit } from "react-icons/tb";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";

// Konva JS imports
import { Image as KonvaImage, Layer, Stage, Transformer } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";
import Konva from "konva";
import useImage from "use-image";

// Carousel imports
import { Carousel } from "../carousel/Carousel";
import { Context, Provider } from "../carousel/Provider";
import { LeftButton } from "../carousel/LeftButton";
import { RightButton } from "../carousel/RightButton";

// Cuustom imports
import CloseSceneEditorConfirmationAlert from "./CloseSceneEditorConfirmationAlert";
import Map from "../../data/Map";
import Scene from "../../data/Scene";
import FunctionMenu from "./FunctionMenu";
import useSceneForEditor from "../../hooks/useSceneForEditor";
import SceneEditorEntityCard from "./SceneEditorEntityCard";
import IsLoadingIndicator from "../IsLoadingIndicator";
import Entity from "../../data/Entity";
import EntityKonvaImageComposition from "../../data/EntityKonvaImageComposition";

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
  const dragUrl = useRef<string | undefined>();

  const [scene, setScene] = useState<Scene>();
  const [map, setMap] = useState<Map>();
  const toast = useToast();

  const carouselBackgroundColor = useColorModeValue("gray.300", "gray.600");
  const buttonColor = useColorModeValue("gray.50", "gray.700");
  const buttonHoverColor = useColorModeValue("blue.150", "blue.500");

  const [isLoadingScene, setIsLoadingScene] = useState(false);

  const navigate = useNavigate();
  const [selectedSceneId, setSelectedSceneId] = useState<string>("");
  const { sceneComposition, isCompositionValid } =
    useSceneForEditor(selectedSceneId);
  const [mapImage] = useImage(map?.mapPicS3Url!);
  const [entityImageCompositions, setEntityImageCompositions] = useState<
    EntityKonvaImageComposition[]
  >([]);

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
    const map = mapRef.current!;
    if (functionName === "Center") {
      centerMap();
    } else if (functionName === "Original Size 100%") {      
      const scale100 = { x: 1, y: 1 };
      scaleFactor = scale100;
      map.scale(scale100);
      centerMap();
    } else if (functionName === "Scale 75%") {
      const scale75 = { x: 0.75, y: 0.75 };
      scaleFactor = scale75;
      map.scale(scale75);
      centerMap();
    } else if (functionName === "Scale 50%") {
      const scale50 = { x: 0.5, y: 0.5 };
      scaleFactor = scale50;
      map.scale(scale50);
      centerMap();
    } else if (functionName === "Scale 25%") {
      const scale25 = { x: 0.25, y: 0.25 };
      scaleFactor = scale25;
      map.scale(scale25);
      centerMap();
    } else if (functionName === "Fit to Screen") {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const scaleX = windowWidth / map.getWidth();
      const scaleY = windowHeight / map.getHeight();
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
      <div
        onDrop={(e) => {
          e.preventDefault();
          stageRef.current!.setPointersPositions(e);

          const xDropPosition = stageRef.current!.getPointerPosition()?.x;
          const yDropPosition = stageRef.current!.getPointerPosition()?.y;
          const entity = JSON.parse(dragUrl.current!) as Entity;

          // let item1 = array.find(i => i.id === 1);

          const entityFound = entityImageCompositions.find(
            (composition) => composition.entity.id === entity.id
          );
          if (!entityFound) {
            const image = new Image(55, 55);
            image.src = entity.tokenPicS3Url!;
            image.draggable = true;

            const entityImageComposition = {
              entity: entity,
              imageElement: image,
              xPos: xDropPosition,
              yPos: yDropPosition,
            };
            setEntityImageCompositions([
              ...entityImageCompositions,
              entityImageComposition,
            ]);
          } else {
            console.log("Entity is already added to the map");
            toast({
              title: `'${entity.name}' has already been added to the map.`,
              status: "error",
              position: "bottom",
              isClosable: true,
              duration: 2000,
            });
          }

          // add the shape to the layer
          //entityLayerRef.current!.add(image).draw();
          // add the layer to the stage
        }}
        onDragOver={(e) => e.preventDefault()}
      >
        <Stage
          ref={stageRef}
          width={window.innerWidth}
          height={window.innerHeight}
          onWheel={onWheel}
          draggable={true}
        >
          <Layer>
            <KonvaImage
              ref={mapRef}
              image={mapImage}
            />
            {entityImageCompositions.map((entityImageComposition) => (
              <KonvaImage
                key={entityImageComposition.entity.id}
                id={entityImageComposition.entity.id}
                image={entityImageComposition.imageElement}
                x={entityImageComposition.xPos! - 55 / 2}
                y={entityImageComposition.yPos! - 55 / 2}
                height={55}
                width={55}
                draggable={true}
              />
            ))}
            <Transformer ref={transformerRef} />
          </Layer>
        </Stage>
      </div>
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
          background={buttonColor}
          _hover={{ bgColor: buttonHoverColor }}
          top="5px"
          left="5px"
          size="lg"
          aria-label="Leave the Scene Editor"
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
            height="225px"
            display="flex"
            position="absolute"
            bottom="5px"
            bg={carouselBackgroundColor}
            mt={4}
            rounded="md"
            gap={1}
          >
            <Provider>
              <Stack width="100%" height="220px">
                <Carousel gap={5}>
                  {sceneComposition!.entityCompositions!.map((composition) => (
                    <SceneEditorEntityCard
                      entity={composition!.entity}
                      dragUrlRef={dragUrl}
                    />
                  ))}
                </Carousel>
                <HStack justify="space-between">
                  <LeftButton
                    height="24px"
                    mb={1}
                    background={buttonColor}
                    _hover={{ bgColor: buttonHoverColor }}
                    customIcon={<FaArrowLeftLong />}
                  />
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
                    mb={1}
                    background={buttonColor}
                    _hover={{ bgColor: buttonHoverColor }}
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
          <Stack mt={2} position="absolute" top="200px">
            <IsLoadingIndicator loadingLabel={"Loading Scene Map and Entities ..."} />
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
