import { Schema, model } from 'mongoose'
const { ObjectId } = Schema.Types

const ingredientSchema = new Schema({
  ingredients: {
    type: Array,
    required: 'This field is required.',
  },
  createdBy: {
    type: ObjectId,
    ref: 'User',
    required: [true, 'Please provide user'],
  },
  forRecipe: {
    type: ObjectId,
    ref: 'Recipe',
    required: [true, 'Please provide recipe for which you add ingredients'],
  },
})

const Ingredient = model('Ingredient', ingredientSchema)

export default Ingredient
