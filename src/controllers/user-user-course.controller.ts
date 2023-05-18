import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  User,
  UserCourse,
} from '../models';
import {UserRepository} from '../repositories';

export class UserUserCourseController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/user-courses', {
    responses: {
      '200': {
        description: 'Array of User has many UserCourse',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(UserCourse)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<UserCourse>,
  ): Promise<UserCourse[]> {
    return this.userRepository.userCourses(id).find(filter);
  }

  @post('/users/{id}/user-courses', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(UserCourse)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserCourse, {
            title: 'NewUserCourseInUser',
            exclude: ['id'],
            optional: ['userId']
          }),
        },
      },
    }) userCourse: Omit<UserCourse, 'id'>,
  ): Promise<UserCourse> {
    return this.userRepository.userCourses(id).create(userCourse);
  }

  @patch('/users/{id}/user-courses', {
    responses: {
      '200': {
        description: 'User.UserCourse PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserCourse, {partial: true}),
        },
      },
    })
    userCourse: Partial<UserCourse>,
    @param.query.object('where', getWhereSchemaFor(UserCourse)) where?: Where<UserCourse>,
  ): Promise<Count> {
    return this.userRepository.userCourses(id).patch(userCourse, where);
  }

  @del('/users/{id}/user-courses', {
    responses: {
      '200': {
        description: 'User.UserCourse DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(UserCourse)) where?: Where<UserCourse>,
  ): Promise<Count> {
    return this.userRepository.userCourses(id).delete(where);
  }
}
