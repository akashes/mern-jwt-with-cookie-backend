import express from 'express'
import { getProfile, loginUser, logoutUser, registerUser, verifyUser } from '../controllers/userController.js'
import { verifyToken } from '../middlewares/verifyToken.js'

const router = express.Router()

router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/logout',logoutUser)
router.get('/profile',verifyToken,getProfile)
router.get('/verify-user',verifyToken,verifyUser)


export default router;
