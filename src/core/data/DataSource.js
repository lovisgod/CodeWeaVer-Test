const { default: Student } = require('../domain/Student');

class DataSource {
  constructor(dataRepo) {
    this.dataRepo = dataRepo;
  }

  createStudent(student) {
    if (student instanceof Student) {
      this.dataRepo.createStudent(student);
    }
  }

  listStudents(size) {
    return this.dataRepo.listStudents(size);
  }

  updateStudentById(id, student) {
    if (student instanceof Student) {
      this.dataRepo.updateStudentById(id, student);
    }
  }

  deleteStudentById(id) {
    return this.dataRepo.deleteStudentById(id);
  }
}

export default DataSource;
