import Recipe from '../models/recipe.js'
import Ingredient from '../models/ingredient'

export const getAllRecipes = async (req, res) => {
  try {
    const { name, sort } = req.query
    const queryObject = {}

    //search by name
    if (name) {
      queryObject.name = { $regex: name, $options: 'i' }
    }

    let result = Recipe.find(queryObject)

    // sort by name or rating  or both
    if (sort) {
      const sortList = sort.split(',').join(' ')
      result = result.sort(sortList)
    } else {
      result = result.sort('_id')
    }

    const recipes = await result
    res.status(200).json({ recipes })
  } catch (error) {
    res.status(404).json(error)
  }
}

export const getRecipe = async (req, res) => {
  try {
    const { id } = req.params
    const recipe = await Recipe.findById(id)

    if (!recipe) {
      return res
        .status(404)
        .json({ message: `No recipe with this ${recipeId}` })
    }

    res.status(200).json({ recipe })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const createRecipe = async (req, res) => {
  try {
    req.body.createdBy = req.user.userId

    const recipe = await Recipe.create(req.body)
    res.status(201).json({ recipe })
  } catch (error) {
    res.status(401).json({ message: error.message })
  }
}

export const updateRecipe = async (req, res) => {
  try {
    const {
      body: { name, description, category, rating },
      user: { userId },
      params: { id: recipeId },
    } = req

    const recipe = await Recipe.findOneAndUpdate(
      { _id: recipeId, createdBy: userId },
      req.body,
      { new: true, runValidators: true }
    )

    if (!recipe) {
      return res
        .status(404)
        .json({ message: `No recipe with this ${recipeId}` })
    }
    res.status(200).json({ recipe })
  } catch (error) {
    res.status(401).json({ error })
  }
}

export const deleteRecipe = async (req, res) => {
  try {
    const {
      user: { userId },
      params: { id: recipeId },
    } = req
    const recipe = await Recipe.findOneAndDelete({
      _id: recipeId,
      createdBy: userId,
    })
    if (!recipe) {
      return res
        .status(404)
        .json({ message: `No recipe with this ${recipeId}` })
    }
    res.status(200).json({ status: true })
  } catch (error) {
    res.status(401).json({ message: error.message })
  }
}

export const addIngredients = async (req, res) => {
  try {
    req.body.createdBy = req.user.userId
    req.body.forRecipe = req.params.id

    const recipe = await Ingredient.create(req.body)
    res.status(201).json({ recipe })
  } catch (error) {
    res.status(401).json(error)
  }
}
