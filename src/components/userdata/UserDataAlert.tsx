import { useEffect, useState } from "react";

import {
  Button,
  Center,
  Container,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
  Text,
  Modal,
  ModalOverlay,
  ModalFooter,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

// Custom imports
import { v4 as uuid } from "uuid";

// GraphQL / DynamoDB
import { generateClient } from "aws-amplify/api";
import * as mutations from "../../graphql/mutations";
import * as queries from "../../graphql/queries";

interface Props {
  loggedInEmail: string;
  loggedInSub: string;
  isOpen: boolean;
  onClose: () => void;
  onFetchUserProperties: () => void;
}

const UserDataAlert = ({
  loggedInEmail,
  loggedInSub,
  isOpen,
  onClose,
  onFetchUserProperties,
}: Props) => {
  useEffect(() => {
    onFetchUserProperties();
  }, []);

  useEffect(() => {
    handleFetchUserData(loggedInEmail);
  }, [loggedInEmail]);

  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [isUserDataStoredOnServer, setIsUserDataStoredOnServer] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // States used to create a new Adventure
  const [userData, setUserData] = useState({
    id: "",
    email: "",
    sub: "",
    firstName: "",
    lastName: "",
    nickName: "",
  });

  const handleFetchUserData = (email: string) => {
    const graphqlClient = generateClient();

    const variables = {
      filter: {
        email: {
          eq: email,
        },
      },
    };

    graphqlClient
      .graphql({
        query: queries.listUserData,
        variables: variables,
      })
      .then((response) => {
        if (response.data.listUserData.items.length == 0) {
          setIsUserDataStoredOnServer(false);
          setUserData({
            id: "",
            email: "",
            sub: "",
            firstName: "",
            lastName: "",
            nickName: "",
          });
        } else {
          const responseUserData = response.data.listUserData.items[0];

          if (responseUserData) {
            setIsUserDataStoredOnServer(true);
            setUserData({
              id: responseUserData.id,
              email: responseUserData.email!,
              sub: responseUserData.sub!,
              firstName: responseUserData.firstName!,
              lastName: responseUserData.lastName!,
              nickName: responseUserData.nickName!,
            });
          }
        }
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  const handleUpdateUserData = () => {
    const graphqlClient = generateClient();

    if (isUserDataStoredOnServer) {
      const userDataDetails = {
        id: userData.id,
        email: loggedInEmail,
        sub: loggedInSub,
        firstName: userData.firstName,
        lastName: userData.lastName,
        nickName: userData.nickName,
      };

      graphqlClient
        .graphql({
          query: mutations.updateUserData,
          variables: { input: userDataDetails },
        })
        .then((response) => {
          console.log("updateUserData Response: ", response);
          setIsFormSubmitting(false);
          onClose();
        })
        .catch((error) => {
          console.log("updateUserData Error: ", error);
        });
    } else {
      const userDataDetails = {
        id: uuid(),
        email: loggedInEmail,
        sub: loggedInSub,
        firstName: userData.firstName,
        lastName: userData.lastName,
        nickName: userData.nickName,
      };

      graphqlClient
        .graphql({
          query: mutations.createUserData,
          variables: { input: userDataDetails },
        })
        .then((response) => {
          console.log("createUserData Response: ", response);
          setIsFormSubmitting(false);
          onClose();
        })
        .catch((error) => {
          console.log("createUserData Error: ", error);
        });
    }
  };

  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay>
        <ModalContent>
          <ModalHeader fontSize="lg" fontWeight="bold">
            User Data for "{loggedInEmail}"
          </ModalHeader>
          <Divider />
          <ModalBody>
            <VStack>
              <Container>
                <form
                  onSubmit={handleSubmit(() => {
                    setIsFormSubmitting(true);
                    handleUpdateUserData();
                  })}
                >
                  <FormControl>
                    <FormLabel paddingTop="10px" htmlFor="email">
                      Email
                    </FormLabel>
                    <Text as="b">{loggedInEmail}</Text>
                  </FormControl>

                  <FormControl isInvalid={errors.nickName ? true : undefined}>
                    <FormLabel paddingTop="10px" htmlFor="nickName">
                      Nickname
                    </FormLabel>
                    <Input
                      {...register("nickName", {
                        required: "Please enter your nickname",
                      })}
                      id="nickName"
                      value={userData.nickName}
                      disabled={isFormSubmitting}
                      placeholder="Nickname"
                      onChange={(event) =>
                        setUserData({
                          ...userData,
                          nickName: event.target.value,
                        })
                      }
                    />
                    <FormErrorMessage>{`${errors.nickName?.message}`}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={errors.firstName ? true : undefined}>
                    <FormLabel paddingTop="10px" htmlFor="firstName">
                      Firstname
                    </FormLabel>
                    <Input
                      {...register("firstName", {
                        required: "Please enter your firstname",
                      })}
                      id="firstName"
                      value={userData.firstName}
                      disabled={isFormSubmitting}
                      placeholder="Firstname"
                      onChange={(event) =>
                        setUserData({
                          ...userData,
                          firstName: event.target.value,
                        })
                      }
                    />
                    <FormErrorMessage>{`${errors.firstName?.message}`}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={errors.lastName ? true : undefined}>
                    <FormLabel paddingTop="10px" htmlFor="lastName">
                      Lastname
                    </FormLabel>
                    <Input
                      {...register("lastName", {
                        required: "Please enter your lastname",
                      })}
                      id="lastName"
                      value={userData.lastName}
                      disabled={isFormSubmitting}
                      placeholder="Lastname"
                      onChange={(event) =>
                        setUserData({
                          ...userData,
                          lastName: event.target.value,
                        })
                      }
                    />
                    <FormErrorMessage>{`${errors.lastName?.message}`}</FormErrorMessage>
                  </FormControl>

                  <Center>
                    <Button
                      mt={4}
                      colorScheme="blue"
                      type="submit"
                      loadingText="Updating Userdata"
                      isLoading={isFormSubmitting}
                    >
                      Update
                    </Button>
                  </Center>
                </form>
              </Container>
            </VStack>
          </ModalBody>
          <Divider />
          <ModalFooter>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

export default UserDataAlert;
