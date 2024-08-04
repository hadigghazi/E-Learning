import multer from 'multer';
import path from 'path';
import File from '../models/File.js';
import Course from '../models/Course.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import fs from 'fs';
import { promisify } from 'util';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${Date.now()}${ext}`);
    }
});
