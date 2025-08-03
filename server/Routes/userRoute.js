import express from 'express'
import userAuth from '../middleware/userAuth.js'
import { getUserData } from '../controllers/userController.js'

// Using this router, we will create an End Point
const userRouter = express.Router()
userRouter.get('/data', userAuth, getUserData)

export default userRouter