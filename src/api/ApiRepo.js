/* eslint-disable class-methods-use-this */
import DataRepo from '../core/data/DataRepo.js';
import DataSource from '../core/data/DataSource.js';
import Student from '../core/domain/Student.js';
import { sendSuccessResponse } from '../utils/sendResponses.js';
import GeneralError from '../ErrorHelpers/GeneralError.js';
import { use } from 'chai';

class ApiRepo {
  constructor() {
    this.dataRepo = new DataRepo();
    this.dataSource = new DataSource(this.dataRepo);
    // this.createStudent.bind(this);
  }

  async createStudent(req, res, next) {
    try {
      const student = new Student(
        req.body.email,
        req.body.firstName,
        req.body.lastName,
        req.body.phone,
      );
      const repo = new ApiRepo();
      await repo.dataSource.createStudent(student);
      return sendSuccessResponse(res, 200, 'Created Successfully');
    } catch (error) {
      return next(error);
    }
  }

  async listStudents(req, res, next) {
    try {
      const repo = new ApiRepo();
      const students = await repo.dataSource.listStudents(
        req.query.size ? req.query.size : 10,
      );
      return sendSuccessResponse(res, 200, students);
    } catch (error) {
      return next(error);
    }
  }

  async updateStudent(req, res, next) {
    try {
      const student = new Student(
        req.body.email,
        req.body.firstName,
        req.body.lastName,
        req.body.phone,
      );
      const repo = new ApiRepo();
      if (!req.query.id) throw new GeneralError('error', 400, true, 'user id must not be empty');
      await repo.dataSource.updateStudentById(req.query.id, student);
      return sendSuccessResponse(res, 200, 'Updated successfully');
    } catch (error) {
      return next(error);
    }
  }

  async deleteStudent(req, res, next) {
    try {
      const repo = new ApiRepo();
      const user = await repo.dataSource.deleteStudentById(req.query.id);
      if (user === 0) throw new GeneralError('error', 404, true, 'student id not correct please check your input');
      return sendSuccessResponse(res, 201, 'Deleted Succesfully');
    } catch (error) {
      return next(error);
    }
  }
}

export default ApiRepo;
