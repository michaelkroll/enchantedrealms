import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerAdventure = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Adventure, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly creatorEmail: string;
  readonly creatorId: string;
  readonly name: string;
  readonly description?: string | null;
  readonly adventurePicPath?: string | null;
  readonly adventurePicS3Url?: string | null;
  readonly players?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyAdventure = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Adventure, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly creatorEmail: string;
  readonly creatorId: string;
  readonly name: string;
  readonly description?: string | null;
  readonly adventurePicPath?: string | null;
  readonly adventurePicS3Url?: string | null;
  readonly players?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Adventure = LazyLoading extends LazyLoadingDisabled ? EagerAdventure : LazyAdventure

export declare const Adventure: (new (init: ModelInit<Adventure>) => Adventure) & {
  copyOf(source: Adventure, mutator: (draft: MutableModel<Adventure>) => MutableModel<Adventure> | void): Adventure;
}

type EagerUserData = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserData, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly email?: string | null;
  readonly sub?: string | null;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly nickName?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUserData = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserData, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly email?: string | null;
  readonly sub?: string | null;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly nickName?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type UserData = LazyLoading extends LazyLoadingDisabled ? EagerUserData : LazyUserData

export declare const UserData: (new (init: ModelInit<UserData>) => UserData) & {
  copyOf(source: UserData, mutator: (draft: MutableModel<UserData>) => MutableModel<UserData> | void): UserData;
}

type EagerMap = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Map, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly creatorEmail: string;
  readonly creatorId: string;
  readonly name: string;
  readonly description?: string | null;
  readonly shared?: boolean | null;
  readonly category: string;
  readonly gridded?: boolean | null;
  readonly gridOffsetX?: number | null;
  readonly gridOffsetY?: number | null;
  readonly gridColumns?: number | null;
  readonly gridRows?: number | null;
  readonly gridCellWidth?: number | null;
  readonly gridCellHeight?: number | null;
  readonly mapThumbPicPath?: string | null;
  readonly mapThumbPicS3Url?: string | null;
  readonly mapPicPath?: string | null;
  readonly mapPicS3Url?: string | null;
  readonly tags?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyMap = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Map, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly creatorEmail: string;
  readonly creatorId: string;
  readonly name: string;
  readonly description?: string | null;
  readonly shared?: boolean | null;
  readonly category: string;
  readonly gridded?: boolean | null;
  readonly gridOffsetX?: number | null;
  readonly gridOffsetY?: number | null;
  readonly gridColumns?: number | null;
  readonly gridRows?: number | null;
  readonly gridCellWidth?: number | null;
  readonly gridCellHeight?: number | null;
  readonly mapThumbPicPath?: string | null;
  readonly mapThumbPicS3Url?: string | null;
  readonly mapPicPath?: string | null;
  readonly mapPicS3Url?: string | null;
  readonly tags?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Map = LazyLoading extends LazyLoadingDisabled ? EagerMap : LazyMap

export declare const Map: (new (init: ModelInit<Map>) => Map) & {
  copyOf(source: Map, mutator: (draft: MutableModel<Map>) => MutableModel<Map> | void): Map;
}

type EagerToken = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Token, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly creatorEmail: string;
  readonly creatorId: string;
  readonly name: string;
  readonly shared?: boolean | null;
  readonly systemProvided?: boolean | null;
  readonly description?: string | null;
  readonly category: string;
  readonly tokenPicPath?: string | null;
  readonly tokenPicS3Url?: string | null;
  readonly tags?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyToken = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Token, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly creatorEmail: string;
  readonly creatorId: string;
  readonly name: string;
  readonly shared?: boolean | null;
  readonly systemProvided?: boolean | null;
  readonly description?: string | null;
  readonly category: string;
  readonly tokenPicPath?: string | null;
  readonly tokenPicS3Url?: string | null;
  readonly tags?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Token = LazyLoading extends LazyLoadingDisabled ? EagerToken : LazyToken

export declare const Token: (new (init: ModelInit<Token>) => Token) & {
  copyOf(source: Token, mutator: (draft: MutableModel<Token>) => MutableModel<Token> | void): Token;
}

type EagerEntity = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Entity, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly creatorEmail: string;
  readonly creatorId: string;
  readonly name: string;
  readonly description?: string | null;
  readonly category: string;
  readonly tokenId?: string | null;
  readonly tokenPicPath?: string | null;
  readonly tokenPicS3Url?: string | null;
  readonly tags?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyEntity = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Entity, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly creatorEmail: string;
  readonly creatorId: string;
  readonly name: string;
  readonly description?: string | null;
  readonly category: string;
  readonly tokenId?: string | null;
  readonly tokenPicPath?: string | null;
  readonly tokenPicS3Url?: string | null;
  readonly tags?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Entity = LazyLoading extends LazyLoadingDisabled ? EagerEntity : LazyEntity

export declare const Entity: (new (init: ModelInit<Entity>) => Entity) & {
  copyOf(source: Entity, mutator: (draft: MutableModel<Entity>) => MutableModel<Entity> | void): Entity;
}

type EagerScene = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Scene, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly creatorEmail: string;
  readonly creatorId: string;
  readonly name: string;
  readonly description?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyScene = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Scene, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly creatorEmail: string;
  readonly creatorId: string;
  readonly name: string;
  readonly description?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Scene = LazyLoading extends LazyLoadingDisabled ? EagerScene : LazyScene

export declare const Scene: (new (init: ModelInit<Scene>) => Scene) & {
  copyOf(source: Scene, mutator: (draft: MutableModel<Scene>) => MutableModel<Scene> | void): Scene;
}