import { Router } from 'express'

import { signUpUser, login, updatePassword } from '../controllers/user'

import { authMiddleware } from '../middleware/authentication.js'

import {
  loginUserValidation,
  signUpUserValidation,
  changePasswordValidation,
} from '../middleware/validation'

const router = Router()

router.post('/signup', signUpUserValidation, signUpUser)
router.post('/login', loginUserValidation, login)
router.patch(
  '/changePassword',
  authMiddleware,
  changePasswordValidation,
  updatePassword
)

export default router
