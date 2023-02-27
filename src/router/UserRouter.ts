import { Router } from 'express'
import { CreateUser, GetUsers } from '../controller/UserController'

const router = Router()

router.get('/users', GetUsers)
router.post('/users', CreateUser)

export default router
