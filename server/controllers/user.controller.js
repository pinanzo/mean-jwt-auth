const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const UserModel = require('../models/user.model')
const config = require('../config/config.json')

module.exports = {
  register: async (request, response) => {
    try{ 
      request.body.password = await bcrypt.hash(request.body.password, bcrypt.genSaltSync(config.bcryptSaltRound))
      console.log(request.body.password)
      
      const data = new UserModel(request.body)
      data.save(error => {
        if(error){
          response.status(500).json(error)
        } else {
          response.status(201).json(data)
        }
      })
    } catch (error) {
      response.status(500).json(error)
    }
  },

  login: async (request, response) => {
    try {
      const targetUser = await UserModel.findOne({ username: request.body.username })
      if (targetUser === null) {
        response.status(404).json({ message: 'No such user exists!' })
      } else {
        if(await bcrypt.compare(request.body.password, targetUser.password)){
          response.json(jwt.sign(request.body, config.jwtSecret))
        } else {
          response.status(401).json({ message: 'Wrong Password!' })
        }
      }
    } catch (error) {
      console.log(error)
      response.status(500).json(error)
    }
  },

  checkToken: async (request, response) => {
    const token = request.body.token;
    jwt.verify(token, config.jwtSecret, (error, user) => {
      if(error){
        response.status(501).json(error)
      } else {
        response.status(200).json(user)
      }
    })
  }
}