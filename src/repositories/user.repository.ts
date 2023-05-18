import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {User, UserCourse, UserRelations} from '../models';
import {UserCourseRepository} from './user-course.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  public readonly userCourses: HasManyRepositoryFactory<UserCourse, typeof UserCourse.prototype.ID>;
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('CourseRepository') protected userCoursesRepositoryGetter: Getter<UserCourseRepository>
  ) {
    super(User, dataSource);
    this.userCourses = this.createHasManyRepositoryFactoryFor('userCourses', userCoursesRepositoryGetter,);
    this.registerInclusionResolver('userCourses', this.userCourses.inclusionResolver);
  }
}
