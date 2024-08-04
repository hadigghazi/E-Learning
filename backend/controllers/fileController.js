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

export const uploadFile = catchAsync(async (req, res, next) => {
    upload(req, res, async (err) => {
        if (err) {
            return next(err);
        }

        if (!req.file) {
            return next(new AppError('No file uploaded', 400));
        }

        const { courseId } = req.body;

        const course = await Course.findById(courseId);
        if (!course) {
            return next(new AppError('No course found with that ID', 404));
        }

        const file = await File.create({
            fileName: req.file.filename,
            filePath: req.file.path,
            fileType: req.file.mimetype,
            uploadedBy: req.user.id, 
            courseId: courseId
        });

        res.status(201).json({
            status: 'success',
            data: {
                file
            }
        });
    });
});

export const downloadFile = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const file = await File.findById(id);
    if (!file) {
        return next(new AppError('No file found with that ID', 404));
    }

    res.sendFile(file.filePath, { root: '.' });
});
