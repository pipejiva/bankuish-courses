import {repository} from '@loopback/repository';
import {
  get, response
} from '@loopback/rest';
import {UserRepository} from '../repositories';

export class PopulateController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) { }




  @get('/populate')
  @response(200, {})
  async find(): Promise<JSON> {
    let createTableUsers: any = await this.userRepository.dataSource.execute("CREATE TABLE `courses2`.`User` (id INT PRIMARY KEY AUTO_INCREMENT,firstName VARCHAR(255),lastName VARCHAR(255),email VARCHAR(255),password VARCHAR(255),phone VARCHAR(255));").then((dataTableUsers: Array<number>) => {
      return dataTableUsers;
    });
    let createTableCources: any = await this.userRepository.dataSource.execute("CREATE TABLE `courses2`.`Course` (id INT PRIMARY KEY AUTO_INCREMENT,title VARCHAR(255),description TEXT,videoUrl VARCHAR(255),orderValue INT);").then((dataTableCources: Array<number>) => {
      return dataTableCources;
    });
    let createTableUserCourses: any = await this.userRepository.dataSource.execute("CREATE TABLE `courses2`.`UserCourse` (id INT PRIMARY KEY AUTO_INCREMENT,userId INT,courseId INT,isActive BOOLEAN,isCompleted BOOLEAN,FOREIGN KEY (userId) REFERENCES User(id),FOREIGN KEY (courseId) REFERENCES Course(id));").then((dataTableUserCourses: Array<number>) => {
      return dataTableUserCourses;
    });
    let createTableCoursesPrerequisites: any = await this.userRepository.dataSource.execute("CREATE TABLE `courses2`.`CoursePrerequisite` (id INT PRIMARY KEY AUTO_INCREMENT,courseId INT,prerequisiteId INT,FOREIGN KEY (courseId) REFERENCES Course(id),FOREIGN KEY (prerequisiteId) REFERENCES Course(id));").then((dataTableCoursesPrerequisites: Array<number>) => {
      return dataTableCoursesPrerequisites;
    });


    let InsertTableCourse: any = await this.userRepository.dataSource.execute("INSERT INTO `courses2`.`Course`(`id`,`title`,`description`,`videoUrl`,`orderValue`)VALUES (1, 'Marketing 1', 'Marketing 1', 'Marketing 1', 0), (2, 'Marketing 2', 'Marketing 2', 'Marketing 2', 0), (3, 'Marketing 3', 'Marketing 3', 'Marketing 3', 0), (4, 'Marketing 4', 'Marketing 4', 'Marketing 4', 0), (5, 'Marketing 5', 'Marketing 5', 'Marketing 5', 0);").then((dataTableCourse: Array<number>) => {
      return dataTableCourse;
    });

    let InsertTableUser: any = await this.userRepository.dataSource.execute("INSERT INTO `courses2`.`User`(`id`,`firstName`,`lastName`,`email`,`password`,`phone`)VALUES (1, 'Felipe', 'Jimenez', 'pipe2211@hotmail.com', 'xxxxxxx', '32432432'), (2, 'John', 'Doe', 'johndoe@example.com', 'password123', '555-1234')").then((dataTableUsers: Array<number>) => {
      return dataTableUsers;
    });

    let InsertTableUserCourses: any = await this.userRepository.dataSource.execute("INSERT INTO `courses2`.`UserCourse`(`id`,`userId`,`courseId`,`isActive`,`isCompleted`)VALUES (1,1,5,0,0), (2,1,4,0,0),(3,1,2,0,0),(4,1,3,0,0)").then((dataTableUsers: Array<number>) => {
      return dataTableUsers;
    });

    let InsertTableCoursesPrerequisites: any = await this.userRepository.dataSource.execute("INSERT INTO `courses2`.`CoursePrerequisite`(`id`,`courseId`,`prerequisiteId`)VALUES(1,3,2),(2,2,4),(3,1,3),(6,4,5);").then((dataTableUsers: Array<number>) => {
      return dataTableUsers;
    });

    return createTableUsers;
  }

}



