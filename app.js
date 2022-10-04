import express from 'express'
import connectToDb from './db'
import recipeRouter from './routes/recipe'
import authRouter from './routes/auth'
import notFoundMiddleware from './middleware/notFound'
import errorHandlerMiddleware from './middleware/error-handler'

import compression from 'compression'

// security packages
import helmet from 'helmet'
import cors from 'cors'
import xss from 'xss-clean'

const app = express()

app.use(helmet())
app.use(cors())
app.use(xss())

app.use(compression())

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.status(200).send('<h1>Foody API</h1>')
})

app.use('/api/v1/recipes', recipeRouter)
app.use('/api/v1/auth', authRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

Promise.all([connectToDb()])
  .then(() =>
    app.listen(port, () => console.log(`Food is serving on port ${port}`))
  )
  .catch((error) => {
    console.error(`MongoDB Atlas Error: ${error}`)
    process.exit()
  })
