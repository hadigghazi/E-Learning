import Course from '../models/Course.js';
import User from '../models/User.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';

export const enrollInCourse = catchAsync(async (req, res, next) => {
  const { courseId, userId } = req.body;

  const course = await Course.findById(courseId);
  if (!course) {
    return next(new AppError('Course not found', 404));
  }

  const user = await User.findById(userId);
  if (!user) {
    return next(new AppError('User not found', 404));
  }

  if (course.students.includes(userId)) {
    return next(new AppError('User already enrolled in this course', 400));
  }

  course.students.push(userId);
  await course.save();

  user.enrolledCourses.push(courseId);
  await user.save();

  res.status(200).json({
    status: 'success',
    data: {
      course,
      user
    }
  });
});
