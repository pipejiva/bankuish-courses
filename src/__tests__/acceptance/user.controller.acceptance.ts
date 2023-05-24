import {
  createStubInstance,
  expect
} from '@loopback/testlab';
import {UserController} from '../../controllers';
import {CoursePrerequisiteRepository, CourseRepository, UserRepository} from '../../repositories';

describe('UserController (unit)', () => {
  let userRepository: UserRepository;
  let coursePrerequisiteRepository: CoursePrerequisiteRepository;
  let courseRepository: CourseRepository;
  beforeEach(givenStubbedRepository);

  describe('find()', () => {
    it('retrieves all users', async () => {
      /*userRepository.stubs.find.resolves([{title: 'User'}]);
      sinon.assert.calledWithMatch(userRepository.stubs.find, {
        where: {title: 'User'},
      });*/
      const controller = new UserController(userRepository, coursePrerequisiteRepository, courseRepository);
      const users = await controller.find();
      expect(users).to.containEql('array');
    });
  });

  function givenStubbedRepository() {
    userRepository = createStubInstance(UserRepository);
  }
});


describe('create', () => {
  let userRepository: UserRepository;
  let coursePrerequisiteRepository: CoursePrerequisiteRepository;
  let courseRepository: CourseRepository;
  beforeEach(givenStubbedRepository);
  it('should create a new user', async () => {
    const userData = {
      title: 'New User',
    };
    const controller = new UserController(userRepository, coursePrerequisiteRepository, courseRepository);
    const createdUser = await controller.create(userData);

    expect(createdUser.title).to.equal(userData.title);
  });
  function givenStubbedRepository() {
    userRepository = createStubInstance(UserRepository);
  }
});

describe('count', () => {
  let userRepository: UserRepository;
  let coursePrerequisiteRepository: CoursePrerequisiteRepository;
  let courseRepository: CourseRepository;
  beforeEach(givenStubbedRepository);
  it('should return the count of users', async () => {
    const controller = new UserController(userRepository, coursePrerequisiteRepository, courseRepository);
    const count = await controller.count();

    expect(count).to.containEql('number');
    // Assert other expectations as needed
  });
  function givenStubbedRepository() {
    userRepository = createStubInstance(UserRepository);
  }
});


describe('Order users courses', () => {
  let userRepository: UserRepository;
  let coursePrerequisiteRepository: CoursePrerequisiteRepository;
  let courseRepository: CourseRepository;
  beforeEach(givenStubbedRepository);

  describe('find()', () => {
    it('retrieves all users', async () => {
      /*userRepository.stubs.find.resolves([{title: 'User'}]);
      sinon.assert.calledWithMatch(userRepository.stubs.find, {
        where: {title: 'User'},
      });*/
      const controller = new UserController(userRepository, coursePrerequisiteRepository, courseRepository);
      const users = await controller.findUserCoursesById(1);
      expect(users).to.containEql('array');
    });
  });

  function givenStubbedRepository() {
    userRepository = createStubInstance(UserRepository);
  }
});
