import express from 'express';
import { protect, restrictTo } from '../controllers/authController.js';
import {
  getAllCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse
} from '../controllers/courseController.js';

const router = express.Router();

router
  .route('/')
  .get(protect, getAllCourses)
  .post(protect, restrictTo('admin'), createCourse); 

router
  .route('/:id')
  .get(protect, getCourse)
  .patch(protect, restrictTo('admin'), updateCourse)
  .delete(protect, restrictTo('admin'), deleteCourse);

export default router;
