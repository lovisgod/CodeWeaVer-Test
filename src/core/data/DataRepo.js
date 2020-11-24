// import db into this repo

const { default: Student } = require('../domain/Student');

class DataRepo {
  constructor() {
    this.students = [];
  }

  createStudent(student) {
    if (student instanceof Student) {
      this.students.push(student);
    }
  }

  listStudents(size) {
    if (size !== undefined || size < 1) {
      return this.students;
    }
    return this.students;
  }

  updateStudentById(id, student) {
    if (student instanceof Student) {
      this.students.push(student);
    }
  }

  deleteStudentById(id) {
    this.students.splice(this.students.indexOf(id));
    return this.students;
  }
}

export default DataRepo;
