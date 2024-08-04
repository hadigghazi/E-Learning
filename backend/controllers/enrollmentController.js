import User from '../models/User.js';
import Course from '../models/Course.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';

export const enrollInCourse = catchAsync(async (req, res, next) => {
  const userId = req.user.id; 
  const courseId = req.params.courseId;

  const user = await User.findById(userId);
  const course = await Course.findById(courseId);

  if (!user) {
    return next(new AppError('User not found', 404));
  }
  if (!course) {
    return next(new AppError('Course not found', 404));
  }

  if (user.enrolledCourses.includes(courseId)) {
    return next(new AppError('User is already enrolled in this course', 400));
  }

  user.enrolledCourses.push(courseId);
  await user.save();

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});

export const getEnrolledCourses = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  const user = await User.findById(userId).populate('enrolledCourses');

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      courses: user.enrolledCourses
    }
  });
});
