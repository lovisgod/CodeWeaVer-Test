/* eslint-disable class-methods-use-this */
/* eslint-disable no-useless-constructor */
// import db into this repo

import Student from '../domain/Student.js';

let students = [];
class DataRepo {
  // eslint-disable-next-line no-empty-function
  constructor() {
  }

  createStudent(student) {
    console.log(student);
    if (student instanceof Student) {
      students.push(student);
      console.log(students);
    }
  }

  listStudents(size) {
    console.log(students);
    if (size !== undefined || size < 1) {
      return students;
    }
    return students;
  }

  updateStudentById(id, student) {
    if (student instanceof Student) {
      students.push(student);
    }
  }

  deleteStudentById(id) {
    students.splice(students.indexOf(id));
    return students;
  }
}

export default DataRepo;
