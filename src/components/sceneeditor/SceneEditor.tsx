// React imports
import { useEffect, useRef, useState } from "react";

// React Router imports
import { useNavigate, useParams } from "react-router-dom";

// Chakra UI imports
import {
  Center,
  IconButton,
  Stack,
  Tooltip,
  useDisclosure,
  useColorModeValue,
  useToast,
  Menu,
  MenuList,
  MenuItem,
  MenuDivider,
  MenuGroup,
} from "@chakra-ui/react";

// React Icon imports
import { TbDoorExit } from "react-icons/tb";
import { TbWindowMinimize } from "react-icons/tb";
import { TbRotate2 } from "react-icons/tb";
import { GiResize } from "react-icons/gi";
import { IoRemoveCircleOutline } from "react-icons/io5";

// Konva JS imports
import { Image as KonvaImage, Layer, Stage, Transformer } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";
import Konva from "konva";
import useImage from "use-image";

// Custom imports
import CloseSceneEditorConfirmationAlert from "./CloseSceneEditorConfirmationAlert";
import Map from "../../data/map/Map";
import Scene from "../../data/Scene";
import useSceneForEditor from "../../hooks/useSceneForEditor";
import IsLoadingIndicator from "../IsLoadingIndicator";
import Entity from "../../data/entity/Entity";
import EntityKonvaImageComposition from "../../data/compositions/EntityKonvaImageComposition";
import EntityCarousel from "../entities/EntityCarousel";
import ToolsMenu, { Tools } from "../menu/ToolsMenu";
import EntityPosition from "../../data/entity/EntityPosition";

const SceneEditor = () => {
  const params = useParams();
  const sceneId: string = params.sceneId!;

  // Konva JS references
  const stageRef = useRef<Konva.Stage>(null);
  const backgroundRef = useRef<Konva.Rect>(null);
  const mapRef = useRef<Konva.Image>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const dragUrl = useRef<string | undefined>();

  const [selectedTool, setSelectedTool] = useState("");

  const [scene, setScene] = useState<Scene>();
  const [map, setMap] = useState<Map>();

  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [entityIdContextMenu, setEntityIdContextMenu] = useState("");

  // Default values set to 100, changed based on the maps gridded flag set.
  const [tokenWidth, setTokenWidth] = useState(100);
  const [tokenHeight, setTokenHeight] = useState(100);

  // Scalefactor which is applied to the stage
  const [scaleFactor, setScaleFactor] = useState<number>(1.0);

  const toast = useToast();

  const buttonColor = useColorModeValue("gray.300", "gray.700");
  const buttonHoverColor = useColorModeValue("blue.400", "blue.500");
  const buttonActiveColor = useColorModeValue("blue.500", "blue.500");

  const [isLoadingScene, setIsLoadingScene] = useState(false);

  const navigate = useNavigate();
  const [selectedSceneId, setSelectedSceneId] = useState<string>("");
  const {
    sceneComposition,
    isCompositionValid,
    storeEntityPosition,
    deleteEntityPosition,
  } = useSceneForEditor(selectedSceneId);
  const [mapImage, mapImageStatus] = useImage(map?.mapPicS3Url!);
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
    if (mapImageStatus === "loaded") {
      setIsLoadingScene(false);
    } else if (mapImageStatus === "loading") {
    } else if (mapImageStatus == "failed") {
      setIsLoadingScene(false);
      toast({
        title:
          "An error occured while loading the map. Please close/leave the editor and try again.",
        status: "error",
        position: "top",
        isClosable: true,
        duration: 2000,
      });
    }
  }, [mapImageStatus]);

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
      const entityImageCompositionArray: EntityKonvaImageComposition[] = [];
      sceneComposition?.entityCompositions!.map((entityComposition) => {
        if (entityComposition?.entityPosition) {
          const entityImageComposition = getEntityImageComposition(
            entityComposition?.entity!,
            entityComposition?.entityPosition!
          );
          entityImageCompositionArray.push(entityImageComposition);
        }
      });
      setEntityImageCompositions(entityImageCompositionArray);
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
    if (selectedTool == Tools.Move) {
      stageRef.current!.container().style.cursor = "move";
    } else if (selectedTool == Tools.Select) {
      stageRef.current!.container().style.cursor = "default";
    }
  };

  const onStageMouseUp = (_: Konva.KonvaEventObject<MouseEvent>): void => {
    if (selectedTool == Tools.Move) {
      stageRef.current!.container().style.cursor = "grab";
    } else if (selectedTool == Tools.Select) {
      stageRef.current!.container().style.cursor = "default";
    }
  };

  const onStageMouseEnter = (_: Konva.KonvaEventObject<MouseEvent>): void => {
    if (selectedTool == Tools.Move) {
      stageRef.current!.container().style.cursor = "grab";
    } else if (selectedTool == Tools.Select) {
      stageRef.current!.container().style.cursor = "default";
    }
  };

  const onStageMouseLeave = (_: Konva.KonvaEventObject<MouseEvent>): void => {
    if (selectedTool == Tools.Move) {
      stageRef.current!.container().style.cursor = "default";
    } else if (selectedTool == Tools.Select) {
      stageRef.current!.container().style.cursor = "default";
    }
  };

  const onStageClick = (event: Konva.KonvaEventObject<MouseEvent>): void => {
    if (event.target.attrs.name !== "Entity") {
      disableTransformation();
    }
  };

  // Entity Mouse Handler
  const onEntityDragMove = (_: Konva.KonvaEventObject<DragEvent>): void => {};

  const onEntityDragEnd = (_: Konva.KonvaEventObject<DragEvent>): void => {};

  const onEntityMouseDown = (_: Konva.KonvaEventObject<MouseEvent>): void => {
    //console.log("The selected EntityID: ", e.target.attrs.id);
    if (selectedTool == Tools.Move) {
      stageRef.current!.container().style.cursor = "grabbing";
    } else if (selectedTool == Tools.Select) {
      stageRef.current!.container().style.cursor = "pointer";
    }
  };

  const onEntityMouseUp = (evt: Konva.KonvaEventObject<MouseEvent>): void => {
    if (evt.evt.button == 0) {
      const entityPosition = {
        id: evt.target.attrs.id,
        entityId: evt.target.attrs.id,
        xPosition: evt.target.attrs.x,
        yPosition: evt.target.attrs.y,
        xScale: evt.target.attrs.scaleX,
        yScale: evt.target.attrs.scaleY,
        rotation: evt.target.attrs.rotation,
      };

      storeEntityPosition(entityPosition);
    }

    if (selectedTool == Tools.Move) {
      stageRef.current!.container().style.cursor = "grab";
    } else if (selectedTool == Tools.Select) {
      stageRef.current!.container().style.cursor = "pointer";
    }
  };

  const onEntityMouseEnter = (_: Konva.KonvaEventObject<MouseEvent>): void => {
    if (selectedTool == Tools.Move) {
      stageRef.current!.container().style.cursor = "grab";
    } else if (selectedTool == Tools.Select) {
      stageRef.current!.container().style.cursor = "pointer";
    }
  };

  const onEntityMouseLeave = (_: Konva.KonvaEventObject<MouseEvent>): void => {
    if (selectedTool == Tools.Move) {
      stageRef.current!.container().style.cursor = "grab";
    } else if (selectedTool == Tools.Select) {
      stageRef.current!.container().style.cursor = "default";
    }
  };

  const onEntityTransformEnd = (evt: Konva.KonvaEventObject<Event>): void => {
    const entityPosition = {
      id: evt.target.attrs.id,
      entityId: evt.target.attrs.id,
      xPosition: evt.target.attrs.x,
      yPosition: evt.target.attrs.y,
      xScale: evt.target.attrs.scaleX,
      yScale: evt.target.attrs.scaleY,
      rotation: evt.target.attrs.rotation,
    };
    storeEntityPosition(entityPosition);
  };

  const onEntityContextMenu = (
    evt: Konva.KonvaEventObject<PointerEvent>
  ): void => {
    setEntityIdContextMenu(evt.target.attrs.id);
    evt.evt.preventDefault();
    setIsContextMenuOpen(true);

    const menu = document.querySelector("[role=menu]");
    const popper = menu!.parentElement;
    const x = evt.evt.clientX;
    const y = evt.evt.clientY;

    Object.assign(popper!.style, {
      top: `${y}px`,
      left: `${x}px`,
    });
  };

  const contextMenuResetEntityRotation = () => {
    const stage = stageRef.current!;
    const image = stage.find("#" + entityIdContextMenu)[0];
    new Konva.Tween({
      node: image,
      duration: 0.5,
      rotation: 0,
      easing: Konva.Easings.EaseOut,
      onFinish: () => {
        storeModifedEntityFromMap(entityIdContextMenu);
      },
    }).play();
  };

  const contextMenuResetEntityScale = () => {
    const stage = stageRef.current!;
    const image = stage.find("#" + entityIdContextMenu)[0];
    new Konva.Tween({
      node: image,
      duration: 0.5,
      scaleX: 1.0,
      scaleY: 1.0,
      easing: Konva.Easings.EaseOut,
      onFinish: () => {
        storeModifedEntityFromMap(entityIdContextMenu);
      },
    }).play();
  };

  const contextMenuRemoveEntity = () => {
    const entityImageCompositionFound = entityImageCompositions.find(
      (composition) => composition.entity.id === entityIdContextMenu
    );

    const entityCompositionFound = sceneComposition?.entityCompositions!.find(
      (composition) =>
        composition?.entityPosition?.entityId === entityIdContextMenu
    );

    deleteEntityPosition(entityCompositionFound?.entityPosition!);

    setEntityImageCompositions((oldValues) => {
      return oldValues.filter(
        (entityImageComposition) =>
          entityImageComposition.entity.id !==
          entityImageCompositionFound!.entity.id
      );
    });
  };

  const contextMenuResizeEntityFactor2 = () => {
    const stage = stageRef.current!;
    const image = stage.find("#" + entityIdContextMenu)[0];
    new Konva.Tween({
      node: image,
      duration: 0.5,
      scaleX: 2.0,
      scaleY: 2.0,
      easing: Konva.Easings.EaseOut,
      onFinish: () => {
        storeModifedEntityFromMap(entityIdContextMenu);
      },
    }).play();
  };

  const contextMenuResizeEntityFactor3 = () => {
    const stage = stageRef.current!;
    const image = stage.find("#" + entityIdContextMenu)[0];
    new Konva.Tween({
      node: image,
      duration: 0.5,
      scaleX: 3.0,
      scaleY: 3.0,
      easing: Konva.Easings.EaseOut,
      onFinish: () => {
        storeModifedEntityFromMap(entityIdContextMenu);
      },
    }).play();
  };

  const onToolSelected = (toolName: string) => {
    setSelectedTool(toolName);
    if (toolName == Tools.Move) {
      disableTransformation();
    }
  };

  const handleEntityClicked = (evt: Konva.KonvaEventObject<MouseEvent>) => {
    if (selectedTool != Tools.Select) return;
    const target = evt.currentTarget;
    transformerRef!.current!.nodes([target]);
  };

  const disableTransformation = () => {
    transformerRef?.current!.nodes([]);
  };

  const getEntityImageComposition = (
    entity: Entity,
    entityPosition: EntityPosition
  ) => {
    const image = new Image(tokenWidth, tokenHeight);
    image.src = entity.tokenPicS3Url!;
    image.draggable = true;

    const stagePosX = stageRef.current?.x()!;
    const stagePosY = stageRef.current?.y()!;
    let entityPosX = entityPosition.xPosition! / scaleFactor;
    let entityPosY = entityPosition.yPosition! / scaleFactor;

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
      xScale: entityPosition.xScale,
      yScale: entityPosition.yScale,
      rotation: entityPosition.rotation,
    };

    return entityImageComposition;
  };

  const addEntityToMap = (entity: Entity, entityPosition: EntityPosition) => {
    const image = new Image(tokenWidth, tokenHeight);
    image.src = entity.tokenPicS3Url!;
    image.draggable = true;

    const stagePosX = stageRef.current?.x()!;
    const stagePosY = stageRef.current?.y()!;
    let entityPosX = entityPosition.xPosition! / scaleFactor;
    let entityPosY = entityPosition.yPosition! / scaleFactor;

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

    const newEntityImageComposition = {
      entity: entity,
      imageElement: image,
      xPos: entityPosX,
      yPos: entityPosY,
      xScale: entityPosition.xScale,
      yScale: entityPosition.yScale,
      rotation: entityPosition.rotation,
    };

    setEntityImageCompositions([
      ...entityImageCompositions,
      newEntityImageComposition,
    ]);
  };

  const storeModifedEntityFromMap = (entityId: string) => {
    const entityFound = entityImageCompositions.find(
      (composition) => composition.entity.id === entityId
    );
    const stage = stageRef.current!;
    const image = stage.find("#" + entityIdContextMenu)[0];

    const entityPosition = {
      id: entityIdContextMenu,
      entityId: entityIdContextMenu,
      xPosition: entityFound?.xPos,
      yPosition: entityFound?.yPos,
      xScale: image.scaleX(),
      yScale: image.scaleY(),
      rotation: image.rotation(),
    };
    storeEntityPosition(entityPosition);
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
            const entityPosition = {
              id: entity.id,
              entityId: entity.id,
              xPosition: xDropPosition,
              yPosition: yDropPosition,
              scaleX: 1.0,
              scaleY: 1.0,
              rotation: 0,
            };

            addEntityToMap(entity, entityPosition);
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
          draggable={selectedTool == Tools.Move}
          onWheel={onWheel}
          onDragMove={onStageDragMove}
          onDragEnd={onStageDragEnd}
          onMouseDown={onStageMouseDown}
          onMouseUp={onStageMouseUp}
          onMouseLeave={onStageMouseLeave}
          onMouseEnter={onStageMouseEnter}
          onClick={onStageClick}
        >
          <Layer>
            <KonvaImage ref={mapRef} image={mapImage} />
            {entityImageCompositions.map((entityImageComposition) => (
              <KonvaImage
                name="Entity"
                key={entityImageComposition.entity.id}
                id={entityImageComposition.entity.id}
                image={entityImageComposition.imageElement}
                x={entityImageComposition.xPos!}
                y={entityImageComposition.yPos!}
                scaleX={entityImageComposition.xScale!}
                scaleY={entityImageComposition.yScale!}
                rotation={entityImageComposition.rotation!}
                height={tokenHeight}
                width={tokenHeight}
                draggable={true}
                onMouseEnter={onEntityMouseEnter}
                onMouseLeave={onEntityMouseLeave}
                onMouseDown={onEntityMouseDown}
                onMouseUp={onEntityMouseUp}
                onDragMove={onEntityDragMove}
                onDragEnd={onEntityDragEnd}
                onClick={handleEntityClicked}
                onTransformEnd={onEntityTransformEnd}
                onContextMenu={onEntityContextMenu}
              />
            ))}

            {/*
            Code showing the customization of the transformer handles. 
            https://codesandbox.io/p/sandbox/react-konva-rotater-customization-forked-jwyj7h?file=%2Fsrc%2Findex.tsx%3A166%2C13-166%2C36 
            */}
            <Transformer
              rotationSnaps={[0, 45, 90, 135, 180, 225, 270]}
              ref={transformerRef}
              rotateAnchorOffset={20}
              anchorStyleFunc={(anchor) => {
                if (
                  anchor.hasName("middle-left") ||
                  anchor.hasName("middle-right")
                ) {
                  anchor.cornerRadius(10);
                  anchor.height(20);
                  anchor.offsetY(10);
                  anchor.width(6);
                  anchor.offsetX(3);
                  return;
                }
                if (
                  anchor.hasName("bottom-center") ||
                  anchor.hasName("top-center")
                ) {
                  anchor.cornerRadius(10);
                  anchor.height(6);
                  anchor.offsetY(3);
                  anchor.width(20);
                  anchor.offsetX(10);
                  return;
                }
                if (anchor.hasName("rotater")) {
                  anchor.cornerRadius(10);
                  anchor.height(20);
                  anchor.width(20);
                  anchor.offsetY(10);
                  anchor.offsetX(10);
                  return;
                }
                anchor.cornerRadius(6);
                anchor.height(12);
                anchor.width(12);
                anchor.offsetY(6);
                anchor.offsetX(6);
              }}
            />
          </Layer>
        </Stage>
      </div>

      <Menu
        isOpen={isContextMenuOpen}
        onClose={() => {
          setIsContextMenuOpen(false);
        }}
      >
        <MenuList>
          <MenuGroup title="Transform">
            <MenuItem
              icon={<GiResize />}
              onClick={() => contextMenuResizeEntityFactor2()}
            >
              Resize to 2x2 on Grid
            </MenuItem>
            <MenuItem
              icon={<GiResize />}
              onClick={() => contextMenuResizeEntityFactor3()}
            >
              Resize to 3x3 on Grid
            </MenuItem>
          </MenuGroup>
          <MenuDivider />
          <MenuGroup title="Reset">
            <MenuItem
              icon={<TbRotate2 />}
              onClick={() => contextMenuResetEntityRotation()}
            >
              Reset Rotation
            </MenuItem>
            <MenuItem
              icon={<TbWindowMinimize />}
              onClick={() => contextMenuResetEntityScale()}
            >
              Reset Scale
            </MenuItem>
          </MenuGroup>
          <MenuDivider />
          <MenuGroup title="Remove">
            <MenuItem
              icon={<IoRemoveCircleOutline />}
              onClick={() => contextMenuRemoveEntity()}
            >
              Remove from Map
            </MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>

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
          _active={{ bgColor: buttonActiveColor }}
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
        <EntityCarousel
          entityCompositions={sceneComposition?.entityCompositions}
          dragUrl={dragUrl}
        />
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

      <ToolsMenu
        positionTop={"5px"}
        positionRight={"5px"}
        direction={"column"}
        handleToolSelected={onToolSelected}
      />

      <CloseSceneEditorConfirmationAlert
        isOpen={isExitEditorConfirmAlertOpen}
        onClose={onExitEditorConfirmAlertClose}
        onLeave={leaveSceneEditor}
      />
    </>
  );
};

export default SceneEditor;
