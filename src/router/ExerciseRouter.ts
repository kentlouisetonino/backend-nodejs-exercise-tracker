import { Router } from 'express'
import { CreateExercise } from '../controller/ExerciseController'
import formData from '../libs/form-data'

const router = Router()

router.post('/users/:_id/exercises', formData.fields([]), CreateExercise)

export default router
