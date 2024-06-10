// React imports
import { useEffect, useState } from "react";

// Chakra UI imports
import {
  Box,
  Card,
  CardBody,
  HStack,
  Image,
  Select,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

// GraphQL / DynamoDB
import { generateClient } from "aws-amplify/api";
import { listEntities } from "../../graphql/queries";

// Storage S3
import { getUrl } from "aws-amplify/storage";

// Custom imports
import Entity from "../../data/Entity";
import entityCategories from "../../data/EntityCategories";

interface Props {
  email: string;
  handleSelectedEntity: (selectedEntity: Entity | null) => void;
}

const EntitySelector = ({ email, handleSelectedEntity }: Props) => {
  const tokenCardColor = useColorModeValue("gray.200", "gray.600");
  const tokenCardSelectedColor = useColorModeValue("blue.200", "blue.600");

  const [entities, setEntities] = useState<Entity[]>([]);

  const [selectedEntityCategory, setSelectedEntityCategory] = useState(
    "Please Select an Entity Category"
  );

  useEffect(() => {
    if (selectedEntityCategory !== "Please Select an Entity Category") {
      handleListEntities();
    }
  }, [selectedEntityCategory]);

  const handleListEntities = async () => {
    const graphqlClient = generateClient();

    let cat = entityCategories.find((category) =>
      category.label === selectedEntityCategory ? category : null
    );

    const listEntityVariables = {
      filter: {
        and: [
          {
            creatorEmail: {
              eq: email,
            },
          },
          {
            category: {
              eq: cat!.value,
            },
          },
        ],
      },
    };

    console.log(listEntityVariables);

    graphqlClient
      .graphql({
        query: listEntities,
        variables: listEntityVariables,
      })
      .then((response) => {
        const entityList = response.data.listEntities.items;
        entityList.map(async (entity) => {
          const entityPicPath = entity.tokenPicPath;
          const getUrlResult = await getUrl({
            path: entityPicPath!,
            options: {
              expiresIn: 900,
            },
          });

          const entityImage = getUrlResult.url.toString();
          entity.tokenPicS3Url = entityImage;
        });

        entityList.sort((a, b) => a.name.localeCompare(b.name));

        setEntities(entityList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEntitySelection = (selectedEntity: Entity) => {
    setEntities(
      entities.map((entity) =>
        entity.id != selectedEntity.id ? { ...entity, selected: false } : entity
      )
    );
    handleSelectedEntity(selectedEntity.selected ? selectedEntity : null);
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" padding={3}>
      <HStack>
        <Select
          onChange={(event) => {
            setSelectedEntityCategory(event.target.value);
          }}
        >
          <option key={0} value={"Please Select an Entity Category"}>
            Please Select an Entity Category
          </option>
          {entityCategories.map((category) => (
            <option key={category.value} value={category.label}>
              {category.label}
            </option>
          ))}
          ;
        </Select>
      </HStack>
      {entities.length == 0 &&
      selectedEntityCategory != "Please Select an Entity Category" ? (
        <Text mt={2}>There are no entities available in this category</Text>
      ) : (
        ""
      )}
      <SimpleGrid columns={3} spacing={1} paddingTop={2}>
        {entities.map((entity) => (
          <Card
            variant="outline"
            key={entity.id}
            backgroundColor={
              entity.selected ? tokenCardSelectedColor : tokenCardColor
            }
            onClick={() => {
              if (entity.selected != null) {
                entity.selected = !entity.selected;
              } else {
                entity.selected = true;
              }
              handleEntitySelection(entity);
            }}
          >
            <CardBody padding={1}>
              <Stack>
                <Image src={entity.tokenPicS3Url!}></Image>
                <Text ml={1} fontSize="xs">
                  {entity.name}
                </Text>
              </Stack>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default EntitySelector;
