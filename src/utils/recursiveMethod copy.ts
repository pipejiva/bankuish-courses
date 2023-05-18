

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

  static orderUserCoursesByPrerequisites(
    userCourses: UserCourse[],
    coursePrerequisites: CoursePrerequisite[]
  ): UserCourse[] {
    const coursePrerequisitesMap: {[key: number]: CoursePrerequisite} = {};

    // Create a mapping of courseId to CoursePrerequisite object
    for (const prerequisite of coursePrerequisites) {
      coursePrerequisitesMap[prerequisite.courseId] = prerequisite;
    }

    // Sort userCourses based on the prerequisites
    const sortedUserCourses = userCourses.sort((a, b) => {
      const aPrerequisite = coursePrerequisitesMap[a.courseId];
      const bPrerequisite = coursePrerequisitesMap[b.courseId];

      // If either course does not have a prerequisite, keep the order unchanged
      if (!aPrerequisite || !bPrerequisite) {
        return 0;
      }

      // Compare the prerequisiteIds to determine the order
      return aPrerequisite.prerequisiteId - bPrerequisite.prerequisiteId;
    });

    return sortedUserCourses;
  }

  static callrecursive(): string {
    const coursePrerequisites: CoursePrerequisite[] = [
      {id: 1, courseId: 3, prerequisiteId: 2},
      {id: 2, courseId: 2, prerequisiteId: 4},
      {id: 5, courseId: 1, prerequisiteId: 4},
      {id: 6, courseId: 4, prerequisiteId: 5}
    ];

    const userCourses: UserCourse[] = [
      {id: 2, userId: 1, courseId: 5, isActive: 0, isCompleted: 0},
      {id: 3, userId: 1, courseId: 2, isActive: 0, isCompleted: 0},
      {id: 4, userId: 1, courseId: 1, isActive: 0, isCompleted: 0},
      {id: 1, userId: 1, courseId: 4, isActive: 1, isCompleted: 0}
    ];
    const orderedUserCourses = RecursiveMethod.orderUserCoursesByPrerequisites(
      userCourses,
      coursePrerequisites
    );
    console.log(orderedUserCourses);
    return "S"
  }

}

