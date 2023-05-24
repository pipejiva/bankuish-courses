import {TokenService} from '@loopback/authentication';
import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {UserProfile, securityId} from '@loopback/security';
import * as firebaseAdmin from "firebase-admin";
const request = require("request-promise");

// Add this so that loopback can tell the user what error happened
class FirebaseTokenError extends Error {
  statusCode: number
  constructor(message: string, statusCode = 403) {
    super(message)
    this.statusCode = statusCode;
  }
}

@injectable({scope: BindingScope.TRANSIENT})
export class FirebaseTokenService implements TokenService {
  constructor(/* Add @inject to inject parameters */) { }

  tokenToUserProfile(token: firebaseAdmin.auth.DecodedIdToken): UserProfile {
    return {
      [securityId]: token.uid,
      email: token.email,
      name: token.name,
      picture: token.picture,
    }
  }

  async verifyToken(token: string): Promise<UserProfile> {
    try {
      const options = {
        'method': 'POST',
        'url': 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=AIzaSyA6Opt7uo5mjmESPat_fG77ocEqKsrdsbk',
        'headers': {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "token": token,
          "returnSecureToken": true
        })
      };
      //FIX
      const response = await request.post(options);
      const parseredResponse = JSON.parse(response);
      if (!parseredResponse.idToken) {
        throw new FirebaseTokenError(`The token is invalid`, 401)
      }
      else {
        const decodedToken = await firebaseAdmin.auth().verifyIdToken(parseredResponse.idToken);
        return this.tokenToUserProfile(decodedToken);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('%cerror firebase-token.service.ts->verifyToken', 'color: red; display: block; width: 100%;', error);
      throw new FirebaseTokenError(`${error.code}`, 401)
    }
  }

  /*
  generateToken(userProfile: UserProfile): Promise<string> {
    throw new FirebaseTokenError('Method not implemented.');
  }
 */


  async generateToken(userProfile: UserProfile): Promise<string> {
    if (!userProfile.email) {
      throw new FirebaseTokenError('Email is undefined');
    }
    try {
      const userRecord = await firebaseAdmin.auth().getUserByEmail(userProfile.email);
      const uid = userRecord.uid;
      const token = await firebaseAdmin.auth().createCustomToken(uid);
      return token;
    } catch (error) {
      console.log(error)
      throw new FirebaseTokenError('Unknow Error');
    }
  }

}



