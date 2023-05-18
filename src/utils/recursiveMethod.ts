interface Course {
  id: number;
}

interface CoursePrerequisite {
  id: number;
  courseId: number;
  prerequisiteId: number;
}

interface UserCourse {
  id: number;
  userId: number;
  courseId: number;
  isActive: number;
  isCompleted: number;
}

export class RecursiveMethod {

  static convertToRecursiveList(coursePrerequisites: CoursePrerequisite[], userCourses: UserCourse[]): Course[] {
    const prerequisiteMap = new Map<number, number[]>();

    // Populate prerequisite map
    for (const prerequisite of coursePrerequisites) {
      const {courseId, prerequisiteId} = prerequisite;
      if (!prerequisiteMap.has(courseId)) {
        prerequisiteMap.set(courseId, []);
      }
      prerequisiteMap.get(courseId)?.push(prerequisiteId);
    }

    // Recursive function to build the ordered course list
    function buildCourseList(courseId: number): Course[] {
      const prerequisites = prerequisiteMap.get(courseId);
      const courses: Course[] = [];

      if (prerequisites) {
        for (const prerequisiteId of prerequisites) {
          courses.push(...buildCourseList(prerequisiteId));
        }
      }

      courses.push({id: courseId});

      return courses;
    }

    const orderedCourses: Course[] = [];

    // Build the ordered course list for each user course
    for (const userCourse of userCourses) {
      orderedCourses.push(...buildCourseList(userCourse.courseId));
    }

    return orderedCourses;
  }


  static convertToRecursiveList2(coursePrerequisites: CoursePrerequisite[]): Course[] {
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
    console.log(orderedCourses)
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

    courses.push({id: courseId});
    return courses;
  }


  static callrecursive(): string {
    const coursePrerequisites: CoursePrerequisite[] = [
      {id: 1, courseId: 3, prerequisiteId: 2},
      {id: 2, courseId: 2, prerequisiteId: 4},
      {id: 5, courseId: 5, prerequisiteId: 4},
      {id: 6, courseId: 4, prerequisiteId: 8},
      {id: 6, courseId: 8, prerequisiteId: 7},
      {id: 6, courseId: 7, prerequisiteId: 5},
    ];

    const userCourses: UserCourse[] = [
      {id: 1, userId: 1, courseId: 4, isActive: 1, isCompleted: 0},
      {id: 2, userId: 1, courseId: 1, isActive: 0, isCompleted: 0},
    ];

    const orderedCourses = RecursiveMethod.convertToRecursiveList2(coursePrerequisites);
    console.log(orderedCourses);
    return "S"
  }

}

