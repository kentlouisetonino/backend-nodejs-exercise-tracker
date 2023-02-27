import express from 'express'
import { HomeController } from '../controller/HomeController'

const router = express.Router()

router.get('', HomeController)

export default router
