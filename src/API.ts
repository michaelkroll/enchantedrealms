/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateAdventureInput = {
  id?: string | null,
  creatorEmail: string,
  creatorId: string,
  name: string,
  description?: string | null,
  adventurePicPath?: string | null,
  adventurePicS3Url?: string | null,
  players?: Array< string | null > | null,
};

export type ModelAdventureConditionInput = {
  creatorEmail?: ModelStringInput | null,
  creatorId?: ModelStringInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  adventurePicPath?: ModelStringInput | null,
  adventurePicS3Url?: ModelStringInput | null,
  players?: ModelStringInput | null,
  and?: Array< ModelAdventureConditionInput | null > | null,
  or?: Array< ModelAdventureConditionInput | null > | null,
  not?: ModelAdventureConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type Adventure = {
  __typename: "Adventure",
  id: string,
  creatorEmail: string,
  creatorId: string,
  name: string,
  description?: string | null,
  adventurePicPath?: string | null,
  adventurePicS3Url?: string | null,
  players?: Array< string | null > | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateAdventureInput = {
  id: string,
  creatorEmail?: string | null,
  creatorId?: string | null,
  name?: string | null,
  description?: string | null,
  adventurePicPath?: string | null,
  adventurePicS3Url?: string | null,
  players?: Array< string | null > | null,
};

export type DeleteAdventureInput = {
  id: string,
};

export type CreateUserDataInput = {
  id?: string | null,
  email?: string | null,
  sub?: string | null,
  firstName?: string | null,
  lastName?: string | null,
};

export type ModelUserDataConditionInput = {
  email?: ModelStringInput | null,
  sub?: ModelStringInput | null,
  firstName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  and?: Array< ModelUserDataConditionInput | null > | null,
  or?: Array< ModelUserDataConditionInput | null > | null,
  not?: ModelUserDataConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type UserData = {
  __typename: "UserData",
  id: string,
  email?: string | null,
  sub?: string | null,
  firstName?: string | null,
  lastName?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateUserDataInput = {
  id: string,
  email?: string | null,
  sub?: string | null,
  firstName?: string | null,
  lastName?: string | null,
};

export type DeleteUserDataInput = {
  id: string,
};

export type CreateMapInput = {
  id?: string | null,
  creatorEmail: string,
  creatorId: string,
  name: string,
  description?: string | null,
  shared?: boolean | null,
  category: string,
  gridded?: boolean | null,
  mapThumbPicPath?: string | null,
  mapThumbPicS3Url?: string | null,
  mapPicPath?: string | null,
  mapPicS3Url?: string | null,
};

export type ModelMapConditionInput = {
  creatorEmail?: ModelStringInput | null,
  creatorId?: ModelStringInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  shared?: ModelBooleanInput | null,
  category?: ModelStringInput | null,
  gridded?: ModelBooleanInput | null,
  mapThumbPicPath?: ModelStringInput | null,
  mapThumbPicS3Url?: ModelStringInput | null,
  mapPicPath?: ModelStringInput | null,
  mapPicS3Url?: ModelStringInput | null,
  and?: Array< ModelMapConditionInput | null > | null,
  or?: Array< ModelMapConditionInput | null > | null,
  not?: ModelMapConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Map = {
  __typename: "Map",
  id: string,
  creatorEmail: string,
  creatorId: string,
  name: string,
  description?: string | null,
  shared?: boolean | null,
  category: string,
  gridded?: boolean | null,
  mapThumbPicPath?: string | null,
  mapThumbPicS3Url?: string | null,
  mapPicPath?: string | null,
  mapPicS3Url?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateMapInput = {
  id: string,
  creatorEmail?: string | null,
  creatorId?: string | null,
  name?: string | null,
  description?: string | null,
  shared?: boolean | null,
  category?: string | null,
  gridded?: boolean | null,
  mapThumbPicPath?: string | null,
  mapThumbPicS3Url?: string | null,
  mapPicPath?: string | null,
  mapPicS3Url?: string | null,
};

export type DeleteMapInput = {
  id: string,
};

export type CreateTokenInput = {
  id?: string | null,
  creatorEmail: string,
  creatorId: string,
  name: string,
  shared?: boolean | null,
  systemProvided?: boolean | null,
  description?: string | null,
  category: string,
  tokenPicPath?: string | null,
  tokenPicS3Url?: string | null,
};

export type ModelTokenConditionInput = {
  creatorEmail?: ModelStringInput | null,
  creatorId?: ModelStringInput | null,
  name?: ModelStringInput | null,
  shared?: ModelBooleanInput | null,
  systemProvided?: ModelBooleanInput | null,
  description?: ModelStringInput | null,
  category?: ModelStringInput | null,
  tokenPicPath?: ModelStringInput | null,
  tokenPicS3Url?: ModelStringInput | null,
  and?: Array< ModelTokenConditionInput | null > | null,
  or?: Array< ModelTokenConditionInput | null > | null,
  not?: ModelTokenConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type Token = {
  __typename: "Token",
  id: string,
  creatorEmail: string,
  creatorId: string,
  name: string,
  shared?: boolean | null,
  systemProvided?: boolean | null,
  description?: string | null,
  category: string,
  tokenPicPath?: string | null,
  tokenPicS3Url?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateTokenInput = {
  id: string,
  creatorEmail?: string | null,
  creatorId?: string | null,
  name?: string | null,
  shared?: boolean | null,
  systemProvided?: boolean | null,
  description?: string | null,
  category?: string | null,
  tokenPicPath?: string | null,
  tokenPicS3Url?: string | null,
};

export type DeleteTokenInput = {
  id: string,
};

export type CreateEntityInput = {
  id?: string | null,
  creatorEmail: string,
  creatorId: string,
  name: string,
  description?: string | null,
  category: string,
  tokenId?: string | null,
  tokenPicPath?: string | null,
  tokenPicS3Url?: string | null,
};

export type ModelEntityConditionInput = {
  creatorEmail?: ModelStringInput | null,
  creatorId?: ModelStringInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  category?: ModelStringInput | null,
  tokenId?: ModelStringInput | null,
  tokenPicPath?: ModelStringInput | null,
  tokenPicS3Url?: ModelStringInput | null,
  and?: Array< ModelEntityConditionInput | null > | null,
  or?: Array< ModelEntityConditionInput | null > | null,
  not?: ModelEntityConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type Entity = {
  __typename: "Entity",
  id: string,
  creatorEmail: string,
  creatorId: string,
  name: string,
  description?: string | null,
  category: string,
  tokenId?: string | null,
  tokenPicPath?: string | null,
  tokenPicS3Url?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateEntityInput = {
  id: string,
  creatorEmail?: string | null,
  creatorId?: string | null,
  name?: string | null,
  description?: string | null,
  category?: string | null,
  tokenId?: string | null,
  tokenPicPath?: string | null,
  tokenPicS3Url?: string | null,
};

export type DeleteEntityInput = {
  id: string,
};

export type CreateSceneInput = {
  id?: string | null,
  creatorEmail: string,
  creatorId: string,
  name: string,
  description?: string | null,
};

export type ModelSceneConditionInput = {
  creatorEmail?: ModelStringInput | null,
  creatorId?: ModelStringInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  and?: Array< ModelSceneConditionInput | null > | null,
  or?: Array< ModelSceneConditionInput | null > | null,
  not?: ModelSceneConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type Scene = {
  __typename: "Scene",
  id: string,
  creatorEmail: string,
  creatorId: string,
  name: string,
  description?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateSceneInput = {
  id: string,
  creatorEmail?: string | null,
  creatorId?: string | null,
  name?: string | null,
  description?: string | null,
};

export type DeleteSceneInput = {
  id: string,
};

export type ModelAdventureFilterInput = {
  id?: ModelIDInput | null,
  creatorEmail?: ModelStringInput | null,
  creatorId?: ModelStringInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  adventurePicPath?: ModelStringInput | null,
  adventurePicS3Url?: ModelStringInput | null,
  players?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelAdventureFilterInput | null > | null,
  or?: Array< ModelAdventureFilterInput | null > | null,
  not?: ModelAdventureFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelAdventureConnection = {
  __typename: "ModelAdventureConnection",
  items:  Array<Adventure | null >,
  nextToken?: string | null,
};

export type ModelUserDataFilterInput = {
  id?: ModelIDInput | null,
  email?: ModelStringInput | null,
  sub?: ModelStringInput | null,
  firstName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelUserDataFilterInput | null > | null,
  or?: Array< ModelUserDataFilterInput | null > | null,
  not?: ModelUserDataFilterInput | null,
};

export type ModelUserDataConnection = {
  __typename: "ModelUserDataConnection",
  items:  Array<UserData | null >,
  nextToken?: string | null,
};

export type ModelMapFilterInput = {
  id?: ModelIDInput | null,
  creatorEmail?: ModelStringInput | null,
  creatorId?: ModelStringInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  shared?: ModelBooleanInput | null,
  category?: ModelStringInput | null,
  gridded?: ModelBooleanInput | null,
  mapThumbPicPath?: ModelStringInput | null,
  mapThumbPicS3Url?: ModelStringInput | null,
  mapPicPath?: ModelStringInput | null,
  mapPicS3Url?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelMapFilterInput | null > | null,
  or?: Array< ModelMapFilterInput | null > | null,
  not?: ModelMapFilterInput | null,
};

export type ModelMapConnection = {
  __typename: "ModelMapConnection",
  items:  Array<Map | null >,
  nextToken?: string | null,
};

export type ModelTokenFilterInput = {
  id?: ModelIDInput | null,
  creatorEmail?: ModelStringInput | null,
  creatorId?: ModelStringInput | null,
  name?: ModelStringInput | null,
  shared?: ModelBooleanInput | null,
  systemProvided?: ModelBooleanInput | null,
  description?: ModelStringInput | null,
  category?: ModelStringInput | null,
  tokenPicPath?: ModelStringInput | null,
  tokenPicS3Url?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelTokenFilterInput | null > | null,
  or?: Array< ModelTokenFilterInput | null > | null,
  not?: ModelTokenFilterInput | null,
};

export type ModelTokenConnection = {
  __typename: "ModelTokenConnection",
  items:  Array<Token | null >,
  nextToken?: string | null,
};

export type ModelEntityFilterInput = {
  id?: ModelIDInput | null,
  creatorEmail?: ModelStringInput | null,
  creatorId?: ModelStringInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  category?: ModelStringInput | null,
  tokenId?: ModelStringInput | null,
  tokenPicPath?: ModelStringInput | null,
  tokenPicS3Url?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelEntityFilterInput | null > | null,
  or?: Array< ModelEntityFilterInput | null > | null,
  not?: ModelEntityFilterInput | null,
};

export type ModelEntityConnection = {
  __typename: "ModelEntityConnection",
  items:  Array<Entity | null >,
  nextToken?: string | null,
};

export type ModelSceneFilterInput = {
  id?: ModelIDInput | null,
  creatorEmail?: ModelStringInput | null,
  creatorId?: ModelStringInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelSceneFilterInput | null > | null,
  or?: Array< ModelSceneFilterInput | null > | null,
  not?: ModelSceneFilterInput | null,
};

export type ModelSceneConnection = {
  __typename: "ModelSceneConnection",
  items:  Array<Scene | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionAdventureFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  creatorEmail?: ModelSubscriptionStringInput | null,
  creatorId?: ModelSubscriptionStringInput | null,
  name?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  adventurePicPath?: ModelSubscriptionStringInput | null,
  adventurePicS3Url?: ModelSubscriptionStringInput | null,
  players?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionAdventureFilterInput | null > | null,
  or?: Array< ModelSubscriptionAdventureFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionUserDataFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  email?: ModelSubscriptionStringInput | null,
  sub?: ModelSubscriptionStringInput | null,
  firstName?: ModelSubscriptionStringInput | null,
  lastName?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionUserDataFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserDataFilterInput | null > | null,
};

export type ModelSubscriptionMapFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  creatorEmail?: ModelSubscriptionStringInput | null,
  creatorId?: ModelSubscriptionStringInput | null,
  name?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  shared?: ModelSubscriptionBooleanInput | null,
  category?: ModelSubscriptionStringInput | null,
  gridded?: ModelSubscriptionBooleanInput | null,
  mapThumbPicPath?: ModelSubscriptionStringInput | null,
  mapThumbPicS3Url?: ModelSubscriptionStringInput | null,
  mapPicPath?: ModelSubscriptionStringInput | null,
  mapPicS3Url?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionMapFilterInput | null > | null,
  or?: Array< ModelSubscriptionMapFilterInput | null > | null,
};

export type ModelSubscriptionBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
};

export type ModelSubscriptionTokenFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  creatorEmail?: ModelSubscriptionStringInput | null,
  creatorId?: ModelSubscriptionStringInput | null,
  name?: ModelSubscriptionStringInput | null,
  shared?: ModelSubscriptionBooleanInput | null,
  systemProvided?: ModelSubscriptionBooleanInput | null,
  description?: ModelSubscriptionStringInput | null,
  category?: ModelSubscriptionStringInput | null,
  tokenPicPath?: ModelSubscriptionStringInput | null,
  tokenPicS3Url?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionTokenFilterInput | null > | null,
  or?: Array< ModelSubscriptionTokenFilterInput | null > | null,
};

export type ModelSubscriptionEntityFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  creatorEmail?: ModelSubscriptionStringInput | null,
  creatorId?: ModelSubscriptionStringInput | null,
  name?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  category?: ModelSubscriptionStringInput | null,
  tokenId?: ModelSubscriptionStringInput | null,
  tokenPicPath?: ModelSubscriptionStringInput | null,
  tokenPicS3Url?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionEntityFilterInput | null > | null,
  or?: Array< ModelSubscriptionEntityFilterInput | null > | null,
};

export type ModelSubscriptionSceneFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  creatorEmail?: ModelSubscriptionStringInput | null,
  creatorId?: ModelSubscriptionStringInput | null,
  name?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionSceneFilterInput | null > | null,
  or?: Array< ModelSubscriptionSceneFilterInput | null > | null,
};

export type CreateAdventureMutationVariables = {
  input: CreateAdventureInput,
  condition?: ModelAdventureConditionInput | null,
};

export type CreateAdventureMutation = {
  createAdventure?:  {
    __typename: "Adventure",
    id: string,
    creatorEmail: string,
    creatorId: string,
    name: string,
    description?: string | null,
    adventurePicPath?: string | null,
    adventurePicS3Url?: string | null,
    players?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateAdventureMutationVariables = {
  input: UpdateAdventureInput,
  condition?: ModelAdventureConditionInput | null,
};

export type UpdateAdventureMutation = {
  updateAdventure?:  {
    __typename: "Adventure",
    id: string,
    creatorEmail: string,
    creatorId: string,
    name: string,
    description?: string | null,
    adventurePicPath?: string | null,
    adventurePicS3Url?: string | null,
    players?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteAdventureMutationVariables = {
  input: DeleteAdventureInput,
  condition?: ModelAdventureConditionInput | null,
};

export type DeleteAdventureMutation = {
  deleteAdventure?:  {
    __typename: "Adventure",
    id: string,
    creatorEmail: string,
    creatorId: string,
    name: string,
    description?: string | null,
    adventurePicPath?: string | null,
    adventurePicS3Url?: string | null,
    players?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateUserDataMutationVariables = {
  input: CreateUserDataInput,
  condition?: ModelUserDataConditionInput | null,
};

export type CreateUserDataMutation = {
  createUserData?:  {
    __typename: "UserData",
    id: string,
    email?: string | null,
    sub?: string | null,
    firstName?: string | null,
    lastName?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserDataMutationVariables = {
  input: UpdateUserDataInput,
  condition?: ModelUserDataConditionInput | null,
};

export type UpdateUserDataMutation = {
  updateUserData?:  {
    __typename: "UserData",
    id: string,
    email?: string | null,
    sub?: string | null,
    firstName?: string | null,
    lastName?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserDataMutationVariables = {
  input: DeleteUserDataInput,
  condition?: ModelUserDataConditionInput | null,
};

export type DeleteUserDataMutation = {
  deleteUserData?:  {
    __typename: "UserData",
    id: string,
    email?: string | null,
    sub?: string | null,
    firstName?: string | null,
    lastName?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateMapMutationVariables = {
  input: CreateMapInput,
  condition?: ModelMapConditionInput | null,
};

export type CreateMapMutation = {
  createMap?:  {
    __typename: "Map",
    id: string,
    creatorEmail: string,
    creatorId: string,
    name: string,
    description?: string | null,
    shared?: boolean | null,
    category: string,
    gridded?: boolean | null,
    mapThumbPicPath?: string | null,
    mapThumbPicS3Url?: string | null,
    mapPicPath?: string | null,
    mapPicS3Url?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateMapMutationVariables = {
  input: UpdateMapInput,
  condition?: ModelMapConditionInput | null,
};

export type UpdateMapMutation = {
  updateMap?:  {
    __typename: "Map",
    id: string,
    creatorEmail: string,
    creatorId: string,
    name: string,
    description?: string | null,
    shared?: boolean | null,
    category: string,
    gridded?: boolean | null,
    mapThumbPicPath?: string | null,
    mapThumbPicS3Url?: string | null,
    mapPicPath?: string | null,
    mapPicS3Url?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteMapMutationVariables = {
  input: DeleteMapInput,
  condition?: ModelMapConditionInput | null,
};

export type DeleteMapMutation = {
  deleteMap?:  {
    __typename: "Map",
    id: string,
    creatorEmail: string,
    creatorId: string,
    name: string,
    description?: string | null,
    shared?: boolean | null,
    category: string,
    gridded?: boolean | null,
    mapThumbPicPath?: string | null,
    mapThumbPicS3Url?: string | null,
    mapPicPath?: string | null,
    mapPicS3Url?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateTokenMutationVariables = {
  input: CreateTokenInput,
  condition?: ModelTokenConditionInput | null,
};

export type CreateTokenMutation = {
  createToken?:  {
    __typename: "Token",
    id: string,
    creatorEmail: string,
    creatorId: string,
    name: string,
    shared?: boolean | null,
    systemProvided?: boolean | null,
    description?: string | null,
    category: string,
    tokenPicPath?: string | null,
    tokenPicS3Url?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateTokenMutationVariables = {
  input: UpdateTokenInput,
  condition?: ModelTokenConditionInput | null,
};

export type UpdateTokenMutation = {
  updateToken?:  {
    __typename: "Token",
    id: string,
    creatorEmail: string,
    creatorId: string,
    name: string,
    shared?: boolean | null,
    systemProvided?: boolean | null,
    description?: string | null,
    category: string,
    tokenPicPath?: string | null,
    tokenPicS3Url?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteTokenMutationVariables = {
  input: DeleteTokenInput,
  condition?: ModelTokenConditionInput | null,
};

export type DeleteTokenMutation = {
  deleteToken?:  {
    __typename: "Token",
    id: string,
    creatorEmail: string,
    creatorId: string,
    name: string,
    shared?: boolean | null,
    systemProvided?: boolean | null,
    description?: string | null,
    category: string,
    tokenPicPath?: string | null,
    tokenPicS3Url?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateEntityMutationVariables = {
  input: CreateEntityInput,
  condition?: ModelEntityConditionInput | null,
};

export type CreateEntityMutation = {
  createEntity?:  {
    __typename: "Entity",
    id: string,
    creatorEmail: string,
    creatorId: string,
    name: string,
    description?: string | null,
    category: string,
    tokenId?: string | null,
    tokenPicPath?: string | null,
    tokenPicS3Url?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateEntityMutationVariables = {
  input: UpdateEntityInput,
  condition?: ModelEntityConditionInput | null,
};

export type UpdateEntityMutation = {
  updateEntity?:  {
    __typename: "Entity",
    id: string,
    creatorEmail: string,
    creatorId: string,
    name: string,
    description?: string | null,
    category: string,
    tokenId?: string | null,
    tokenPicPath?: string | null,
    tokenPicS3Url?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteEntityMutationVariables = {
  input: DeleteEntityInput,
  condition?: ModelEntityConditionInput | null,
};

export type DeleteEntityMutation = {
  deleteEntity?:  {
    __typename: "Entity",
    id: string,
    creatorEmail: string,
    creatorId: string,
    name: string,
    description?: string | null,
    category: string,
    tokenId?: string | null,
    tokenPicPath?: string | null,
    tokenPicS3Url?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateSceneMutationVariables = {
  input: CreateSceneInput,
  condition?: ModelSceneConditionInput | null,
};

export type CreateSceneMutation = {
  createScene?:  {
    __typename: "Scene",
    id: string,
    creatorEmail: string,
    creatorId: string,
    name: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateSceneMutationVariables = {
  input: UpdateSceneInput,
  condition?: ModelSceneConditionInput | null,
};

export type UpdateSceneMutation = {
  updateScene?:  {
    __typename: "Scene",
    id: string,
    creatorEmail: string,
    creatorId: string,
    name: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteSceneMutationVariables = {
  input: DeleteSceneInput,
  condition?: ModelSceneConditionInput | null,
};

export type DeleteSceneMutation = {
  deleteScene?:  {
    __typename: "Scene",
    id: string,
    creatorEmail: string,
    creatorId: string,
    name: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetAdventureQueryVariables = {
  id: string,
};

export type GetAdventureQuery = {
  getAdventure?:  {
    __typename: "Adventure",
    id: string,
    creatorEmail: string,
    creatorId: string,
    name: string,
    description?: string | null,
    adventurePicPath?: string | null,
    adventurePicS3Url?: string | null,
    players?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListAdventuresQueryVariables = {
  filter?: ModelAdventureFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAdventuresQuery = {
  listAdventures?:  {
    __typename: "ModelAdventureConnection",
    items:  Array< {
      __typename: "Adventure",
      id: string,
      creatorEmail: string,
      creatorId: string,
      name: string,
      description?: string | null,
      adventurePicPath?: string | null,
      adventurePicS3Url?: string | null,
      players?: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetUserDataQueryVariables = {
  id: string,
};

export type GetUserDataQuery = {
  getUserData?:  {
    __typename: "UserData",
    id: string,
    email?: string | null,
    sub?: string | null,
    firstName?: string | null,
    lastName?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUserDataQueryVariables = {
  filter?: ModelUserDataFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUserDataQuery = {
  listUserData?:  {
    __typename: "ModelUserDataConnection",
    items:  Array< {
      __typename: "UserData",
      id: string,
      email?: string | null,
      sub?: string | null,
      firstName?: string | null,
      lastName?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetMapQueryVariables = {
  id: string,
};

export type GetMapQuery = {
  getMap?:  {
    __typename: "Map",
    id: string,
    creatorEmail: string,
    creatorId: string,
    name: string,
    description?: string | null,
    shared?: boolean | null,
    category: string,
    gridded?: boolean | null,
    mapThumbPicPath?: string | null,
    mapThumbPicS3Url?: string | null,
    mapPicPath?: string | null,
    mapPicS3Url?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListMapsQueryVariables = {
  filter?: ModelMapFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMapsQuery = {
  listMaps?:  {
    __typename: "ModelMapConnection",
    items:  Array< {
      __typename: "Map",
      id: string,
      creatorEmail: string,
      creatorId: string,
      name: string,
      description?: string | null,
      shared?: boolean | null,
      category: string,
      gridded?: boolean | null,
      mapThumbPicPath?: string | null,
      mapThumbPicS3Url?: string | null,
      mapPicPath?: string | null,
      mapPicS3Url?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetTokenQueryVariables = {
  id: string,
};

export type GetTokenQuery = {
  getToken?:  {
    __typename: "Token",
    id: string,
    creatorEmail: string,
    creatorId: string,
    name: string,
    shared?: boolean | null,
    systemProvided?: boolean | null,
    description?: string | null,
    category: string,
    tokenPicPath?: string | null,
    tokenPicS3Url?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListTokensQueryVariables = {
  filter?: ModelTokenFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTokensQuery = {
  listTokens?:  {
    __typename: "ModelTokenConnection",
    items:  Array< {
      __typename: "Token",
      id: string,
      creatorEmail: string,
      creatorId: string,
      name: string,
      shared?: boolean | null,
      systemProvided?: boolean | null,
      description?: string | null,
      category: string,
      tokenPicPath?: string | null,
      tokenPicS3Url?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetEntityQueryVariables = {
  id: string,
};

export type GetEntityQuery = {
  getEntity?:  {
    __typename: "Entity",
    id: string,
    creatorEmail: string,
    creatorId: string,
    name: string,
    description?: string | null,
    category: string,
    tokenId?: string | null,
    tokenPicPath?: string | null,
    tokenPicS3Url?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListEntitiesQueryVariables = {
  filter?: ModelEntityFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListEntitiesQuery = {
  listEntities?:  {
    __typename: "ModelEntityConnection",
    items:  Array< {
      __typename: "Entity",
      id: string,
      creatorEmail: string,
      creatorId: string,
      name: string,
      description?: string | null,
      category: string,
      tokenId?: string | null,
      tokenPicPath?: string | null,
      tokenPicS3Url?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetSceneQueryVariables = {
  id: string,
};

export type GetSceneQuery = {
  getScene?:  {
    __typename: "Scene",
    id: string,
    creatorEmail: string,
    creatorId: string,
    name: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListScenesQueryVariables = {
  filter?: ModelSceneFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListScenesQuery = {
  listScenes?:  {
    __typename: "ModelSceneConnection",
    items:  Array< {
      __typename: "Scene",
      id: string,
      creatorEmail: string,
      creatorId: string,
      name: string,
      description?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateAdventureSubscriptionVariables = {
  filter?: ModelSubscriptionAdventureFilterInput | null,
};

export type OnCreateAdventureSubscription = {
  onCreateAdventure?:  {
    __typename: "Adventure",
    id: string,
    creatorEmail: string,
    creatorId: string,
    name: string,
    description?: string | null,
    adventurePicPath?: string | null,
    adventurePicS3Url?: string | null,
    players?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateAdventureSubscriptionVariables = {
  filter?: ModelSubscriptionAdventureFilterInput | null,
};

export type OnUpdateAdventureSubscription = {
  onUpdateAdventure?:  {
    __typename: "Adventure",
    id: string,
    creatorEmail: string,
    creatorId: string,
    name: string,
    description?: string | null,
    adventurePicPath?: string | null,
    adventurePicS3Url?: string | null,
    players?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteAdventureSubscriptionVariables = {
  filter?: ModelSubscriptionAdventureFilterInput | null,
};

export type OnDeleteAdventureSubscription = {
  onDeleteAdventure?:  {
    __typename: "Adventure",
    id: string,
    creatorEmail: string,
    creatorId: string,
    name: string,
    description?: string | null,
    adventurePicPath?: string | null,
    adventurePicS3Url?: string | null,
    players?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateUserDataSubscriptionVariables = {
  filter?: ModelSubscriptionUserDataFilterInput | null,
};

export type OnCreateUserDataSubscription = {
  onCreateUserData?:  {
    __typename: "UserData",
    id: string,
    email?: string | null,
    sub?: string | null,
    firstName?: string | null,
    lastName?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserDataSubscriptionVariables = {
  filter?: ModelSubscriptionUserDataFilterInput | null,
};

export type OnUpdateUserDataSubscription = {
  onUpdateUserData?:  {
    __typename: "UserData",
    id: string,
    email?: string | null,
    sub?: string | null,
    firstName?: string | null,
    lastName?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserDataSubscriptionVariables = {
  filter?: ModelSubscriptionUserDataFilterInput | null,
};

export type OnDeleteUserDataSubscription = {
  onDeleteUserData?:  {
    __typename: "UserData",
    id: string,
    email?: string | null,
    sub?: string | null,
    firstName?: string | null,
    lastName?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateMapSubscriptionVariables = {
  filter?: ModelSubscriptionMapFilterInput | null,
};

export type OnCreateMapSubscription = {
  onCreateMap?:  {
    __typename: "Map",
    id: string,
    creatorEmail: string,
    creatorId: string,
    name: string,
    description?: string | null,
    shared?: boolean | null,
    category: string,
    gridded?: boolean | null,
    mapThumbPicPath?: string | null,
    mapThumbPicS3Url?: string | null,
    mapPicPath?: string | null,
    mapPicS3Url?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateMapSubscriptionVariables = {
  filter?: ModelSubscriptionMapFilterInput | null,
};

export type OnUpdateMapSubscription = {
  onUpdateMap?:  {
    __typename: "Map",
    id: string,
    creatorEmail: string,
    creatorId: string,
    name: string,
    description?: string | null,
    shared?: boolean | null,
    category: string,
    gridded?: boolean | null,
    mapThumbPicPath?: string | null,
    mapThumbPicS3Url?: string | null,
    mapPicPath?: string | null,
    mapPicS3Url?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteMapSubscriptionVariables = {
  filter?: ModelSubscriptionMapFilterInput | null,
};

export type OnDeleteMapSubscription = {
  onDeleteMap?:  {
    __typename: "Map",
    id: string,
    creatorEmail: string,
    creatorId: string,
    name: string,
    description?: string | null,
    shared?: boolean | null,
    category: string,
    gridded?: boolean | null,
    mapThumbPicPath?: string | null,
    mapThumbPicS3Url?: string | null,
    mapPicPath?: string | null,
    mapPicS3Url?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateTokenSubscriptionVariables = {
  filter?: ModelSubscriptionTokenFilterInput | null,
};

export type OnCreateTokenSubscription = {
  onCreateToken?:  {
    __typename: "Token",
    id: string,
    creatorEmail: string,
    creatorId: string,
    name: string,
    shared?: boolean | null,
    systemProvided?: boolean | null,
    description?: string | null,
    category: string,
    tokenPicPath?: string | null,
    tokenPicS3Url?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateTokenSubscriptionVariables = {
  filter?: ModelSubscriptionTokenFilterInput | null,
};

export type OnUpdateTokenSubscription = {
  onUpdateToken?:  {
    __typename: "Token",
    id: string,
    creatorEmail: string,
    creatorId: string,
    name: string,
    shared?: boolean | null,
    systemProvided?: boolean | null,
    description?: string | null,
    category: string,
    tokenPicPath?: string | null,
    tokenPicS3Url?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteTokenSubscriptionVariables = {
  filter?: ModelSubscriptionTokenFilterInput | null,
};

export type OnDeleteTokenSubscription = {
  onDeleteToken?:  {
    __typename: "Token",
    id: string,
    creatorEmail: string,
    creatorId: string,
    name: string,
    shared?: boolean | null,
    systemProvided?: boolean | null,
    description?: string | null,
    category: string,
    tokenPicPath?: string | null,
    tokenPicS3Url?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateEntitySubscriptionVariables = {
  filter?: ModelSubscriptionEntityFilterInput | null,
};

export type OnCreateEntitySubscription = {
  onCreateEntity?:  {
    __typename: "Entity",
    id: string,
    creatorEmail: string,
    creatorId: string,
    name: string,
    description?: string | null,
    category: string,
    tokenId?: string | null,
    tokenPicPath?: string | null,
    tokenPicS3Url?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateEntitySubscriptionVariables = {
  filter?: ModelSubscriptionEntityFilterInput | null,
};

export type OnUpdateEntitySubscription = {
  onUpdateEntity?:  {
    __typename: "Entity",
    id: string,
    creatorEmail: string,
    creatorId: string,
    name: string,
    description?: string | null,
    category: string,
    tokenId?: string | null,
    tokenPicPath?: string | null,
    tokenPicS3Url?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteEntitySubscriptionVariables = {
  filter?: ModelSubscriptionEntityFilterInput | null,
};

export type OnDeleteEntitySubscription = {
  onDeleteEntity?:  {
    __typename: "Entity",
    id: string,
    creatorEmail: string,
    creatorId: string,
    name: string,
    description?: string | null,
    category: string,
    tokenId?: string | null,
    tokenPicPath?: string | null,
    tokenPicS3Url?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateSceneSubscriptionVariables = {
  filter?: ModelSubscriptionSceneFilterInput | null,
};

export type OnCreateSceneSubscription = {
  onCreateScene?:  {
    __typename: "Scene",
    id: string,
    creatorEmail: string,
    creatorId: string,
    name: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateSceneSubscriptionVariables = {
  filter?: ModelSubscriptionSceneFilterInput | null,
};

export type OnUpdateSceneSubscription = {
  onUpdateScene?:  {
    __typename: "Scene",
    id: string,
    creatorEmail: string,
    creatorId: string,
    name: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteSceneSubscriptionVariables = {
  filter?: ModelSubscriptionSceneFilterInput | null,
};

export type OnDeleteSceneSubscription = {
  onDeleteScene?:  {
    __typename: "Scene",
    id: string,
    creatorEmail: string,
    creatorId: string,
    name: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
