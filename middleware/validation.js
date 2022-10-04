import { check, validationResult } from 'express-validator'

const manageErrors = (cb) => (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) return next()
  cb(errors.array(), req, res)
}

//login validation
export const loginUserValidation = [
  check('email').isEmail().withMessage("'email' is missing or is invalid"),
  check('password')
    .notEmpty()
    .withMessage("'password' is empty")
    .isLength({ min: 6 })
    .withMessage("'password' must have atleast 6 characters"),
  manageErrors((error, req, res) => res.status(422).json({ error })),
]

//signup validation
export const signUpUserValidation = [
  check('email').isEmail().withMessage("'email' is missing or is invalid"),
  check('name').notEmpty().withMessage("'name' is empty").trim().escape(),
  check('password')
    .notEmpty()
    .withMessage("'password' is empty")
    .isLength({ min: 6 })
    .withMessage("'password' must have atleast 6 characters"),
  manageErrors((error, req, res) => res.status(422).json({ error })),
]

//changepassword validation
export const changePasswordValidation = [
  check('password')
    .notEmpty()
    .withMessage("'password' is empty")
    .isLength({ min: 6 })
    .withMessage("'password' must have atleast 6 characters"),
  manageErrors((error, req, res) => res.status(422).json({ error })),
]

//createrecipe validation
export const createRecipeValidation = [
  check('name').notEmpty().withMessage('name field should not be empty'),
  check('description')
    .notEmpty()
    .withMessage('description field should not be empty'),
  check('category')
    .notEmpty()
    .withMessage('category field should not be empty'),
  manageErrors((error, req, res) => res.status(422).json({ error })),
]

//updaterecipe validation
export const updateRecipeValidation = [
  check('rating')
    .isFloat({ min: 1, max: 10 })
    .withMessage('Rating must be a number between 1 and 10'),
  manageErrors((error, req, res) => res.status(422).json({ error })),
]

//addingredient validation
export const addIngredientValidation = [
  check('ingredients')
    .notEmpty()
    .withMessage('ingredients field should not be empty'),
  manageErrors((error, req, res) => res.status(422).json({ error })),
]
