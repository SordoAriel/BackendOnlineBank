import { Router } from 'express'
import { signup, sendValidationEmail, validateUser, login, getUser, updateUser, deleteUser, updatePassword } from '@services/usersServices'
import { verifyTokenMid } from '@utils/verifyToken.middleware'

const router = Router()

router.post('/signup', signup)

router.post('/sendValidationEmail', sendValidationEmail)

router.put('/validate', validateUser)

router.post('/login', login)

router.get('/', getUser)

router.put('/updatePassword', verifyTokenMid, updatePassword)

router.put('/updateUser', verifyTokenMid, updateUser)

router.delete('/deleteUser', verifyTokenMid, deleteUser)

export default router