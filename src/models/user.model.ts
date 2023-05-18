import {Entity, hasMany, model, property} from '@loopback/repository';
import {UserCourse} from './user-course.model';

@model({settings: {idInjection: false, mysql: {schema: 'courses', table: 'User'}}})
export class User extends Entity {
  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    generated: 1,
    id: 1,
    mysql: {columnName: 'id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 1},
  })
  id?: number;

  @property({
    type: 'string',
    length: 255,
    generated: 0,
    mysql: {columnName: 'firstName', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  firstName?: string;

  @property({
    type: 'string',
    length: 255,
    generated: 0,
    mysql: {columnName: 'lastName', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  lastName?: string;

  @property({
    type: 'string',
    length: 255,
    generated: 0,
    mysql: {columnName: 'email', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  email?: string;

  @property({
    type: 'string',
    length: 255,
    generated: 0,
    mysql: {columnName: 'password', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  password?: string;

  @property({
    type: 'string',
    length: 255,
    generated: 0,
    mysql: {columnName: 'phone', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  phone?: string;


  @hasMany(() => UserCourse, {keyTo: 'userId'})
  userCourses: UserCourse[];


  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<User>) {
    super(data);
  }
}


export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
