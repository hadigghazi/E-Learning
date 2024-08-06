import express from 'express';
import { 
  getMe, 
  getUser, 
  uploadUserPhoto, 
  resizeUserPhoto, 
  updateMe, 
  deleteMe, 
  getAllUsers, 
  createUser, 
  updateUser, 
  deleteUser 
} from '../controllers/userController.js';

import { 
  signup, 
  login, 
  logout, 
  protect, 
  restrictTo 
} from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);

router.use(protect);

router.get('/me', getMe, getUser);
router.patch('/updateMe', uploadUserPhoto, resizeUserPhoto, updateMe);
router.delete('/deleteMe', deleteMe);

router.use(restrictTo('admin'));

router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

router
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

export default router;
