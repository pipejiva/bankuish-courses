import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {UserCourse} from '../models';
import {UserCourseRepository} from '../repositories';

export class UserCourseController {
  constructor(
    @repository(UserCourseRepository)
    public userCourseRepository : UserCourseRepository,
  ) {}

  @post('/user-courses')
  @response(200, {
    description: 'UserCourse model instance',
    content: {'application/json': {schema: getModelSchemaRef(UserCourse)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserCourse, {
            title: 'NewUserCourse',
            exclude: ['id'],
          }),
        },
      },
    })
    userCourse: Omit<UserCourse, 'id'>,
  ): Promise<UserCourse> {
    return this.userCourseRepository.create(userCourse);
  }

  @get('/user-courses/count')
  @response(200, {
    description: 'UserCourse model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(UserCourse) where?: Where<UserCourse>,
  ): Promise<Count> {
    return this.userCourseRepository.count(where);
  }

  @get('/user-courses')
  @response(200, {
    description: 'Array of UserCourse model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(UserCourse, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(UserCourse) filter?: Filter<UserCourse>,
  ): Promise<UserCourse[]> {
    return this.userCourseRepository.find(filter);
  }

  @patch('/user-courses')
  @response(200, {
    description: 'UserCourse PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserCourse, {partial: true}),
        },
      },
    })
    userCourse: UserCourse,
    @param.where(UserCourse) where?: Where<UserCourse>,
  ): Promise<Count> {
    return this.userCourseRepository.updateAll(userCourse, where);
  }

  @get('/user-courses/{id}')
  @response(200, {
    description: 'UserCourse model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(UserCourse, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(UserCourse, {exclude: 'where'}) filter?: FilterExcludingWhere<UserCourse>
  ): Promise<UserCourse> {
    return this.userCourseRepository.findById(id, filter);
  }

  @patch('/user-courses/{id}')
  @response(204, {
    description: 'UserCourse PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserCourse, {partial: true}),
        },
      },
    })
    userCourse: UserCourse,
  ): Promise<void> {
    await this.userCourseRepository.updateById(id, userCourse);
  }

  @put('/user-courses/{id}')
  @response(204, {
    description: 'UserCourse PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() userCourse: UserCourse,
  ): Promise<void> {
    await this.userCourseRepository.replaceById(id, userCourse);
  }

  @del('/user-courses/{id}')
  @response(204, {
    description: 'UserCourse DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.userCourseRepository.deleteById(id);
  }
}
