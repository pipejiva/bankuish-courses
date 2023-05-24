import {
  createStubInstance,
  expect
} from '@loopback/testlab';
import {CourseController} from '../../controllers';
import {CourseRepository} from '../../repositories';

describe('CourseController (unit)', () => {
  let repository: CourseRepository;
  beforeEach(givenStubbedRepository);

  describe('find()', () => {
    it('retrieves all courses', async () => {
      /*repository.stubs.find.resolves([{title: 'Course'}]);
      sinon.assert.calledWithMatch(repository.stubs.find, {
        where: {title: 'Course'},
      });*/
      const controller = new CourseController(repository);
      const courses = await controller.find();
      expect(courses).to.containEql('array');
    });
  });

  function givenStubbedRepository() {
    repository = createStubInstance(CourseRepository);
  }
});


describe('create', () => {
  let repository: CourseRepository;
  beforeEach(givenStubbedRepository);
  it('should create a new course', async () => {
    const courseData = {
      title: 'New Course',
    };
    const controller = new CourseController(repository);
    const createdCourse = await controller.create(courseData);

    expect(createdCourse.title).to.equal(courseData.title);
  });
  function givenStubbedRepository() {
    repository = createStubInstance(CourseRepository);
  }
});

describe('count', () => {
  let repository: CourseRepository;
  beforeEach(givenStubbedRepository);
  it('should return the count of courses', async () => {
    const controller = new CourseController(repository);
    const count = await controller.count();

    expect(count).to.containEql('number');
    // Assert other expectations as needed
  });
  function givenStubbedRepository() {
    repository = createStubInstance(CourseRepository);
  }
});
