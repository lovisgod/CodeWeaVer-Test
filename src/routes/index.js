import express from 'express';
import ApiRepo from '../api/ApiRepo.js';

const router = express.Router();

const repo = new ApiRepo();
router.post('/create-student', repo.createStudent);
router.get('/list-students', repo.listStudents);
router.put('/update-student', repo.updateStudent);
router.delete('/delete-student', repo.deleteStudent);

export default router;
