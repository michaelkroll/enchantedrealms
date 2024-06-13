/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createAdventure = /* GraphQL */ `mutation CreateAdventure(
  $input: CreateAdventureInput!
  $condition: ModelAdventureConditionInput
) {
  createAdventure(input: $input, condition: $condition) {
    id
    creatorEmail
    creatorId
    name
    description
    adventurePicPath
    adventurePicS3Url
    players
    scenes {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateAdventureMutationVariables,
  APITypes.CreateAdventureMutation
>;
export const updateAdventure = /* GraphQL */ `mutation UpdateAdventure(
  $input: UpdateAdventureInput!
  $condition: ModelAdventureConditionInput
) {
  updateAdventure(input: $input, condition: $condition) {
    id
    creatorEmail
    creatorId
    name
    description
    adventurePicPath
    adventurePicS3Url
    players
    scenes {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateAdventureMutationVariables,
  APITypes.UpdateAdventureMutation
>;
export const deleteAdventure = /* GraphQL */ `mutation DeleteAdventure(
  $input: DeleteAdventureInput!
  $condition: ModelAdventureConditionInput
) {
  deleteAdventure(input: $input, condition: $condition) {
    id
    creatorEmail
    creatorId
    name
    description
    adventurePicPath
    adventurePicS3Url
    players
    scenes {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteAdventureMutationVariables,
  APITypes.DeleteAdventureMutation
>;
export const createUserData = /* GraphQL */ `mutation CreateUserData(
  $input: CreateUserDataInput!
  $condition: ModelUserDataConditionInput
) {
  createUserData(input: $input, condition: $condition) {
    id
    email
    sub
    firstName
    lastName
    nickName
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateUserDataMutationVariables,
  APITypes.CreateUserDataMutation
>;
export const updateUserData = /* GraphQL */ `mutation UpdateUserData(
  $input: UpdateUserDataInput!
  $condition: ModelUserDataConditionInput
) {
  updateUserData(input: $input, condition: $condition) {
    id
    email
    sub
    firstName
    lastName
    nickName
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateUserDataMutationVariables,
  APITypes.UpdateUserDataMutation
>;
export const deleteUserData = /* GraphQL */ `mutation DeleteUserData(
  $input: DeleteUserDataInput!
  $condition: ModelUserDataConditionInput
) {
  deleteUserData(input: $input, condition: $condition) {
    id
    email
    sub
    firstName
    lastName
    nickName
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteUserDataMutationVariables,
  APITypes.DeleteUserDataMutation
>;
export const createMap = /* GraphQL */ `mutation CreateMap(
  $input: CreateMapInput!
  $condition: ModelMapConditionInput
) {
  createMap(input: $input, condition: $condition) {
    id
    creatorEmail
    creatorId
    name
    description
    shared
    category
    gridded
    drawGrid
    gridHtmlColor
    gridOffsetX
    gridOffsetY
    gridColumns
    gridRows
    gridCellWidth
    gridCellHeight
    mapThumbPicPath
    mapThumbPicS3Url
    mapPicPath
    mapPicS3Url
    tags
    scenes {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateMapMutationVariables,
  APITypes.CreateMapMutation
>;
export const updateMap = /* GraphQL */ `mutation UpdateMap(
  $input: UpdateMapInput!
  $condition: ModelMapConditionInput
) {
  updateMap(input: $input, condition: $condition) {
    id
    creatorEmail
    creatorId
    name
    description
    shared
    category
    gridded
    drawGrid
    gridHtmlColor
    gridOffsetX
    gridOffsetY
    gridColumns
    gridRows
    gridCellWidth
    gridCellHeight
    mapThumbPicPath
    mapThumbPicS3Url
    mapPicPath
    mapPicS3Url
    tags
    scenes {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateMapMutationVariables,
  APITypes.UpdateMapMutation
>;
export const deleteMap = /* GraphQL */ `mutation DeleteMap(
  $input: DeleteMapInput!
  $condition: ModelMapConditionInput
) {
  deleteMap(input: $input, condition: $condition) {
    id
    creatorEmail
    creatorId
    name
    description
    shared
    category
    gridded
    drawGrid
    gridHtmlColor
    gridOffsetX
    gridOffsetY
    gridColumns
    gridRows
    gridCellWidth
    gridCellHeight
    mapThumbPicPath
    mapThumbPicS3Url
    mapPicPath
    mapPicS3Url
    tags
    scenes {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteMapMutationVariables,
  APITypes.DeleteMapMutation
>;
export const createToken = /* GraphQL */ `mutation CreateToken(
  $input: CreateTokenInput!
  $condition: ModelTokenConditionInput
) {
  createToken(input: $input, condition: $condition) {
    id
    creatorEmail
    creatorId
    name
    shared
    systemProvided
    description
    category
    tokenPicPath
    tokenPicS3Url
    tags
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateTokenMutationVariables,
  APITypes.CreateTokenMutation
>;
export const updateToken = /* GraphQL */ `mutation UpdateToken(
  $input: UpdateTokenInput!
  $condition: ModelTokenConditionInput
) {
  updateToken(input: $input, condition: $condition) {
    id
    creatorEmail
    creatorId
    name
    shared
    systemProvided
    description
    category
    tokenPicPath
    tokenPicS3Url
    tags
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateTokenMutationVariables,
  APITypes.UpdateTokenMutation
>;
export const deleteToken = /* GraphQL */ `mutation DeleteToken(
  $input: DeleteTokenInput!
  $condition: ModelTokenConditionInput
) {
  deleteToken(input: $input, condition: $condition) {
    id
    creatorEmail
    creatorId
    name
    shared
    systemProvided
    description
    category
    tokenPicPath
    tokenPicS3Url
    tags
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteTokenMutationVariables,
  APITypes.DeleteTokenMutation
>;
export const createEntity = /* GraphQL */ `mutation CreateEntity(
  $input: CreateEntityInput!
  $condition: ModelEntityConditionInput
) {
  createEntity(input: $input, condition: $condition) {
    id
    creatorEmail
    creatorId
    name
    description
    notes
    category
    tokenId
    tokenPicPath
    tokenPicS3Url
    tags
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateEntityMutationVariables,
  APITypes.CreateEntityMutation
>;
export const updateEntity = /* GraphQL */ `mutation UpdateEntity(
  $input: UpdateEntityInput!
  $condition: ModelEntityConditionInput
) {
  updateEntity(input: $input, condition: $condition) {
    id
    creatorEmail
    creatorId
    name
    description
    notes
    category
    tokenId
    tokenPicPath
    tokenPicS3Url
    tags
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateEntityMutationVariables,
  APITypes.UpdateEntityMutation
>;
export const deleteEntity = /* GraphQL */ `mutation DeleteEntity(
  $input: DeleteEntityInput!
  $condition: ModelEntityConditionInput
) {
  deleteEntity(input: $input, condition: $condition) {
    id
    creatorEmail
    creatorId
    name
    description
    notes
    category
    tokenId
    tokenPicPath
    tokenPicS3Url
    tags
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteEntityMutationVariables,
  APITypes.DeleteEntityMutation
>;
export const createScene = /* GraphQL */ `mutation CreateScene(
  $input: CreateSceneInput!
  $condition: ModelSceneConditionInput
) {
  createScene(input: $input, condition: $condition) {
    id
    adventureId
    mapId
    entityIds
    creatorEmail
    creatorId
    name
    description
    adventure {
      id
      creatorEmail
      creatorId
      name
      description
      adventurePicPath
      adventurePicS3Url
      players
      createdAt
      updatedAt
      __typename
    }
    map {
      id
      creatorEmail
      creatorId
      name
      description
      shared
      category
      gridded
      drawGrid
      gridHtmlColor
      gridOffsetX
      gridOffsetY
      gridColumns
      gridRows
      gridCellWidth
      gridCellHeight
      mapThumbPicPath
      mapThumbPicS3Url
      mapPicPath
      mapPicS3Url
      tags
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateSceneMutationVariables,
  APITypes.CreateSceneMutation
>;
export const updateScene = /* GraphQL */ `mutation UpdateScene(
  $input: UpdateSceneInput!
  $condition: ModelSceneConditionInput
) {
  updateScene(input: $input, condition: $condition) {
    id
    adventureId
    mapId
    entityIds
    creatorEmail
    creatorId
    name
    description
    adventure {
      id
      creatorEmail
      creatorId
      name
      description
      adventurePicPath
      adventurePicS3Url
      players
      createdAt
      updatedAt
      __typename
    }
    map {
      id
      creatorEmail
      creatorId
      name
      description
      shared
      category
      gridded
      drawGrid
      gridHtmlColor
      gridOffsetX
      gridOffsetY
      gridColumns
      gridRows
      gridCellWidth
      gridCellHeight
      mapThumbPicPath
      mapThumbPicS3Url
      mapPicPath
      mapPicS3Url
      tags
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateSceneMutationVariables,
  APITypes.UpdateSceneMutation
>;
export const deleteScene = /* GraphQL */ `mutation DeleteScene(
  $input: DeleteSceneInput!
  $condition: ModelSceneConditionInput
) {
  deleteScene(input: $input, condition: $condition) {
    id
    adventureId
    mapId
    entityIds
    creatorEmail
    creatorId
    name
    description
    adventure {
      id
      creatorEmail
      creatorId
      name
      description
      adventurePicPath
      adventurePicS3Url
      players
      createdAt
      updatedAt
      __typename
    }
    map {
      id
      creatorEmail
      creatorId
      name
      description
      shared
      category
      gridded
      drawGrid
      gridHtmlColor
      gridOffsetX
      gridOffsetY
      gridColumns
      gridRows
      gridCellWidth
      gridCellHeight
      mapThumbPicPath
      mapThumbPicS3Url
      mapPicPath
      mapPicS3Url
      tags
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteSceneMutationVariables,
  APITypes.DeleteSceneMutation
>;
