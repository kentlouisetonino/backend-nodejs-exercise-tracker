import { Document, Schema } from 'mongoose'

export interface UserInterface extends Document {
  username: string
}

export const UserSchema = new Schema<UserInterface>({
  username: { type: String, required: true },
})
