import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {User, UserRelations, UserCourse} from '../models';
import {UserCourseRepository} from './user-course.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly userCourses: HasManyRepositoryFactory<UserCourse, typeof User.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('UserCourseRepository') protected userCourseRepositoryGetter: Getter<UserCourseRepository>,
  ) {
    super(User, dataSource);
    this.userCourses = this.createHasManyRepositoryFactoryFor('userCourses', userCourseRepositoryGetter,);
    this.registerInclusionResolver('userCourses', this.userCourses.inclusionResolver);
  }
}
