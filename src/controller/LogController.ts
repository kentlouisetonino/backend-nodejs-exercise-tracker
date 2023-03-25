import { Request, Response } from 'express'
import mongoose, { Error } from 'mongoose'
import { ExerciseInterface, ExerciseSchema } from '../model/ExerciseSchema.js'
import { UserInterface, UserSchema } from '../model/UserSchema.js'

export function GetLogs(req: Request, res: Response) {
  // * create an instance of user and exercise model
  const UserModel = mongoose.model<UserInterface>('User', UserSchema)
  const ExerciseModel = mongoose.model<ExerciseInterface>(
    'Exercise',
    ExerciseSchema
  )

  // * payload
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
            let exerciseLogs = exercises.map((exercise) => {
              return {
                description: exercise.description,
                duration: exercise.duration,
                date: exercise.date,
              }
            })

            // if (from && to) {
            //   const fromMilliseconds = new Date(from).getTime()
            //   const toMilliseconds = new Date(to).getTime()

            //   let newExercises = []

            //   for (let i = 0; i < filteredExercises.length; i++) {
            //     const dateMilliseconds = new Date(filteredExercises[i].date).getTime()

            //     if (dateMilliseconds >= fromMilliseconds && dateMilliseconds <= toMilliseconds) {
            //       newExercises.push(filteredExercises[i])
            //     }
            //   }

            //   filteredExercises = newExercises
            // }

            // if (limit) {
            //   let newExercises = []

            //   for (let i = 0; i < filteredExercises.length; i++) {
            //     if (newExercises.length <= Number(limit)) {
            //       newExercises.push(filteredExercises[i])
            //     }
            //   }

            //   filteredExercises = newExercises
            // }

            return res.json({
              username: user.username,
              count: exercises.length,
              _id: user.id,
              log: exerciseLogs,
            })
          }
        }
      )
    }
  })
}
