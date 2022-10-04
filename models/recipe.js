import { Schema, model } from 'mongoose'
const { ObjectId } = Schema.Types

const recipeSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
  },
  description: {
    type: String,
    required: [true, 'Please provide name'],
  },
  category: {
    type: String,
    enum: ['Thai', 'American', 'Chinese', 'Mexican', 'Indian'],
    required: 'This field is required.',
  },
  rating: {
    type: Number,
    minimum: 1,
    maximum: 10,
    default: 1,
  },
  createdBy: {
    type: ObjectId,
    ref: 'User',
    required: [true, 'Please provide user'],
  },
})

recipeSchema.index({ name: 'text' })

const Recipe = model('Recipe', recipeSchema)

export default Recipe
