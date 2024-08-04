import express from 'express';
import { protect } from '../controllers/authController.js';
import { applyForWithdrawal, getWithdrawals, updateWithdrawalStatus } from '../controllers/withdrawalController.js';
import { restrictTo } from '../controllers/authController.js';

const router = express.Router();

router.use(protect);
router.post('/apply', applyForWithdrawal);

router.use(restrictTo('admin')); 
router.get('/', getWithdrawals);
router.patch('/:id', updateWithdrawalStatus);
export default router;
