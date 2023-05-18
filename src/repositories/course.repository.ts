import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Course, CourseRelations, UserCourse} from '../models';
import {UserCourseRepository} from './user-course.repository';

export class CourseRepository extends DefaultCrudRepository<
  Course,
  typeof Course.prototype.id,
  CourseRelations
> {

  public readonly userCourses: HasManyRepositoryFactory<UserCourse, typeof Course.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('UserCourseRepository') protected userCourseRepositoryGetter: Getter<UserCourseRepository>,
  ) {
    super(Course, dataSource);
    this.userCourses = this.createHasManyRepositoryFactoryFor('userCourses', userCourseRepositoryGetter,);
    this.registerInclusionResolver('userCourses', this.userCourses.inclusionResolver);
  }
}
