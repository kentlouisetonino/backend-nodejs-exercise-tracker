import { Router } from 'express'
import { CreateExercise } from '../controller/ExerciseController.js'
import formData from '../libs/form-data.js'

const router = Router()

router.post('/users/:_id/exercises', formData.fields([]), CreateExercise)

export default router
