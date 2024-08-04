import express from 'express';
import connectDB from './config/db.js';
import userRoutes from './routes/users.js';
import courseRoutes from './routes/courses.js';
import enrollmentRoutes from './routes/enrollments.js';
import fileRoutes from './routes/files.js';
import withdrawalRoutes from './routes/withdrawals.js';
import morgan from 'morgan';
import AppError from './utils/appError.js';
import globalErrorHandler from './controllers/errorController.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());

app.use(cors({
  origin: 'http://localhost:3001', 
}));

app.use(express.urlencoded({ extended: true }));


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
connectDB();

app.use(express.json());

app.use(morgan('dev'));

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/courses', courseRoutes);
app.use('/api/v1/enrollments', enrollmentRoutes);
app.use('/api/v1/files', fileRoutes);
app.use('/api/v1/withdrawals', withdrawalRoutes);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });

app.use(globalErrorHandler);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
