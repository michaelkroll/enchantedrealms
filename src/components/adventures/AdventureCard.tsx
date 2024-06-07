import { MdOutlineManageAccounts } from "react-icons/md";
import { MdOutlineDelete, MdOutlineEditNote } from "react-icons/md";
import { MdOutlineMeetingRoom } from "react-icons/md";
import Adventure from "../../data/Adventure";
import {
  Card,
  CardBody,
  Heading,
  Text,
  Image,
  Divider,
  CardFooter,
  Button,
  HStack,
  AvatarGroup,
  Avatar,
  Tooltip,
  ButtonGroup,
  useToast,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import AdventureManagePlayersForm from "./AdventureManagePlayersForm";
import { useState } from "react";
import AdventureDeleteConfirmationAlert from "./AdventureDeleteConfirmationAlert";

interface Props {
  adventure: Adventure;
  loggedInEmail: string;
  handleUpdateAdventure: (adventure: Adventure) => void;
  refreshGrid: () => void;
}

// https://codesandbox.io/p/sandbox/quiet-hooks-gefoy?file=%2Fsrc%2FApp.tsx%3A10%2C1-14%2C3
const TooltipAvatar: typeof Avatar = (props: any) => (
  <Tooltip label={props.name} hasArrow={props.hasArrow}>
    <Avatar {...props} />
  </Tooltip>
);

const AdventureCard = ({
  adventure,
  loggedInEmail,
  handleUpdateAdventure,
  refreshGrid,
}: Props) => {
  const cardBorderColor = useColorModeValue("gray.300", "gray.600");
  const cardBackgroundColor = useColorModeValue("gray.50", "gray.700");

  const toast = useToast();
  const [isPlayerManageDialogOpen, setPlayerManageDialogOpen] = useState(false);
  const [
    isDeleteAdventureConfirmModalOpen,
    setDeleteAdventureConfirmModalOpen,
  ] = useState(false);

  const onDeleteAdventureAlertConfirmClose = () => {
    setDeleteAdventureConfirmModalOpen(false);
  };

  const onDeleteMapAlertConfirmCloseAfterDelete = () => {
    setDeleteAdventureConfirmModalOpen(false);
    refreshGrid();
  };

  const onManagePlayersFormClose = () => {
    setPlayerManageDialogOpen(false);
  };

  const handleUpdatePlayerList = (updatedAdventure: Adventure) => {
    handleUpdateAdventure(updatedAdventure);
    setPlayerManageDialogOpen(false);
  };

  // const checkIfUserCanJoinAdventure = (
  //   adventure: Adventure,
  //   loggedInEmail: string
  // ): boolean => {
  //   let result: boolean = false;

  //   if (loggedInEmail == adventure.creatorEmail) {
  //     result = true;
  //   } else if (adventure.players != null) {
  //     if (adventure.players.includes(loggedInEmail)) {
  //       result = true;
  //     } else {
  //       result = false;
  //     }
  //   }
  //   return result;
  // };

  return (
    <>
      <Card
        variant="outline"
        borderColor={cardBorderColor}
        backgroundColor={cardBackgroundColor}
      >
        <CardBody padding={0}>
          <Image src={adventure.adventurePicS3Url!} borderTopRadius={4}/>
          <Stack
            paddingLeft={3}
            paddingRight={3}
            paddingTop={1}
            paddingBottom={2}
          >
            <Heading as="h4" size="md" paddingTop="10px">
              {adventure.name}
            </Heading>
            <Text paddingTop="10px">{adventure.description}</Text>
          </Stack>
        </CardBody>
        <Divider />
        <HStack
          justifyContent="space-between"
          paddingLeft={2}
          paddingRight={2}
          paddingTop={1}
          paddingBottom={0}
        >
          <Text fontSize="sm" paddingLeft="10px" paddingTop="10px">
            Game Master
          </Text>
          <Text fontSize="sm" paddingRight="10px" paddingTop="10px">
            Players
          </Text>
        </HStack>
        <HStack
          justifyContent="space-between"
          padding="10px"
          paddingLeft={2}
          paddingRight={2}
          paddingTop={0}
          paddingBottom={2}
        >
          <AvatarGroup size="md" padding="10px">
            <Tooltip label={adventure.creatorEmail} bg="gray.300" color="black">
              <Avatar
                bg={
                  adventure.creatorEmail == loggedInEmail
                    ? "green.300"
                    : "blue.300"
                }
                name={adventure.creatorEmail}
              />
            </Tooltip>
          </AvatarGroup>
          <AvatarGroup size="md" padding="10px">
            {adventure.players != null
              ? adventure.players.map((player) => (
                  <TooltipAvatar
                    key={player}
                    bg="blue.200"
                    name={player != null ? player : ""}
                  />
                ))
              : ""}
            ;
          </AvatarGroup>
        </HStack>
        <Divider />
        <CardFooter padding={2}>
          <ButtonGroup size="sm" isAttached>
            <Button
              // isDisabled={
              //   !checkIfUserCanJoinAdventure(adventure, loggedInEmail)
              // }
              isDisabled={true}
              variant="solid"
              leftIcon={<MdOutlineMeetingRoom />}
              size="sm"
              onClick={() =>
                toast({
                  title: "Join the Adventure.",
                  description:
                    "Stay tuned. This is the next challenge to take!",
                  status: "warning",
                  position: "top",
                  duration: 3000,
                  isClosable: true,
                })
              }
            >
              Join
            </Button>
            <Button
              isDisabled={true}
              display={loggedInEmail == adventure.creatorEmail ? "" : "none"}
              variant="outline"
              leftIcon={<MdOutlineEditNote />}
              size="sm"
              onClick={() => {}}
            >
              Edit
            </Button>
            <Button
              display={loggedInEmail == adventure.creatorEmail ? "" : "none"}
              variant="outline"
              leftIcon={<MdOutlineManageAccounts />}
              size="sm"
              onClick={() => {
                setPlayerManageDialogOpen(true);
              }}
            >
              Players
            </Button>
            <Tooltip
              hasArrow
              label="Delete the Adventure"
              bg="gray.300"
              color="black"
              openDelay={1000}
            >
              <Button
                display={loggedInEmail == adventure.creatorEmail ? "" : "none"}
                variant="outline"
                size="sm"
                onClick={() => {
                  setDeleteAdventureConfirmModalOpen(true);
                }}
              >
                <MdOutlineDelete />
              </Button>
            </Tooltip>
          </ButtonGroup>
        </CardFooter>
      </Card>
      <AdventureManagePlayersForm
        adventure={adventure}
        isOpen={isPlayerManageDialogOpen}
        onClose={onManagePlayersFormClose}
        handleUpdatePlayerList={handleUpdatePlayerList}
      />
      <AdventureDeleteConfirmationAlert
        adventure={adventure}
        isOpen={isDeleteAdventureConfirmModalOpen}
        onClose={onDeleteAdventureAlertConfirmClose}
        onCloseAfterDelete={onDeleteMapAlertConfirmCloseAfterDelete}
      />
    </>
  );
};

export default AdventureCard;
