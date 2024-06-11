import { useEffect, useState } from "react";

// GraphQL / DynamoDB
import { generateClient } from "aws-amplify/api";
import { listEntities } from "../../graphql/queries";

// Storage S3
import { getUrl } from "aws-amplify/storage";

import {
  Button,
  Center,
  HStack,
  SimpleGrid,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { IoReload } from "react-icons/io5";

import EntityCard from "./EntityCard";
import EntityCardSkeleton from "./EntityCardSkeleton";
import Entity from "../../data/Entity";
import CategorySelector from "../CategorySelector";
import Category from "../../data/Category";
import entityCategories from "../../data/EntityCategories";
import EntityCreateDrawer from "./EntityCreateDrawer";
import EntityEditDrawer from "./EntityEditDrawer";

interface Props {
  email: string;
  sub: string;
}

const EntityGrid = ({ email, sub }: Props) => {
  const {
    isOpen: isCreateDrawerOpen,
    onOpen: onCreateDrawerOpen,
    onClose: onCreateDrawerClose,
  } = useDisclosure();

  const {
    isOpen: isEditDrawerOpen,
    onOpen: onEditDrawerOpen,
    onClose: onEditDrawerClose,
  } = useDisclosure();

  const [editEntity, setEditEntity] = useState<Entity>();
  const [entities, setEntities] = useState<Entity[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState({
    value: "all",
    label: "All",
  });

  const skeletons = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28,
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

  const handleCreateDrawerClose = () => {
    onCreateDrawerClose();
    handleListEntities();
  };

  const handleEditDrawerClose = () => {
    onEditDrawerClose();
    handleListEntities();
  };

  const handleRefreshGrid = () => {
    setEntities([]);
    handleListEntities();
  };

  const handleEntityCategorySelected = (selectedCategory: Category) => {
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

  const handleEditEntity = (editEntity: Entity) => {
    setEditEntity(editEntity);
    onEditDrawerOpen();
  };

  const entitiesCountText = (): String => {
    if (entities.length == 1) {
      return "Entity in this Category";
    } else {
      return "Entities in this Category";
    }
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
            onClick={onCreateDrawerOpen}
            marginLeft="10px"
          >
            <AddIcon />
          </Button>
        </Tooltip>
        <CategorySelector
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
      {error && <Text color="tomato">{error}</Text>}
      <Center>
        <Text mt={2}>
          {entities.length} {entitiesCountText()}
        </Text>
      </Center>

      <EntityCreateDrawer
        handleDrawerClose={handleCreateDrawerClose}
        isDrawerOpen={isCreateDrawerOpen}
        onCloseDrawer={onCreateDrawerClose}
        email={email}
        sub={sub}
      />

      <EntityEditDrawer
        handleDrawerClose={handleEditDrawerClose}
        isDrawerOpen={isEditDrawerOpen}
        onCloseDrawer={onEditDrawerClose}
        editEntity={editEntity!}
        email={email}
        sub={sub}
      />

      <SimpleGrid
        columns={{ base: 2, sm: 2, md: 3, lg: 5, xl: 6, "2xl": 6 }}
        spacing={3}
        margin="10px"
      >
        {isLoading &&
          skeletons.map((skeleton) => <EntityCardSkeleton key={skeleton} />)}
        {entities.map((entity) => (
          <EntityCard
            key={entity.id}
            entity={entity}
            handleDeleteEntity={handleDeleteEntity}
            handleEditEntity={handleEditEntity}
          />
        ))}
      </SimpleGrid>
    </>
  );
};

export default EntityGrid;
