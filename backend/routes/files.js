import express from 'express';
import { uploadFile, downloadFile, getAllFiles, getFilesForCourse } from '../controllers/fileController.js';
import { protect, restrictTo } from '../controllers/authController.js'; // Add your auth middleware

const router = express.Router();

router.post('/upload', protect, restrictTo('admin'), uploadFile);

router.get('/download/:id', downloadFile);

router.get('/', protect, restrictTo('admin'), getAllFiles);

router.get('/course/:courseId', protect, getFilesForCourse);

export default router;
