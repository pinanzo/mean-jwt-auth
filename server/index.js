const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const config = require('./config/config.json')
const router = require('./routes')
require('./config/mongoose');

const app = express()
const distDir = '../dist/mean-passport';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', router)
app.use(express.static(path.join(__dirname, distDir)))
app.use((request, response) => response.sendFile(path.join(__dirname, distDir + '/index.html')))

app.listen(config.port, (error) => {
  if(error) {
    console.error(error)
  } else {
    console.log(`server is running on port ${config.port}`)
  }
})