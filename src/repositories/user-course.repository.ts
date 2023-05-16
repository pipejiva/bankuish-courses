import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {UserCourse, UserCourseRelations} from '../models';

export class UserCourseRepository extends DefaultCrudRepository<
  UserCourse,
  typeof UserCourse.prototype.id,
  UserCourseRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(UserCourse, dataSource);
  }
}
