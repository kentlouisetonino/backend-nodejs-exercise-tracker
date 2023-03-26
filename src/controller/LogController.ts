import { Request, Response } from 'express'
import mongoose, { Error } from 'mongoose'
import { ExerciseInterface, ExerciseSchema } from '../model/ExerciseSchema'
import { UserInterface, UserSchema } from '../model/UserSchema'

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
            // * map first the required data only
            let filteredExercises = exercises.map((exercise) => {
              return {
                description: exercise.description,
                duration: exercise.duration,
                date: exercise.date,
              }
            })

            // * map the data based on from and to date
            if (from && to) {
              const fromMilliseconds = Date.parse(String(from))
              const toMilliseconds = Date.parse(String(to))

              let filteredDateExercises = []

              for (let i = 0; i < filteredExercises.length; i++) {
                const dateMilliseconds = Date.parse(filteredExercises[i].date)

                if (
                  dateMilliseconds >= fromMilliseconds &&
                  dateMilliseconds <= toMilliseconds
                ) {
                  filteredDateExercises.push(filteredExercises[i])
                }
              }

              filteredExercises = filteredDateExercises
            }

            // * limit on how many to return
            if (limit) {
              let limitedExercises = []

              for (let i = 0; i < Number(limit); i++) {
                limitedExercises.push(filteredExercises[i])
              }

              filteredExercises = limitedExercises
            }

            return res.json({
              username: user.username,
              count: filteredExercises.length,
              _id: user.id,
              log: filteredExercises ?? [],
            })
          }
        }
      )
    }
  })
}
