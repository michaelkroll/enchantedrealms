import {
  Button,
  Modal,
  Text,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Divider,
  FormLabel,
  Input,
  List,
  ListItem,
  ListIcon,
  HStack,
} from "@chakra-ui/react";
import Adventure from "../../data/Adventure";
import { HiOutlineUser } from "react-icons/hi";
import {
  IoPersonRemoveOutline,
  IoPersonAddOutline,
  IoRefresh,
} from "react-icons/io5";
import { ChangeEvent, useEffect, useState } from "react";

// GraphQL / DynamoDB
import { generateClient } from "aws-amplify/api";
import * as mutations from "../../graphql/mutations";

// Custom imports
import { v4 as uuid } from "uuid";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  handleUpdatePlayerList: (adventure: Adventure) => void;
  adventure: Adventure;
}

const AdventureManagePlayersForm = ({ isOpen, onClose, handleUpdatePlayerList, adventure }: Props) => {
  const [email, setEmail] = useState("");
  const [playerEmails, setPlayerEmails] = useState<string[]>([]);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [isContentChanged, setContentChanged] = useState(false);

  const removeEmail = (emailToRemove: string) => {
    setPlayerEmails(playerEmails.filter((email) => email !== emailToRemove));
    setContentChanged(true);
  };

  const isValidEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const onEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!isValidEmail(event.target.value)) {
      setIsEmailValid(false);
    } else {
      setIsEmailValid(true);
    }
    setEmail(event.target.value);
  };

  const addPlayerEmailToArray = () => {
    setPlayerEmails([...playerEmails, email]);
    setEmail("");
    setIsEmailValid(false);
    setContentChanged(true);
  };

  const updatePlayerList = (id: string) => {
    console.log("UpdatePlayerList for adventure with id: ", id);
    setIsSubmittingForm(true);

    const graphqlClient = generateClient();

    const adventureDetails = {
      id: id,
      players: playerEmails,
    };

    graphqlClient
      .graphql({
        query: mutations.updateAdventure,
        variables: { input: adventureDetails },
      })
      .then((response) => {
        setIsSubmittingForm(false);
        setContentChanged(false);
        handleUpdatePlayerList(response.data.updateAdventure);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  useEffect(() => {
    if (adventure.players != null) {
      let players: string[] = [];
      adventure.players.map((player) => players.push(player!));
      setPlayerEmails(players);
    }
    setIsSubmittingForm(false);
    setContentChanged(false);
  }, []);

  return (
    <Modal
      size="lg"
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Manage Players</ModalHeader>
        <Text fontSize="lg" as="b" paddingLeft="25px" paddingBottom="10px">
          Adventure: {adventure.name}
        </Text>
        <ModalCloseButton isDisabled={isSubmittingForm} />
        <Divider />
        <Text hidden={playerEmails.length > 0} as="b" padding="25px">
          {playerEmails.length == 0
            ? "No Players added to the Adventure yet."
            : ""}
        </Text>

        <List hidden={playerEmails.length == 0} spacing={5} padding="20px">
          {playerEmails.map((playerEmail) => (
            <ListItem key={uuid()}>
              <HStack justifyContent="space-between">
                <HStack>
                  <ListIcon as={HiOutlineUser} color="green.500" />
                  <Text>{playerEmail}</Text>
                </HStack>
                <Button
                  rightIcon={<IoPersonRemoveOutline />}
                  colorScheme="red"
                  size="xs"
                  onClick={() => removeEmail(playerEmail)}
                  isDisabled={isSubmittingForm}
                >
                  Remove
                </Button>
              </HStack>
            </ListItem>
          ))}
        </List>
        <Divider />
        <ModalBody pb={6}>
          <FormLabel htmlFor="player_email">Players Email</FormLabel>
          <Input
            isDisabled={isSubmittingForm}
            id="player_email"
            isInvalid={!isEmailValid && email !== ""}
            onChange={onEmailChange}
            type="email"
            value={email}
            placeholder="Add a vaild email address"
          />
          <Text color="tomato">
            {!isEmailValid && email !== "" && "Enter a valid E-Mail address"}
          </Text>
          <Button
            rightIcon={<IoPersonAddOutline />}
            size="xs"
            isDisabled={!isEmailValid}
            mt={4}
            colorScheme="blue"
            type="submit"
            onClick={addPlayerEmailToArray}
          >
            Add Player
          </Button>
        </ModalBody>
        <Divider />
        <ModalFooter>
          <Button
            variant="outline"
            onClick={onClose}
            mr={3}
            isDisabled={isSubmittingForm}
          >
            Cancel
          </Button>
          <Button
            rightIcon={<IoRefresh />}
            colorScheme="blue"
            onClick={() => {
              updatePlayerList(adventure.id);
            }}
            isDisabled={isSubmittingForm || !isContentChanged}
            isLoading={isSubmittingForm}
          >
            Update Player List
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AdventureManagePlayersForm;
