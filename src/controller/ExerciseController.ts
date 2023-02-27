import { Request, Response } from 'express'
import mongoose, { Error } from 'mongoose'
import dateHandler from '../libs/date-handler'
import { ExerciseInterface, ExerciseSchema } from '../model/ExerciseSchema'
import { UserInterface, UserSchema } from '../model/UserSchema'

export async function CreateExercise(req: Request, res: Response) {
  // * create an instance of user and exercise model
  const UserModel = mongoose.model('User', UserSchema)
  const ExerciseModel = mongoose.model<ExerciseInterface>(
    'Exercise',
    ExerciseSchema
  )

  // * acquire the payload
  const body = req.body
  const _id = req.params._id
  const date = dateHandler(body?.date)

  // * data to be saved
  const ExerciseData = new ExerciseModel({
    userId: _id,
    date: date,
    description: body.description,
    duration: body.duration,
  })

  UserModel.findById(_id, (err: Error, user: UserInterface) => {
    if (err) {
      return res.json({
        message: err.message,
      })
    }

    ExerciseData.save((err: Error | null, exercise: ExerciseInterface) => {
      if (err) {
        return res.json({
          message: err.message,
        })
      }

      if (exercise) {
        return res.json({
          username: user.username,
          description: exercise.description,
          duration: exercise.duration,
          date: exercise.date,
          _id: user.id,
        })
      }
    })
  })
}
