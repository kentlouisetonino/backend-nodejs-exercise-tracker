import { Document, Schema } from 'mongoose'

export interface ExerciseInterface extends Document {
  date: string
  description: string
  duration: number
  userId: string
}

export const ExerciseSchema = new Schema<ExerciseInterface>({
  date: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  userId: { type: String, required: true },
})
