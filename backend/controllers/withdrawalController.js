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

export const getWithdrawals = catchAsync(async (req, res, next) => {
    const withdrawals = await Withdrawal.find().populate('userId').populate('courseId');

    res.status(200).json({
        status: 'success',
        data: {
            withdrawals
        }
    });
});

export const updateWithdrawalStatus = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!['approved', 'rejected'].includes(status)) {
        return next(new AppError('Invalid status', 400));
    }

    const withdrawal = await Withdrawal.findById(id);
    if (!withdrawal) {
        return next(new AppError('No withdrawal found with that ID', 404));
    }

    withdrawal.status = status;
    withdrawal.processedAt = Date.now();
    await withdrawal.save();

    if (status === 'approved') {
        const course = await Course.findById(withdrawal.courseId);
        const user = await User.findById(withdrawal.userId);

        user.enrolledCourses = user.enrolledCourses.filter(courseId => courseId.toString() !== withdrawal.courseId.toString());
        await user.save({validateBeforeSave: false});

        course.students = course.students.filter(studentId => studentId.toString() !== withdrawal.userId.toString());
        await course.save();
    }

    res.status(200).json({
        status: 'success',
        data: {
            withdrawal
        }
    });
});
