import { Router } from 'express'

import {
  getAllRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  addIngredients,
} from '../controllers/recipe'

import { authMiddleware } from '../middleware/authentication.js'

import {
  createRecipeValidation,
  updateRecipeValidation,
  addIngredientValidation,
} from '../middleware/validation'

const router = Router()

router
  .route('/')
  .get(getAllRecipes)
  .post(authMiddleware, createRecipeValidation, createRecipe)

router
  .route('/:id')
  .get(getRecipe)
  .patch(authMiddleware, updateRecipeValidation, updateRecipe)
  .delete(authMiddleware, deleteRecipe)

router.post(
  '/addIngredient/:id',
  authMiddleware,
  addIngredientValidation,
  addIngredients
)

export default router
