const express = require('express')

const userController = require('../controllers/user.controller')

const router = express.Router()

router.route('/register')
  .post(userController.register)

router.route('/login')
  .post(userController.login)

router.route('/token')
  .post(userController.checkToken)

module.exports = router
