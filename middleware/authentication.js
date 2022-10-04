import User from '../models/user'
import jwt from 'jsonwebtoken'

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    res.status(403).json({ message: 'Unauthorized access!' })
  }

  const token = authHeader.split(' ')[1]
  try {
    const payload = await jwt.verify(token, process.env.jwtPrivateKey)
    //console.log(payload)
    req.user = { userId: payload.userId, name: payload.name }
    next()
  } catch (error) {
    res.status(403).json({ message: 'Unauthorized access!' })
  }
}
