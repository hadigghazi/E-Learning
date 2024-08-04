import mongoose from 'mongoose';

const WithdrawalSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Withdrawal must be associated with a user']
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: [true, 'Withdrawal must be associated with a course']
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    reason: {
        type: String,
        required: [true, 'Please provide a reason for withdrawal']
    },
    appliedAt: {
        type: Date,
        default: Date.now
    },
    processedAt: {
        type: Date
    }
});

const Withdrawal = mongoose.model('Withdrawal', WithdrawalSchema);
export default Withdrawal;
