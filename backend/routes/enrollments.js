import express from 'express';
import { protect } from '../controllers/authController.js'; 
import { enrollInCourse, getMyCourses } from '../controllers/enrollmentController.js'; 

const router = express.Router();

router.post('/enroll/:courseId', protect, enrollInCourse); 
router.get('/my-courses', protect, getMyCourses); 

export default router;
