import { useEffect, useState } from "react";

// GraphQL / DynamoDB
import { generateClient } from "aws-amplify/api";
import { listEntities } from "../../graphql/queries";

// Storage S3
import { getUrl } from "aws-amplify/storage";

import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  SimpleGrid,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { IoReload } from "react-icons/io5";
import EntityCreateForm from "./EntityCreateForm";
import EntityCard from "./EntityCard";
import EntityCardSkeleton from "./EntityCardSkeleton";
import Entity from "../../data/Entity";
import CategorySelector from "../CategorySelector";
import Category from "../../data/Category";
import entityCategories from "../../data/EntityCategories";

interface Props {
  email: string;
  sub: string;
}

const EntityGrid = ({ email, sub }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [entities, setEntities] = useState<Entity[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState({
    value: "all",
    label: "All",
  });

  const skeletons = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];

  useEffect(() => {
    if (email != "") {
      handleListEntities();
    }
  }, [email, currentCategory]);

  const handleListEntities = async () => {
    setLoading(true);
    const graphqlClient = generateClient();

    let listEntityVariables = {};

    if (currentCategory.value == "all") {
      listEntityVariables = {
        filter: {
          or: [
            {
              creatorEmail: {
                eq: email,
              },
            },
          ],
        },
      };
    } else {
      listEntityVariables = {
        filter: {
          and: [
            {
              or: [
                {
                  creatorEmail: {
                    eq: email,
                  },
                },
              ],
            },
            {
              category: {
                eq: currentCategory.value,
              },
            },
          ],
        },
      };
    }

    graphqlClient
      .graphql({
        query: listEntities,
        variables: listEntityVariables,
      })
      .then((response) => {
        const entityList = response.data.listEntities.items;

        entityList.map(async (entity) => {
          const tokenPicPath = entity.tokenPicPath;
          const getUrlResult = await getUrl({
            path: tokenPicPath!,
            options: {
              expiresIn: 900,
            },
          });

          const tokenImage = getUrlResult.url.toString();
          entity.tokenPicS3Url = tokenImage;
        });

        entityList.sort((a, b) => a.name.localeCompare(b.name));

        setEntities(entityList);
        setLoading(false);
      })
      .catch((error) => {
        setEntities([]);
        setError(error);
        setLoading(false);
      });
  };

  const handleFormClose = () => {
    onClose();
    handleListEntities();
  };

  const handleRefreshGrid = () => {
    setEntities([]);
    handleListEntities();
  };

  const handleEntityCategorySelected = (selectedCategory: Category) => {
    console.log("Entity Category Selected: ", selectedCategory);

    if (selectedCategory.value == "all") {
      setCurrentCategory({ value: "all", label: "All" });
    } else {
      let cat = entityCategories.find(
        (category) => category.value === selectedCategory.value
      );

      setCurrentCategory(cat!);
    }
  };

  const handleDeleteEntity = (deletedEntity: Entity) => {
    const newEntityArray = entities.filter(
      (entity) => entity.id != deletedEntity.id
    );
    setEntities(newEntityArray);
  };

  return (
    <>
      <HStack justifyContent={"space-between"}>
        <Tooltip
          hasArrow
          label="Create a new Entity"
          bg="gray.300"
          color="black"
          openDelay={1000}
        >
          <Button
            isDisabled={isLoading}
            colorScheme="blue"
            onClick={onOpen}
            marginLeft="10px"
          >
            <AddIcon />
          </Button>
        </Tooltip>
        <CategorySelector
          selectedCategory={currentCategory}
          onSelectCategory={handleEntityCategorySelected}
          categories={entityCategories}
        />
        <Tooltip
          hasArrow
          label="Reload the Entities"
          bg="gray.300"
          color="black"
          openDelay={1000}
        >
          <Button isDisabled={isLoading} onClick={handleRefreshGrid}>
            <IoReload />
          </Button>
        </Tooltip>
      </HStack>
      <Drawer
        size="md"
        variant="permanent"
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton margin="5px" />
          <DrawerHeader borderBottomWidth="1px">Create an Entity</DrawerHeader>
          <DrawerBody>
            <EntityCreateForm
              handleFormClose={handleFormClose}
              email={email}
              sub={sub}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      {error && <Text color="tomato">{error}</Text>}
      <SimpleGrid
        columns={{ base: 2, sm: 2, md: 3, lg: 5, xl: 6, "2xl": 8 }}
        spacing={3}
        margin="10px"
      >
        {isLoading &&
          skeletons.map((skeleton) => <EntityCardSkeleton key={skeleton} />)}
        {entities.map((entity) => (
          <EntityCard
            key={entity.id}
            entity={entity}
            deleteEntity={handleDeleteEntity}
          />
        ))}
      </SimpleGrid>
    </>
  );
};

export default EntityGrid;
