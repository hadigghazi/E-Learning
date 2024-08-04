import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    students: [
        {
          type: mongoose.Schema.ObjectId,
          ref: 'User'
        }
      ],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Course = mongoose.model('Course', CourseSchema);
export default Course;