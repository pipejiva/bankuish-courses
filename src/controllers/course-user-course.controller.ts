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
  Course,
  UserCourse,
} from '../models';
import {CourseRepository} from '../repositories';

export class CourseUserCourseController {
  constructor(
    @repository(CourseRepository) protected courseRepository: CourseRepository,
  ) { }

  @get('/courses/{id}/user-courses', {
    responses: {
      '200': {
        description: 'Array of Course has many UserCourse',
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
    return this.courseRepository.userCourses(id).find(filter);
  }

  @post('/courses/{id}/user-courses', {
    responses: {
      '200': {
        description: 'Course model instance',
        content: {'application/json': {schema: getModelSchemaRef(UserCourse)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Course.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserCourse, {
            title: 'NewUserCourseInCourse',
            exclude: ['id'],
            optional: ['courseId']
          }),
        },
      },
    }) userCourse: Omit<UserCourse, 'id'>,
  ): Promise<UserCourse> {
    return this.courseRepository.userCourses(id).create(userCourse);
  }

  @patch('/courses/{id}/user-courses', {
    responses: {
      '200': {
        description: 'Course.UserCourse PATCH success count',
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
    return this.courseRepository.userCourses(id).patch(userCourse, where);
  }

  @del('/courses/{id}/user-courses', {
    responses: {
      '200': {
        description: 'Course.UserCourse DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(UserCourse)) where?: Where<UserCourse>,
  ): Promise<Count> {
    return this.courseRepository.userCourses(id).delete(where);
  }
}
