import {CoursePrerequisite} from '../models';

interface Course {
  courseId: number;
}

export class RecursiveMethod {

  static convertToRecursiveList(coursePrerequisites: CoursePrerequisite[]): Course[] {
    const prerequisiteMap = new Map<number, number[]>();

    // Populate prerequisite map
    for (const prerequisite of coursePrerequisites) {
      const {courseId, prerequisiteId} = prerequisite;
      if (!prerequisiteMap.has(courseId)) {
        prerequisiteMap.set(courseId, []);
      }
      prerequisiteMap.get(courseId)?.push(prerequisiteId);
    }

    let orderedCourses: Course[] = [];
    orderedCourses = RecursiveMethod.buildCourseList(prerequisiteMap, coursePrerequisites[0].courseId, coursePrerequisites.length);
    return orderedCourses;
  }

  // Recursive function to build the ordered course list
  static buildCourseList(prerequisiteMap: Map<number, number[]>, courseId: number, i: number): Course[] {
    const prerequisites = prerequisiteMap.get(courseId);
    const courses: Course[] = [];

    if (prerequisites && i > 0) {
      for (const prerequisiteId of prerequisites) {
        courses.push(...RecursiveMethod.buildCourseList(prerequisiteMap, prerequisiteId, i - 1));
      }
    }
    courses.push({courseId: courseId});
    return courses;
  }
}

