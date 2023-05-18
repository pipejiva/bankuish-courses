import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Course, CourseRelations, UserCourse} from '../models';
import {UserCourseRepository} from './user-course.repository';

export class CourseRepository extends DefaultCrudRepository<
  Course,
  typeof Course.prototype.id,
  CourseRelations
> {
  public readonly userCourses: HasManyRepositoryFactory<UserCourse, typeof UserCourse.prototype.ID>;
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('CourseRepository') protected userCoursesRepositoryGetter: Getter<UserCourseRepository>
  ) {
    super(Course, dataSource);
    this.userCourses = this.createHasManyRepositoryFactoryFor('userCourses', userCoursesRepositoryGetter,);
    this.registerInclusionResolver('userCourses', this.userCourses.inclusionResolver);
  }
}
