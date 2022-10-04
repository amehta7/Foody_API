import User from '../models/user'
import bcrypt from 'bcrypt'

export const signUpUser = async (req, res) => {
  try {
    const { name, email, password } = req.body
    const user = await User.create({ name, email, password })
    const token = user.createJWT()
    //console.log(token)
    res.json({ user: { name: user.name }, token })
  } catch (error) {
    res.status(403).json(error)
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    const isPasswordCorrect = await user.checkPassword(password)

    if (!isPasswordCorrect) {
      res.status(403).json({ message: 'Invalid credentials' })
    }

    const token = user.createJWT()
    //console.log(token)
    res.json({ user: { name: user.name }, token })
  } catch (error) {
    res.status(403).json({ message: error.message })
  }
}

export const updatePassword = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      { _id: req.user.userId },
      { password: bcrypt.hashSync(req.body.password, 10) },
      {
        new: true,
        runValidators: true,
      }
    )

    res.status(200).json({ user })
  } catch (error) {
    res.status(403).json(error)
  }
}
