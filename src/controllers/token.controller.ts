import {post, requestBody} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import {FirebaseTokenService} from '../services';



export class TokenController {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor() { }

  @post('/generate-token', {
    responses: {
      '200': {
        description: 'Generated token',
        content: {'application/json': {schema: {type: 'string'}}},
      },
    },
  })
  async generateToken(@requestBody() userProfile: UserProfile): Promise<string> {
    if (!userProfile.email) {
      throw new Error('Email is undefined');
    }

    // eslint-disable-next-line no-useless-catch
    try {
      const fireTokenService = new FirebaseTokenService();
      const token = await fireTokenService.generateToken(userProfile);
      return token;
    } catch (error) {
      throw error;
    }
  }
}
