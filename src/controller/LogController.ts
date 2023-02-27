import { Request, Response } from 'express'
import mongoose, { Error } from 'mongoose'
import { ExerciseInterface, ExerciseSchema } from '../model/ExerciseSchema.js'
import { UserInterface, UserSchema } from '../model/UserSchema.js'

export function GetLogs(req: Request, res: Response) {
  const ExerciseModel = mongoose.model<ExerciseInterface>(
    'Exercise',
    ExerciseSchema
  )
  const UserModel = mongoose.model<UserInterface>('User', UserSchema)

  const _id = req.params._id
  const from = req.query?.from
  const to = req.query?.to
  const limit = req.query?.limit

  UserModel.findById(_id, (err: Error, user: UserInterface) => {
    if (err) {
      return res.json({
        error: err.message,
      })
    }

    if (user) {
      ExerciseModel.find(
        { userId: user.id },
        (err: Error, exercises: ExerciseInterface[]) => {
          if (err) {
            return res.json({
              error: err.message,
            })
          }

          if (exercises) {
            const logs = exercises.map((exercise) => {
              return {
                description: exercise.description,
                duration: exercise.duration,
                date: exercise.date,
              }
            })

            return res.json({
              username: user.username,
              count: exercises.length,
              _id: user.id,
              log: logs,
            })
          }
        }
      )
    }
  })
}
