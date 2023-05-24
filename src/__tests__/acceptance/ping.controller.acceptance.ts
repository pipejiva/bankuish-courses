/*import {
  createStubInstance,
  expect,
  sinon,
  StubbedInstanceWithSinonAccessor
} from '@loopback/testlab';
import {CourseController} from '../../controllers';
import {CourseRepository} from '../../repositories';

describe('CourseController (unit)', () => {
  let repository: StubbedInstanceWithSinonAccessor<CourseRepository>;
  beforeEach(givenStubbedRepository);

  describe('getDetails()', () => {
    it('retrieves details of a product', async () => {
      const controller = new CourseController(repository);
      repository.stubs.find.resolves([{name: 'Pen', slug: 'pen'}]);

      const details = await controller.find('pen');

      expect(details).to.containEql({name: 'Pen', slug: 'pen'});
      sinon.assert.calledWithMatch(repository.stubs.find, {
        where: {slug: 'pen'},
      });
    });
  });

  function givenStubbedRepository() {
    repository = createStubInstance(CourseRepository);
  }
*/
