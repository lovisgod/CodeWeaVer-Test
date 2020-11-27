/* eslint-disable class-methods-use-this */
/* eslint-disable no-useless-constructor */
// import db into this repo

import { Student } from '../../../models';
import student from '../domain/Student';

class DataRepo {
  // eslint-disable-next-line no-empty-function
  constructor() {
  }

  /**
   * @param {student} student class which is the  Input parameter
   * @return {student}
   */
  createStudent(Astudent) {
    return Student.create(Astudent);
  }

  /**
   * @param {size} size input parameter
   * @return {[student]}
   */
  listStudents(size) {
    if (size) {
      return Student.findAll();
    }
    return Student.findAll({ limit: size });
  }

  /**
   * @param {id} id input parameter
   * @param {Astudent} student input parameter
   * @return {String}
   */
  updateStudentById(id, Astudent) {
    return Student.update({
      ...Astudent,
    }, {
      returning: true,
      where: {
        id,
      },
    });
  }

  /**
   * @param {id} id input parameter
   * @return {String}
   */
  deleteStudentById(id) {
    return Student.destroy({
      where: { id },
    });
  }
}

export default DataRepo;
