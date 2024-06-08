/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getAdventure = /* GraphQL */ `query GetAdventure($id: ID!) {
  getAdventure(id: $id) {
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
}
` as GeneratedQuery<
  APITypes.GetAdventureQueryVariables,
  APITypes.GetAdventureQuery
>;
export const listAdventures = /* GraphQL */ `query ListAdventures(
  $filter: ModelAdventureFilterInput
  $limit: Int
  $nextToken: String
) {
  listAdventures(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListAdventuresQueryVariables,
  APITypes.ListAdventuresQuery
>;
export const getUserData = /* GraphQL */ `query GetUserData($id: ID!) {
  getUserData(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetUserDataQueryVariables,
  APITypes.GetUserDataQuery
>;
export const listUserData = /* GraphQL */ `query ListUserData(
  $filter: ModelUserDataFilterInput
  $limit: Int
  $nextToken: String
) {
  listUserData(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListUserDataQueryVariables,
  APITypes.ListUserDataQuery
>;
export const getMap = /* GraphQL */ `query GetMap($id: ID!) {
  getMap(id: $id) {
    id
    creatorEmail
    creatorId
    name
    description
    shared
    category
    gridded
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
}
` as GeneratedQuery<APITypes.GetMapQueryVariables, APITypes.GetMapQuery>;
export const listMaps = /* GraphQL */ `query ListMaps($filter: ModelMapFilterInput, $limit: Int, $nextToken: String) {
  listMaps(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      creatorEmail
      creatorId
      name
      description
      shared
      category
      gridded
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListMapsQueryVariables, APITypes.ListMapsQuery>;
export const getToken = /* GraphQL */ `query GetToken($id: ID!) {
  getToken(id: $id) {
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
` as GeneratedQuery<APITypes.GetTokenQueryVariables, APITypes.GetTokenQuery>;
export const listTokens = /* GraphQL */ `query ListTokens(
  $filter: ModelTokenFilterInput
  $limit: Int
  $nextToken: String
) {
  listTokens(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListTokensQueryVariables,
  APITypes.ListTokensQuery
>;
export const getEntity = /* GraphQL */ `query GetEntity($id: ID!) {
  getEntity(id: $id) {
    id
    creatorEmail
    creatorId
    name
    description
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
` as GeneratedQuery<APITypes.GetEntityQueryVariables, APITypes.GetEntityQuery>;
export const listEntities = /* GraphQL */ `query ListEntities(
  $filter: ModelEntityFilterInput
  $limit: Int
  $nextToken: String
) {
  listEntities(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      creatorEmail
      creatorId
      name
      description
      category
      tokenId
      tokenPicPath
      tokenPicS3Url
      tags
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListEntitiesQueryVariables,
  APITypes.ListEntitiesQuery
>;
export const getScene = /* GraphQL */ `query GetScene($id: ID!) {
  getScene(id: $id) {
    id
    creatorEmail
    creatorId
    name
    description
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetSceneQueryVariables, APITypes.GetSceneQuery>;
export const listScenes = /* GraphQL */ `query ListScenes(
  $filter: ModelSceneFilterInput
  $limit: Int
  $nextToken: String
) {
  listScenes(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      creatorEmail
      creatorId
      name
      description
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListScenesQueryVariables,
  APITypes.ListScenesQuery
>;
