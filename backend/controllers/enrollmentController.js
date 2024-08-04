import Course from '../models/Course.js';
import User from '../models/User.js';
import Enrollment from "../models/Enrollment.js";
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';

export const enrollInCourse = catchAsync(async (req, res, next) => {
    const { courseId } = req.params;
    const userId = req.user.id; 

    const course = await Course.findById(courseId);
    if (!course) {
      return next(new AppError('No course found with that ID', 404));
    }
  
    const user = await User.findById(userId);
    if (!user) {
      return next(new AppError('No user found with that ID', 404));
    }
  
    if (user.enrolledCourses.includes(courseId)) {
      return next(new AppError('User is already enrolled in this course', 400));
    }

    if (course.students.includes(userId)) {
      return next(new AppError('Course already has this user enrolled', 400));
    }
  
    const enrollment = await Enrollment.create({
      userId: userId,
      courseId: courseId
    });
  
    user.enrolledCourses.push(courseId);
    await user.save({ validateBeforeSave: false });
  
    course.students.push(userId);
    await course.save();
  
    res.status(200).json({
      status: 'success',
      data: {
        enrollment
      }
    });
});

export const getMyCourses = catchAsync(async (req, res, next) => {
  const userId = req.user._id;

  const user = await User.findById(userId).populate('enrolledCourses');
  if (!user) {
    return next(new AppError('User not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      courses: user.enrolledCourses,
    },
  });
});
