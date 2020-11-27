import Student from '../domain/Student.js';

/**
@class DataSource
Constructor, this constructs new DataSource class with dataRepo parameters
* */
class DataSource {
  constructor(dataRepo) {
    this.dataRepo = dataRepo;
  }

  /**
   * @param {student} student Input parameter
   * @return createStudent{@link student}
   */
  async createStudent(student) {
    if (student instanceof Student) {
      await this.dataRepo.createStudent(student);
    }
  }

  /**
   * @param {size} size Input parameter
   * @return listStudents {@link size}
   */
  async listStudents(size) {
    return this.dataRepo.listStudents(size);
  }

  /**
   * @param {id} id Input parameter
   * @param {student} id Input parameter
   * @return {String}
   */
  async updateStudentById(id, student) {
    return this.dataRepo.updateStudentById(id, student);
  }

  /**
   * @param {id} id Input parameter
   * @return @return {String}
   */
  async deleteStudentById(id) {
    return this.dataRepo.deleteStudentById(id);
  }
}

export default DataSource;
