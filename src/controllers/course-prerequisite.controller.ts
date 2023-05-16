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
import {CoursePrerequisite} from '../models';
import {CoursePrerequisiteRepository} from '../repositories';

export class CoursePrerequisiteController {
  constructor(
    @repository(CoursePrerequisiteRepository)
    public coursePrerequisiteRepository : CoursePrerequisiteRepository,
  ) {}

  @post('/course-prerequisites')
  @response(200, {
    description: 'CoursePrerequisite model instance',
    content: {'application/json': {schema: getModelSchemaRef(CoursePrerequisite)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CoursePrerequisite, {
            title: 'NewCoursePrerequisite',
            exclude: ['id'],
          }),
        },
      },
    })
    coursePrerequisite: Omit<CoursePrerequisite, 'id'>,
  ): Promise<CoursePrerequisite> {
    return this.coursePrerequisiteRepository.create(coursePrerequisite);
  }

  @get('/course-prerequisites/count')
  @response(200, {
    description: 'CoursePrerequisite model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(CoursePrerequisite) where?: Where<CoursePrerequisite>,
  ): Promise<Count> {
    return this.coursePrerequisiteRepository.count(where);
  }

  @get('/course-prerequisites')
  @response(200, {
    description: 'Array of CoursePrerequisite model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CoursePrerequisite, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(CoursePrerequisite) filter?: Filter<CoursePrerequisite>,
  ): Promise<CoursePrerequisite[]> {
    return this.coursePrerequisiteRepository.find(filter);
  }

  @patch('/course-prerequisites')
  @response(200, {
    description: 'CoursePrerequisite PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CoursePrerequisite, {partial: true}),
        },
      },
    })
    coursePrerequisite: CoursePrerequisite,
    @param.where(CoursePrerequisite) where?: Where<CoursePrerequisite>,
  ): Promise<Count> {
    return this.coursePrerequisiteRepository.updateAll(coursePrerequisite, where);
  }

  @get('/course-prerequisites/{id}')
  @response(200, {
    description: 'CoursePrerequisite model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CoursePrerequisite, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(CoursePrerequisite, {exclude: 'where'}) filter?: FilterExcludingWhere<CoursePrerequisite>
  ): Promise<CoursePrerequisite> {
    return this.coursePrerequisiteRepository.findById(id, filter);
  }

  @patch('/course-prerequisites/{id}')
  @response(204, {
    description: 'CoursePrerequisite PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CoursePrerequisite, {partial: true}),
        },
      },
    })
    coursePrerequisite: CoursePrerequisite,
  ): Promise<void> {
    await this.coursePrerequisiteRepository.updateById(id, coursePrerequisite);
  }

  @put('/course-prerequisites/{id}')
  @response(204, {
    description: 'CoursePrerequisite PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() coursePrerequisite: CoursePrerequisite,
  ): Promise<void> {
    await this.coursePrerequisiteRepository.replaceById(id, coursePrerequisite);
  }

  @del('/course-prerequisites/{id}')
  @response(204, {
    description: 'CoursePrerequisite DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.coursePrerequisiteRepository.deleteById(id);
  }
}
