/* eslint-disable class-methods-use-this */
/* eslint-disable no-useless-constructor */
// import db into this repo

import { Student } from '../../../models';

class DataRepo {
  // eslint-disable-next-line no-empty-function
  constructor() {
  }

  createStudent(student) {
    return Student.create(student);
  }

  listStudents(size) {
    if (size) {
      return Student.findAll();
    }
    return Student.findAll({ limit: size });
  }

  updateStudentById(id, student) {
    return Student.update({
      student,
    }, {
      returning: true,
      where: {
        uuid: id,
      },
    });
  }

  deleteStudentById(id) {
    return Student.destroy({
      where: { uuid: id },
    });
  }
}

export default DataRepo;
