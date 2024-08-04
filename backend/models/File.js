import mongoose from 'mongoose';

const FileSchema = new mongoose.Schema({
    fileName: {
        type: String,
        required: [true, 'File must have a name']
    },
    filePath: {
        type: String,
        required: [true, 'File must have a path']
    },
    fileType: {
        type: String,
        required: [true, 'File must have a type']
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'File must be associated with a user']
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: [true, 'File must be associated with a course']
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    }
});

const File = mongoose.model('File', FileSchema);
export default File;
