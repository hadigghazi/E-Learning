import Withdrawal from '../models/Withdrawal.js';
import Course from '../models/Course.js';
import User from '../models/User.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';

export const applyForWithdrawal = catchAsync(async (req, res, next) => {
    const { courseId, reason } = req.body;
    const userId = req.user.id;

    const course = await Course.findById(courseId);
    if (!course) {
        return next(new AppError('No course found with that ID', 404));
    }

    const user = await User.findById(userId);
    if (!user || !user.enrolledCourses.includes(courseId)) {
        return next(new AppError('User is not enrolled in this course', 400));
    }

    const withdrawal = await Withdrawal.create({
        userId,
        courseId,
        reason
    });

    res.status(201).json({
        status: 'success',
        data: {
            withdrawal
        }
    });
});
