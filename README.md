#### Foody - Using Node.js and MongoDB

#### Connect To DB

1. get connection string from MongoDB
2. setup .env with MONGO Database users credentials and assign the value
3. Update the same in <username>:<password> field in db -> index.js in connection string with correct value

#### Installation

To run this project, install it locally using npm:

$ npm install
$ npm start

#### Models/Schema

There are 3 models:

1. User
2. Recipe
3. Ingredient

#### Routes

1. http://localhost:3000/ : home route

2. /api/v1/recipes : Recipes routes

## Route: ('/') -

# getAllRecipes - get all recipes, sort by name or rating, search by name

- Request : get(/api/v1/recipes) - get all recipes
- Request : get(/api/v1/recipes?sort=rating) - sort by rating
- Request : get(/api/v1/recipes?sort=name) - sort by name
- Request : get(/api/v1/recipes?sort=name, rating) - sort by name and rating
- Request : get(/api/v1/recipes?name=xyz) - search by name (for ex: xyz)

# createRecipe/addRecipe - create a new recipe

- Request : post(/api/v1/recipes) - create a new recipe
- This is protected route only registered user can add new recipe

## Route: ('/:id') -

# getRecipeById - get a recipe by id

- Request : get(/api/v1/recipes/633a0257a0460029b8d098c1) - get recipe by its id

# updateRecipeById - update a recipe by id - update rating of recipe

- Request : patch(/api/v1/recipes/633a0257a0460029b8d098c1) - update recipe by its id
- This is protected route only registered user can update only his recipes

# deleteRecipeById - delete a recipe by id

    - Request : delete(/api/v1/recipes/633a0257a0460029b8d098c1)  - delete recipe by its id
    - This is protected route only registered user can delete only his recipes

## Route: ('/addIngredient/:id') -

# addIngredients - add ingredients in a specific recipe

    - Request : get(/api/v1/recipes/addIngredient/633a05c1a18ca768c8cea6e3)  - add ingredients in a specific recipe by using its id

3. /api/v1/auth : User routes

## Route: ('/signup') -

# signUpUser - sign up user

- Request : post(/api/v1/auth/signup) - sign up user

# loginUser - login user

- Request : post(/api/v1/auth/login) - login user

# changePassword - change password

- Request : patch(/api/v1/auth/changePassword) - change password
- This is protected route only registered user can change his password
