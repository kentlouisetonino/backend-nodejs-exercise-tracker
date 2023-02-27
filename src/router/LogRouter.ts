import { Router } from 'express'
import { GetLogs } from '../controller/LogController'

const router = Router()

router.get('/users/:_id/logs', GetLogs)

export default router
