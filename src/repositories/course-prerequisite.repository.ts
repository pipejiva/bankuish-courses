import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {CoursePrerequisite, CoursePrerequisiteRelations} from '../models';

export class CoursePrerequisiteRepository extends DefaultCrudRepository<
  CoursePrerequisite,
  typeof CoursePrerequisite.prototype.id,
  CoursePrerequisiteRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(CoursePrerequisite, dataSource);
  }
}
