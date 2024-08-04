import express from 'express';
import { protect } from '../controllers/authController.js';
import { applyForWithdrawal, getWithdrawals, updateWithdrawalStatus, deleteWithdrawal } from '../controllers/withdrawalController.js';
import { restrictTo } from '../controllers/authController.js';

const router = express.Router();

router.use(protect);
router.post('/apply', applyForWithdrawal);

router.use(restrictTo('admin')); 
router.get('/', getWithdrawals);
router.patch('/:id', updateWithdrawalStatus);
router.delete('/:id', deleteWithdrawal);
export default router;
