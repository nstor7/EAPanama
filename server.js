'use strict'

const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
const config = require('./config')
const app = require('./app')

var promise = mongoose.connect('mongodb://localhost/myapp', {
  useMongoClient: true,
  /* other options */
});
// Or `createConnection`
var promise = mongoose.createConnection('mongodb://localhost/myapp', {
  useMongoClient: true,
  /* other options */
});
promise.then(function(db) {
  app.listen(config.port, () => {
    console.log(`Api Rest corriendo en el puerto ${config.port}`)
   })})
