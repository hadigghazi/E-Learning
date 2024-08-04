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

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /pdf|doc|docx|txt/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new AppError('Only PDFs, DOCs, DOCXs, and TXT files are allowed!', 400));
    }
}).single('file');
