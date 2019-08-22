const express = require('express')

const userRoutes = require('./user.routes')

const router = express.Router()

router.route('/health-check')
  .get((request, response) => response.status(200).json({ message: 'ok' }))

router.use('/user', userRoutes)


module.exports = router
