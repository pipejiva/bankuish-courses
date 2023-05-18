import {AuthenticationComponent} from '@loopback/authentication';
import {JWTAuthenticationComponent, TokenServiceBindings} from '@loopback/authentication-jwt';
import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {
  RestExplorerBindings,
  RestExplorerComponent
} from '@loopback/rest-explorer';
import {ServiceMixin} from '@loopback/service-proxy';
import * as dotenv from 'dotenv';
import * as firebase from "firebase-admin";
import path from 'path';
import {MySequence} from './sequence';
import {FirebaseTokenService} from './services';
export {ApplicationConfig};

export class BankuishCoursesApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);
    dotenv.config({path: '.env'});
    // initialize firebase
    firebase.initializeApp({
      credential: firebase.credential.applicationDefault(),
      projectId: 'bankuish-e0d72'
    })
    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };

    console.log(process.env.GOOGLE_APPLICATION_CREDENTIALS);
    this.component(AuthenticationComponent);
    this.component(JWTAuthenticationComponent);
    this.bind(TokenServiceBindings.TOKEN_SERVICE).toClass(FirebaseTokenService);
  }
}
