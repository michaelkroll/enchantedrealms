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

// Custom imports
import CloseSceneEditorConfirmationAlert from "./CloseSceneEditorConfirmationAlert";
import Map from "../../data/Map";
import Scene from "../../data/Scene";
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

  email;

  //console.log("Scene Editor Params email: ", email, " sceneId: ", sceneId);

  // Konva JS references
  const stageRef = useRef<Konva.Stage>(null);
  const backgroundRef = useRef<Konva.Rect>(null);
  const mapRef = useRef<Konva.Image>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const dragUrl = useRef<string | undefined>();

  const [scene, setScene] = useState<Scene>();
  const [map, setMap] = useState<Map>();

  // Default values set to 100, changed based on the maps gridded flag set.
  const [tokenWidth, setTokenWidth] = useState(100);
  const [tokenHeight, setTokenHeight] = useState(100);

  // Scalefactor which is applied to the stage
  const [scaleFactor, setScaleFactor] = useState<number>(1.0);

  const toast = useToast();

  const carouselBackgroundColor = useColorModeValue("gray.300", "gray.600");
  const buttonColor = useColorModeValue("gray.50", "gray.700");
  const buttonHoverColor = useColorModeValue("blue.150", "blue.500");

  const [isLoadingScene, setIsLoadingScene] = useState(false);

  const navigate = useNavigate();
  const [selectedSceneId, setSelectedSceneId] = useState<string>("");
  const { sceneComposition, isCompositionValid } =
    useSceneForEditor(selectedSceneId);
  const [mapImage, mapStatus] = useImage(map?.mapPicS3Url!);
  const [entityImageCompositions, setEntityImageCompositions] = useState<
    EntityKonvaImageComposition[]
  >([]);

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
    setIsLoadingScene(true);
    setSelectedSceneId(sceneId);
  }, []);

  useEffect(() => {
    if (mapStatus === "loaded") {
      console.log("Loaded map success.");
      setIsLoadingScene(false);
    }
    else if (mapStatus === "loading") {
      console.log("Loading map...");
    }
    else if (mapStatus == "failed") {
      console.log("Loading map failed.");
      setIsLoadingScene(false);
      toast({
        title: "An error occured while loading the map. Please close/leave the editor and try again.",
        status: "error",
        position: "top",
        isClosable: true,
        duration: 2000,
      });
    }
  }, [mapStatus]);

  useEffect(() => {
    if (sceneComposition != null) {
      setScene(sceneComposition.scene);

      if (sceneComposition.map?.gridded) {
        if (sceneComposition.map.gridCellWidth) {
          setTokenWidth(sceneComposition.map.gridCellWidth);
        }
        if (sceneComposition.map.gridCellHeight) {
          setTokenHeight(sceneComposition.map.gridCellHeight);
        }
      }
      setMap(sceneComposition.map);
    }
  }, [sceneComposition]);

  const onWheel = (event: KonvaEventObject<WheelEvent>) => {
    event.evt.preventDefault();

    var scaleBy = 1.05;

    var oldScale = stageRef.current!.scaleX();
    var pointer = stageRef.current!.getPointerPosition();

    var mousePointTo = {
      x: (pointer!.x - stageRef.current!.x()) / oldScale,
      y: (pointer!.y - stageRef.current!.y()) / oldScale,
    };

    // how to scale? Zoom in? Or zoom out?
    let direction = event.evt.deltaY > 0 ? 1 : -1;

    // when we zoom on trackpad, e.evt.ctrlKey is true
    // in that case lets revert direction
    if (event.evt.ctrlKey) {
      direction = -direction;
    }

    var newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;
    stageRef.current!.scale({ x: newScale, y: newScale });

    // Store the new ScaleFactor.
    setScaleFactor(newScale);

    var newPos = {
      x: pointer!.x - mousePointTo.x * newScale,
      y: pointer!.y - mousePointTo.y * newScale,
    };
    stageRef.current!.position(newPos);
  };

  // Stage Mouse Handler
  const onStageDragMove = (_: Konva.KonvaEventObject<DragEvent>): void => {};
  const onStageDragEnd = (_: Konva.KonvaEventObject<DragEvent>): void => {};
  const onStageMouseDown = (_: Konva.KonvaEventObject<MouseEvent>): void => {
    stageRef.current!.container().style.cursor = "move";
  };
  const onStageMouseUp = (_: Konva.KonvaEventObject<MouseEvent>): void => {
    stageRef.current!.container().style.cursor = "grab";
  };
  const onStageMouseEnter = (_: Konva.KonvaEventObject<MouseEvent>): void => {
    stageRef.current!.container().style.cursor = "grab";
  };
  const onStageMouseLeave = (_: Konva.KonvaEventObject<MouseEvent>): void => {
    stageRef.current!.container().style.cursor = "default";
  };

  // Entity Mouse Handler
  const onEntityDragMove = (_: Konva.KonvaEventObject<DragEvent>): void => {};

  const onEntityDragEnd = (_: Konva.KonvaEventObject<DragEvent>): void => {};

  const onEntityMouseDown = (_: Konva.KonvaEventObject<MouseEvent>): void => {
    stageRef.current!.container().style.cursor = "grabbing";
  };

  const onEntityMouseUp = (_: Konva.KonvaEventObject<MouseEvent>): void => {
    stageRef.current!.container().style.cursor = "grab";
  };

  const onEntityMouseEnter = (_: Konva.KonvaEventObject<MouseEvent>): void => {
    stageRef.current!.container().style.cursor = "grab";
  };

  const onEntityMouseLeave = (_: Konva.KonvaEventObject<MouseEvent>): void => {
    stageRef.current!.container().style.cursor = "grab";
  };

  return (
    <>
      <div
        onDrop={(e) => {
          e.preventDefault();
          stageRef.current!.setPointersPositions(e);

          const xDropPosition = stageRef.current!.getPointerPosition()?.x!;
          const yDropPosition = stageRef.current!.getPointerPosition()?.y!;
          const entity = JSON.parse(dragUrl.current!) as Entity;

          const entityFound = entityImageCompositions.find(
            (composition) => composition.entity.id === entity.id
          );

          if (!entityFound) {
            const image = new Image(tokenWidth, tokenHeight);
            image.src = entity.tokenPicS3Url!;
            image.draggable = true;

            const stagePosX = stageRef.current?.x()!;
            const stagePosY = stageRef.current?.y()!;
            let entityPosX = xDropPosition / scaleFactor;
            let entityPosY = yDropPosition / scaleFactor;

            if (stagePosX >= 0) {
              entityPosX -= stagePosX / scaleFactor;
            } else {
              entityPosX += (stagePosX / scaleFactor) * -1;
            }

            if (stagePosY >= 0) {
              entityPosY -= stagePosY / scaleFactor;
            } else {
              entityPosY += (stagePosY / scaleFactor) * -1;
            }

            const entityImageComposition = {
              entity: entity,
              imageElement: image,
              xPos: entityPosX,
              yPos: entityPosY,
            };

            setEntityImageCompositions([
              ...entityImageCompositions,
              entityImageComposition,
            ]);
          } else {
            toast({
              title: `'${entity.name}' has already been added to the map.`,
              status: "error",
              position: "bottom",
              isClosable: true,
              duration: 2000,
            });
          }
        }}
        onDragOver={(e) => e.preventDefault()}
      >
        <Stage
          ref={stageRef}
          width={window.innerWidth}
          height={window.innerHeight}
          draggable={true}
          onWheel={onWheel}
          onDragMove={onStageDragMove}
          onDragEnd={onStageDragEnd}
          onMouseDown={onStageMouseDown}
          onMouseUp={onStageMouseUp}
          onMouseLeave={onStageMouseLeave}
          onMouseEnter={onStageMouseEnter}
        >
          <Layer>
            <KonvaImage ref={mapRef} image={mapImage} />
            {entityImageCompositions.map((entityImageComposition) => (
              <KonvaImage
                key={entityImageComposition.entity.id}
                id={entityImageComposition.entity.id}
                image={entityImageComposition.imageElement}
                x={entityImageComposition.xPos! - tokenWidth / 2}
                y={entityImageComposition.yPos! - tokenHeight / 2}
                height={tokenHeight}
                width={tokenHeight}
                draggable={true}
                onMouseEnter={onEntityMouseEnter}
                onMouseLeave={onEntityMouseLeave}
                onMouseDown={onEntityMouseDown}
                onMouseUp={onEntityMouseUp}
                onDragMove={onEntityDragMove}
                onDragEnd={onEntityDragEnd}
              />
            ))}
            <Transformer ref={transformerRef} />
          </Layer>
        </Stage>
      </div>

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
                      key={composition!.entity.id}
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
            <IsLoadingIndicator
              loadingLabel={"Loading Scene Map and Entities ..."}
            />
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
