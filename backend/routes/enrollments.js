import express from 'express';
import { protect, restrictTo } from '../controllers/authController.js'; 
import { enrollInCourse, getMyCourses, listStudentsInCourse } from '../controllers/enrollmentController.js'; 

const router = express.Router();

router.post('/enroll/:courseId', protect, enrollInCourse); 
router.get('/my-courses', protect, getMyCourses); 
router.get('/:courseId/students', protect, restrictTo('admin'), listStudentsInCourse);

export default router;
