import Student from '../domain/Student.js';

class DataSource {
  constructor(dataRepo) {
    this.dataRepo = dataRepo;
  }

  async createStudent(student) {
    if (student instanceof Student) {
      await this.dataRepo.createStudent(student);
    }
  }

  async listStudents(size) {
    return this.dataRepo.listStudents(size);
  }

  async updateStudentById(id, student) {
    return this.dataRepo.updateStudentById(id, student);
  }

  async deleteStudentById(id) {
    return this.dataRepo.deleteStudentById(id);
  }
}

export default DataSource;
