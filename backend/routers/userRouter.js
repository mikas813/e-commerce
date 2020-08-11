import express from 'express'
import User from '../models/userModel'
import expressAsyncHandler from 'express-async-handler'
import {generateToken} from '../util'


const userRouter = express.Router()

userRouter.get('/createadmin', expressAsyncHandler ( async (req, res) => {
  try {
    const user = new User({
      name: 'admin',
      email: 'admin@admins.com',
      password: 'admin',
      isAdmin: true
    })
    const createUser = await user.save()
    res.send(createUser)
  }
  catch (e) {
    res.status(500).send({message: e.message})
  }
}))

userRouter.post('/signin', expressAsyncHandler ( async (req, res) => {
  const signinUser = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  })
  if (!signinUser) {
    res.status(401).send({message: 'Invalid email or password'})
  } else {
    res.send({
      _id: signinUser._id,
      name: signinUser.name,
      email: signinUser.email,
      password: signinUser.password,
      token: generateToken(signinUser)
    })
  }
}))

export default userRouter