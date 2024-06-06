// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Adventure, UserData, Map, Token, Entity, Scene } = initSchema(schema);

export {
  Adventure,
  UserData,
  Map,
  Token,
  Entity,
  Scene
};