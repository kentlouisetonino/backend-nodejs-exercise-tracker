import { Request, Response } from 'express'
import mongoose, { Error } from 'mongoose'
import { UserInterface, UserSchema } from '../model/UserSchema'

export async function GetUsers(_: Request, res: Response) {
  const UserModel = mongoose.model<UserInterface>('User', UserSchema)

  UserModel.find((err: Error, users: UserInterface) => {
    if (err) {
      return res.json({
        error: err.message,
      })
    }

    if (users) {
      return res.json(users)
    }
  })
}

export async function CreateUser(req: Request, res: Response) {
  // create a model based on the user schema
  const UserModel = mongoose.model<UserInterface>('User', UserSchema)

  // * acquire payload
  const username = req.body.username

  // * data to be saved
  const UserModelData = new UserModel({
    username: username,
  })

  UserModelData.save((err: Error | null, user: UserInterface) => {
    if (err) {
      return res.json({
        error: err.message,
      })
    }

    if (user) {
      return res.json({
        _id: user.id,
        username: user.username,
      })
    }
  })
}
