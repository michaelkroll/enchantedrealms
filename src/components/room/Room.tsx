// React imports
import { useRef, useState } from "react";

// Konva imports
import { Layer, Stage, Transformer } from "react-konva";

// Chakra UI imports
import {
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Tooltip,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";

// React Router DOM imports
import { useNavigate, useParams } from "react-router-dom";

// React Icon imports
import { TbDoorExit } from "react-icons/tb";
import { FaInfo } from "react-icons/fa";

// Custom imports
//import { v4 as uuid } from "uuid";
import useAdventure from "../../hooks/useAdventure";
//import useChatMessages from "../../hooks/useChatMessages";
//import MessageComposer from "../chat/MessageComposer";
//import Messages from "../chat/Messages";
//import { KonvaEventObject } from "konva/lib/Node";
import Konva from "konva";
import LeaveRoomConfirmationAlert from "./LeaveRoomConfirmationAlert";
import ToolsMenu from "./ToolsMenu";

interface Props {
  email: string;
}

const Room = ({ email }: Props) => {
  const params = useParams();
  const adventureId: string = params.adventureId!;

  const buttonBackground = useColorModeValue("gray.200", "gray.700");

  const stageRef = useRef<Konva.Stage>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const [selectedTool, setSelectedTool] = useState("");
  const { adventure } = useAdventure(adventureId);

  const navigate = useNavigate();

  // Leave Adventure Alert related
  const {
    isOpen: isLeaveConfirmAlertOpen,
    onOpen: onLeaveConfirmAlertOpen,
    onClose: onLeaveConfirmAlertClose,
  } = useDisclosure();

  // Leave Adventure Alert related
  const {
    isOpen: isInformationPopoverOpen,
    onOpen: onInformationPopoverOpen,
    onClose: onInformationPopoverClose,
  } = useDisclosure();

  // const {
  //   storeChatMessage,
  //   subscribeToChatMessageUpdates,
  //   unsubscribeFromChatMessageUpdates,
  //   chatMessages,
  //   error,
  // } = useChatMessages(adventureId);

  // const handleSendMessage = (message: string) => {
  //   const newChatMessage = {
  //     id: uuid(),
  //     owner: email!,
  //     roomId: params.adventureId!,
  //     message: message!,
  //   };
  //   storeChatMessage(newChatMessage);
  // };

  // const enterRoom = () => {
  //   subscribeToChatMessageUpdates();
  // };

  const leaveRoom = () => {
    //unsubscribeFromChatMessageUpdates();
    navigate("/adventures");
  };

  // useEffect(() => {
  //   enterRoom();
  // }, []);

  // const onPointerDown = (event: KonvaEventObject<PointerEvent>) => {
  //   //console.log("Event: ", event);
  // };

  // const onPointerMove = (event: KonvaEventObject<PointerEvent>) => {
  //   // console.log("Event: ", event);
  // };

  // const onPointerUp = (event: KonvaEventObject<PointerEvent>) => {
  //   // console.log("Event: ", event);
  // };

  const onToolSelected = (toolName: string) => {
    setSelectedTool(toolName);
    console.log("Tool Selected: ", selectedTool);
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
            onLeaveConfirmAlertOpen();
          }}
        />
      </Tooltip>

      <ToolsMenu
        positionTop={"5px"}
        positionRight={"5px"}
        direction={"column"}
        handleToolSelected={onToolSelected}
      />

      <LeaveRoomConfirmationAlert
        adventureName={adventure?.name!}
        isOpen={isLeaveConfirmAlertOpen}
        onClose={onLeaveConfirmAlertClose}
        onLeave={leaveRoom}
      />

      <Popover
        isOpen={isInformationPopoverOpen}
        onOpen={onInformationPopoverOpen}
        onClose={onInformationPopoverClose}
        placement="right"
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <IconButton
            position="absolute"
            bg={buttonBackground}
            bottom="5px"
            left="5px"
            size="lg"
            aria-label="Info"
            icon={<FaInfo />}
            onClick={() => {
              onInformationPopoverOpen();
            }}
          />
        </PopoverTrigger>

        <Portal>
          <PopoverContent>
            <PopoverArrow />
            <PopoverBody>
              <Text as="b">Adventure Name</Text>
              <Text>'{adventure?.name}'</Text>
              <Text as="b">User Name</Text>
              <Text>{email}</Text>
              <Text as="b">Your Role</Text>
              <Text>
                {adventure?.creatorEmail === email ? "Game Master" : "Player"}
              </Text>
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
    </>
  );
};

export default Room;
