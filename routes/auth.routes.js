import express from 'express';
import {
  getHomePage,
  loginUser,
  registerUser,
  logoutUser,
  validateSession,
  getAllUsers,
} from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/signup', registerUser); 
router.post('/logout', logoutUser); 
router.get('/', getHomePage);

router.get('/validate', validateSession);
router.get('/users', getAllUsers);

export default router;