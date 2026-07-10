import express from 'express';
import { registerResearcher, loginResearcher, logoutResearcher } from '../controllers/authController';

const router = express.Router();

router.post('/register', registerResearcher);
router.post('/login', loginResearcher);
router.post('/logout', logoutResearcher);

export default router;
