/* eslint-disable class-methods-use-this */

/**
@module ApiRepo
* */

import DataRepo from '../core/data/DataRepo.js';
import DataSource from '../core/data/DataSource.js';
import Student from '../core/domain/Student.js';
import { sendSuccessResponse } from '../utils/sendResponses.js';
import GeneralError from '../ErrorHelpers/GeneralError.js';

/**
@class ApiRepo
Constructor, this constructs new ApiRepo class
* */
class ApiRepo {
  constructor() {
    this.dataRepo = new DataRepo();
    this.dataSource = new DataSource(this.dataRepo);
    // this.createStudent.bind(this);
  }

  /*
 * @api [post] /create-student
 * description: "Create a student record"
 * parameters:
 *   - (body) {Student} A student's body
 * responses:
 *   200:
 *     description: Created Successfully
 */
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

  /*
 * @api [get] /list-students
 * description: "List student records"
 * parameters:
 *   - (query) size {Integer:int32} The number of resources to return
 * responses:
 *   200:
 *     description: Successful operation
 */
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

  /*
 * @api [put] /update-student
 * description: "Update a student record"
 * parameters:
 *   - (id) id {string} The id of the record to update
 *   - (body) {Student} A student's body
 * responses:
 *   200:
 *     description: Updated Successfully
 */
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

  /*
 * @api [delete] /delete-student
 * description: "delete a student record"
 * parameters:
 *   - (id) id {string} The id of the record to delete
 * responses:
 *   200:
 *     description: Deleted Successfully
 */
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
