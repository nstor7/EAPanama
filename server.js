'use strict'

const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
const config = require('./config')
const app = require('./app')

mongoose.connect(config.db, (err, res) => {
  if(err) {
    console.log('error al conectar a la base de datos')
  }
  console.log('Conexión a la base de datos establecida...')

  app.listen(config.port, () => {
   console.log(`Api Rest corriendo en el puerto ${config.port}`)
  })
})