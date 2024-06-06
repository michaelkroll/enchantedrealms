/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateAdventure = /* GraphQL */ `subscription OnCreateAdventure($filter: ModelSubscriptionAdventureFilterInput) {
  onCreateAdventure(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateAdventureSubscriptionVariables,
  APITypes.OnCreateAdventureSubscription
>;
export const onUpdateAdventure = /* GraphQL */ `subscription OnUpdateAdventure($filter: ModelSubscriptionAdventureFilterInput) {
  onUpdateAdventure(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateAdventureSubscriptionVariables,
  APITypes.OnUpdateAdventureSubscription
>;
export const onDeleteAdventure = /* GraphQL */ `subscription OnDeleteAdventure($filter: ModelSubscriptionAdventureFilterInput) {
  onDeleteAdventure(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteAdventureSubscriptionVariables,
  APITypes.OnDeleteAdventureSubscription
>;
export const onCreateUserData = /* GraphQL */ `subscription OnCreateUserData($filter: ModelSubscriptionUserDataFilterInput) {
  onCreateUserData(filter: $filter) {
    id
    email
    sub
    firstName
    lastName
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateUserDataSubscriptionVariables,
  APITypes.OnCreateUserDataSubscription
>;
export const onUpdateUserData = /* GraphQL */ `subscription OnUpdateUserData($filter: ModelSubscriptionUserDataFilterInput) {
  onUpdateUserData(filter: $filter) {
    id
    email
    sub
    firstName
    lastName
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateUserDataSubscriptionVariables,
  APITypes.OnUpdateUserDataSubscription
>;
export const onDeleteUserData = /* GraphQL */ `subscription OnDeleteUserData($filter: ModelSubscriptionUserDataFilterInput) {
  onDeleteUserData(filter: $filter) {
    id
    email
    sub
    firstName
    lastName
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteUserDataSubscriptionVariables,
  APITypes.OnDeleteUserDataSubscription
>;
export const onCreateMap = /* GraphQL */ `subscription OnCreateMap($filter: ModelSubscriptionMapFilterInput) {
  onCreateMap(filter: $filter) {
    id
    creatorEmail
    creatorId
    name
    description
    shared
    category
    gridded
    mapThumbPicPath
    mapThumbPicS3Url
    mapPicPath
    mapPicS3Url
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateMapSubscriptionVariables,
  APITypes.OnCreateMapSubscription
>;
export const onUpdateMap = /* GraphQL */ `subscription OnUpdateMap($filter: ModelSubscriptionMapFilterInput) {
  onUpdateMap(filter: $filter) {
    id
    creatorEmail
    creatorId
    name
    description
    shared
    category
    gridded
    mapThumbPicPath
    mapThumbPicS3Url
    mapPicPath
    mapPicS3Url
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateMapSubscriptionVariables,
  APITypes.OnUpdateMapSubscription
>;
export const onDeleteMap = /* GraphQL */ `subscription OnDeleteMap($filter: ModelSubscriptionMapFilterInput) {
  onDeleteMap(filter: $filter) {
    id
    creatorEmail
    creatorId
    name
    description
    shared
    category
    gridded
    mapThumbPicPath
    mapThumbPicS3Url
    mapPicPath
    mapPicS3Url
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteMapSubscriptionVariables,
  APITypes.OnDeleteMapSubscription
>;
export const onCreateToken = /* GraphQL */ `subscription OnCreateToken($filter: ModelSubscriptionTokenFilterInput) {
  onCreateToken(filter: $filter) {
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
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateTokenSubscriptionVariables,
  APITypes.OnCreateTokenSubscription
>;
export const onUpdateToken = /* GraphQL */ `subscription OnUpdateToken($filter: ModelSubscriptionTokenFilterInput) {
  onUpdateToken(filter: $filter) {
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
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateTokenSubscriptionVariables,
  APITypes.OnUpdateTokenSubscription
>;
export const onDeleteToken = /* GraphQL */ `subscription OnDeleteToken($filter: ModelSubscriptionTokenFilterInput) {
  onDeleteToken(filter: $filter) {
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
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteTokenSubscriptionVariables,
  APITypes.OnDeleteTokenSubscription
>;
export const onCreateEntity = /* GraphQL */ `subscription OnCreateEntity($filter: ModelSubscriptionEntityFilterInput) {
  onCreateEntity(filter: $filter) {
    id
    creatorEmail
    creatorId
    name
    description
    category
    tokenId
    tokenPicPath
    tokenPicS3Url
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateEntitySubscriptionVariables,
  APITypes.OnCreateEntitySubscription
>;
export const onUpdateEntity = /* GraphQL */ `subscription OnUpdateEntity($filter: ModelSubscriptionEntityFilterInput) {
  onUpdateEntity(filter: $filter) {
    id
    creatorEmail
    creatorId
    name
    description
    category
    tokenId
    tokenPicPath
    tokenPicS3Url
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateEntitySubscriptionVariables,
  APITypes.OnUpdateEntitySubscription
>;
export const onDeleteEntity = /* GraphQL */ `subscription OnDeleteEntity($filter: ModelSubscriptionEntityFilterInput) {
  onDeleteEntity(filter: $filter) {
    id
    creatorEmail
    creatorId
    name
    description
    category
    tokenId
    tokenPicPath
    tokenPicS3Url
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteEntitySubscriptionVariables,
  APITypes.OnDeleteEntitySubscription
>;
export const onCreateScene = /* GraphQL */ `subscription OnCreateScene($filter: ModelSubscriptionSceneFilterInput) {
  onCreateScene(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateSceneSubscriptionVariables,
  APITypes.OnCreateSceneSubscription
>;
export const onUpdateScene = /* GraphQL */ `subscription OnUpdateScene($filter: ModelSubscriptionSceneFilterInput) {
  onUpdateScene(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateSceneSubscriptionVariables,
  APITypes.OnUpdateSceneSubscription
>;
export const onDeleteScene = /* GraphQL */ `subscription OnDeleteScene($filter: ModelSubscriptionSceneFilterInput) {
  onDeleteScene(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteSceneSubscriptionVariables,
  APITypes.OnDeleteSceneSubscription
>;
