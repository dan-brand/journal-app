const jwt = require('jsonwebtoken')
const User = require('../models/User');

const auth = async (req, res, next) => {
  
  const { authorization } = req.headers

  if (!authorization) {
    next(new Error('Authorization token required'))
  }

  const token = authorization.split(' ')[1]

  try {
    const { _id } = jwt.verify(token, process.env.SECRET)
    req.user = await User.findOne({ _id }).select('_id')
    next()
  } catch (error) {
    next(new Error('Request is not authorized'))
  }
}

module.exports = auth