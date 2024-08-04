import Course from '../models/Course.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';

export const getAllCourses = catchAsync(async (req, res, next) => {
  const courses = await Course.find();
  res.status(200).json({
    status: 'success',
    results: courses.length,
    data: {
      courses
    }
  });
});

export const getCourse = catchAsync(async (req, res, next) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    return next(new AppError('No course found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      course
    }
  });
});

export const createCourse = catchAsync(async (req, res, next) => {
  const newCourse = await Course.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      course: newCourse
    }
  });
});

export const updateCourse = catchAsync(async (req, res, next) => {
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!course) {
    return next(new AppError('No course found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      course
    }
  });
});

export const deleteCourse = catchAsync(async (req, res, next) => {
  const course = await Course.findByIdAndDelete(req.params.id);
  if (!course) {
    return next(new AppError('No course found with that ID', 404));
  }
  res.status(204).json({
    status: 'success',
    data: null
  });
});
